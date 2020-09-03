import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Form, Table} from 'react-bootstrap'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from "firebase";
import Button from "@material-ui/core/Button/Button";



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

                                    <Button
                                        variant="outlined" color="#e89c19" size="small"
                                        style={{marginRight:30}}
                                    >
                                        <Link className="edit-link" style={{color:"black"}} to={"/edit-building/" + b.buildingId}>
                                            Edit
                                        </Link>
                                    </Button>

                                    <Button  variant="outlined" color="secondary" size="small"
                                             onClick={()=>this.deleteBuilding(b.buildingId)}>
                                        Delete
                                    </Button>


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
