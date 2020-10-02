import React from "react";
import Session from "../Session/session";
import {Button, Form, FormGroup, Table} from "react-bootstrap";
import firebase from "firebase";

class availableTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            typeList: ["Lecturer", "Session", "Group", "SubGroup"],
            ID: "",
            day: "",
            startTime: "",
            endTime: "",
            lecturerList: [],
            SessionList: [],
            groupsList: [],
            subGroupsList: [],
            list: [],
            availableList:[]
        }
        this.addNotAvailable = this.addNotAvailable.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentDidMount() {

        firebase.database()
            .ref('/Availability')
            .on("value", snapshot => {
                this.setState({
                    availableList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        availableList: [...state.availableList, item.val()]
                    }))
                })
            })

        firebase.database()
            .ref('lecturers/')
            .on("value", snapshot => {
                this.setState({
                    lecturerList: []
                })
                snapshot.forEach(lecturer => {
                    this.setState(state => ({
                        lecturerList: [...state.lecturerList, lecturer.key]
                    }))
                })
            })

        firebase.database()
            .ref('sessions/')
            .on("value", snapshot => {
                this.setState({
                    SessionList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        SessionList: [...state.SessionList, item.key]
                    }))
                })
            })

        firebase.database()
            .ref('GroupIDs/')
            .on("value", snapshot => {
                this.setState({
                    groupsList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        groupsList: [...state.groupsList, item.val().ID]
                    }))
                })
            })

        firebase.database()
            .ref('SubGroupIDs/')
            .on("value", snapshot => {
                this.setState({
                    subGroupsList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        subGroupsList: [...state.subGroupsList, item.val().ID]
                    }))
                })
            })

    }

    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        let a = [];

        if (name === "type")
            switch (value) {
                case "Lecturer":
                    a = this.state.lecturerList
                    this.setState({
                        list: a
                    })
                    break;
                case "Session":
                    a = this.state.SessionList
                    this.setState({
                        list: a
                    })
                    break;
                case "Group":
                    a = this.state.groupsList
                    this.setState({
                        list: a
                    })
                    break;
                case "SubGroup":
                    a = this.state.subGroupsList
                    this.setState({
                        list: a
                    })
                    break;
                default:
                    break;
            }
    }

    addNotAvailable(event) {
        event.preventDefault();
        if(this.state.type === "" || this.state.ID === "" || this.state.Day === ""){
            alert("One of the field is not selected")
        }
        else {
            const Ref = firebase.database().ref('Availability/').push().getKey();
            console.log(this.state.type,this.state.ID,this.state.Day,this.state.startTime)
            firebase.database().ref("Availability/" + Ref)
                .set({
                    Type : this.state.type,
                    ID : this.state.ID,
                    Day: this.state.Day,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime
                })
            this.setState({
                type:"",
                ID: "",
                Day: "",
                startTime:"",
                endTime: ""
            })
        }

    }

    render() {
        return (
            <div>
                <h3>Unavailability of Lecturers/Sessions/Groups/SubGroups</h3>
                <hr/>
                <Form onSubmit={this.addNotAvailable}>
                    <FormGroup>
                        <Form.Label> Type </Form.Label>
                        <select name="type" value={this.state.type} onChange={this.changeHandler}>
                            <option value="" selected>
                                Select an Option
                            </option>
                            {
                                this.state.typeList.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label> ID </Form.Label>
                        <select name="ID" value={this.state.ID} onChange={this.changeHandler}>
                            <option value="" selected  >
                                Select an Option
                            </option>
                            {
                                this.state.list.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Day</Form.Label>
                        <select name="Day" value={this.state.Day} onChange={this.changeHandler}>
                            <option value="" selected>
                                Select an Option
                            </option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="time" name="startTime" onChange={this.changeHandler}
                                      value={this.state.startTime} required/>
                        <br/>
                        <Form.Control type="time" name="endTime" onChange={this.changeHandler}
                                      value={this.state.endTime} required/>
                    </FormGroup>

                    <Button type="submit">Add Unavailable time</Button>
                </Form>
                <br/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th> Type </th>
                        <th> ID</th>
                        <th> Day</th>
                        <th> Start Time </th>
                        <th> End Time </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.availableList.map((val) =>{
                        return(
                            <tr>
                                <td>{val.Type}</td>
                                <td>{val.ID}</td>
                                <td>{val.Day}</td>
                                <td>{val.startTime}</td>
                                <td>{val.endTime}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default availableTime;
