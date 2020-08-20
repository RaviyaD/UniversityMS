import React, {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as firebase from "firebase";
import swal from "sweetalert";

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
            swal("OK!!", "Lecturer Deleted!", "success").then(() => null);
            this.setState({
                name: '',
                empID:'',
                faculty:''
            })
        })
    }

    render() {
        return (
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                        <h3 style={{ margin: '50px', color: '#888844' }} >Delete Lecturer</h3>
                <Form>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Enter Lecturer Employee ID</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.empID} onChange={this.handleEmpID} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Lecturer Name</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly type="text" placeholder={this.state.name} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Faculty</b>
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
                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>
        );
    }
}
export default DeleteLecturer
