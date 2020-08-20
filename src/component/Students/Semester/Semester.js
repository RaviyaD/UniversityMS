import React from "react";
import AddYear from "../Year/AddYear";
import firebase from "firebase";
import {Link} from "react-router-dom";
import AddSemester from "./AddSemester";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Col, Row} from "react-bootstrap";

class Semester extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listNo:[],
            year: props.location.state.yearNo,
        }
    }
    componentDidMount() {
        firebase.database().ref('Student/'+this.state.year+"/semesters/").on("value",snapshot => {
            this.setState({
                list:[]
            })

            snapshot.forEach(sem => {
                this.setState(  state => ({
                    listNo : [...state.listNo, sem.val().no]
                }))
                this.setState(  state => ({
                    list : [...state.list, sem.val()]
                }))
            })

        })
    }

    deleteSemester(no){
        console.log(parseInt(no));
        firebase.database().ref('Student/' + this.state.year+"/semesters/"+parseInt(no)).remove(()=>{
            console.log("Deleted");
        })
    }

    render() {
        return(
            <div>
                <h4>Year - {this.state.year} - Semester List</h4>
                <small><strong>Semester defined - 6 months period</strong></small>
                <br/>
                {
                    this.state.list.map((item,key)=>{
                        return (
                            <Row>
                                <Col>
                                    <Link to={{pathname: "/Student/Semester/Programme",
                                        state: {
                                            year:this.state.year,
                                            semester:item.no}}}>
                                        <Row>
                                            <Col>
                                                <strong>Semester:</strong>  {item.no}

                                            </Col>
                                            <Col>
                                                <strong>Code:</strong> {item.semCode}

                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                               <Col>
                                   <IconButton onClick={() => this.deleteSemester(item.no)}> <DeleteIcon fontSize="small" /></IconButton >

                               </Col>
                            </Row>
                        )
                    })
                }
                <AddSemester list={this.state.list}  year={this.state.year}/>
            </div>
        )
    }
}

export default Semester;