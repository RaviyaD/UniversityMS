import React from "react";
import Group from "../../../Class/Students/Group";
import * as firebase from "firebase";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            semester: this.props.semester,
            pro: this.props.pro,
            no: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addGroup = this.addGroup.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    addGroup(event) {
        event.preventDefault();
        let group = new Group();
        group.no = this.state.no;

        if (group.no < 10)
            group.no = "0" + group.no

        group.ID = this.generateID(group.no);
        firebase.database().ref("Student/" + this.state.year + "/semesters/" + this.state.semester +
            "/programmes/" + this.state.pro + "/Groups/" + this.state.no)
            .set(
                group
            )
        this.setState({
            no: ""
        })
    }

    generateID(no) {
        return "Y" + this.state.year + ".S" + this.state.semester + "." + this.state.pro + "." + no;
    }

    render() {
        return (
            <Form onSubmit={this.addGroup}>
                <FormGroup>
                    <Form.Label>No</Form.Label>
                    <Form.Control type="number" name="no" onChange={this.changeHandler}
                                  value={this.state.no} required/>
                </FormGroup>
                <Button type="submit">Add Group</Button>
            </Form>
        )
    }
}

export default AddGroup;
