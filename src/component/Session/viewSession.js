import React from 'react'
import * as firebase from "firebase";
import {Table} from "react-bootstrap";
import SessionRow from "./sessionRow";

class ViewSession extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list:[],
            GroupID:'',
            Duration:'',
            StudCount:'',
            SubCode:'',
            Subject:'',
            Tag:'',
            Lecturers:[]
        };
        this.handleList = this.handleList.bind(this);
    }

    componentDidMount() {
        firebase.database().ref('sessions').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.list.push(lectSnapshot.val());
                    if(lectSnapshot.hasChild('GroupID')){
                        this.setState({
                            GroupID: lectSnapshot.val().GroupID,
                            Duration: lectSnapshot.val().Duration,
                            StudCount: lectSnapshot.val().StudCount,
                            SubCode: lectSnapshot.val().SubCode,
                            Subject: lectSnapshot.val().Subject,
                            Tag: lectSnapshot.val().Tag,
                            Lecturers: lectSnapshot.val().Lecturers
                        })
                    }
                })
            }
        })
    }

    handleList(){
        return this.state.list.map((res , i )=>{
            return  <SessionRow obj={res} key={i} /> ;
        });
    }
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th> SESSIONS </th>
                </tr>
                </thead>
                <tbody>
                {this.handleList()}
                </tbody>
            </Table>
        );
    }
}
export default ViewSession
