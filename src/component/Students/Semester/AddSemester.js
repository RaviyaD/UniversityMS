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
            semNo: 1,
            disable: true
        }
        this.addSemester = this.addSemester.bind(this);
    }

    check() {
        if (this.state.list.length >= 2) {
            this.setState({
                disable: true
            })
        } else if (this.state.list.includes(1)) {
            this.setState({
                semNo: 2
            })
        }
    }

    addSemester(event) {
        this.check();
        event.preventDefault();
        let sem = new Semester();
        sem.no = this.state.semNo;
        sem.semCode = "S" + this.state.semNo;
        firebase.database().ref("Student/" + this.state.year + "/semesters/" + sem.no + "/").set(
            sem
        )
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.addSemester}>
                    <FormGroup>
                        <Button type="submit"> Add Semester</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default AddSemester;