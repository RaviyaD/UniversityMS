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
            key: this.props.id,
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
        sem.no = this.state.no;

        sem.time_period = this.state.time_period;
        sem.semCode = "S" + this.state.no;
        firebase.database().ref("Student/" + this.state.year + "/semesters/")
            .child(this.state.key)
            .update({
                'no': sem.no, 'time_period': sem.time_period, 'semCode': sem.semCode
            })

        firebase.database().ref().child('GroupIDs').orderByChild('ID').startAt('Y' + this.state.year + ".S" + this.props.no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                let startPart = data.val().ID.substring(0, 3)
                let endPart = data.val().ID.substring(5, 11)
                data.ref.update({
                    ID: startPart + "S" + sem.no + endPart
                })
            })
        })
        firebase.database().ref().child('SubGroupIDs').orderByChild('ID').startAt('Y' + this.state.year + ".S" + this.props.no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                let startPart = data.val().ID.substring(0, 3)
                let endPart = data.val().ID.substring(5, 13)
                data.ref.update({
                    ID: startPart + "S" + sem.no + endPart
                })
            })
        })

        this.setState({
            no: null,
            time_period: null
        })
        this.props.updateCom('', '', '');
    }


    render() {
        return (
            <div className="updateWidth container">
                <h4>Update semester</h4>
                <Form onSubmit={this.updateSemester}>
                    <FormGroup>
                        <Form.Label>Semester No</Form.Label>
                        <Form.Control type="text" name="no" onChange={this.changeHandler}
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
                        <Button type="submit" variant="dark">Update Semester</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default updateSemester;
