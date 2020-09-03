import React, {Component} from "react";
import * as firebase from "firebase";

import {Button, Col, Row,Form} from "react-bootstrap";
import LoadingScreen from "react-loading-screen";


export default class EditBuilding extends Component{
    constructor(props) {
        super(props)

        this.onChangeBuildingName = this.onChangeBuildingName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            name:'',
            id:'',
            loading:true
        }
    }

    componentDidMount() {

        firebase.database().ref().child('Buildings/'+this.props.match.params.id).on('value', snapshot => {
            if (snapshot.exists()) {

                this.setState({
                    name: snapshot.val().buildingName
                },()=>this.setState({
                    loading:false
                }))
                console.log("actua; value =========" + this.state.name);
            }
        })

    }

    onChangeBuildingName(e) {
        this.setState({ name: e.target.value })
    }



    onSubmit = (e) => {
        e.preventDefault()



        firebase.database().ref().child(`Buildings/`+this.props.match.params.id).on('value',snapshot => {

            firebase.database().ref().child(`Buildings/`+this.props.match.params.id).update({
                buildingName:this.state.name,
                buildingId:this.props.match.params.id
            })
            if(snapshot.hasChildren()){

                snapshot.forEach(daySnapShot => {
                    if(daySnapShot.hasChild('buildingName')){
                        firebase.database().ref().child(`Buildings/`+this.props.match.params.id).child(daySnapShot.key).update({
                            buildingName:this.state.name
                        })
                    }
                })



            }
        })
        this.props.history.push('/building-info')
    }


    render() {
        return (
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#ffffff'
                spinnerColor='#000000'
                textColor='#000000'
                text='Loading'
            >
            <div style={{ marginRight: '25px', marginTop:'30px', 'border-style': 'solid', "border-color": "#888844"}}>
            <Row>
                <Col sm={9}>
                    <h3 style={{ margin: '20px', color: '#888844' }} >Edit Building</h3>

            <Form>
                <div className="form-group">
                    <Form.Group as={Row} controlId="formPlaintextName" style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <Form.Label column sm="8" style={{ marginLeft: '30px' }}>
                            Building Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" value={this.state.name} onChange={this.onChangeBuildingName} style={{ marginLeft: '30px', marginRight: '30px' }}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                        <Button lg type="button" variant="light" onClick={this.onSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#888844',fontcolor:'white' }}>
                            UPDATE BUILDING
                        </Button>
                    </Form.Group>
                </div>
            </Form>
                </Col>
                <Col sm={3} style={{'background-color': '#888844'}}>

                </Col>
            </Row>
            </div></LoadingScreen>);
    }
}
