import React, {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as firebase from "firebase";

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
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Enter Subject code
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.code} onChange={this.handleCode} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Subject Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.name} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Year
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.year} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Semester
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.semester} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleDelete} style={{ marginLeft: '30px', marginRight: '30px', backgroundColor: '#888844' }}>
                                Delete
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        );
    }
}
export default DeleteSubject
