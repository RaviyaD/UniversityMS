import React from "react";
import * as firebase from "firebase";
import Semester from "../../../Class/Students/Semester";
import {Button, Form, FormGroup} from "react-bootstrap";

class updateSemester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            no: this.props.no,
            key:this.props.key,
            time_period: this.props.time
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateSemester = this.updateSemester.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    updateSemester(event) {
        event.preventDefault();
        let sem = new Semester();
        sem.no = this.state.semNo;
        sem.time_period = this.state.time_period;
        sem.semCode = "S" + this.state.semNo;
        firebase.database().ref("Student/" + this.state.year + "/semesters/")
            .child(this.state.key)
            .update({
                'no':sem.no,'time_period':sem.time_period,'semCode':sem.semCode
            })
        this.setState({
            semNo: null,
            time_period: null
        })
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.addSemester}>
                    <FormGroup>
                        <Form.Label>Semester No</Form.Label>
                        <Form.Control type="text" name="semNo" onChange={this.changeHandler}
                                      value={this.state.no}
                                      required/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Months</Form.Label>
                        <Form.Control type="number" name="time_period" onChange={this.changeHandler}
                                      value={this.state.time_period}
                                      required/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Update Semester</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default updateSemester;