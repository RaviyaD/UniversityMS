import React from "react";
import AddYear from "../Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddSemester from "./AddSemester";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Col, Row} from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import UpdateSemester from "../Semester/UpdateSemester";

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listNo: [],
            yearNo: props.location.state.yearNo,
            yearKey:props.location.state.yearKey,
            key:null,
            no: null,
            time:null,
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
    }

    updateComponent(key,no,time) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            no: no,
            time:time
        })
    }

    render() {
        return (
            <div>
                <h4>Year - {this.state.yearNo} - Semester List</h4>
                <small><strong>Semester defined - 6 months period</strong></small>
                <br/>
                <hr/>
                {
                    this.state.list.map((item, key) => {
                        return (
                            <Row>
                                <Col>
                                    <Link to={{
                                        pathname: "/Student/Semester/Programme",
                                        state: {
                                            year: this.state.yearNo,
                                            semester: item.key
                                        }
                                    }}>
                                        <Row>
                                            <Col>
                                                <strong>Semester:</strong> {item.val().no}

                                            </Col>
                                            <Col>
                                                <strong>Code:</strong> {item.val().semCode}
                                            </Col>
                                            <Col>
                                                <strong>Time:</strong> {item.val().time_period}
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                                <Col>
                                    <IconButton
                                        onClick={() =>
                                            this.updateComponent(item.key, item.val().no,item.val().time_period)}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>

                                    <IconButton onClick={() => this.deleteSemester(item.key)}> <DeleteIcon
                                        fontSize="small"/></IconButton>

                                </Col>
                            </Row>
                        )
                    })
                }
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