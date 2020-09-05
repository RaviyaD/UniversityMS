import React from "react";
import {Nav, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import StudentStatistics from "./StudentStatistics";
import SubjectStatistics from "./SubjectStatistics";
import LecturerStatistics from "./LecturerStatistics";




export default class StatisticsMain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            viewLecture:true,
            viewSubject:false,
            viewStudent:false,

        };
        this.handleViewLecture = this.handleViewLecture.bind(this);
        this.handleViewSubject = this.handleViewSubject.bind(this);
        this.handleViewStudent = this.handleViewStudent.bind(this);

    }
    handleViewLecture(){
        this.setState({
            viewLecture:true,
            viewSubject:false,
            viewStudent:false,
        })
    }
    handleViewStudent(){
        this.setState({
            viewLecture:false,
            viewSubject:false,
            viewStudent:true,
        })
    }
    handleViewSubject(){
        this.setState({
            viewLecture:false,
            viewSubject:true,
            viewStudent:false,
        })
    }

    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewLecture}>LECTURE STATISTICS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewStudent}>STUDENT STATISTICS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewSubject}>SUBJECT STATISTICS</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Statistics</Card.Title>
                        <Card.Text>
                            {this.state.viewLecture ? <LecturerStatistics/> : null}
                            {this.state.viewSubject? <SubjectStatistics/> : null}
                            {this.state.viewStudent ? <StudentStatistics/> : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
