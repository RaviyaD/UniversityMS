import React from "react";
import firebase from "firebase";
import {Button, Form, FormGroup, Table} from "react-bootstrap";

class conSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            SessionList: [],
            conSessionList:[]
        }
        this.storeSessions = this.storeSessions.bind(this)
        this.addSession = this.addSession.bind(this)

    }

    componentDidMount() {
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
            .ref('/ConsecutiveSessions')
            .on("value", snapshot => {
                this.setState({
                    conSessionList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        conSessionList: [...state.conSessionList, item.val()]
                    }))
                })
            })
    }

    changeHandler(i, event) {
        let name = event.target.name;
        let value = event.target.value;

        if ("sessions" === name) {
            let list = [...this.state.list]
            list[i] = value
            this.setState({
                list
            })

        } else
            this.setState({
                [name]: value
            })
    }

    addSession() {
        this.setState((state) => ({
            list: [...state.list, ""]
        }))
    }

    removeClick(i) {
        let list = [...this.state.list];
        list.splice(i, 1);
        this.setState({list});
    }

    storeSessions(event) {
        event.preventDefault();

        if (this.state.list.includes("")) {
            alert('One of the session is not selected!')
        } else if (this.state.list.length < 2) {
            alert('More than 2 sessions need to select!')
        } else {
            const Ref = firebase.database().ref('ConsecutiveSessions/').push().getKey();
            firebase.database().ref("ConsecutiveSessions/" + Ref)
                .set({
                    sessions: this.state.list

                })
        }
        this.setState({
            list:[]
        })
    }


    render() {
        return (
            <div>
                <h3>Add consecutive sessions</h3>
                <hr/>
                Choose consecutive sessions
                <br/>
                <Form onSubmit={this.storeSessions}>

                    <br/>
                    <FormGroup>
                        <input type="button" value="+ sessions" onClick={this.addSession}/>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Sessions : </Form.Label>
                        {
                            this.state.list.map((val, idx) => {
                                return (
                                    <div>

                                        <select name="sessions" value={val || ''}
                                                onChange={this.changeHandler.bind(this, idx)} required>
                                            <option value="none" selected>
                                                Select an Option
                                            </option>
                                            {
                                                this.state.SessionList.map((item) => {
                                                    return (
                                                        <option value={item}
                                                                disabled={this.state.list.includes(item)}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                        <input type="button" value="-" onClick={this.removeClick.bind(this, idx)}/>
                                    </div>


                                )
                            })
                        }
                    </FormGroup>
                    <Button type="submit">Add sessions as consecutive sessions</Button>
                </Form>
                <hr/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th> Sessions </th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.conSessionList.map((val)=>{
                        return (
                            <tr>
                                <td>
                                    {val.sessions.map((session => {
                                        return <td>{session}</td>
                                    }))}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default conSessions;
