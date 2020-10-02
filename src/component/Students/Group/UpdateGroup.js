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
            no: this.props.noU,
            reference: this.props.reference
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
            'no': group.no
        })

        firebase.database().ref('GroupIDs/')
            .child(this.state.reference).update({
            ID: group.ID
        })


        firebase.database().ref().child('SubGroupIDs').orderByChild('ID')
            .startAt('Y' + this.state.year + ".S" + this.state.semester + "." + this.state.pro + "." + this.props.noU)
            .on('value', (snapshot) => {
                snapshot.forEach(function (data) {
                    let startPart = data.val().ID.substring(0, 9)
                    let endPart = data.val().ID.substring(11, 13)
                    data.ref.update({
                        ID: startPart +group.no+endPart
                    })
                })
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
            <div className="updateWidth container">
                <h4>Update group</h4>
                <Form onSubmit={this.updateGroup}>
                    <FormGroup>
                        <Form.Label>Group No</Form.Label>
                        <Form.Control type="number" name="no" onChange={this.changeHandler}
                                      value={this.state.no} required/>
                    </FormGroup>
                    <Button type="submit" variant="dark">Update Group</Button>
                </Form>
            </div>

        )
    }
}

export default UpdateGroup;
