import React from "react";
import {Nav, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import ViewSubject from "./viewSubject";
import Subject from "./subject";
import UpdateSubject from "./updateSubject";
import DeleteSubject from "./deleteSubject";

class MainSubject extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            viewSub:false,
            addSub:false,
            updateSub:false,
            deleteSub:false
        };
        this.handleAddSubject = this.handleAddSubject.bind(this);
        this.handleViewSubject = this.handleViewSubject.bind(this);
        this.handleUpdateSubject = this.handleUpdateSubject.bind(this);
        this.handleDeleteSubject = this.handleDeleteSubject.bind(this);
    }
    handleViewSubject(){
        this.setState({
            addSub: false,
            updateSub: false,
            deleteSub: false,
            viewSub: true
        })
    }
    handleAddSubject(){
        this.setState({
            addSub: true,
            updateSub: false,
            deleteSub: false,
            viewSub: false
        })
    }
    handleUpdateSubject(){
        this.setState({
            addSub: false,
            updateSub: true,
            deleteSub: false,
            viewSub: false
        })
    }
    handleDeleteSubject(){
        this.setState({
            addSub: false,
            updateSub: false,
            deleteSub: true,
            viewSub: false
        })
    }
    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewSubject}>VIEW SUBJECTS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddSubject}>ADD SUBJECT</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleUpdateSubject}>UPDATE SUBJECT</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleDeleteSubject}>DELETE SUBJECT</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Subjects</Card.Title>
                        <Card.Text>
                            {this.state.viewSub ? <ViewSubject/> : null}
                            {this.state.addSub ? <Subject/> : null}
                            {this.state.updateSub ? <UpdateSubject/> : null}
                            {this.state.deleteSub ? <DeleteSubject/> : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default MainSubject
