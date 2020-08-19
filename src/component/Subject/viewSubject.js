import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'
import SubjectRow from "./subjectRow";
import {Table} from "react-bootstrap";

class ViewSubject extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            name: '',
            code: '',
            lecHrs: '',
            tuteHrs: '',
            labHrs: '',
            evalHrs: '',
            list:[]
        };
    }
    componentDidMount() {
        const lecturer =[];
        firebase.database().ref('subjects').on('value', snapshot =>{
            if(snapshot.exists()){
                snapshot.forEach(SubSnapshot => {
                    this.state.list.push(SubSnapshot.val());
                    lecturer.push(SubSnapshot.key);
                    if(SubSnapshot.hasChild('Year')){
                        this.setState({
                            Year: SubSnapshot.val().Year,
                            Semester: SubSnapshot.val().Semester,
                            Name: SubSnapshot.val().Name,
                            Code: SubSnapshot.val().Code,
                            LecHrs: SubSnapshot.val().LectureHours,
                            TuteHrs: SubSnapshot.val().TuteHours,
                            LabHrs: SubSnapshot.val().LabHours,
                            EvalHrs: SubSnapshot.val().EvaluationHours
                        }, () => console.log(lecturer))
                    }
                })
            }
        })
    }
    handleList(){
        console.log("asa");
        return this.state.list.map((res , i )=>{
            return  <SubjectRow obj={res} key={i} /> ;
        });
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th> CODE </th>
                    <th> NAME</th>
                    <th> YEAR </th>
                    <th> SEMESTER </th>
                    <th> LECTURE HOURS </th>
                    <th> TUTE HOURS  </th>
                    <th> LAB HOURS  </th>
                    <th> EVALUATION HOURS </th>
                </tr>
                </thead>
                <tbody>
                {this.handleList()}
                </tbody>
            </Table>
        );
    }


}
export default ViewSubject
