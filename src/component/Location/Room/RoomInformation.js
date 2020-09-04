import React,{Component} from "react";
import * as firebase from "firebase";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import {Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";





export default class RoomInformation extends Component{

    constructor(props){
        super(props);

        this.state = {
            buildingName:'',
            Room:[],
            allData:[]


        }
    }

    componentDidMount() {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allNotes = [];
            let allRooms = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allNotes.push(snap.val());


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
                Room:allRooms
            },() => {console.log(this.state.Room)})
        })

    }



    deletee(roomid,buildingid){
        if (window.confirm('Are you sure to delete the building?')) {
            firebase.database().ref('Buildings').child(buildingid).child(roomid).remove()
        }
    }


    render(){

        return(
            <div>
                <h5 style={{ marginTop: '20px', color: '#888844' }} >Room Details</h5>
                <Table striped bordered hover size="sm" style={{marginTop:'40px',textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th> Room Name </th>
                        <th> Room Type</th>
                        <th> Room Capacity</th>
                        <th> Location</th>
                        <th> Actions</th>


                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.Room.map(b =>{
                            return <tr>
                                <td>{b.roomName}</td>
                                <td>{b.roomType}</td>
                                <td>{b.capacity}</td>
                                <td>{b.buildingName}</td>
                                <td>
                                    <Link className="edit-link" style={{color:"black"}} to={"/edit-room/" + b.buildingId +"/"+b.roomName}>
                                            <IconButton>
                                                <EditIcon fontSize="small"/></IconButton>
                                        </Link>
                                    <IconButton  onClick={() => { this.deletee(b.roomName,b.buildingId) }}> <DeleteIcon fontSize="small" /></IconButton >
                                </td>

                            </tr>
                        })
                    }
                    </tbody>

                </Table>


            </div>
        );
    }
}
