import React from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import firebase from "firebase";

class overLapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            SessionList: [],
            overlapping: true
        }
        this.storeSessions = this.storeSessions.bind(this)

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
        const Ref = firebase.database().ref('overLapping/').push().getKey();
        firebase.database().ref("overLapping/" + Ref)
            .set({
                OverLapping: this.state.overlapping,
                sessions: this.state.list

            })
        // this.setState({
        //     OverLapping: true,
        //     sessions:[]
        // })

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
                        <input type="radio" value={true} name="overlapping" required/> Overlapping
                        <input type="radio" value={false} name="overlapping" required/> Not Overlapping
                    </FormGroup>

                    <br/>
                    <FormGroup>
                        <button onClick={this.addSession.bind(this)}>Add new session</button>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Sessions : </Form.Label>
                        {
                            this.state.list.map((val, idx) => {
                                return (
                                    <div>

                                        <select name="sessions" value={val || ''}
                                                onChange={this.changeHandler.bind(this, idx)} required>
                                            <option value="none" selected disabled hidden>
                                                Select an Option
                                            </option>
                                            {
                                                this.state.SessionList.map((item) => {
                                                    return (
                                                        <option value={item} disabled={this.state.list.includes(item)}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                        <button onClick={this.removeClick.bind(this, idx)}>-</button>
                                    </div>


                                )
                            })
                        }
                    </FormGroup>
                    <Button type="submit">Add sessions</Button>
                </Form>


            </div>
        )
    }

}

export default overLapping;