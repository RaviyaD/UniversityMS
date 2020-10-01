import React,{Component} from "react";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";




export default class SubjectAllocation extends Component{

    constructor(props){
        super(props);
        this.handleSubName = this.handleSubName.bind(this);
        this.handleroomId = this.handleroomId.bind(this);
        this.handleTagName = this.handleTagName.bind(this);
        this.handleNormalSubName = this.handleNormalSubName.bind(this);
        this.handleNormalRoomId = this.handleNormalRoomId.bind(this);
        this.handleNormalTagName = this.handleNormalTagName.bind(this);
        this.addSessionSubjects = this.addSessionSubjects.bind(this);
        this.addNormalSubjects = this.addNormalSubjects.bind(this);
        this.state = {
            Room:[],
            Sessions:[],
            Subjects:[],
            sessionName:'',
            roomId:'',
            subName:'',
            tagName:'',
            normalSubname:'',
            normalRoomId:'',
            normalTagname:'',
            AllocatedSessions:[],
            AllocatedSubjects:[],
            sessionSubError:'',
            normalSubError:''
        }
    }

    handleSubName(event) {
        this.setState({
            subName: event.target.value
        })
    }
    handleroomId(event){
        this.setState({
            roomId : event.target.value
        })
    }
    handleTagName(event){
        this.setState({
            tagName : event.target.value
        })
    }

    handleNormalRoomId(event){
        this.setState({
            normalRoomId : event.target.value
        })
    }

    handleNormalSubName(event){
        this.setState({
            normalSubname : event.target.value
        })
    }
    handleNormalTagName(event){
        this.setState({
            normalTagname : event.target.value
        })
    }
    componentDidMount() {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
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

        firebase.database().ref('subjects').on('value', snapshot => {
            let allSubNames =[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSubNames.push(snap.key)

            });

            this.setState({
                Subjects: allSubNames
            },()=>{console.log("session subjects" + this.state.Subjects)})
        })


        firebase.database().ref('sessions').on('value', snapshot => {
            let allSessions = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSessions.push(snap.val());
            });

            this.setState({
                Sessions:allSessions,
            },()=>{console.log("session Name " + this.state.Sessions)})
        })

        firebase.database().ref('RoomAllocation').on('value', snapshot => {
            let allAllocations = [];
            let allocateSubs = [];
            snapshot.forEach(snap => {
               if(snap.val().type === "session"){
                    allAllocations.push(snap.val())
                }else if(snap.val().type === "subject"){
                   allocateSubs.push(snap.val())
               }

            });

            this.setState({
                AllocatedSessions:allAllocations,
                AllocatedSubjects:allocateSubs
            },()=>{console.log("session Nameeee " + this.state.AllocatedSessions)})
        })

    }

    loadAllocatedSubjects() {
        let sessionSubs = [];
        this.state.Subjects.map(subs => {
            this.state.Sessions.map(sessionss => {
                if (subs.toLowerCase().includes(sessionss.SubCode.toLowerCase())) {
                    console.log("Already in session" + subs)
                    sessionSubs.push(subs)

                }
            })
        })
        const uniqueSubs = [...new Set(sessionSubs)]
        return uniqueSubs;

    }

    loadSubjectRooms(){
        let roomsType =[];
        this.state.Sessions.map(sessions=>{
            this.state.AllocatedSessions.map(as=>{
                if((as.name.toLowerCase().includes(sessions.SubCode.toLowerCase()) &&
                    (as.name.toLowerCase().includes(sessions.Tag.toLowerCase())))) {
                    if((this.state.subName.toLowerCase().includes(sessions.SubCode.toLowerCase())) &&
                        (this.state.tagName.toLowerCase().includes(sessions.Tag.toLowerCase()))
                    ){
                        roomsType.push(as.roomId)}
                    else if(this.state.subName.toLowerCase().includes(sessions.SubCode.toLowerCase())){
                        if(this.state.tagName === "Lecture" || this.state.tagName === "Tutorial"){
                            this.state.Room.map(rooms =>{
                                if(rooms.roomType === "Lecture hall"){
                                    roomsType.push(rooms.roomName)
                                }

                            })
                        }else if(this.state.tagName === "Practical"){
                            this.state.Room.map(rooms =>{
                                if(rooms.roomType === "Labotary"){
                                    roomsType.push(rooms.roomName)
                                }

                            })
                        }
                    }
                }else{
                    if((this.state.subName.toLowerCase().includes(sessions.SubCode.toLowerCase()))){
                        if(this.state.tagName === "Lecture" || this.state.tagName === "Tutorial"){
                            this.state.Room.map(rooms =>{
                                if(rooms.roomType === "Lecture hall"){
                                    roomsType.push(rooms.roomName)
                                }

                            })
                        }else if(this.state.tagName === "Practical"){
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
        const unique = [...new Set(roomsType)]
        return unique;

    }

    sessionSubjectValidation(){
        let sessionSubError='';
        this.state.AllocatedSubjects.map(allocatedS=>{
            if(this.state.subName===allocatedS.name && this.state.roomId === allocatedS.roomId
                && this.state.tagName === allocatedS.roomType
            ){
                sessionSubError = this.state.subName + " is already assigned to " + this.state.roomId
            }
        })
        if (sessionSubError) {

            this.setState({sessionSubError});
            return false;
        }
        this.setState({
            sessionSubError:''
        })

        return true;
    }
    normalSubjectValidation(){
        let normalSubError='';
        this.state.AllocatedSubjects.map(allocatedS=>{
            if(this.state.normalSubname===allocatedS.name && this.state.normalRoomId === allocatedS.roomId
                && this.state.normalTagname === allocatedS.roomType
            ){
                normalSubError = this.state.normalSubname + " is already assigned to " + this.state.normalRoomId
            }
        })
        if (normalSubError) {

            this.setState({normalSubError});
            return false;
        }
        this.setState({
            normalSubError:''
        })

        return true;
    }

    addSessionSubjects(e){
        e.preventDefault();
        const myRef = firebase.database().ref('RoomAllocation').push().getKey();
        const isValid = this.sessionSubjectValidation();
        const ssub_roomObject = {
            name: this.state.subName,
            Id: myRef,
            roomId: this.state.roomId,
            type: "subject",
            roomType:this.state.tagName

        };
        if(isValid){
            firebase.database().ref('RoomAllocation/').child(myRef).set(
                ssub_roomObject,
                err => {
                    if (err)
                        console.log(err  + "unsuccess");
                    else
                        console.log("Successful !!!");
                })
        }

    }

    addNormalSubjects(e){
        e.preventDefault();
        const isValid2 = this.normalSubjectValidation();
        const myRef1 = firebase.database().ref('RoomAllocation').push().getKey();
        const nsub_roomObject = {
            name: this.state.normalSubname,
            Id: myRef1,
            roomId: this.state.normalRoomId,
            type: "subject",
            roomType:this.state.normalTagname

        };
        if(isValid2){
            firebase.database().ref('RoomAllocation/').child(myRef1).set(
                nsub_roomObject,
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
<div>
                <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                    <Row>
                        <Col sm={9}>
                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Rooms for Subjects in Sessions</h5>
                            <Form>

                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Subject Code</b>
                                    </Form.Label>
                                    <Col sm="10">
                                            <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.subName} onChange={this.handleSubName}>
                                                <option>select</option>
                                                {this.loadAllocatedSubjects().map(values => (
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
                                        <b>Tag Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.tagName} onChange={this.handleTagName}>
                                    <option>select</option>
                                    <option>Lecture</option>
                                    <option>Tutorial</option>
                                    <option>Practical</option>
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
                                            {this.loadSubjectRooms().map(values => (
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
                                    <Button lg type="button" onClick={this.addSessionSubjects} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD SESSION ROOM
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                {this.state.sessionSubError}
                            </div>

                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Preferred Rooms for Subjects</h5>
                            <Form>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Subject Code</b>
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.normalSubname} onChange={this.handleNormalSubName}>
                                        <option>select</option>
                                        {this.state.Subjects.map(values => (
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
                                        <b>Tag Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.normalTagname} onChange={this.handleNormalTagName}>
                                            <option>select</option>
                                            <option>Lecture</option>
                                            <option>Tutorial</option>
                                            <option>Practical</option>
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
                                    <Button lg type="button"  onClick={this.addNormalSubjects} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD ROOM
                                    </Button>
                                </Form.Group>
                                <div align="center" style={{ fontSize: 16, color: "red"}}>
                                    {this.state.normalSubError}
                                </div>
                            </Form>
                        </Col>
                        <Col sm={3} style={{'background-color': '#888844'}}>

                        </Col>
                    </Row>
                </div>
</div>
        );
    }
}
