import React from 'react'
import * as firebase from 'firebase'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button";


export default class AddRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildingName:'',
            roomId:'',
            roomName:'',
            capacity:0,
            roomType:'',
            BuildingNames:[],
            RoomNames:[],
            buildingId:'',
            bnameError:'',
            rnameError:'',
            capacityError:'',
            typeError1:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildingName = this.handleBuildingName.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.handleCapacity = this.handleCapacity.bind(this);
        this.handleType = this.handleType.bind(this);

    }

    componentDidMount(){
        firebase.database().ref().child('Buildings').on('value', snapshot => {
            let allNotes = [];
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allNotes.push(snap.val());
                console.log("names of bui;ding "+ snap.val().buildingName)

                firebase.database().ref('Buildings/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                        console.log("meka 0 "+ snap2.key);
                        if(snap2.key !== 'buildingName' && snap2.key !== 'buildingId'){
                            allRooms.push(snap2.val().roomName);}
                    });

                })
            });
            this.setState({ BuildingNames: allNotes,RoomNames: allRooms});


        })
    }
    handleBuildingName(event) {
        this.setState({
            buildingId: event.target.value
        })

    }

    handleRoomName(event){
        this.setState({
            roomName: event.target.value
        })
    }
    handleCapacity(event){
        this.setState({
            capacity: event.target.value
        })
    }
    handleType(event){
        this.setState({
            roomType: event.target.value
        })
    }
    validations(){

        let bnameError = '';
        let rnameError = '';
        let capacityError = '';
        let typeError1 = '';
        for(let j=0;j<this.state.RoomNames.length;j++){
            if((this.state.buildingName === this.state.RoomNames[j].roomName) || !this.state.roomName){
                rnameError = "Invalid Room Name"
            }
        }
        if(!this.state.buildingId){
            bnameError = "Building Name cannot be empty"
        }
        if(!this.state.capacity){
            capacityError = "capacity cannot be empty"
        }
        if(!this.state.roomType){
            typeError1 = "room type cannot be empty"
        }
        if(bnameError || rnameError || capacityError || typeError1){
            this.setState({
                bnameError,rnameError,capacityError,typeError1
            })
            return false;
        }
        this.setState({
            bnameError:'',
            rnameError:'',
            capacityError:'',
            typeError1:''
        })
        return  true;
    }

    handleSubmit(e) {
        const isValid = this.validations();
        let obj = this.state.BuildingNames.find(o => o.buildingId === this.state.buildingId);
        e.preventDefault();
        if(isValid === true){
            var myRef = firebase.database().ref().child('Room').push().getKey();
            this.state.roomId = myRef;
            const RoomObject = {

                buildingId: this.state.buildingId,
                buildingName:obj.buildingName,
                roomName:this.state.roomName,
                roomType:this.state.roomType,
                capacity:this.state.capacity

            };
            firebase.database().ref().child('Buildings/'+this.state.buildingId+"/"+this.state.roomName).set(
                RoomObject,
                err => {
                    if (err)
                        console.log(err)
                    else
                        console.log("Successful !!!");
                })

            window.confirm('Successfully Entered!').then(window.location.reload())
            this.setState({
                buildingId: '',
                buildingName:'',
                roomName:'',
                roomType:'',
                capacity:''
            })
        }

    }

    render() {
        return (
            <div style={{ marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                        <h3 style={{ margin: '70px', color: '#888844' }} >Add Room</h3>

                        <Form >
                            <div className="form-group">

                                <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        Building Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" placeholder={this.state.buildingName} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleBuildingName}>
                                            <option>select</option>
                                            {this.state.BuildingNames.map(name => (
                                                <option
                                                    key={name}
                                                    value={name.buildingId}
                                                >
                                                    {name.buildingName}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <div  style={{ fontSize: 16, color: "red" ,marginLeft:'50px'}}>
                                        {this.state.bnameError}
                                    </div>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        Rooom Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder={"Enter the room name"} onChange={this.handleRoomName}  value={this.state.roomName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                                    </Col>
                                    <div  style={{ fontSize: 16, color: "red" ,marginLeft:'50px'}}>
                                        {this.state.rnameError}
                                    </div>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        Rooom Capacity
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder={"Number of students can be allocated"} onChange={this.handleCapacity}  value={this.state.capacity} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                                    </Col>
                                    <div  style={{ fontSize: 16, color: "red" ,marginLeft:'50px'}}>
                                        {this.state.capacityError}
                                    </div>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        Room Type
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="select" placeholder={"Select Room Type"} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleType}>
                                            <option>Select Type</option>
                                            <option>Labotary</option>
                                            <option>Lecture hall</option>

                                        </Form.Control>

                                    </Col>
                                    <div  style={{ fontSize: 16, color: "red" ,marginLeft:'50px'}}>
                                        {this.state.typeError1}
                                    </div>
                                </Form.Group>
                                <Button lg type="button" variant="light" onClick={this.handleSubmit} style={{marginLeft: '40%', marginRight: '30px',  backgroundColor: '#888844',fontcolor:"white" }}>
                                    ADD ROOM
                                </Button>
                            </div>
                        </Form>

                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>



        )
    }
}

