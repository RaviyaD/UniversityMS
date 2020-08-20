import React from 'react'
import * as firebase from "firebase";
import {Button, Col, Form, Row} from "react-bootstrap";
import swal from "sweetalert";

class UpdateSubject extends React.Component{
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
            evalHrs: '',
            search:'',
            list:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleLecHours = this.handleLecHours.bind(this);
        this.handleTuteHours = this.handleTuteHours.bind(this);
        this.handleLabHours = this.handleLabHours.bind(this);
        this.handleEvalHours = this.handleEvalHours.bind(this);
    }

    componentDidMount() {
        firebase.database().ref('subjects').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(subSnapshot => {
                    this.state.list.push(subSnapshot.val());
                });
            }
        })
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

        }
        , ()=>{
                swal("OK!!", "Subject Updated!", "success").then(() => null);
                this.setState({
                        year: '',
                        semester: '',
                        name: '',
                        code: '',
                        lecHrs: '',
                        tuteHrs: '',
                        labHrs: '',
                        evalHrs: '',
                        search:'',
                })
        })
    }

    handleSearch(event){
        this.setState({
            search: event.target.value
        }, ()=>{
            this.state.list.map((res , i )=>{
                if(res.Name === this.state.search){
                    this.setState({
                        year: res.Year,
                        semester: res.Semester,
                        name: res.Name,
                        code: res.Code,
                        lecHrs: res.LectureHours,
                        tuteHrs: res.TuteHours,
                        labHrs: res.LabHours,
                        evalHrs: res.EvaluationHours,
                    })
                }else if(res.Code === this.state.search){
                    this.setState({
                        year: res.Year,
                        semester: res.Semester,
                        name: res.Name,
                        code: res.Code,
                        lecHrs: res.LectureHours,
                        tuteHrs: res.TuteHours,
                        labHrs: res.LabHours,
                        evalHrs: res.EvaluationHours,
                    })
                }
            });
        });
    }

    render() {
        return (
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                <h3 style={{ margin: '50px', color: '#888844' }} >Update Subject</h3>
                <Form>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                               <b>SEARCH</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.search} onChange={this.handleSearch} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Year</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.year} onChange={this.handleYear} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Semester</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.semester} onChange={this.handleSemester} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Subject Name</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.name} onChange={this.handleName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCode" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Subject Code</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" value={this.state.code} onChange={this.handleCode} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextlectHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of lecture hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.lecHrs} onChange={this.handleLecHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextTuteHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of tutorial hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.tuteHrs} onChange={this.handleTuteHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextlabHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of lab hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.labHrs} onChange={this.handleLabHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextevalHour" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Number of Evaluation hours</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.evalHrs} onChange={this.handleEvalHours} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                UPDATE SUBJECT
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
export default UpdateSubject
