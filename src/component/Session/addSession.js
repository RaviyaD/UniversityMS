import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'
import swal from 'sweetalert';
import Select from 'react-select';

class AddSession extends React.Component {
    ll=[];
    constructor(props) {
        super(props);
        this.state={
          lecturers:'',
            Name: '',
            Llist:[],
            Slist:[],
            Tlist:[],
            Glist:[],
            Glist1:[],
            Scode:'',
            Lect:'',
            Sname:'',
            Gid:'',
            Syear:'',
            Ssem:'',
            tag:'',
            sessionID:'',
            Sprog:'',
            Studcount:'',
            duration:'',
            lects:[],
            LectNames:[]
        };
        this.handleSubject = this.handleSubject.bind(this);
        this.handlegroupID = this.handlegroupID.bind(this);
        this.handleStudCount = this.handleStudCount.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleLecturer = this.handleLecturer.bind(this);
        this.handleLecturers = this.handleLecturers.bind(this);
        this.handlegID = this.handlegID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        firebase.database().ref('lecturers').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.Llist.push(lectSnapshot.val().Name);
                    this.setState({
                        Llist:this.state.Llist
                    })
                });
            }
        });

        firebase.database().ref('subjects').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.Slist.push(lectSnapshot.val());
                    this.setState({
                        Slist:this.state.Slist
                    })
                });
            }
        });

        firebase.database().ref('Tag').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.Tlist.push(lectSnapshot.val());
                    this.setState({
                        Tlist:this.state.Tlist
                    })
                });
            }
        });
    }

    handleLecturer(event){
        this.setState({
            Lect : event.target.value
        })
    }

    handleLecturers(event){
       this.setState({
           lects:event
       })

    }
    handleSubject(event){
        let name = event.target.value;
        this.setState({
            Sname:event.target.value
        });
        this.state.Slist.map((team,i) => {
            if(team.Name === name){
                let prog = team.Code.substr(0,2);
                this.setState({
                    Scode : team.Code,
                    Syear: team.Year,
                    Ssem: team.Semester,
                    Sprog:prog
                }, ()=>{
                    console.log(this.state.Scode);
                    console.log(this.state.Syear);
                    console.log(this.state.Ssem);
                    console.log(this.state.Sprog);
                })
            }
        })

    }

    handlegroupID(event){
        let tag = event.target.value;
        this.setState({
            tag: event.target.value,
            sessionID:this.state.Scode.concat(event.target.value)
        }, ()=>{
            console.log(this.state.sessionID)
        });
        if(this.state.Glist){
            this.setState({
                Glist:[]
            }, ()=>{
                if(tag === 'Lecture' || tag === 'Tutorial' ) {
                    firebase.database().ref('Student/' + this.state.Syear + "/semesters/" + this.state.Ssem + "/programmes/" + this.state.Sprog + "/Groups")
                        .on('value', snapshot => {
                            console.log(snapshot);
                            if (snapshot.exists()) {
                                snapshot.forEach(lectSnapshot => {
                                    this.state.Glist.push(lectSnapshot.val());
                                    this.setState({
                                        Glist: this.state.Glist
                                    })
                                });
                            }

                        });
                }
                else{
                    firebase.database().ref('SubGroup/')
                        .on("value", snapshot => {
                            console.log(snapshot);
                            if (snapshot.exists()) {
                                snapshot.forEach(lectSnapshot => {
                                    this.state.Glist.push(lectSnapshot.val());
                                    this.setState({
                                        Glist: this.state.Glist
                                    })
                                });
                            }
                        })
                }

            })
        }

    }

    handlegID(event){
        this.setState({
            Gid:event.target.value
        })
    }

    handleStudCount(event){
        this.setState({
            Studcount:event.target.value
        })
    }

    handleDuration(event){
        this.setState({
            duration:event.target.value
        })
    }


    handleSubmit(){

        if ((this.state.tag ==="Practical"  && this.state.Studcount <50) || ((this.state.tag === "Lecture" || this.state.tag === "Tutorial" )  && this.state.Studcount >2)) {
            this.state.lects.map((t)=>{
                console.log(t.label);
                this.state.LectNames.push(t.label);
            });
            firebase.database().ref('sessions/' + this.state.sessionID).set({
                Lecturers : this.state.LectNames,
                Subject: this.state.Sname,
                SubCode: this.state.Scode,
                Tag: this.state.tag,
                GroupID: this.state.Gid,
                StudCount: this.state.Studcount,
                Duration: this.state.duration

            }, ()=>{
                this.setState({
                    Lect: '',
                    Sname: '',
                    Scode: '',
                    tag: '',
                    Gid: '',
                    Studcount:'',
                    duration:''
                });
                swal("OK!!", "Session Added!", "success").then(() => null);

            })
        }else{
            swal("Check these out!!", "A practical must have less than 50 students!! A lecture or a tutorial has to have more than 2 students!!", "warning").then(() => null);
        }
    }

    render() {
        const Lecturers= [];
        this.state.Llist.map((team,i) =>{
           Lecturers.push({label: team, value: team})
        });
        return(
            <div>
                <h3 style={{ margin: '70px', color: '#888844' }} >Add Session</h3>
                <Form>
                {/*<Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>*/}
                {/*    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>*/}
                {/*        <b>Lecturer In Charge</b>*/}
                {/*    </Form.Label>*/}
                {/*    <Col sm="10">*/}
                {/*        <Form.Control as="select" value={this.state.Lect} style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handleLecturer}>*/}
                {/*            <option>SELECT</option>*/}
                {/*            {this.state.Llist.map((team,i) => <option key={i} value={team}>{team}</option>)}*/}
                {/*        </Form.Control>*/}
                {/*    </Col>*/}
                {/*</Form.Group>*/}
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Lecturer(s)</b>
                        </Form.Label>
                        <Col sm="10">
                            <div style={{ marginLeft: '30px', marginRight: '30px'}} >
                                <Select isMulti options={Lecturers} onChange={this.handleLecturers} />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Subject</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control value={this.state.Sname} as="select" style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handleSubject}>
                                <option>SELECT</option>
                                {this.state.Slist.map((team,i) => <option key={i} value={team.Name}>{team.Name}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Subject Code</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" value={this.state.Scode} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Tag</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" value={this.state.tag} style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handlegroupID}>
                                <option>SELECT</option>
                                {this.state.Tlist.map((team,i) => <option key={i} value={team.name}>{team.name}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Group ID</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" value={this.state.Gid} style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handlegID}>
                                <option>SELECT</option>
                                {this.state.Glist.map((team,i) => <option key={i} value={team.ID}>{team.ID}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Student Count</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" value={this.state.Studcount} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleStudCount}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Duration</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" value={this.state.duration} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleDuration}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                        <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                            ADD SESSION
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
export default AddSession
