import React from "react";
import AddYear from "./Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateYear from "./Year/updateYear";
import {Col, Row} from "react-bootstrap";
import './common.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class Student extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            update: false,
            key: null,
            no: null,
            note: null
        }
        this.deleteYear = this.deleteYear.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    componentDidMount() {
        firebase.database().ref('Student').on("value", snapshot => {
            this.setState({
                list: []
            })

            snapshot.forEach(Year => {
                this.setState(state => ({
                    list: [...state.list, Year]
                }))
            })
        })
    }

    deleteYear(no) {
        firebase.database().ref('Student/' + parseInt(no)).remove(() => {
            console.log("Deleted");
        })
        firebase.database().ref().child('GroupIDs').orderByChild('ID').startAt('Y' + no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                data.ref.remove();

            })
        })
        firebase.database().ref().child('SubGroupIDs').orderByChild('ID').startAt('Y' + no).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                data.ref.remove();

            })
        })
    }

    updateComponent(key, no, note) {
        let switchU = !this.state.update;
        this.setState({
            update: switchU,
            key: key,
            no: no,
            note: note
        })
    }

    render() {
        return (
            <div>
                <h4 className="topic">
                    Year List
                    <IconButton onClick={() => {
                        this.props.history.goBack()
                    }}>
                        <ArrowBackIosIcon fontSize="inherit" size="small"/>
                    </IconButton>
                </h4>

                {
                    this.state.list.map((item, key) => {
                        return (
                            <Row>
                                <Col>
                                    <Link className="link" to={{
                                        pathname: "/Student/Semester",
                                        state: {
                                            yearNo: item.val().no,
                                            yearKey: item.key
                                        }
                                    }}
                                          key={key}>
                                        <Row>
                                            <Col> <strong>Year</strong> {item.val().no}</Col>
                                            <Col><strong>Short Form </strong> {item.val().yearCode}</Col>
                                        </Row>
                                    </Link>
                                </Col>
                                <Col>
                                    <IconButton
                                        onClick={() =>
                                            this.updateComponent(item.key, item.val().no, item.val().Note)}>
                                        <EditIcon fontSize="small"/></IconButton>

                                    <IconButton onClick={() => this.deleteYear(item.key)}>
                                        <DeleteIcon fontSize="small"/></IconButton>
                                </Col>
                            </Row>)
                    })
                }
                {this.state.update ? <UpdateYear id={this.state.key}
                                                 noU={this.state.no}
                                                 noteU={this.state.note}
                                                 updateCom={this.updateComponent}/> : null}
                <hr/>
                <h5>Add new Year</h5>
                <AddYear/>
            </div>
        )
    }
}

export default Student;
