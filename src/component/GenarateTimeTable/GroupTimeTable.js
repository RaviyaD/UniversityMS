import React, {Component} from 'react';
import {Table, Row, Col} from "react-bootstrap";
import moment from "moment";
import {Form, FormGroup, Input, Label} from "reactstrap";

class GroupTimeTable extends Component {

    constructor() {
        super();
        this.state = {
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
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup className='col-4'>
                                        <Label for="exampleSelect">Select Group</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={e => this.setState({value:e.target.value},()=>console.log())} >
                                            <option>Select</option>
                                            {
                                                this.props.group.map((val,key) => {
                                                    return( <option key={key} value={val}>{val}</option>)
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table bordered>
                        <thead>
                        <tr style={{border: '3px solid black'}}>
                            <th colSpan={days.length+1} style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"}>
                                {this.state.value === '' ? 'Select Group' : this.state.value}
                            </th>
                        </tr>

                        <tr style={{border: '3px solid black'}}>
                            <th>Time Slot</th>
                            {
                                days.map(val => {
                                    return <th style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} key={val}>{val}</th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            result.map((index, k) => {
                                return (<tr  style={{border: '3px solid black'}} key={k} hidden={result.length === (k+1)}>
                                    <td className="text-center font-weight-normal p-0 pl-0">{index} - {result[k + 1]}</td>
                                    {
                                        days.map((i, index1) => {
                                            if (moment(index, 'HH:mm') >= moment(times.lunchStart, 'HH:mm') && moment(result[(k + 1)], 'HH:mm') <= moment(times.lunchEnd, 'HH:mm')) {
                                                return (
                                                    <td key={index1} className={"text-center"}
                                                        style={{backgroundColor: 'RED'}}>{index} - {result[(k + 1)]}</td>
                                                )
                                            } else
                                                return <td className="text-center font-weight-normal p-0 pl-0" key={index1}>{this.chooseDataByGrpName(i, k,this.state.value)}</td>
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

    chooseDataByGrpName = (day, slot,gname) => {
        const {table,days,value} = this.props
        let Group, Room ,lectures
        let subj = ''
        let lec = []
        let no
        let div = <div>-X-</div>
        table.map((val,index) => {
            if (val.obj.day === day) {
                no = val.obj.numOfSlot
                if(val.obj.slots.includes(slot)){
                    if (val.obj.grpName === gname) {
                            Group = val.obj.grpName
                            Room = val.obj.RoomNo
                        subj = subj + this.getSubBySessionId(val.obj.sessionId)
                            div =
                                <td>
                                    <p>{Group}</p>
                                    <p>{this.getSubBySessionId(val.obj.sessionId)} - {this.getTagBySessionId(val.obj.sessionId)}</p>
                                    <p>{Room}</p>
                                </td>
                        }
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

export default GroupTimeTable;
