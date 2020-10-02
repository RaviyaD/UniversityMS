import React,{Component} from "react";
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";



export default class GroupAllocation extends Component{

    constructor(props){
        super(props);
        this.handleGroupType = this.handleGroupType.bind(this);
        this.handleGroupName = this.handleGroupName.bind(this);
        this.handleSubGroupName = this.handleSubGroupName.bind(this);
        this.handleroomId = this.handleroomId.bind(this);
        this.handleNormalGName = this.handleNormalGName.bind(this);
        this.handleNormalRoomId = this.handleNormalRoomId.bind(this);
        this.addSessionGroups = this.addSessionGroups.bind(this);
        this.addNormalGroups = this.addNormalGroups.bind(this);
        this.state = {
            Room:[],
            Sessions:[],
            Groups:[],
            SubGroups:[],
            sessionName:'',
            roomId:'',
            groupType:'',
            gName:'',
            normalgname:'',
            normalRoomId:'',
            AllocatedSessions:[],
            AllocatedGroups:[],
            sessionGroupError:'',
            normalGroupError:'',
            emptyNError:'',
            emptySError:''

        }
    }
    handleGroupType(event){
        this.setState({
            groupType: event.target.value
        })
    }

    handleGroupName(event) {
        this.setState({
            gName: event.target.value
        })
    }
    handleSubGroupName(event){
        this.setState({
            subgroupName: event.target.value
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

    handleNormalGName(event){
        this.setState({
            normalgname : event.target.value
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
            },() => {console.log("these are rooms" +this.state.Room)})
        })

        firebase.database().ref('GroupIDs').on('value', snapshot => {
            let allGroupNames =[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allGroupNames.push(snap.val().ID)

            });

            this.setState({
                Groups: allGroupNames
            },()=>{console.log("group names" + this.state.Groups)})
        })

        firebase.database().ref('SubGroupIDs').on('value', snapshot => {
            let allSubGroupNames =[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSubGroupNames.push(snap.val().ID)

            });

            this.setState({
                SubGroups: allSubGroupNames
            },()=>{console.log("group names" + this.state.SubGroups)})
        })


        firebase.database().ref('sessions').on('value', snapshot => {
            let allSessions = [];
            let allsessionNames =[];
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
            let allocatedGroups=[];
            snapshot.forEach(snap => {
                console.log(snap.key);
                if(snap.val().type==="session"){
                    allAllocations.push(snap.val())
                }else if(snap.val().type==="group"){
                    allocatedGroups.push(snap.val())
                }

            });
            const allAllocationsUnique = [...new Set(allAllocations)]

            this.setState({
                AllocatedSessions:allAllocationsUnique,
                AllocatedGroups:allocatedGroups,
            },()=>{console.log("session Name " + this.state.AllocatedSessions)})
        })

    }

    loadAllocatedGroups(){
        let sessionGroups = [];
        if(this.state.groupType === "Group"){
            this.state.Groups.map(gs=>{
                this.state.Sessions.map(sessionss=>{
                    if(gs.toLowerCase()===sessionss.GroupID.toLowerCase()){
                        console.log("session group +++" + gs)
                        sessionGroups.push(gs)
                    }
                })
            })
        }else if(this.state.groupType === "Sub-Group"){
            this.state.SubGroups.map(subgroups=>{
                this.state.Sessions.map(sessions2=>{
                    if(subgroups.toLowerCase()===sessions2.GroupID.toLowerCase()){
                        sessionGroups.push(subgroups)
                    }
                })
            })
        }

        const uniqueGroups = [...new Set(sessionGroups)]
        return uniqueGroups;

    }
    loadNormalGroups(){
        let noSessionGroups = [];
        if(this.state.groupType === "Group"){
            this.state.Groups.map(gs2=>{
                this.state.Sessions.map(sessionG=>{
                    noSessionGroups.push(gs2)
                })
            })
        }else if(this.state.groupType === "Sub-Group"){
            this.state.SubGroups.map(gs3=>{
                this.state.Sessions.map(sessionSG=>{
                    noSessionGroups.push(gs3)
                })
            })
        }

        const uniqueG3 = [...new Set(noSessionGroups)]
        return uniqueG3;
    }

    loadGroupRooms(){
        let roomsType =[];
        this.state.Sessions.map(sessions=>{
            this.state.AllocatedSessions.map(as=>{
                if((as.name.toLowerCase().includes(sessions.SubCode.toLowerCase()) &&
                    (as.name.toLowerCase().includes(sessions.Tag.toLowerCase())))) {
                    if((this.state.gName.toLowerCase().includes(sessions.GroupID.toLowerCase()))){
                        roomsType.push(as.roomId)}
                }else{
                    if((this.state.gName.includes(sessions.GroupID))){
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
        const unique = [...new Set(roomsType)]
        return unique;

    }

    sessionGroupValidation(){
        let   sessionGroupError='';
        let emptySError='';
        this.state.AllocatedGroups.map(allocatedG=>{
            if(this.state.gName===allocatedG.name && this.state.roomId === allocatedG.roomId){
                sessionGroupError = this.state.gName + " is already assigned to " + this.state.roomId
            }
        })
        if((!this.state.gName) || (!this.state.roomId)){
            emptySError="Fields cannot be empty"
        }
        if (sessionGroupError || emptySError) {

            this.setState({sessionGroupError,emptySError});
            return false;
        }
        this.setState({
            sessionGroupError:'',
            emptySError:''
        })

        return true;

    }
    normalGroupValidation(){
        let   normalGroupError='';
        let emptyNError='';
        this.state.AllocatedGroups.map(allocatedS=>{
            if(this.state.normalgname===allocatedS.name && this.state.normalRoomId === allocatedS.roomId){
                normalGroupError = this.state.normalgname + " is already assigned to " + this.state.normalRoomId
            }
        })
        if((!this.state.normalgname) || (!this.state.normalRoomId)){
            emptyNError = "Fields cannot be empty"
        }
        if (normalGroupError || emptyNError) {

            this.setState({normalGroupError,emptyNError});
            return false;
        }
        this.setState({
            normalGroupError:'',
            emptyNError:''
        })

        return true;

    }

    addSessionGroups(e){
        e.preventDefault();
        const isValid = this.sessionGroupValidation();
        const myRef = firebase.database().ref('RoomAllocation').push().getKey();
        const sg_roomObject = {
            name: this.state.gName,
            Id: myRef,
            roomId: this.state.roomId,
            type: "group"

        };
        if(isValid){
            firebase.database().ref('RoomAllocation/').child(myRef).set(
                sg_roomObject,
                err => {
                    if (err)
                        console.log(err  + "unsuccess");
                    else
                        console.log("Successful !!!");
                })
        }

    }

    addNormalGroups(e){
        e.preventDefault();
        const isValid2 = this.normalGroupValidation();
        const myRef1 = firebase.database().ref('RoomAllocation').push().getKey();
        const ng_roomObject = {
            name: this.state.normalgname,
            Id: myRef1,
            roomId: this.state.normalRoomId,
            type: "group"

        };
        if(isValid2){
            firebase.database().ref('RoomAllocation/').child(myRef1).set(
                ng_roomObject,
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
                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Rooms for Groups & Sub Groups in Sessions</h5>

                            <Form>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Group Type</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.groupType} onChange={this.handleGroupType}>
                                            <option>select</option>
                                            <option>Group</option>
                                            <option>Sub-Group</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Group ID</b>
                                    </Form.Label>
                                    <Col sm="10">
                                            <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.gName} onChange={this.handleGroupName}>
                                                <option>select</option>
                                                {this.loadAllocatedGroups().map(values => (
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
                                        {this.loadGroupRooms().map(values => (
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
                                    <Button lg type="button" onClick={this.addSessionGroups} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD SESSION ROOM
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                {this.state.sessionGroupError}
                                {this.state.emptySError}
                            </div>

                            <h5 style={{ margin: '30px', color: '#888844' }} >Add Preferred Rooms for Groups & Sub Groups</h5>
                            <Form>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Group Type</b>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.groupType} onChange={this.handleGroupType}>
                                            <option>select</option>
                                            <option>Group</option>
                                            <option>Sub-Group</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}  style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        <b>Group Name</b>
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control as="select" style={{ marginLeft: '30px', marginRight: '30px' }} value={this.state.normalgname} onChange={this.handleNormalGName}>
                                        <option>select</option>
                                        {this.loadNormalGroups().map(values => (
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
                                    <Button lg type="button" onClick={this.addNormalGroups} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                        ADD ROOM
                                    </Button>
                                </Form.Group>
                                <div align="center" style={{ fontSize: 16, color: "red",marginBottom:'20%'}}>
                                    {this.state.normalGroupError}
                                    {this.state.emptyNError}

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
