import React from "react";
import Year from "../../../Class/Students/Year";
import * as firebase from "firebase";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
            note: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addYear = this.addYear.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        console.log(event.target.value)
    }

    addYear(event) {
        event.preventDefault();
        let year = new Year();
        year.no = this.state.year;
        year.yearCode = "Y" + this.state.year;
        year.Note = this.state.note;
        firebase.database().ref("Student/" + this.state.year).set(
            year
        )
        this.setState({
            year: "",
            note: ""
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addYear}>
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
                                      value={this.state.note} />
                    </FormGroup>
                    <Button variant="primary" type="submit">Add Year</Button>
                </Form>
            </div>
        );
    }
}

export default AddYear;