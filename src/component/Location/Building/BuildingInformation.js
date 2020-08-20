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

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBuildingName = this.handleAddBuildingName.bind(this);


        this.state = {
            show:false,
            addBuildingName:'',
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

    handleShow(){
        this.setState({
            show:true,

        })
    }

    handleClose(){
        this.setState({
            show:false,

        })
    }

    handleAddBuildingName(event){
        this.setState({
            addBuildingName: event.target.value
        })
    }

    handleSubmit(e) {

        e.preventDefault();
        const myRef = firebase.database().ref().child('Buildings').push().getKey();

        const buildingObject = {
            buildingName: this.state.addBuildingName,
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

    deleteBuilding(bid){
        if (window.confirm('Are you sure to delete the building?')) {
            firebase.database().ref().child(`Buildings/` + bid).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        console.log("harii")
                })
        }
    }

    render(){
        return(
            <div style={{marginTop:'40px'}}>
                <h5 style={{  color: '#888844' }} >Building Information</h5>
                <Button lg type="button" onClick={this.handleShow} variant="light" style={{  backgroundColor: '#888844',color:"white",marginTop:'30px' }}>
                    ADD BUILDING
                </Button>

                <Dialog open={this.state.show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Building</DialogTitle>
                    <Form style={{width:500}}>
                        <div className="form-group">
                            <DialogContent>


                                <TextField
                                    autoFocus
                                    margin="dense"
                                    value={this.state.addBuildingName}
                                    onChange={this.handleAddBuildingName}
                                    label="Building Name"
                                    type="text"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="secondary" onClick={this.handleClose} >
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} variant="light" style={{backgroundColor: '#888844',color:"white"}}>
                                    Add
                                </Button>
                            </DialogActions>
                        </div>
                    </Form>
                </Dialog>

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