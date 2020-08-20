import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'
import swal from "sweetalert";

class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            name: '',
            code: '',
            lecHrs: '',
            tuteHrs: '',
            labHrs: '',
            evalHrs: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleLecHours = this.handleLecHours.bind(this);
        this.handleTuteHours = this.handleTuteHours.bind(this);
        this.handleLabHours = this.handleLabHours.bind(this);
        this.handleEvalHours = this.handleEvalHours.bind(this);
    }

    handleYear(event) {
        this.setState({
            year: event.target.value
        });
    }

    handleSemester(event) {
        this.setState({
            semester: event.target.value
        });
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleCode(event) {
        this.setState({
            code: event.target.value
        });
    }

    handleLecHours(event) {
        this.setState({
            lecHrs: event.target.value
        });
    }

    handleTuteHours(event) {
        this.setState({
            tuteHrs: event.target.value
        });
    }

    handleLabHours(event) {
        this.setState({
            labHrs: event.target.value
        });
    }

    handleEvalHours(event) {
        this.setState({
            evalHrs: event.target.value
        });
    }

    handleSubmit(){

        firebase.database().ref('subjects/' + this.state.code).set({
            Year : this.state.year,
            Semester: this.state.semester,
            Name: this.state.name,
            Code: this.state.code,
            LectureHours: this.state.lecHrs,
            TuteHours: this.state.tuteHrs,
            LabHours: this.state.labHrs,
            EvaluationHours: this.state.evalHrs

        }, ()=>{
            swal("OK!!", "Subject Added!", "success").then(() => null);
            this.setState({
                year: '',
                semester: '',
                name: '',
                code: '',
                lecHrs: '',
                tuteHrs: '',
                labHrs: '',
                evalHrs: ''
            });
        })
    }

    render() {
        return (
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                <h3 style={{ margin: '50px', color: '#888844' }} >Add Subject</h3>
                <Form>
                    <div className="form-group">
                        <fieldset>
                            <Form.Group as={Row} style={{ marginLeft: '30px', marginRight: '30px' }}>
                                <Row>
                                <Col style={{marginLeft:'40px'}}>
                                    <Row>
                                    <Col sm={6}>
                                <Form.Label style={{fontSize:'20px'}}>
                                    <b>Offered Year</b>
                                </Form.Label>
                                    </Col>
                                <Col sm={6}>
                                    <Row>
                                    <input style={{margin:'10px'}} value={1} type="radio" id="year1" name="year" onChange={this.handleYear}/>
                                    <label>Year 1</label>
                                    </Row>
                                    <Row>
                                    <input style={{margin:'10px'}} value={2} type="radio" id="year2" name="year" onChange={this.handleYear}/>
                                        <label>Year 2</label>
                                    </Row>
                                    <Row>
                                    <input style={{margin:'10px'}} value={3} type="radio" id="year3" name="year" onChange={this.handleYear}/>
                                        <label>Year 3</label>
                                    </Row>
                                    <Row>
                                    <input style={{margin:'10px'}} value={4} type="radio" id="year4" name="year" onChange={this.handleYear}/>
                                        <label>Year 4</label>
                                    </Row>
                                </Col>
                                    </Row>
                                </Col>
                            <Col>
                                <Row>
                                <Col sm={6}>
                                        <Form.Label style={{fontSize:'20px'}}>
                                            <b>Offered Semester</b>
                                        </Form.Label>
                                    </Col>
                                <Col md={6}>
                                    <Row>
                                        <input style={{margin:'10px'}} value={1} type="radio" id="sem1" name="semester" onChange={this.handleSemester}/>
                                        <label>Semester 1</label>
                                    </Row>
                                    <Row>
                                        <input style={{margin:'10px'}} value={2} type="radio" id="sem2" name="semester" onChange={this.handleSemester}/>
                                        <label>Semester 2</label>
                                    </Row>
                                </Col>
                                </Row>
                            </Col>
                                </Row>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Subject Name</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.name} onChange={this.handleName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCode" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Subject Code</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.code} onChange={this.handleCode} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextlectHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of lecture hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.lecHrs} onChange={this.handleLecHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextTuteHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of tutorial hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.tuteHrs} onChange={this.handleTuteHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextlabHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of lab hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.labHrs} onChange={this.handleLabHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextevalHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of Evaluation hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.evalHrs} onChange={this.handleEvalHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                ADD SUBJECT
                            </Button>
                        </Form.Group>
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
export default Subject
