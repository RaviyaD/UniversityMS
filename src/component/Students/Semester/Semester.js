import React from "react";
import AddYear from "../Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddSemester from "./AddSemester";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Col, Row, Table} from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import UpdateSemester from "../Semester/UpdateSemester";
import "../common.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CallMadeIcon from '@material-ui/icons/CallMade';


class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listNo: [],
            yearNo: props.location.state.yearNo,
            yearKey: props.location.state.yearKey,
            key: null,
            no: null,
            time: null,
            update: false
        }
        this.deleteSemester = this.updateComponent.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database()
            .ref('Student/' + this.state.yearKey + "/semesters/").on("value", snapshot => {
            this.setState({
                list: []
            })

            snapshot.forEach(sem => {
                this.setState(state => ({
                    listNo: [...state.listNo, sem.val().no]
                }))
                this.setState(state => ({
                    list: [...state.list, sem]
                }))
            })
        })
    }

    deleteSemester(no) {
        console.log(no)
        firebase.database()
            .ref('Student/' + this.state.year + "/semesters/" + parseInt(no)).remove(() => {
            console.log("Deleted");
        })
        firebase.database().ref().child('GroupIDs').orderByChild('ID').startAt('Y' + this.state.year + '.S' + no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                data.ref.remove();

            })
        })
        firebase.database().ref().child('SubGroupIDs').orderByChild('ID').startAt('Y' + this.state.year + '.S' + no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                data.ref.remove();

            })
        })
    }

    updateComponent(key, no, time) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            no: no,
            time: time
        })
    }

    render() {
        return (
            <div>
                <h4 className="topic">Year - {this.state.yearNo} - Semester List
                    <IconButton onClick={() => {
                        this.props.history.goBack()
                    }}>
                        <ArrowBackIosIcon fontSize="inherit" size="small"/>
                    </IconButton></h4>
                <small><strong>Semester defined - 6 months period</strong></small>
                <br/>
                <hr/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th> Semester no</th>
                        <th> Code</th>
                        <th> Time Period</th>
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
                                            pathname: "/Student/Semester/Programme",
                                            state: {
                                                year: this.state.yearNo,
                                                yearKey: this.state.yearKey,
                                                semester: item.key
                                            }
                                        }}>

                                            <td>{item.val().no}<CallMadeIcon fontSize="small"/></td>

                                        </Link>
                                    </td>

                                    <td>{item.val().semCode}</td>


                                    <td>{item.val().time_period}</td>

                                    <td>
                                        <IconButton
                                            onClick={() =>
                                                this.updateComponent(item.key, item.val().no, item.val().time_period)}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>

                                        <IconButton onClick={() => this.deleteSemester(item.key)}> <DeleteIcon
                                            fontSize="small"/>
                                        </IconButton>
                                    </td>


                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                {this.state.update ? <UpdateSemester id={this.state.key}
                                                     year={this.state.yearKey}
                                                     no={this.state.no}
                                                     time={this.state.time}
                                                     updateCom={this.updateComponent}/> : null}
                <hr/>
                <AddSemester list={this.state.list} year={this.state.yearNo}/>
            </div>
        )
    }
}

export default Semester;
