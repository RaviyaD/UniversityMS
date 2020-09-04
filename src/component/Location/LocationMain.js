import React from "react";import {Nav, Card} from "react-bootstrap";import 'bootstrap/dist/css/bootstrap.css';import LocationDetails from "./LocationDetails";import BuildingInformation from "./Building/BuildingInformation";import RoomInformation from "./Room/RoomInformation";import AddRoom from "./Room/AddRoom";import AddBuilding from "./Building/AddBuilding";export default class LocationMain extends React.Component{    constructor(props) {        super(props);        this.state={            viewLocationDetails:false,            viewBuildingDetails:false,            viewRoomDetails:false,            AddRoomDetails:false,            AddBuilding:false        };        this.handleViewLocation = this.handleViewLocation.bind(this);        this.handleViewBuilding = this.handleViewBuilding.bind(this);        this.handleViewRoom = this.handleViewRoom.bind(this);        this.handleAddRoom = this.handleAddRoom.bind(this);        this.handleAddBuilding = this.handleAddBuilding.bind(this);    }    handleViewLocation(){        this.setState({            viewLocationDetails:true,            viewBuildingDetails:false,            viewRoomDetails:false,            AddRoomDetails:false,            AddBuilding:false        })    }    handleAddBuilding(){        this.setState({            viewLocationDetails:false,            viewBuildingDetails:false,            viewRoomDetails:false,            AddRoomDetails:false,            AddBuilding:true        })    }    handleViewBuilding(){        this.setState({            viewLocationDetails:false,            viewBuildingDetails:true,            viewRoomDetails:false,            AddRoomDetails:false,            AddBuilding:false        })    }    handleViewRoom(){        this.setState({            viewLocationDetails:false,            viewBuildingDetails:false,            viewRoomDetails:true,            AddRoomDetails:false,            AddBuilding:false        })    }    handleAddRoom(){        this.setState({            viewLocationDetails:false,            viewBuildingDetails:false,            viewRoomDetails:false,            AddRoomDetails:true,            AddBuilding:false        })    }    render() {        return(            <div style={{marginTop:'40px'}}>                <Card>                    <Card.Header>                        <Nav variant="tabs" defaultActiveKey="#first">                            <Nav.Item>                                <Nav.Link onClick={this.handleViewLocation}>Location Details</Nav.Link>                            </Nav.Item>                            <Nav.Item>                                <Nav.Link onClick={this.handleViewBuilding}>Building Details</Nav.Link>                            </Nav.Item>                            <Nav.Item>                                <Nav.Link onClick={this.handleAddBuilding}>Add Building</Nav.Link>                            </Nav.Item>                            <Nav.Item>                                <Nav.Link onClick={this.handleViewRoom}>Room Details</Nav.Link>                            </Nav.Item>                            <Nav.Item>                                <Nav.Link onClick={this.handleAddRoom}>Add Room</Nav.Link>                            </Nav.Item>                        </Nav>                    </Card.Header>                    <Card.Body>                        <Card.Title>Location</Card.Title>                        <Card.Text>                            {this.state.viewLocationDetails ? <LocationDetails/> : null}                            {this.state.viewBuildingDetails ? <BuildingInformation/> : null}                            {this.state.AddBuilding ? <AddBuilding/> : null}                            {this.state.AddRoomDetails ? <AddRoom/> : null}                            {this.state.viewRoomDetails ? <RoomInformation/> : null}                        </Card.Text>                    </Card.Body>                </Card>            </div>        );    }}