import React from "react";
import Programme from "../../../Class/Students/Programme";
import * as firebase from "firebase";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

class AddProgramme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            semester: this.props.semester,
            name: null,
            code: null,
            description: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addProgramme = this.addProgramme.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    addProgramme(event) {
        event.preventDefault();
        let pr = new Programme();
        pr.name = this.state.name;
        pr.description = this.state.description;
        firebase.database()
            .ref("Student/" + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.code).set(
            pr
        )
        this.setState({
            name: "",
            code: "",
            description: ""
        })
    }

    render() {
        return (
            <Form onSubmit={this.addProgramme}>
                <FormGroup>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name"
                                  onChange={this.changeHandler}
                                  value={this.state.name}
                                  required/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Code Form</Form.Label>
                    <Form.Control type="text" name="code"
                                  onChange={this.changeHandler}
                                  value={this.state.code}
                                  required/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description"
                                  onChange={this.changeHandler}
                                  value={this.state.description}/>
                </FormGroup>
                <Button type="submit">Add Programme</Button>
            </Form>

        )
    }
}

export default AddProgramme;