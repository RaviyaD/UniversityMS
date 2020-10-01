import React, {Component} from 'react';
import {Table, Row, Col, Button} from "react-bootstrap";
import moment from "moment";
import {Form, FormGroup, Input, Label} from "reactstrap";
import ReactToPrint from "react-to-print";

class RoomTimeTable extends Component {

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

                            <Row>
                                <Col>
                                    <Form>
                                    <FormGroup className='col-4'>
                                        <Label for="exampleSelect">Select Room</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={e => this.setState({value:e.target.value},()=>console.log(this.state.value))} >
                                            <option value={'empty'} >Select</option>
                                            {
                                                this.props.room.map((val,key) => {
                                                    return( <option key={key} value={val.roomName}>{val.roomName}</option>)
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
                                        documentTitle = {"Room = " + this.state.value}
                                        content={() => this.componentRef}
                                    />
                                </Col>
                            </Row>

                    </div>
                    <Table bordered ref={el => (this.componentRef = el)} >
                        <thead>
                        <tr style={{border: '3px solid black'}}>
                            <th colSpan={days.length+1} style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"}>
                                {this.state.value === '' ? 'Select Room' : this.state.value}
                            </th>
                        </tr>
                        <tr style={{border: '3px solid black'}}>
                            <th>Time Slot</th>
                            {
                                days.map(val => {
                                    return <th key={val}>{val}</th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            result.map((index, k) => {
                                return (<tr style={{border: '3px solid black'}}  key={k} hidden={result.length === (k+1)}>
                                    <td className="text-center font-weight-normal p-0 pl-0">{index} - {result[k + 1]}</td>
                                    {
                                        days.map((i, index1) => {
                                            if (moment(index, 'HH:mm') >= moment(times.lunchStart, 'HH:mm') && moment(result[(k + 1)], 'HH:mm') <= moment(times.lunchEnd, 'HH:mm')) {
                                                return (
                                                    <td className="text-center font-weight-normal p-0 pl-0" key={index1} className={"text-center"}
                                                        style={{backgroundColor: 'RED'}}>---X---</td>
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

    chooseDataByGrpName = (day, slot,rname) => {
        const {table,days,value} = this.props
        let Group, Room = ''
        let lec = []
        let no
        let div = <div>-X-</div>
        table.map((val,index) => {
            if (val.obj.day === day) {
                no = val.obj.numOfSlot
                if(val.obj.slots.includes(slot)){
                    if (rname.localeCompare(val.obj.RoomNo)===0) {
                        Group = val.obj.grpName
                        Room = val.obj.RoomNo
                        div =
                            <div>
                                <p>{this.getSubBySessionId(val.obj.sessionId)} - {this.getTagBySessionId(val.obj.sessionId)}</p>
                                {val.obj.lecName.map(d => {
                                    return <strong>{d},</strong>
                                })}
                                <p>{Group}</p>
                            </div>
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

export default RoomTimeTable;
