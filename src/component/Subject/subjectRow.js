import React from 'react'
import {Row, Col} from "react-bootstrap"

class SubjectRow extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            list : this.props.obj.list,
        };

    }
    render() {
        console.log(this.props.obj);
        return(
            <tr>
                <td> {this.props.obj.Code}</td>
                <td>{this.props.obj.Name} </td>
                <td>{this.props.obj.Year}</td>
                <td>{this.props.obj.Semester}</td>
                <td>{this.props.obj.LectureHours}</td>
                <td>{this.props.obj.TuteHours}</td>
                <td>{this.props.obj.LabHours}</td>
                <td>{this.props.obj.EvaluationHours} </td>
            </tr>
        );
    }
}
export default SubjectRow
