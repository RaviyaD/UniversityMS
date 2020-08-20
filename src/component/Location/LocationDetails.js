import React,{Component} from 'react'
import * as firebase from "firebase";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default class LocationDetails extends Component{

    constructor(props){
        super(props)

        this.handleType = this.handleType.bind(this);

        this.state = {
            buildingName1:'',
            roomName:'',
            buildingId:'',
            Room:[],
            Building:[],
            checkType:''
        };
    }
    handleType(event){
        this.setState({
            checkType: event.target.value
        })
    }

    componentDidMount(){

        firebase.database().ref('Buildings').on('value', snapshot => {
            let allNotes = [];
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allNotes.push(snap.val().buildingName);


                firebase.database().ref('Buildings/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                        console.log("meka 0 "+ snap2.key);
                        if(snap2.key !== 'buildingName' && snap2.key !== 'buildingId'){
                            allRooms.push(snap2.val());}
                    });




                })
            });

            console.log("wwwww " + allRooms)
            this.setState({
                Room:allRooms,
                Building:allNotes
            },() => {console.log(this.state.Building)})
        })



    }




    render(){

        return(
            <div>

                <Form>
                    <Col sm="10">
                        <Form.Control as="select" placeholder={"Select Room Type"} style={{ marginLeft: '30px', marginRight: '30px' }} onChange={this.handleType} value={this.state.checkType}>
                            <option>Lecture hall</option>
                            <option>Lab</option>
                            <option>Auditoriam</option>
                        </Form.Control>

                    </Col>
                </Form>
                this is display location

                <table>
                    {
                        this.state.Building.map(b =>{
                            return <tr>
                                <td>{b}</td>
                                {
                                    this.state.Room.map(rr=>{
                                        if(rr.buildingName===b){
                                            if(rr.roomType===this.state.checkType){
                                                return <td>
                                                    {rr.roomName}
                                                </td>
                                            }}
                                    })
                                }
                            </tr>
                        })
                    }

                </table>
            </div>
        );
    }
}