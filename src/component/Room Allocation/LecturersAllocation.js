import React,{Component} from "react";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";




export default class LecturersAllocation extends Component{

    constructor(props){
        super(props);
        this.handleLecName = this.handleLecName.bind(this);
        this.handleroomId = this.handleroomId.bind(this);
        this.handleNormalLecName = this.handleNormalLecName.bind(this);
        this.handleNormalRoomId = this.handleNormalRoomId.bind(this);
        this.addSessionLecturers = this.addSessionLecturers.bind(this);
        this.addNormalLecturers = this.addNormalLecturers.bind(this);
        this.state = {
            Room:[],
            Sessions:[],
            Lecturers:[],
            sessionName:'',
            roomId:'',
            lecName:'',
            normalLecname:'',
            normalRoomId:'',
            AllocatedSessions:[],
            AllocatedLecturers:[],
            sessionLecError:'',
            normalLecError:''
        }
    }

    handleLecName(event) {
        this.setState({
            lecName: event.target.value
        })
    }
    handleroomId(event){
        this.setState({
            roomId : event.target.value
        })
    }

    handleNormalRoomId(event){
        this.setState({
            normalRoomId : event.target.value
        })
    }

    handleNormalLecName(event){
        this.setState({
            normalLecname : event.target.value
        })
    }

    componentDidMount() {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allRooms = [];
            snapshot.forEach(snap => {
                firebase.database().ref('Buildings/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                        if(snap2.key !== 'buildingName' && snap2.key !== 'buildingId'){
                            allRooms.push(snap2.val());}
                    });
                })
            });

            this.setState({
                Room:allRooms
            },() => {console.log(this.state.Room)})
        })
        firebase.database().ref('sessions').on('value', snapshot => {
            let allSessions = [];
            let allsessionNames =[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSessions.push(snap.val());
                allsessionNames.push(snap.key)

            });

            this.setState({
                Sessions:allSessions,
            },()=>{console.log("session Name " + this.state.Sessions)})
        })

        firebase.database().ref('RoomAllocation').on('value', snapshot => {
            let allocatedLecturers = [];
            let allocatedSessions = [];
            snapshot.forEach(snap => {
                if(snap.val().type==="lecturer"){
                   allocatedLecturers.push(snap.val())
                }else if(snap.val().type === "session"){
                    allocatedSessions.push(snap.val())
                }

            });


            this.setState({
                AllocatedLecturers:allocatedLecturers,
                AllocatedSessions:allocatedSessions
            },()=>{console.log("allocated lectures " + this.state.AllocatedLecturers )})
        })


        firebase.database().ref('lecturers').on('value', snapshot => {
            let allLecNames =[];
            snapshot.forEach(snap => {
               allLecNames.push(snap.val().Name)
            });


            this.setState({
                Lecturers: allLecNames
            },()=>{console.log("lecturer names " + this.state.Lecturers)})
        })

    }

    loadAllocatedLecturers(){
        let sessionLecs = [];

        this.state.Lecturers.map(lecss=>{
            this.state.Sessions.map(sessionss=>{
                sessionss.Lecturers.map(slecs=>{
                    if(lecss.toLowerCase().includes(slecs.toLowerCase())){
                        sessionLecs.push(lecss)
                    }

                })
            })
        })
        const uniqueLecs = [...new Set(sessionLecs)]
        return uniqueLecs;

    }


    loadLectureRooms(){
        let roomsType =[];

        this.state.Sessions.map(sessions=>{
            sessions.Lecturers.map(lecs=>{
                this.state.AllocatedSessions.map(allocated=>{
                    if(allocated.name.toLowerCase().includes(sessions.SubCode.toLowerCase()) &&
                        (allocated.name.toLowerCase().includes(sessions.Tag.toLowerCase()))){
                        if((this.state.lecName.includes(lecs))){
                                roomsType.push(allocated.roomId)}
                } else{
                        if(this.state.lecName.includes(lecs)){
                            if(sessions.Tag === "Lecture" || sessions.Tag === "Tutorial"){
                                this.state.Room.map(rooms =>{
                                    if(rooms.roomType === "Lecture hall"){
                                        roomsType.push(rooms.roomName)
                                    }

                                })
                            }else if(sessions.Tag === "Practical"){
                                this.state.Room.map(rooms =>{
                                    if(rooms.roomType === "Labotary"){
                                        roomsType.push(rooms.roomName)
                                    }

                                })
                            }
                        }
                    }
                })

            })
        })
        const unique = [...new Set(roomsType)]

        return unique;

    }
    lectureSessionValidation(){
        let sessionLecError='';
        this.state.AllocatedLecturers.map(allocatedL=>{
            if(this.state.lecName===allocatedL.name && this.state.roomId === allocatedL.roomId){
                 sessionLecError = this.state.lecName + "is already assigned to" + this.state.roomId
            }
        })
        if (sessionLecError) {

            this.setState({sessionLecError});
            return false;
        }
        this.setState({
           sessionLecError:''
        })

        return true;
    }

    lectureNormalValidation(){
        let   normalLecError='';
        this.state.AllocatedLecturers.map(allocatedL=>{
            if(this.state.normalLecname===allocatedL.name && this.state.normalRoomId === allocatedL.roomId){
            normalLecError = this.state.normalLecname + " is already assigned to " + this.state.normalRoomId
            }
        })
        if (normalLecError) {

            this.setState({normalLecError});
            return false;
        }
        this.setState({
            normalLecError:''
        })

        return true;

    }

    addSessionLecturers(e){
        e.preventDefault();
        const isValid = this.lectureSessionValidation();
        const myRef = firebase.database().ref('RoomAllocation').push().getKey();
        const slec_roomObject = {
            name: this.state.lecName,
            Id: myRef,
            roomId: this.state.roomId,
            type: "lecturer"

        };
        if(isValid){
            firebase.database().ref('RoomAllocation/').child(myRef).set(
                slec_roomObject,
                err => {
                    if (err)
                        console.log(err  + "unsuccess");
                    else
                        console.log("Successful !!!");
                })
        }

    }

    addNormalLecturers(e){
        e.preventDefault();
        const isValid2 = this.lectureNormalValidation();
        const myRef1 = firebase.database().ref('RoomAllocation').push().getKey();
        const nlec_roomObject = {
            name: this.state.normalLecname,
            Id: myRef1,
            roomId: this.state.normalRoomId,
            type: "lecturer"

        };
        if(isValid2){
            firebase.database().ref('RoomAllocation/').child(myRef1).set(
                nlec_roomObject,
                err => {
                    if (err)
                        console.log(err  + "unsuccess");
                    else
                        console.log("Successful !!!");
                })
        }

    }

    render(){

        return(
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                    <Row>
                        <Col sm={9}>
                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Rooms for Lecturers in Sessions</h5>
                            <Form>

                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Lecturer Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.lecName} onChange={this.handleLecName}>
                                            <option>select</option>
                                            {this.loadAllocatedLecturers().map(values => (
                                                <option
                                                    key={values}
                                                    value={values}
                                                >
                                                    {values}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Room Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.roomId} onChange={this.handleroomId}>
                                            <option>select</option>
                                            {this.loadLectureRooms().map(values => (
                                                <option
                                                    key={values}
                                                    value={values}
                                                >
                                                    {values}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ margin: '30px' }}>
                                    <Button lg type="button" onClick={this.addSessionLecturers} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD SESSION ROOM
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                {this.state.sessionLecError}
                            </div>

                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Preferred Rooms for Lecturers</h5>
                            <Form>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Lecture Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.normalLecname} onChange={this.handleNormalLecName}>
                                    <option>select</option>
                                    {this.state.Lecturers.map(values => (
                                        <option
                                            key={values}
                                            value={values}
                                        >
                                            {values}
                                        </option>
                                    ))}
                                </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Room Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                            <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.normalRoomId} onChange={this.handleNormalRoomId}>
                                                <option>select</option>
                                                {this.state.Room.map(values => (
                                                    <option
                                                        key={values.roomName}
                                                        value={values.roomName}
                                                    >
                                                        {values.roomName}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ margin: '30px' }}>
                                    <Button lg type="button"  onClick={this.addNormalLecturers} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD ROOM
                                    </Button>
                                </Form.Group>
                                <div align="center" style={{ fontSize: 16, color: "red"}}>
                                    {this.state.normalLecError}
                                </div>
                            </Form>
                        </Col>
                        <Col sm={3} style={{'background-color': '#888844'}}>

                        </Col>
                    </Row>
                </div>

        );
    }
}


