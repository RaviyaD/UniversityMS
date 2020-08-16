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
            <div className="card mb-3 card  shadow-lg" style={{"max-width": "auto", "height":"auto", padding: "20px",margin: "20px" }}>
                <div className="row no-gutters">
                    <div className="row" style={{"width":"100%"}}>
                        <div className="card-body" >
                            <Row>
                                <Col style={{"width":"50%"}}>
                                    <div>
                                        <h5> {this.props.obj.Code}</h5>
                                        <p className="card-text">{this.props.obj.Name}  </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Year}</small></p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Semester}</small>  </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.LectureHours} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.TuteHours} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.LabHours} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.EvaluationHours} </small> </p>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SubjectRow
