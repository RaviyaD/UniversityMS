import React from 'react'
import * as firebase from 'firebase'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button";



export default class AddBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildingName = this.handleBuildingName.bind(this);
        this.state = {
            buildingName:'',
        };

    }




    handleBuildingName(event) {
        this.setState({
            buildingName: event.target.value
        })

    }



    handleSubmit(e) {

        e.preventDefault();
        const myRef = firebase.database().ref().child('Buildings').push().getKey();

        const buildingObject = {
            buildingName: this.state.buildingName,
            buildingId:myRef

        };
        firebase.database().ref('Buildings/' + myRef).set(
            buildingObject,
            err => {
                if (err)
                    console.log(err)
                else
                    console.log("Successful !!!");
            })

    }

    render() {
        return (
            <div style={{ marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
                <Row>
                    <Col sm={9}>
                        <h3 style={{ margin: '20px', color: '#888844' }} >Add Building</h3>

                        <Form>
                            <div className="form-group">
                                <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                                    <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                                        Building Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" value={this.state.buildingName} onChange={this.handleBuildingName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                                    <Button lg type="button" variant="light" onClick={this.handleSubmit} style={{ marginLeft: '30%', marginRight: '30px', backgroundColor: '#888844',fontcolor:'white' }}>
                                        ADD BUILDING
                                    </Button>
                                </Form.Group>
                            </div>
                        </Form>
                    </Col>
                    <Col sm={3} style={{'background-color': '#888844'}}>

                    </Col>
                </Row>
            </div>
        )
    }
}
