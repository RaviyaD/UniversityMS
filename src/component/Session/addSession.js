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
            LectNames:[],
            validated: false,
            sessionList:[],
            inSessionList:false,
        };
        this.handleSubject = this.handleSubject.bind(this);
        this.SettingGroupList = this.SettingGroupList.bind(this);
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

        firebase.database().ref('sessions').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.sessionList.push(lectSnapshot.key);
                    this.setState({
                        sessionList:this.state.sessionList
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

            let code = event.target.value;
            this.setState({
                Scode:event.target.value
            });
            this.state.Slist.map((team,i) => {
                if(team.Code === code){
                    let prog = team.Code.substr(0,2);
                    this.setState({
                        Sname : team.Name,
                        Syear: team.Year,
                        Ssem: team.Semester,
                        Sprog:prog
                    })
                }
            })
        if(this.state.tag ===''){
            console.log("Tag is not clicked")
        }else{
            this.SettingGroupList();
        }


    }

    SettingGroupList(){
        if(this.state.Glist){
            this.setState({
                Glist:[]
            }, ()=>{
                if(this.state.tag === 'Lecture' || this.state.tag === 'Tutorial' ) {
                    firebase.database().ref( "/GroupIDs")
                        .on('value', snapshot => {
                            console.log(snapshot);
                            if (snapshot.exists()) {
                                snapshot.forEach(lectSnapshot => {
                                    if(lectSnapshot.val().ID.substr(1,1) === this.state.Syear) {
                                        this.state.Glist.push(lectSnapshot.val());
                                        this.setState({
                                            Glist: this.state.Glist
                                        })
                                    }
                                });
                            }
                        });
                }
                else{
                    firebase.database().ref('SubGroupIDs/')
                        .on("value", snapshot => {
                            console.log(snapshot);
                            if (snapshot.exists()) {
                                snapshot.forEach(lectSnapshot => {
                                    if(lectSnapshot.val().ID.substr(1,1) === this.state.Syear){
                                        this.state.Glist.push(lectSnapshot.val());
                                        this.setState({
                                            Glist: this.state.Glist
                                        })
                                    }
                                });
                            }
                        })
                }

            })
        }
    }
    handlegroupID(event){
        let tag = event.target.value;
        this.setState({
            tag: event.target.value,
            sessionID:this.state.Scode.concat(event.target.value)
        }, ()=>{
            console.log(this.state.sessionID);
            this.SettingGroupList();
        });


    }

    handlegID(event){
        this.setState({
            Gid:event.target.value,
            sessionID:this.state.sessionID.concat((event.target.value).split("."))
        }, ()=>{
            console.log(this.state.sessionID);
            this.state.sessionList.map(m=>{
                if(m===this.state.sessionID){
                    this.setState({
                        inSessionList:true
                    }, ()=>{
                        console.log(this.state.inSessionList)
                    })
                }
            });
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
        if(this.state.LectNames === '' || this.state.Sname ==='' || this.state.Scode ==='' || this.state.tag === '' ||
            this.state.Gid === '' || this.state.Studcount === '' || this.state.duration === ''){
            swal("Error!!", "Fill the form!", "warning").then(() => null);

        }else{
            if ((this.state.tag ==="Practical"  && this.state.Studcount <50) || ((this.state.tag === "Lecture" || this.state.tag === "Tutorial" )  && this.state.Studcount >2)) {
                    if(this.state.inSessionList){
                                        swal({
                                            title: "This session already exists!!",
                                            text: "Once updated, you will be editing the existing data!",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: true,
                                        })
                                            .then((willDelete) => {
                                                if (willDelete) {

                                                    this.state.lects.map((t) => {
                                                        console.log(t.label);
                                                        this.state.LectNames.push(t.label);
                                                    });
                                                    firebase.database().ref('sessions/' + this.state.sessionID).set({
                                                        Lecturers: this.state.LectNames,
                                                        Subject: this.state.Sname,
                                                        SubCode: this.state.Scode,
                                                        Tag: this.state.tag,
                                                        GroupID: this.state.Gid,
                                                        StudCount: this.state.Studcount,
                                                        Duration: this.state.duration

                                                    }, () => {
                                                        this.setState({
                                                            Lect: '',
                                                            Sname: '',
                                                            Scode: '',
                                                            tag: '',
                                                            Gid: '',
                                                            Studcount: '',
                                                            duration: '',
                                                            lects:[],
                                                            LectNames:[],
                                                            Llist:this.state.Llist,
                                                            inSessionList:false
                                                        });
                                                        swal("OK!!", "Session Modified!", "success").then(() => null);

                                                    });
                                                }else{
                                                    this.setState({
                                                        Lect: '',
                                                        Sname: '',
                                                        Scode: '',
                                                        tag: '',
                                                        Gid: '',
                                                        Studcount: '',
                                                        duration: '',
                                                        lects:[],
                                                        LectNames:[],
                                                        Llist:this.state.Llist,
                                                        inSessionList:false
                                                    });
                                                }
                                            })

                    }else{
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
                                            swal("OK!!", "Session Added!", "success").then(() => null);
                                            this.setState({
                                                Lect: '',
                                                Sname: '',
                                                Scode: '',
                                                tag: '',
                                                Gid: '',
                                                Studcount:'',
                                                duration:'',
                                                lects:[],
                                                LectNames:[],
                                                Llist:this.state.Llist,
                                                inSessionList:false
                                            });
                                        });
                                    }

            }else{
                swal("Check these out!!", "A practical must have less than 50 students!! A lecture or a tutorial has to have more than 2 students!!", "warning").then(() => null);
            }
        }

    }

    render() {
        const Lecturers= [];
        this.state.Llist.map((team,i) =>{
           Lecturers.push({label: team, value: team})
        });
        return(
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
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
                    <Form.Group required as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Lecturer(s)</b>
                        </Form.Label>
                        <Col sm="10">
                            <div style={{ marginLeft: '30px', marginRight: '30px'}} >
                                <Select isMulti value={this.state.lects} options={Lecturers} onChange={this.handleLecturers} />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Subject Code</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required value={this.state.Scode} as="select" style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handleSubject}>
                                <option>SELECT</option>
                                {this.state.Slist.map((team,i) => <option key={i} value={team.Code}>{team.Code}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Subject</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" disabled value={this.state.Sname} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Tag</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required as="select" value={this.state.tag} style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handlegroupID}>
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
                            <Form.Control required as="select" value={this.state.Gid} style={{ marginLeft: '30px', marginRight: '30px'}} onChange={this.handlegID}>
                                <option>SELECT</option>
                                {this.state.Glist? (
                                    this.state.Glist.map((team,i) => <option key={i} value={team.ID}>{team.ID}</option>)
                                ): (<option>No groups for the specific year and semester</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Student Count</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" value={this.state.Studcount} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleStudCount}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            <b>Duration</b>
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="text" value={this.state.duration} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleDuration}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                        <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                            ADD SESSION
                        </Button>
                    </Form.Group>
                </Form>
                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>
        );
    }
}
export default AddSession
