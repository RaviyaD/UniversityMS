import React from "react";
import Year from "../../../Class/Students/Year";
import * as firebase from "firebase";
import Semester from "../../../Class/Students/Semester";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddSemester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            list: this.props.list,
            semNo: null,
            time_period: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addSemester = this.addSemester.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    addSemester(event) {
        event.preventDefault();
        let sem = new Semester();
        sem.no = this.state.semNo;
        sem.time_period = this.state.time_period;
        sem.semCode = "S" + this.state.semNo;
        firebase.database().ref("Student/" + this.state.year + "/semesters/" + sem.no + "/").set(
            sem
        )
        this.setState({
            semNo: "",
            time_period: ""
        })
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.addSemester}>
                    <FormGroup>
                        <Form.Label>Semester No</Form.Label>
                        <Form.Control type="text" name="semNo"
                                      onChange={this.changeHandler}
                                      value={this.state.semNo}
                                      required/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Months</Form.Label>
                        <Form.Control type="number" name="time_period"
                                      onChange={this.changeHandler}
                                      value={this.state.time_period}
                                      required/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Add Semester</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default AddSemester;