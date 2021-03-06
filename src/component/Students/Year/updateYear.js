import React from "react";
import Year from "../../../Class/Students/Year";
import * as firebase from "firebase";
import {Form, FormGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";

class UpdateYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.id,
            year: this.props.noU,
            note: this.props.noteU
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateYear = this.updateYear.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    updateYear(event) {
        event.preventDefault();
        let year = new Year();
        year.no = this.state.year;
        year.yearCode = "Y" + this.state.year;
        year.Note = this.state.note;

        firebase.database().ref("Student/").child(this.state.key).update({
            'Note': this.state.note, 'no': this.state.year, 'yearCode': "Y" + this.state.year
        })
        firebase.database().ref().child('GroupIDs').orderByChild('ID').startAt('Y'+this.props.noU).on('value',(snapshot)=> {
            snapshot.forEach(function (data) {
                let endPart = data.val().ID.substring(2,11)
                data.ref.update({
                    ID : "Y"+year.no+endPart
                })
            })
        })
        firebase.database().ref().child('SubGroupIDs').orderByChild('ID').startAt('Y'+this.props.noU).on('value',(snapshot)=> {
            snapshot.forEach(function (data) {
                let endPart = data.val().ID.substring(2,13)
                data.ref.update({
                    ID : "Y"+year.no+endPart
                })
            })
        })
        this.setState({
            year: "",
            note: ""
        })
        this.props.updateCom('', '', '');
    }

    render() {
        return (
            <div className="updateWidth container">
                <h4>Update year</h4>
                <Form onSubmit={this.updateYear}>
                    <FormGroup>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" name="year"
                                      onChange={this.changeHandler}
                                      value={this.state.year} required/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Note</Form.Label>
                        <Form.Control type="text" name="note"
                                      onChange={this.changeHandler}
                                      value={this.state.note}/>
                    </FormGroup>
                    <Button type="submit" variant="dark">Update year</Button>
                </Form>
            </div>
        );
    }
}

export default UpdateYear;
