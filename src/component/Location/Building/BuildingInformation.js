import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Col, Form, Table} from 'react-bootstrap'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from "firebase";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";



export default class BuildingInformation extends Component{

    constructor(props){
        super(props)
        this.deleteBuilding = this.deleteBuilding.bind(this);
        this.state = {
            DisplayBuildings:[],

        }
    }

    componentDidMount(){

        firebase.database().ref().child('Buildings').on('value', snapshot => {
            let allDisplayBuildings = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allDisplayBuildings.push(snap.val());
            });
            this.setState({ DisplayBuildings: allDisplayBuildings});


        })

    }



    deleteBuilding =(bid) => {
        if (window.confirm('Are you sure to delete the building?')) {
            firebase.database().ref(`Buildings`).child(bid).remove()
        }
    }

    render(){
        return(
            <div style={{marginTop:'40px'}}>
                <h5 style={{  color: '#888844' }} >Building Details</h5>
                 <Table striped bordered hover size="sm" style={{marginTop:'40px',textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th> Building Names </th>
                        <th> Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.DisplayBuildings.map(b =>{
                            return <tr>
                                <td>{b.buildingName} </td>
                                <td>
                                    <Link className="edit-link" style={{color:"black"}} to={"/edit-building/" + b.buildingId}>
                                        <IconButton>
                                            <EditIcon fontSize="small"/></IconButton>
                                        </Link>

                                    <IconButton onClick={()=>this.deleteBuilding(b.buildingId)}> <DeleteIcon fontSize="small" /></IconButton >

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
