import React from 'react'

class SessionRow extends React.Component {

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
                <td>
                    {this.props.obj.Lecturers.map(t=>{
                       return <div>{t}</div>
                    })}
                    <div>{this.props.obj.Subject}({this.props.obj.SubCode})</div>
                    <div>{this.props.obj.Tag}</div>
                    <div>{this.props.obj.GroupID}</div>
                    <div>{this.props.obj.Duration}({this.props.obj.StudCount})</div>
                </td>
            </tr>
        )
    }
}
export default SessionRow
