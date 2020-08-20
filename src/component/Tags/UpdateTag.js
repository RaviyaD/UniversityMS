import React from "react";
import * as firebase from "firebase";
import {Button, Form, FormGroup} from "react-bootstrap";

class UpdateTag extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key:this.props.id,
            name: this.props.name,
            description:this.props.description
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateTag = this.updateTag.bind(this);
    }

    changeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name] : value
        })
    }

    updateTag(event){

        firebase.database().ref("Tag/").child(this.state.key).update({
            'name':this.state.name, 'description': this.state.description
        })
        this.setState({
            name: "",
            description: ""
        })
        this.props.updateCom('','','');
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.updateTag}>
                    <FormGroup>
                        <Form.Label>Name of the Tag</Form.Label>
                        <Form.Control type="text" name="name"
                                      onChange={this.changeHandler}
                                      value={this.state.name} required/>
                    </FormGroup>
                    <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description"
                           onChange={this.changeHandler}
                           value={this.state.description}/>
                </FormGroup>
                    <Button type="submit">Update Tag</Button>
                </Form>
            </div>
        );
    }
}

export default UpdateTag;