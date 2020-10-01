import React from "react";
import {Nav, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import UnavailableRooms from "./UnavailableRooms";
import GroupAllocation from "./GroupAllocation";
import SubjectAllocation from "./SubjectAllocation";
import LecturerAllocation from "./LecturerAllocation";
import AddSession from "./AddSession";




export default class RoomAllocationMain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            addSession:true,
            addLecturer:false,
            addSubject:false,
            addGroup:false,
            addUnavailability:false
        };
        this.handleAddSession = this.handleAddSession.bind(this);
        this.handleAddLecturer = this.handleAddLecturer.bind(this);
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleAddUnavailability = this.handleAddUnavailability.bind(this);

    }
    handleAddSession(){
        this.setState({
            addSession:true,
            addLecturer:false,
            addSubject:false,
            addGroup:false,
            addUnavailability:false
        })
    }
    handleAddLecturer(){
        this.setState({
            addSession:false,
            addLecturer:true,
            addSubject:false,
            addGroup:false,
            addUnavailability:false

        })
    }
    handleAddSubject(){
        this.setState({
            addSession:false,
            addLecturer:false,
            addSubject:true,
            addGroup:false,
            addUnavailability:false
        })
    }
    handleAddGroup(){
        this.setState({
            addSession:false,
            addLecturer:false,
            addSubject:false,
            addGroup:true,
            addUnavailability:false
        })
    }
    handleAddUnavailability(){
        this.setState({
            addSession:false,
            addLecturer:false,
            addSubject:false,
            addGroup:false,
            addUnavailability:true
        })
    }



    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddSession}>Session Allocation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddLecturer}>Lecturer Allocation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddSubject}>Subject Allocation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddGroup}>Group Allocation</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddUnavailability}>Add Room Unavailability</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Location</Card.Title>
                        <Card.Text>
                            {this.state.addSession ? <AddSession/> : null}
                            {this.state.addLecturer ?  <LecturerAllocation/>  : null}
                            {this.state.addSubject ? <SubjectAllocation/>  : null}
                            {this.state.addGroup ?  <GroupAllocation/>  : null}
                            {this.state.addUnavailability ?  <UnavailableRooms/>  : null}

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
