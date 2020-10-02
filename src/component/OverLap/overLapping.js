import React from "react";
import {Button, Form, FormGroup, Table} from "react-bootstrap";
import firebase from "firebase";

class overLapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            SessionList: [],
            overlapping: true,
            OverlapList: []
        }
        this.storeSessions = this.storeSessions.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({overlapping: event.target.value});
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
            .ref('/overLapping')
            .on("value", snapshot => {
                this.setState({
                    OverlapList: []
                })
                snapshot.forEach(item => {
                    this.setState(state => ({
                        OverlapList: [...state.OverlapList, item.val()]
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

    update() {
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
        console.log(event)

        if (this.state.list.includes("")) {
            alert('One of the session is not selected!')
        } else if (this.state.list.length < 2) {
            alert('More than 2 sessions need to select!')
        } else {
            const Ref = firebase.database().ref('overLapping/').push().getKey();
            firebase.database().ref("overLapping/" + Ref)
                .set({
                    OverLapping: this.state.overlapping,
                    sessions: this.state.list

                })
        }
        this.setState({
            availableList:[]
        })

    }


    render() {
        return (
            <div>
                <h3>Add parallel session or Add restriction</h3>
                <hr/>
                Choose overlapping or not to overlapping below sessions
                <br/>
                <Form onSubmit={this.storeSessions}>
                    <FormGroup>
                        <Form.Label>Choose : </Form.Label>
                        <br/>
                        <input onChange={this.handleChange} type="radio" id="id1" value={true}
                               name="overlapping" required/> Overlapping
                        <br/>
                        <input onChange={this.handleChange} type="radio" id="id2" value={false}
                               name="overlapping" required/> Not Overlapping
                    </FormGroup>

                    <br/>
                    <FormGroup>
                        <input type="button" id="id3" onClick={this.update.bind(this)} value="+ sessions"/>
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
                                                this.state.SessionList.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item}
                                                                disabled={this.state.list.includes(item)}>
                                                            {item}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <input type="button" id="id1"
                                               onClick={this.removeClick.bind(this, idx)} value="-"/>
                                    </div>


                                )
                            })
                        }
                    </FormGroup>
                    <Button type="submit">Add sessions</Button>
                </Form>
                <br/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Over Lapping </th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.OverlapList.map((val)=>{
                        return (
                            val.OverLapping === 'true' ? (<tr>
                                <td>
                                    {val.sessions.map((session => {
                                        return <td>{session}</td>
                                    }))}
                                </td>
                            </tr>) : null
                        )
                    })}
                    </tbody>
                </Table>

                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th> Not over lapping</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.OverlapList.map((val)=>{
                        return (
                            val.OverLapping === 'false' ? (<tr>
                                <td>
                                    {val.sessions.map((session => {
                                        return <td>{session}</td>
                                    }))}
                                </td>
                            </tr> ): null
                        )
                    })}
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default overLapping;
