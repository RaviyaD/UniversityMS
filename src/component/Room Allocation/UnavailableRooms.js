import React,{Component} from "react";
import * as firebase from "firebase";
import {Button, Col, Form, FormGroup, Row} from "react-bootstrap";

export default class UnavailableRooms extends Component{

    constructor(props){
        super(props);

        this.handleRoomId = this.handleRoomId.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.addUnavailableRooms = this.addUnavailableRooms.bind(this);
        this.state = {

            Room:[],
            roomId:'',
            day: null,
            startTime: null,
            endTime: null,
            AllocatedUnavailability:[],
            emptyError:'',
            timeError:''


        }
    }
    handleRoomId(e){
        this.setState({
            roomId: e.target.value
        })
    }

    handleDay(e){
        this.setState({
            day: e.target.value
        })
    }
    handleStartTime(e){
        this.setState({
            startTime: e.target.value
        })
    }
    handleEndTime(e){
        this.setState({
            endTime: e.target.value
        })
    }


    componentDidMount() {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allNotes = [];
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allNotes.push(snap.val());


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
        firebase.database().ref('RoomAllocation').on('value', snapshot => {
            let allocatedUnavailablity = [];
            snapshot.forEach(snap => {
                if(snap.val().type==="unavailable"){
                    allocatedUnavailablity.push(snap.val())
                }

            });


            this.setState({
                AllocatedUnavailability:allocatedUnavailablity
            })
        })

    }

    validations(){
        let timeError='';
        let emptyError='';
        this.state.AllocatedUnavailability.map(allocatedU=>{
            if(this.state.startTime===allocatedU.startTime && this.state.endTime === allocatedU.endTime &&
            this.state.day===allocatedU.day && this.state.roomId===allocatedU.roomId
            ){
                timeError = this.state.startTime +" - "+this.state.endTime+" - "+this.state.day+" already allocated to "+this.state.roomId
            }
        })

        if((!this.state.roomId) || (!this.state.startTime) || (!this.state.endTime) || (!this.state.day)){
            emptyError = "Fields cannot be empty"
        }

        if (timeError || emptyError) {

            this.setState({timeError,emptyError});
            return false;
        }
        this.setState({
            timeError:'',
            emptyError:''
        })

        return true;
    }

    addUnavailableRooms(e){
        e.preventDefault();
        const  isValid = this.validations();
        const myRef = firebase.database().ref('RoomAllocation').push().getKey();
        const un_roomObject = {
            startTime:this.state.startTime,
            endTime: this.state.endTime,
            day:this.state.day,
            Id: myRef,
            roomId: this.state.roomId,
            type: "unavailable",


        };
        if(isValid){
            firebase.database().ref('RoomAllocation/').child(myRef).set(
                un_roomObject,
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
                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Unavailability of Rooms</h5>
                            <Form >

                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Room Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.roomId} onChange={this.handleRoomId}>
                                            <option value="none" selected disabled>select</option>
                                            {this.state.Room.map(rooms => (
                                                <option
                                                    key={rooms.roomName}
                                                    value={rooms.roomName}
                                                >
                                                    {rooms.roomName}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Day</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.day} onChange={this.handleDay}>
                                            <option value="none" selected disabled>select</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                        <option value="Sunday">Sunday</option>
                                        </Form.Control>

                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Start Time</b>
                                    </Form.Label>
                                    <Col sm="10">
                                                <Form.Control type="time" name="startTime" onChange={this.handleStartTime}
                                                              style={{ marginLeft: '30px',marginRight: '30px'}}  value={this.state.startTime} required/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>End Time</b>
                                    </Form.Label>
                                   <Col sm="10">
                                    <Form.Control type="time" name="endTime" onChange={this.handleEndTime}
                                                  style={{  marginLeft: '30px',marginRight: '30px' }}               value={this.state.endTime} required/>
                                </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ margin: '30px' }}>
                                    <Button lg type="button"  style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}
                                    onClick={this.addUnavailableRooms}
                                    >
                                        ADD Time
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div align="center" style={{ fontSize: 16, color: "red",marginBottom:'30%'}}>
                                {this.state.timeError}
                                {this.state.emptyError}
                            </div>

                        </Col>
                        <Col sm={3} style={{'background-color': '#888844'}}>

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
