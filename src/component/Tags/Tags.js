import React from "react";
import * as firebase from "firebase";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddTags from "./AddTags";
import UpdateTag from "./UpdateTag";
import {Col, Row} from "react-bootstrap";

class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            update: false,
            list: []
        }
        this.deleteTag = this.deleteTag.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database().ref('Tag').on("value", snapshot => {
            this.setState({
                list: []
            })

            snapshot.forEach(Tag => {
                this.setState(state => ({
                    list: [...state.list, Tag]
                }))
            })
        })
    }

    deleteTag(key) {
        console.log(key)
        firebase.database().ref('Tag/' + key).remove(() => {
            console.log("Deleted");
        })
    }

    updateComponent(key, name, description) {
        let switchU = !this.state.update;
        console.log(switchU)
        this.setState({
            update: switchU,
            key: key,
            name: name,
            description: description
        })
    }

    render() {
        return (
            <div>
                <h4>Tags</h4>
                {
                    this.state.list.map((item, key) => {
                        return (
                            <Row md={4}>
                                <Col>
                                    <strong>Name:</strong> {item.val().name}
                                </Col>
                                <Col>
                                    <strong>Code:</strong> {item.val().description}
                                </Col>
                                <Col>
                                    <IconButton
                                        onClick={() => this.updateComponent(item.key, item.val().name, item.val().description)}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>

                                    <IconButton onClick={() => this.deleteTag(item.key)}>
                                        <DeleteIcon fontSize="small"/></IconButton>
                                </Col>
                            </Row>
                        )
                    })
                }
                {this.state.update ? <UpdateTag id={this.state.key}
                                                name={this.state.name}
                                                description={this.state.description}
                                                updateCom={this.updateComponent}/> : null}
                <hr/>
                <h6>Add new Tag</h6>
                <AddTags/>
            </div>
        )
    }
}

export default Tags;