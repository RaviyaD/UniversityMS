import React from "react";
import * as firebase from "firebase";
import {Button, Form, FormGroup} from "react-bootstrap";

class AddTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addTag = this.addTag.bind(this);
    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        console.log(event.target.value)
    }

    addTag(event) {
        event.preventDefault();
        firebase.database().ref("Tag/").push({
                name: this.state.name,
                description: this.state.description
            }
        )
        this.setState({
            name: "",
            description: ""
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addTag}>
                    <FormGroup>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name"
                                      onChange={this.changeHandler}
                                      value={this.state.name} required/>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description"
                                      onChange={this.changeHandler}
                                      value={this.state.note}/>
                    </FormGroup>


                    <Button type="submit">Add Tag</Button>
                </Form>

            </div>
        );
    }
}

export default AddTags;