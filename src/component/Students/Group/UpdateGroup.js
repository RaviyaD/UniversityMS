import React from "react";
import Group from "../../../Class/Students/Group";
import * as firebase from "firebase";
import {Button, Form, FormGroup} from "react-bootstrap";

class UpdateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.id,
            year: this.props.year,
            semester: this.props.semester,
            pro: this.props.pro,
            no: this.props.noU
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    updateGroup(event) {
        event.preventDefault();
        let group = new Group();
        group.no = this.state.no;

        if (group.no < 10)
            group.no = "0" + group.no

        group.ID = this.generateID(group.no);

        firebase.database().ref("Student/" + this.state.year + "/semesters/" + this.state.semester +
            "/programmes/" + this.state.pro + "/Groups/").child(this.state.key).update({
            'ID': group.ID, 'no': group.no
        })
        this.setState({
            no: ""
        })
        this.props.updateCom('', '');
    }

    generateID(no) {
        return "Y" + this.state.year + ".S" + this.state.semester + "." + this.state.pro + "." + no;
    }

    render() {
        return (
            <Form onSubmit={this.updateGroup}>
                <FormGroup>
                    <Form.Label>Group No</Form.Label>
                    <Form.Control type="number" name="no" onChange={this.changeHandler}
                                  value={this.state.no} required/>
                </FormGroup>
                <Button type="submit">Update Group</Button>
            </Form>
        )
    }
}

export default UpdateGroup;