import React, {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as firebase from "firebase";
import swal from "sweetalert";

class DeleteSubject extends Component{
    constructor(props) {
        super(props);
        this.state={
            year: '',
            semester: '',
            name: '',
            code: '',
            list:''
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleCode = this.handleCode.bind(this);
    }

    handleCode(event){
        this.setState({
            code: event.target.value
        }, ()=>{
            firebase.database().ref('subjects').on('value', snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach(lectSnapshot => {
                            if(lectSnapshot.val().Code === this.state.code){
                                this.setState({
                                    name: lectSnapshot.val().Name,
                                    semester: lectSnapshot.val().Semester,
                                    year: lectSnapshot.val().Year
                                })
                            }

                        }
                    )
                }
            })
        })

    }

    handleDelete(){
        firebase.database().ref('subjects/' + this.state.code).remove(()=>{
            console.log("Deleted");
            swal("OK!!", "Subject Deleted!", "success").then(() => null);
            this.setState({
                year: '',
                semester: '',
                name: '',
                code: ''
            })
        })
    }

    render() {
        return (
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                        <h3 style={{ margin: '50px', color: '#888844' }} >Delete Subject</h3>
                <Form>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Enter Subject code</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.code} onChange={this.handleCode} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Subject Name</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.name} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Year</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.year} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Semester</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.semester} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleDelete} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                DELETE SUBJECT
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>
        );
    }
}
export default DeleteSubject
