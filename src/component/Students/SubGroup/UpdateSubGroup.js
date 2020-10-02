import React from "react";
import * as firebase from "firebase";
import SubGroup from "../../../Class/Students/SubGroup";
import {Button, Form, FormGroup} from "react-bootstrap";

class UpdateSubGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.id,
            year: this.props.year,
            semester: this.props.semester,
            pro: this.props.pro,
            group: this.props.group,
            id: this.props.idG,
            no: this.props.noU,
            reference: this.props.reference,
            keyCollection: this.props.keyCollection
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
        console.log(event.target.value)
    }

    updateGroup(event) {
        event.preventDefault();
        let subG = new SubGroup();
        subG.no = this.state.no;
        subG.ID = this.generateID(this.state.no);
        firebase.database().ref("Student/" + this.state.year + "/semesters/" + this.state.semester +
            "/programmes/" + this.state.pro + "/Groups/" + parseInt(this.state.keyCollection) + "/subGroups/").child(this.state.key)
            .update({
                no: subG.no
            })

        firebase.database().ref('SubGroupIDs/')
            .child(this.state.reference).update({
            ID: subG.ID
        })

        this.setState({
            no: ""
        })
        this.props.updateCom('', '');

    }

    generateID(no) {
        return "Y" + this.state.year + ".S" + this.state.semester + "." + this.state.pro + "." + this.state.group + "." + no;
    }

    render() {
        return (
            <div className="updateWidth container">
                <h4>Update sub group</h4>
                <Form onSubmit={this.updateGroup}>
                    <FormGroup>
                        <Form.Label>No</Form.Label>
                        <Form.Control type="number" name="no" onChange={this.changeHandler}
                                      value={this.state.no}/>
                    </FormGroup>
                    <Button type="submit" variant="dark">Update Sub Group</Button>

                </Form>
            </div>
        )
    }
}

export default UpdateSubGroups;
