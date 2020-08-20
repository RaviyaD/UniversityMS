import React from "react";
import {Nav, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import LocationDetails from "./LocationDetails";
import BuildingInformation from "./Building/BuildingInformation";
import RoomInformation from "./Room/RoomInformation";
import AddRoom from "./Room/AddRoom";


export default class LocationMain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            viewLocationDetails:false,
            viewBuildingDetails:false,
            viewRoomDetails:false,
            AddRoomDetails:false
        };
        this.handleViewLocation = this.handleViewLocation.bind(this);
        this.handleViewBuilding = this.handleViewBuilding.bind(this);
        this.handleViewRoom = this.handleViewRoom.bind(this);
        this.handleAddRoom = this.handleAddRoom.bind(this);
    }
    handleViewLocation(){
        this.setState({
            viewLocationDetails:true,
            viewBuildingDetails:false,
            viewRoomDetails:false,
            AddRoomDetails:false
        })
    }
    handleViewBuilding(){
        this.setState({
            viewLocationDetails:false,
            viewBuildingDetails:true,
            viewRoomDetails:false,
            AddRoomDetails:false
        })
    }
    handleViewRoom(){
        this.setState({
            viewLocationDetails:false,
            viewBuildingDetails:false,
            viewRoomDetails:true,
            AddRoomDetails:false
        })
    }
    handleAddRoom(){
        this.setState({
            viewLocationDetails:false,
            viewBuildingDetails:false,
            viewRoomDetails:false,
            AddRoomDetails:true
        })
    }
    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewLocation}>Location Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewBuilding}>Building Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewRoom}>Room Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddRoom}>Add Room</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Location</Card.Title>
                        <Card.Text>
                            {this.state.viewLocationDetails ? <LocationDetails/> : null}
                            {this.state.viewBuildingDetails ? <BuildingInformation/> : null}
                            {this.state.viewRoomDetails ? <RoomInformation/> : null}
                            {this.state.AddRoomDetails ? <AddRoom/> : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}