import React from "react";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddSubGroups from "./AddSubGroups";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateSubGroup from "../SubGroup/UpdateSubGroup";
import {Col, Row, Table} from "react-bootstrap";
import "../common.css"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CallMadeIcon from "@material-ui/icons/CallMade";


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
            keyCollection: props.location.state.key,
            update: false,
            key: null,
            no: null,
            reference: null
        }
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/"
            + this.state.pro + "/Groups/" + parseInt(this.state.keyCollection) + "/subGroups")
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

    deleteSubGroup(no, ref) {
        firebase.database().ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups/" +
            parseInt(this.state.keyCollection) + "/subGroups/" + parseInt(no)).remove(() => {
            console.log("Deleted");
        })
        firebase.database()
            .ref("SubGroupIDs/" + ref).remove(() => {
        })
    }

    updateComponent(key, no, ref) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            no: no,
            reference: ref
        })
    }

    generatedID(key) {
        let ID = "Y" + this.state.year.toString() + "." + this.state.semester + "." + this.state.pro + "." + this.state.group + "." + key
        return ID;
    }

    render() {
        return (
            <div>
                <h4 className="topic">Year- {this.state.year} Semester- {this.state.semester} Programme- {this.state.pro} Group- {this.state.group} SubGroup
                    List
                    <IconButton onClick={() => {
                        this.props.history.goBack()
                    }}>
                        <ArrowBackIosIcon fontSize="inherit" size="small"/>
                    </IconButton>
                </h4>
                <hr/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th> Sub - Group no</th>
                        <th> Generated ID</th>
                        <th></th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((item, key) => {
                            return (
                                <tr>
                                    <td>
                                        <td>
                                            {item.val().no}
                                            <CallMadeIcon fontSize="small"/>
                                        </td>

                                    </td>
                                    <td>
                                        {this.generatedID(item.val().no)}
                                    </td>
                                    <td>
                                        <IconButton
                                            onClick={() => this.updateComponent(item.key, item.val().no, item.val().ref)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton onClick={() => this.deleteSubGroup(item.key, item.val().ref)}>
                                            <DeleteIcon
                                                fontSize="small"/></IconButton>

                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                {this.state.update ? <UpdateSubGroup id={this.state.key}
                                                     idG={this.state.id}
                                                     year={this.state.year}
                                                     semester={this.state.semester}
                                                     pro={this.state.pro}
                                                     group={this.state.group}
                                                     noU={this.state.no}
                                                     keyCollection={this.state.keyCollection}
                                                     reference={this.state.reference}
                                                     updateCom={this.updateComponent}/> : null}
                <hr/>
                Add new Sub Group:
                <AddSubGroups year={this.state.year} semester={this.state.semester}
                              pro={this.state.pro}
                              keyCollection={this.state.keyCollection}
                              group={this.state.group}
                              id={this.state.id}
                />
            </div>
        )
    }
}

export default SubGroups;
