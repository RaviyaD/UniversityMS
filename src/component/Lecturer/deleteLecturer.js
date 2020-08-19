import React, {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as firebase from "firebase";

class DeleteLecturer extends Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            empID:'',
            faculty:'',
            list:''
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEmpID = this.handleEmpID.bind(this);
    }

    handleEmpID(event){
        this.setState({
            empID: event.target.value
        }, ()=>{
            firebase.database().ref('lecturers').on('value', snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach(lectSnapshot => {
                            if(lectSnapshot.val().EmpID === this.state.empID){
                                this.setState({
                                    name: lectSnapshot.val().Name,
                                    faculty: lectSnapshot.val().Faculty
                                })
                            }

                        }
                    )
                }
            })
        })

    }

    handleDelete(){
        firebase.database().ref('lecturers/' + this.state.empID).remove(()=>{
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
                                Enter Lecturer Employee ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.empID} onChange={this.handleEmpID} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Lecturer Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.name} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                Faculty
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.faculty} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleDelete} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                DELETE LECTURER
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        );
    }
}
export default DeleteLecturer
