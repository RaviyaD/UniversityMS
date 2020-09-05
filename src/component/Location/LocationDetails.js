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
            checkType:'Lecture hall',
            noo:false
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
const no = ''
        return(
            <div>
                <h5 style={{ marginTop: '30px', color: '#888844' }} >Location Details</h5>
                <Form>
                    <Col sm="7" style={{ marginTop: '30px',borderColor:'#333333'}}>
                        <label>Select Room Type to Search</label>
                        <Form.Control as="select" placeholder={"Select Room Type to view the details"} style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleType} value={this.state.checkType}>
                            <option>Lecture hall</option>
                            <option>Labotary</option>
                        </Form.Control>

                    </Col>
                </Form>


                <table className="table table-bordered" style={{marginTop:30,textAlign:"center",borderWidth:2,borderColor:'#9a9c89'}}>
                    <thead style={{backgroundColor:'#dfe4c1',borderWidth:1,borderColor:'#9a9c89'}}>

                    <td  style={{borderWidth:1,borderColor:'#9a9c89'}}><h6>Buildings</h6></td>
                    <td  style={{borderWidth:1,borderColor:'#9a9c89'}}><h6>Rooms</h6></td>
                    </thead>
                    {
                        this.state.Building.map(b =>{
                            return <tbody style={{borderWidth:1,borderColor:'#9a9c89'}} >
                            <td  style={{borderWidth:1,borderColor:'#9a9c89'}}><h6>{b}</h6></td>
                                <td  style={{borderWidth:1,borderColor:'#9a9c89'}}>
                                {
                                    this.state.Room.map(rr=>{
                                        if(rr.buildingName===b){

                                            if(rr.roomType===this.state.checkType){
                                                return <h6>
                                                    {rr.roomName}
                                                </h6>
                                            }}
                                    })

                                }

                                </td>
                            </tbody>
                        })
                    }

                </table>
            </div>
        );
    }
}
