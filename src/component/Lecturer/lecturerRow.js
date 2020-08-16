import React from 'react'
import {Row, Col} from "react-bootstrap"

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
            <div className="card mb-3 card  shadow-lg" style={{"max-width": "auto", "height":"auto", padding: "20px",margin: "20px" }}>
                <div className="row no-gutters">
                    <div className="row" style={{"width":"100%"}}>
                        <div className="card-body" >
                            <Row>
                                <Col style={{"width":"50%"}}>
                                    <div>
                                        <h5> {this.props.obj.Name}</h5>
                                        <p className="card-text">{this.props.obj.EmpID}  </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Faculty}</small></p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Department}</small>  </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Center} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Building} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.Level} </small> </p>
                                        <p className="card-text"><small className="text-muted">{this.props.obj.rank} </small> </p>

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
export default LecturerRow
