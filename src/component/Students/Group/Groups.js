import React from "react";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddGroup from "./AddGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateGroup from "./UpdateGroup";
import {Col, Row, Table} from "react-bootstrap";
import '../common.css';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CallMadeIcon from "@material-ui/icons/CallMade";


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
            reference: null
        }
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database()
            .ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups")
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

    deleteGroup(key, ref) {
        firebase.database()
            .ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + this.state.pro + "/Groups/" + parseInt(key)).remove(() => {
        })
        firebase.database()
            .ref("GroupIDs/" + ref).remove(() => {
        })

        firebase.database().ref().child('SubGroupIDs').orderByChild('ID')
            .startAt('Y' + this.state.year + '.S' + this.state.semester + "." + this.state.pro + "." + key)
            .on('value', (snapshot) => {
                snapshot.forEach(function (data) {
                    data.ref.remove();

                })
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
        let ID = "Y" + this.state.year.toString() + "." + this.state.semester + "." + this.state.pro + "." + key
        return ID;
    }

    render() {
        return (
            <div>
                <h4 className="topic">Year- {this.state.year} Semester- {this.state.semester} Programme- {this.state.pro} Group
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
                        <th> Group No</th>
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
                                        <Link className="link" to={{
                                            pathname: "/Student/Semester/Programme/Group/SubGroup",
                                            state: {
                                                year: this.state.year,
                                                semester: this.state.semester,
                                                pro: this.state.pro,
                                                group: item.val().no,
                                                id: item.val().ID,
                                                key: item.key
                                            }
                                        }}>
                                            <td>
                                                {item.val().no}
                                                <CallMadeIcon fontSize="small"/>
                                            </td>
                                        </Link>
                                    </td>
                                    <td>
                                        {this.generatedID(item.val().no)}

                                    </td>
                                    <td>
                                        <IconButton
                                            onClick={() => this.updateComponent(item.key, item.val().no, item.val().ref)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton onClick={() => this.deleteGroup(item.key, item.val().ref)}>
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <br/>
                <hr/>
                <div className="widthCommon">
                    {this.state.update ? <UpdateGroup id={this.state.key}
                                                      year={this.state.year}
                                                      semester={this.state.semester}
                                                      pro={this.state.pro}
                                                      noU={this.state.no}
                                                      reference={this.state.reference}
                                                      updateCom={this.updateComponent}/> : null}
                </div>

                <hr/>
                Add new Group:
                <AddGroup year={this.state.year} semester={this.state.semester} pro={this.state.pro}/>
            </div>
        )
    }
}

export default Groups;
