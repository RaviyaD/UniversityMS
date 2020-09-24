import React from "react";
import * as firebase from "firebase";
import SubGroup from "../../../Class/Students/SubGroup";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddSubGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            no: null,
            year: this.props.year,
            semester: this.props.semester,
            pro: this.props.pro,
            group: this.props.group,
            id: this.props.id,
            key:this.props.keyCollection

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
        console.log(event.target.value)
    }

    addGroup(event) {
        event.preventDefault();
        let subG = new SubGroup();
        subG.no = this.state.no;
        subG.ID = this.state.id + "." + this.state.no;
        let sgID = subG.ID.split(".");
        firebase.database().ref("Student/" + this.state.year + "/semesters/" + this.state.semester +
            "/programmes/" + this.state.pro + "/Groups/" + parseInt(this.state.key) + "/subGroups/" + subG.no)
            .set(
                subG
            )
        this.setState({
            no: ""
        })
        firebase.database().ref("SubGroup/" + sgID)
            .set(
                subG
            )
    }

    render() {
        return (
            <Form onSubmit={this.addGroup}>
                <FormGroup>
                    <Form.Label>No</Form.Label>
                    <Form.Control type="number" name="no"
                                  onChange={this.changeHandler}
                                  value={this.state.no} required/>
                </FormGroup>
                <Button type="submit">Add Sub Group</Button>
            </Form>
        )
    }
}

export default AddSubGroups;
