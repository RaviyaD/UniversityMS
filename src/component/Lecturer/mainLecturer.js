import React from "react";
import {Nav, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import ViewLecturer from "./viewLecturer";
import Lecturer from "./lecturer";
import Updatelecturer from "./updatelecturer";
import DeleteLecturer from "./deleteLecturer";

class MainLecturer extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            viewLec:true,
            addLec:false,
            updateLec:false,
            deleteLec:false
        };
        this.handleAddLecturer = this.handleAddLecturer.bind(this);
        this.handleViewLecturer = this.handleViewLecturer.bind(this);
        this.handleUpdateLecturer = this.handleUpdateLecturer.bind(this);
        this.handleDeleteLecturer = this.handleDeleteLecturer.bind(this);
    }
    handleViewLecturer(){
        this.setState({
            addLec: false,
            updateLec: false,
            deleteLec: false,
            viewLec: true
        })
    }
    handleAddLecturer(){
        this.setState({
            addLec: true,
            updateLec: false,
            deleteLec: false,
            viewLec: false
        })
    }
    handleUpdateLecturer(){
        this.setState({
            addLec: false,
            updateLec: true,
            deleteLec: false,
            viewLec: false
        })
    }
    handleDeleteLecturer(){
        this.setState({
            addLec: false,
            updateLec: false,
            deleteLec: true,
            viewLec: false
        })
    }
    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewLecturer}>VIEW LECTURERS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddLecturer}>ADD LECTURER</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleUpdateLecturer}>UPDATE LECTURER</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleDeleteLecturer}>DELETE LECTURER</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>LECTURERS</Card.Title>
                        <Card.Text>
                            {this.state.viewLec ? <ViewLecturer/> : null}
                            {this.state.addLec ? <Lecturer/> : null}
                            {this.state.updateLec ? <Updatelecturer/> : null}
                            {this.state.deleteLec ? <DeleteLecturer/> : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default MainLecturer
