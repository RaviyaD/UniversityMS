import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'
import swal from 'sweetalert';

class Lecturer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            empID: '',
            faculty: 'Faculty of Computing',
            department: '',
            center: 'Malabe',
            building: 'Main Building',
            level: 'Professor',
            rank: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleempID = this.handleempID.bind(this);
        this.handlefaculty = this.handlefaculty.bind(this);
        this.handledepartment = this.handledepartment.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleCenter = this.handleCenter.bind(this);
        this.handleBuilding = this.handleBuilding.bind(this);
    }

    handleName(event) {
        this.setState({
            Name: event.target.value
        });
    }

    handleempID(event) {
        this.setState({
            empID: event.target.value,
            rank: '1.' + event.target.value
        });
    }

    handlefaculty(event) {
        this.setState({
            faculty: event.target.value
        });
    }

    handledepartment(event) {
        this.setState({
            department: event.target.value
        });
    }

    handleCenter(event) {
        this.setState({
            center: event.target.value
        });
    }

    handleLevel(event) {
        let v;
        if (event.target.value === 'Professor') {
            v = 1
        } else if (event.target.value === 'Assistant Professor') {
            v = 2
        } else if (event.target.value === 'Senior Lecturer(HG)') {
            v = 3
        } else if (event.target.value === 'Senior Lecturer') {
            v = 4
        } else if (event.target.value === 'Lecturer') {
            v = 5
        } else if (event.target.value === 'Assistant Lecturer') {
            v = 6
        } else if (event.target.value === 'Instructor') {
            v = 7
        }
        this.setState({
            level: event.target.value,
            rank: v + '.' + this.state.empID
        });
    }

    handleBuilding(event) {
        this.setState({
            building: event.target.value
        });
    }

    handleSubmit() {
        if (this.state.empID.length === 6) {
            firebase.database().ref('lecturers/' + this.state.empID).set({
                Name : this.state.Name,
                EmpID: this.state.empID,
                Faculty: this.state.faculty,
                Department: this.state.department,
                Center: this.state.center,
                Building: this.state.building,
                Level: this.state.level,
                rank: this.state.rank

            }, ()=>{
                this.setState({
                    faculty: 'Faculty of Computing',
                    center: 'Malabe',
                    building: 'Main Building',
                    level: 'Professor',
                    rank: '',
                    Name:'',
                    empID:'',
                    department: '',
                });
                swal("OK!!", "Lecturer Added!", "success").then(() => null);

            })
        }else{
            swal("EMPLOYEE ID!!", "Must have 6 values!!", "warning").then(() => null);
        }
    }

    render() {
        return (
            <div style={{marginLeft: '30px', marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                <h3 style={{ margin: '70px', color: '#888844' }} >Add Lecturer</h3>
                <Form>
                    <div className="form-group">
                        <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                              <b>Name</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.Name} onChange={this.handleName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmpID" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Employee ID</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.empID} onChange={this.handleempID} style={{ marginLeft: '30px', marginRight: '30px' }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextFaculty" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                               <b> Faculty</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" value={this.state.faculty} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handlefaculty}>
                                    <option>Faculty of Computing</option>
                                    <option>Faculty of Engineering</option>
                                    <option>Faculty of Business</option>
                                    <option>Faculty of Humanities and Security</option>
                                    <option>School of Architecture</option>
                                    <option>Faculty of Graduate Studies and Research</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextDepartment" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Department</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.department} onChange={this.handledepartment} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCenter" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Center</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" value={this.state.center} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleCenter}>
                                    <option>Malabe</option>
                                    <option>Metro</option>
                                    <option>Matara</option>
                                    <option>Kandy</option>
                                    <option>Kurunagala</option>
                                    <option>Jaffna</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextBuilding" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Building</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" value={this.state.building} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleBuilding}>
                                    <option>Main Building</option>
                                    <option>D-block</option>
                                    <option>New Building</option>
                                    <option>Engineering Building</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextLevel" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Level</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" value={this.state.level} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleLevel}>
                                    <option>Professor</option>
                                    <option>Assistant Professor</option>
                                    <option>Senior Lecturer(HG)</option>
                                    <option>Senior Lecturer</option>
                                    <option>Lecturer</option>
                                    <option>Assistant Lecturer</option>
                                    <option>Instructor</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextRank" style={{ marginLeft: '30px', marginRight: '30px' }}>
                            <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                <b>Rank</b>
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder={this.state.rank} onChange={this.handleRank} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844' }}>
                                ADD LECTURER
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
export default Lecturer
