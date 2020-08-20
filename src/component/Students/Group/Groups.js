import React from "react";
import AddYear from "../Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddGroup from "./AddGroup";
import AddProgramme from "../Programme/AddProgramme";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateProgramme from "../Programme/UpdateProgramme";
import UpdateGroup from "./UpdateGroup";
import {Col, Row} from "react-bootstrap";

class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            year: props.location.state.year,
            semester: props.location.state.semester,
            pro: props.location.state.pro,
            update: false,
            key: null,
            no: null,
        }
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups")
            .on("value", snapshot => {
                this.setState({
                    list: []
                })
                console.log(snapshot.val())
                snapshot.forEach(groups => {
                    this.setState(state => ({
                        list: [...state.list, groups]
                    }))
                })
            })
    }

    deleteGroup(no) {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups/" + parseInt(no)).remove(() => {
            console.log("Deleted");
        })
    }

    updateComponent(key, no) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            no: no
        })
    }

    render() {
        return (
            <div>
                <h4>Year- {this.state.year} Semester- {this.state.semester} Programme- {this.state.pro} Group List</h4>
                {
                    this.state.list.map((item, key) => {
                        return (
                            <Row>
                                <Col>
                                    <Link to={{
                                        pathname: "/Student/Semester/Programme/Group/SubGroup",
                                        state: {
                                            year: this.state.year,
                                            semester: this.state.semester,
                                            pro: this.state.pro,
                                            group: item.val().no,
                                            id: item.val().ID
                                        }
                                    }}>
                                        <Row>
                                            <Col>
                                                <strong>Group no</strong> {item.val().no}

                                            </Col>
                                            <Col>
                                                <strong>Generated ID</strong>{item.val().ID}

                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                                <Col>
                                    <IconButton onClick={() => this.updateComponent(item.key, item.val().no)}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton onClick={() => this.deleteGroup(item.val().no)}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Col>


                            </Row>
                        )
                    })
                }
                {this.state.update ? <UpdateGroup id={this.state.key}
                                                  year={this.state.year}
                                                  semester={this.state.semester}

                                                  pro={this.state.pro}
                                                  noU={this.state.no}
                                                  updateCom={this.updateComponent}/> : null}
                <hr/>
                Add new Group:
                <AddGroup year={this.state.year} semester={this.state.semester} pro={this.state.pro}/>
            </div>
        )
    }
}

export default Groups;