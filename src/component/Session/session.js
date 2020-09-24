import React from 'react'
import {Card, Nav} from "react-bootstrap";
import AddSession from "./addSession";
import ViewSession from "./viewSession";

class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            viewSes:true,
            addSes:false
        };
        this.handleAddSession = this.handleAddSession.bind(this);
        this.handleViewSession = this.handleViewSession.bind(this);

    }
    handleViewSession(){
        this.setState({
            addSes: false,
            viewSes: true
        })
    }
    handleAddSession(){
        this.setState({
            addSes: true,
            viewSes: false
        })
    }
    render() {
        return(
            <div style={{marginTop:'40px'}}>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link onClick={this.handleViewSession}>VIEW SESSION</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={this.handleAddSession}>ADD SESSION</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>SESSIONS</Card.Title>
                        <Card.Text>
                            {this.state.viewSes ? <ViewSession/> : null}
                            {this.state.addSes ? <AddSession/> : null}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}
export default Session
