import React from "react";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddSubGroups from "./AddSubGroups";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateSubGroup from "../Group/UpdateGroup";
import {Col, Row} from "react-bootstrap";

class SubGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            year: props.location.state.year,
            semester: props.location.state.semester,
            pro: props.location.state.pro,
            group: props.location.state.group,
            id: props.location.state.id,
            update: false,
            key: null,
            no: null,
        }
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/"
            + this.state.pro + "/Groups/" + parseInt(this.state.group) + "/subGroups")
            .on("value", snapshot => {
                this.setState({
                    list: []
                })

                snapshot.forEach(groups => {
                    this.setState(state => ({
                        list: [...state.list, groups]
                    }))
                })
            })
    }

    deleteSubGroup(no) {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups/" +
            parseInt(this.state.group) + "/subGroups/" + parseInt(no)).remove(() => {
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
                <h4>Year- {this.state.year} Semester- {this.state.semester} Programme- {this.state.pro} Group- {this.state.group} SubGroup
                    List</h4>
                <hr/>
                {
                    this.state.list.map((item, key) => {
                        return (
                            <Row>
                                <Col>
                                    <Link>
                                        <Row>
                                            <Col>
                                                <strong>Sub - Group no:</strong> {item.val().no}

                                            </Col>
                                            <Col>
                                                <strong> Generated ID:</strong> {item.val().ID}

                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                                <Col>
                                    <IconButton onClick={() => this.updateComponent(item.key, item.val().no)}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton onClick={() => this.deleteSubGroup(item.val().no)}> <DeleteIcon
                                        fontSize="small"/></IconButton>

                                </Col>
                            </Row>
                        )
                    })
                }
                {this.state.update ? <UpdateSubGroup id={this.state.key}
                                                     idG={this.state.id}
                                                     year={this.state.year}
                                                     semester={this.state.semester}
                                                     pro={this.state.pro}
                                                     group={this.state.group}
                                                     noU={this.state.no}
                                                     updateCom={this.updateComponent}/> : null}
                <hr/>
                Add new Sub Group:
                <AddSubGroups year={this.state.year} semester={this.state.semester}
                              pro={this.state.pro} group={this.state.group}
                              id={this.state.id}
                />
            </div>
        )
    }
}

export default SubGroups;