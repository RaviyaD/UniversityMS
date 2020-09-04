import React from "react";
import AddYear from "../Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddProgramme from "./AddProgramme";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateYear from "../Year/updateYear";
import UpdateProgramme from "./UpdateProgramme";
import {Col, Row} from "react-bootstrap";

class Programme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            year: props.location.state.year,
            semester: props.location.state.semester,
            update: false,
            key: null,
            description: null,
            name: null
        }
        this.updateComponent = this.updateComponent.bind(this)

    }

    componentDidMount() {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/")
            .on("value", snapshot => {
                this.setState({
                    list: []
                })

                snapshot.forEach(pr => {
                    this.setState(state => ({
                        list: [...state.list, pr]
                    }))
                })
            })
    }

    deleteProgramme(no) {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + no).remove(() => {
            console.log("Deleted");
        })
    }

    updateComponent(key, description, name) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            description: description,
            name: name
        })
    }

    render() {
        return (
            <div>
                <h4>Year {this.state.year} - Semester {this.state.semester} -Programme List</h4>
                <hr/>
                {
                    this.state.list.map((item, key) => {

                        return (
                            <Row>
                                <Col>
                                    <Link to={{
                                        pathname: "/Student/Semester/Programme/Group",
                                        state: {
                                            year: this.state.year,
                                            semester: this.state.semester,
                                            pro: item.key
                                        }
                                    }}>
                                        <Row>
                                            <Col><strong>Name : </strong>{item.val().name}</Col>
                                            <Col><strong>Short code : </strong> {item.key}</Col>
                                            <Col><strong>Description : </strong> {item.val().description}</Col>
                                        </Row>

                                    </Link>
                                </Col>
                                <Col>
                                    <IconButton
                                        onClick={() => this.updateComponent(item.key, item.val().description, item.val().name)}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>

                                    <IconButton onClick={() => this.deleteProgramme(item.key)}> <DeleteIcon
                                        fontSize="small"/></IconButton>

                                </Col>

                            </Row>
                        )
                    })
                }
                {this.state.update ? <UpdateProgramme id={this.state.key}
                                                      year={this.state.year}
                                                      semester={this.state.semester}
                                                      desU={this.state.description}
                                                      nameU={this.state.name}
                                                      updateCom={this.updateComponent}/> : null}
                <hr/>
                <AddProgramme year={this.state.year} semester={this.state.semester}/>
            </div>
        )
    }
}

export default Programme;