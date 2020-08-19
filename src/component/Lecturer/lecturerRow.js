import React from 'react'

class LecturerRow extends React.Component {

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
                <td> {this.props.obj.Name}</td>
                <td>{this.props.obj.EmpID} </td>
                <td>{this.props.obj.Faculty}</td>
                <td>{this.props.obj.Department}</td>
                <td>{this.props.obj.Center}</td>
                <td>{this.props.obj.Building}</td>
                <td>{this.props.obj.Level}</td>
                <td>{this.props.obj.rank} </td>
            </tr>
        )
    }
}
export default LecturerRow
