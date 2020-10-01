import React, {Component} from 'react';
import {Table, Row, Col, Button} from "react-bootstrap";
import moment from "moment";
import {Form, FormGroup, Input, Label} from "reactstrap";
import ReactToPrint from "react-to-print";

class LecTimeTableView extends Component {

    constructor() {
        super();
        this.state = {
           type:'',
            value:''
        }
    }

    render() {
        const {days, slots, table, result, times, value} = this.props
        let b = -1
        if (table.obj === null) {
            return null
        } else {
            return (
                <div>
                    <div>
                            <Row>
                                <Col>
                                    <Form>
                                    <FormGroup className='col-6'>
                                        <Label for="exampleSelect">Select Lecture</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={e => this.setState({value:e.target.value},()=>console.log())} >
                                            <option>Select</option>
                                            {
                                                this.props.lecName.map((val,key) => {
                                                    return( <option key={key} value={val.name}>{val.Name}</option>)
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                    </Form>
                                </Col>
                                <Col>
                                    <ReactToPrint
                                        trigger={() => {
                                            return <Button hidden={this.state.value === ''} className='float-right mt-3'>Print</Button>;
                                        }}
                                        documentTitle = {"Lecture = " + this.state.value}
                                        content={() => this.componentRef}
                                    />
                                </Col>
                            </Row>
                    </div>
                    <Table bordered ref={el => (this.componentRef = el)}>
                        <thead>
                        <tr style={{border: '3px solid black'}}>
                            <th colSpan={days.length+1} style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"}>
                                {this.state.value === '' ? 'Select Lecture' : this.state.value}
                            </th>
                        </tr>
                        <tr style={{border: '3px solid black'}}>
                            <th style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"}>Time Slot</th>
                            {
                                days.map(val => {
                                    return <th style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"} key={val}>{val}</th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            result.map((index, k) => {
                                return (<tr key={k} style={{border:'#000000'}} hidden={result.length === (k+1)}>
                                    <td className="text-center font-weight-normal p-0 pl-0">{index} - {result[k + 1]}</td>
                                    {
                                        days.map((i, index1) => {
                                            if (moment(index, 'HH:mm') >= moment(times.lunchStart, 'HH:mm') && moment(result[(k + 1)], 'HH:mm') <= moment(times.lunchEnd, 'HH:mm')) {
                                                return (
                                                    <td className={"text-center"} key={index1} className={"text-center"}
                                                        style={{backgroundColor: 'RED'}}>{index} - {result[(k + 1)]}</td>
                                                )
                                            } else
                                                return <td className="text-center font-weight-normal" key={index1}>{this.chooseDataByLecName(i, k,this.state.value)}</td>
                                        })
                                    }
                                </tr>)
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    chooseDataByLecName = (day, slot,lname) => {
        const {table,days,value} = this.props

        let Group, Room = ''
        let lec = []
        let no
        let div = <div>X</div>
        table.map((val,index) => {
            if (val.obj.day === day) {
                no = val.obj.numOfSlot
                if(val.obj.slots.includes(slot)){
                        val.obj.lecName.map(l => {
                            if (l === lname) {
                                Group = val.obj.grpName
                                Room = val.obj.RoomNo
                                div =
                                    <div>
                                        <p>{this.getSubBySessionId(val.obj.sessionId)} - {this.getTagBySessionId(val.obj.sessionId)}</p>
                                        {
                                            val.obj.lecName.length > 1 ? <div>
                                                {val.obj.lecName.map(d => {
                                                    return <strong>{d},</strong>
                                                })}
                                            </div> : null
                                        }
                                        <p>{Group}</p>
                                        <p>{Room}</p>
                                    </div>
                            }

                        })
                    }


            }
        })

        return div

    }

    getTagBySessionId = (sid) => {
        const {sessions} = this.props
        let tag = ''
        sessions.map(value => {
            if(value.key === sid){
                tag = value.data.Tag
            }
        })
        return tag
    }

    getSubBySessionId = (sid) => {
        const {sessions} = this.props
        let sub = ''
        sessions.map(value => {
            if(value.key === sid){
                sub = value.data.Subject
            }
        })
        return sub
    }
}

export default LecTimeTableView;
