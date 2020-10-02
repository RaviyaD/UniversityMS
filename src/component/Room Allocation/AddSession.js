import React,{Component} from "react";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";


export default class AddSession extends Component{

    constructor(props){
        super(props);
        this.addNonConsecutiveSessions = this.addNonConsecutiveSessions.bind(this);
        this.saveConsecutiveSessions= this.saveConsecutiveSessions.bind(this);
        this.handlesessionName = this.handlesessionName.bind(this);
        this.handleroomId = this.handleroomId.bind(this)
        this.handleCsId = this.handleCsId.bind(this);
        this.handleCroomId = this.handleCroomId.bind(this);
        this.state = {
            Room:[],
            nonCRooms:[],
            typeRooms:[],
            Sessions:[],
            CSessions:[],
            ConsecutiveSessions:[],
            AllocatedSessions:[],
            sessionNames:[],
            sessionName:'',
            roomId:'',
            csid:'',
            croomId:'',
            sessionAllocateError:'',
            sessionError:'',
            csessionError:'',
            csessionAllocateError:''



        }
    }

    handlesessionName(event) {
        this.setState({
            sessionName: event.target.value
        })
    }
    handleroomId(event){
        this.setState({
            roomId : event.target.value
        })
    }
    handleCsId(event){
        this.setState({
            csid : event.target.value
        })
    }
    handleCroomId(event){
        this.setState({
            croomId : event.target.value
        })
    }
    componentDidMount() {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                firebase.database().ref('Buildings/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                        console.log("meka 0 "+ snap2.key);
                        if(snap2.key !== 'buildingName' && snap2.key !== 'buildingId'){
                            allRooms.push(snap2.val());}
                    });
                })
            });

            this.setState({
                Room:allRooms
            },() => {console.log(this.state.Room)})
        })

        firebase.database().ref('ConsecutiveSessions').on('value', snapshot => {
            let allcsessions = [];
            let allcValues=[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allcValues.push([snap.key,snap.val().sessions])
                firebase.database().ref('ConsecutiveSessions/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                            console.log("csessions "+ snap2.val());
                            let values = snap2.val();
                            console.log("Actual valules " + values)
                            for(let a=0 ; a<values.length;a++){
                                if(values[a] != ""){
                                    allcsessions.push(values[a]);
                                }
                            }
                        }
                    );

                })
            });

            this.setState({
                CSessions: allcValues,
                ConsecutiveSessions : allcsessions
            },() => {console.log( this.state.CSessions)})
        })

        firebase.database().ref('RoomAllocation').on('value', snapshot => {
            let allAllocateSessions = [];

            snapshot.forEach(snap => {
                console.log(snap.key);
                if(snap.val().type === "session"){
                    allAllocateSessions.push(snap.val().name);
                }
            });


            this.setState({
                AllocatedSessions : allAllocateSessions
            },()=>{console.log("allocated sessions sss " + this.state.AllocatedSessions)})
        })



        firebase.database().ref('sessions').on('value', snapshot => {
            let allSessions = [];
            let allsessionNames =[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSessions.push(snap.val());
                allsessionNames.push(snap.key)

            });

            let nonC =[];
            allsessionNames.forEach(sn=>{
                if(!this.state.AllocatedSessions.includes(sn)){
                if(!(this.state.ConsecutiveSessions.includes(sn))){

                        nonC.push(sn);
                    }

                }
            })

            this.setState({
                Sessions:allSessions,
                sessionNames: nonC
            },()=>{console.log("session Name " + this.state.sessionNames)})
        })




    }


    loadRoomSessions(){
        let roomsType =[];
        this.state.Sessions.map(sessions=>{
            if((this.state.sessionName.toLowerCase().includes(sessions.SubCode.toLowerCase()) &&
                (this.state.sessionName.toLowerCase().includes(sessions.Tag.toLowerCase())))){

                if(sessions.Tag === "Practical") {
                    this.state.Room.map(r => {
                        if(r.roomType === "Labotary") {
                            roomsType.push(r.roomName)
                        }
                    })
                }else if(sessions.Tag === "Lecture" ){
                    this.state.Room.map(r => {
                        if(r.roomType === "Lecture hall") {
                            roomsType.push(r.roomName)
                        }
                    })
                }else if(sessions.Tag == "Tutorial"){
                    this.state.Room.map(r => {
                        if(r.roomType === "Lecture hall") {
                            roomsType.push(r.roomName)
                        }
                    })
                }

            }
        })
        console.log("gfjss" + roomsType);

        return roomsType;

    }

    setRoom(){
        this.loadRoomSessions()
        return <div>
            <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.roomId} onChange={this.handleroomId}>
                <option>select</option>
                {this.loadRoomSessions().map(name => (
                    <option
                        key={name}
                        value={name}
                    >
                        {name}
                    </option>
                ))}
            </Form.Control> </div>

    }
    sessionValidation(){
        let sessionError='';
        if((!this.state.sessionName) || (!this.state.roomId)){
            sessionError = "Fields cannot be empty"
        }

        if (sessionError) {

            this.setState({sessionError});
            return false;
        }
        this.setState({
            sessionError:''
        })

        return true;
    }

    addNonConsecutiveSessions(e){
        e.preventDefault();
        const isValid = this.sessionValidation();
        const myRef = firebase.database().ref('RoomAllocation').push().getKey();
        const session_roomObject = {
            name: this.state.sessionName,
            Id: myRef,
            roomId: this.state.roomId,
            type: "session"

        };
        if(isValid){
            firebase.database().ref('RoomAllocation/').child(myRef).set(
                session_roomObject,
                err => {
                    if (err)
                        console.log(err  + "unsuccess");
                    else
                        console.log("Successful !!!");
                })
        }

    }

    loadConsecutiveSessions(){

        return this.state.CSessions.map(cs=>{
            let l = 'Lecture';
            let t = 'Tutorial';
            let p = 'Practical';
            let crooms = [];
            return cs;

        })
    }

    getConsecutiveSessions(){
        return <div>
            <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.csid} onChange={this.handleCsId}>
                <option>select</option>
                {this.loadConsecutiveSessions().map(values => (
                    <option
                        key={values}
                        value={values[0]}
                    >
                        {values[1]}
                    </option>
                ))}
            </Form.Control> </div>
    }



    setCRooms(){
        let conrooms=[];
        this.loadConsecutiveSessions().map(val=>{
            if( (this.state.csid.toLowerCase().includes(val[0].toLowerCase()))){
                for(let a =0;a<val[1].length;a++){
                    console.log(val[1][a])
                    if( (val[1][a].includes("Lecture" || "Tutorial")) ){
                        this.state.Room.map(rr=>{
                            if(rr.roomType==="Lecture hall"){
                                conrooms.push(rr.roomName)
                            }
                        })
                    }else if((val[1][a].includes("Practical"))){
                        this.state.Room.map(rr=>{
                            if(rr.roomType==="Labotary"){
                                conrooms.push(rr.roomName)
                            }
                        })
                    }

                }

            }
        })
        console.log("gdg8888888888888888888" + conrooms)
        return conrooms;

    }

    csessionValidations(){
        let csessionError='';
        if((!this.state.csid) || (!this.state.croomId)){
            csessionError = "Fields cannot be empty"
        }

        if (csessionError) {

            this.setState({csessionError});
            return false;
        }
        this.setState({
            csessionError:''
        })

        return true;
    }
    saveConsecutiveSessions(e){
        e.preventDefault();
        const csessionValidate = this.csessionValidations();
        const csession_roomObject = {
            name: this.state.csid,
            Id: this.state.csid,
            roomId: this.state.croomId,
            type: "consecutivesession"

        };
        if(csessionValidate){
            firebase.database().ref('RoomAllocation/').child(this.state.csid).set(
                csession_roomObject,
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
                        <h5 style={{ margin: '30px', color: '#888844' }} >Add Rooms for Normal Sessions</h5>
                        <Form>

                            <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                    <b>Session Name</b>
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.sessionName} onChange={this.handlesessionName}>
                                        <option>select</option>
                                        {this.state.sessionNames.map(name => (
                                            <option
                                                key={name}
                                                value={name}
                                            >
                                                {name}
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
                                    {this.setRoom()}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}  style={{ margin: '30px' }}>
                                <Button lg type="button" onClick={this.addNonConsecutiveSessions} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                    ADD ROOM
                                </Button>
                            </Form.Group>
                        </Form>
                        <div align="center" style={{ fontSize: 16, color: "red" }}>
                            {this.state.sessionError}
                        </div>
                        <h5 style={{ margin: '30px', color: '#888844' }} >Add Rooms for Consecutive Sessions</h5>
                        <Form>

                            <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                    <b>Consecutive Sessions</b>
                                </Form.Label>
                                <Col sm="10">
                                    {this.getConsecutiveSessions()}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                    <b>Room Name</b>
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.croomId} onChange={this.handleCroomId}>
                                        <option>select</option>
                                        {this.setCRooms().map(name => (
                                            <option
                                                key={name}
                                                value={name}
                                            >
                                                {name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}  style={{ margin: '30px' }}>
                                <Button lg type="button"  onClick={this.saveConsecutiveSessions} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                    ADD ROOM
                                </Button>
                            </Form.Group>
                        </Form>
                        <div align="center" style={{ fontSize: 16, color: "red",marginBottom:'20%' }}>
                            {this.state.csessionError}
                        </div>
                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>

        );
    }
}
