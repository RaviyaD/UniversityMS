import React from "react";
import Programme from "../../../Class/Students/Programme";
import * as firebase from "firebase";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

class UpdateProgramme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.id,
            year: this.props.year,
            semester: this.props.semester,
            name: this.props.nameU,
            description: this.props.desU
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateProgramme = this.updateProgramme.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    updateProgramme(event) {
        event.preventDefault();
        let pr = new Programme();
        pr.name = this.state.name;
        pr.description = this.state.description;
        firebase.database()
            .ref("Student/" + this.state.year + "/semesters/" + this.state.semester + "/programmes/")
            .child(this.state.key)
            .update({
                'description': pr.description, 'name': this.state.name
            })
        this.props.updateCom('', '', '');
    }

    render() {
        return (
            <Form onSubmit={this.updateProgramme}>
                <FormGroup>
                    <Form.Label>Code Short Form</Form.Label>
                    <Form.Control disabled type="text"
                                  name="code"
                                  onChange={this.changeHandler}
                                  value={this.state.key} required/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Name of Programme</Form.Label>

                    <Form.Control type="text" name="name"
                                  onChange={this.changeHandler}
                                  required value={this.state.name}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description"
                                  onChange={this.changeHandler}
                                  value={this.state.description}/>
                </FormGroup>


                <Button type="submit"> Update Programme</Button>
            </Form>

        )
    }
}

export default UpdateProgramme;