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
import {Col, Row, Table} from "react-bootstrap";
import "../common.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CallMadeIcon from "@material-ui/icons/CallMade";


class Programme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            year: props.location.state.year,
            yearKey: props.location.state.yearKey,
            semester: props.location.state.semester,
            update: false,
            key: null,
            description: null,
            name: null
        }
        this.updateComponent = this.updateComponent.bind(this)

    }

    componentDidMount() {
        firebase.database().ref('Student/' + this.state.yearKey + "/semesters/" + this.state.semester + "/programmes/")
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
        firebase.database()
            .ref('Student/' + this.state.year + "/semesters/" + this.state.semester + "/programmes/" + no)
            .remove(() => {
                console.log("Deleted");
            })
        firebase.database().ref().child('GroupIDs').orderByChild('ID')
            .startAt('Y' + this.state.year + '.S' + this.state.semester + "." + no)
            .on('value', (snapshot) => {
                snapshot.forEach(function (data) {
                    data.ref.remove();

                })
            })
        firebase.database().ref().child('SubGroupIDs').orderByChild('ID')
            .startAt('Y' + this.state.year + '.S' + this.state.semester + "." + no)
            .on('value', (snapshot) => {
                snapshot.forEach(function (data) {
                    data.ref.remove();

                })
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
                <h4 className="topic">Year {this.state.year} - Semester {this.state.semester} -Programme List
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
                        <th> Name</th>
                        <th> Short Code</th>
                        <th> Description</th>
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
                                            pathname: "/Student/Semester/Programme/Group",
                                            state: {
                                                year: this.state.year,
                                                semester: this.state.semester,
                                                pro: item.key
                                            }
                                        }}>
                                            <td>{item.val().name} <CallMadeIcon fontSize="small"/></td>

                                        </Link>
                                    </td>
                                    <td> {item.key}</td>
                                    <td>{item.val().description}</td>
                                    <td>
                                        <IconButton
                                            onClick={() => this.updateComponent(item.key, item.val().description, item.val().name)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>

                                        <IconButton onClick={() => this.deleteProgramme(item.key)}> <DeleteIcon
                                            fontSize="small"/></IconButton>

                                    </td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

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
