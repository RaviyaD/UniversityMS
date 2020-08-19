import React, {Component} from "react";
import * as firebase from "firebase";
import {Container, Row, Col, Alert} from 'reactstrap';
import Typography from "@material-ui/core/Typography";
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import {Button} from "@material-ui/core";
import {DeleteForeverRounded, SaveOutlined, UpdateOutlined, UpdateSharp} from "@material-ui/icons";
import LoadingScreen from "react-loading-screen";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from "moment";
export default class AddWorkingHours extends Component{

    constructor() {
        super();
        this.state = {
            selected :[],
            loading : true,
            isSetTime:false,
            startTime: '06:00',
            endTime: '20:00',
            lunchStart : '12:00',
            lunchEnd : '13:00',
            timeSlot:60,
            isUpdate:true,
            disable:false

        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        let ref = firebase.database().ref("WorkingTime");

        ref.on("value", snapshot => {
            if(snapshot.exists()) {
                if(snapshot.hasChild('startTime')) {
                       this.setState({
                           startTime: snapshot.val().startTime,
                           endTime: snapshot.val().endTime,
                           lunchStart : snapshot.val().lunchStart,
                           lunchEnd : snapshot.val().lunchEnd,
                           timeSlot : snapshot.val().timeSlot
                       },() => this.setState({isSetTime: true},() => this.setState({loading:false})))

                   }

            }else {
                this.setState({isSetTime:false},()=>this.setState({loading:false}))
            }
        }, function(error) {
            if (error) {
                this.setState({loading: false})
            } else {
                // Data saved successfully!
                console.log('Successfully')
            }
        });
    }

    onTimeChangeStartTime(options) {
        // do something
        const {
            hour,
            minute
        } = options;
        let time = hour + ':' + minute
        var start = moment(time, 'HH:mm');
        var end = moment(this.state.endTime, 'HH:mm');
        if(start>end){
            alert('Select Time Less Than End Time')
        }else {
            this.setState({startTime: time})
        }
    }
    onTimeChangeEndTime(options) {
        // do something
        const {
            hour,
            minute
        } = options;
        let time = hour + ':' + minute
        var start = moment(this.state.startTime, 'HH:mm');
        var end = moment(time, 'HH:mm');
        if(start>end){
           alert('Select Time More Than Start Time')
        }else {
            this.setState({endTime: time})
        }
    }
    onTimeChangeIntStartTime(options) {
        // do something
        const {
            hour,
            minute
        } = options;
        let time = hour + ':' + minute
        var start = moment(this.state.startTime, 'HH:mm');
        var end = moment(this.state.endTime, 'HH:mm');
        var lunch = moment(time, 'HH:mm');
        if(start>lunch || end<lunch ){
            alert('Select Time Between Day Start & End Time')
        }else {
            this.setState({lunchStart: time})
        }

    }
    onTimeChangeIntEndTime(options) {
        // do something
        const {
            hour,
            minute,
            meridiem
        } = options;
        let time = hour + ':' + minute
        console.log(time)
        var start = moment(this.state.startTime, 'HH:mm');
        var end = moment(this.state.endTime, 'HH:mm');
        var lunchS = moment(this.state.lunchStart, 'HH:mm');
        var lunchE = moment(time, 'HH:mm');
        if(start>lunchE || end<lunchE || lunchS>lunchE ){
            alert('Select Time Between Day Start & End Time and More Than Lunch Start Time')
        }else {
            this.setState({lunchEnd: time})
        }
    }
    handleChange = (event) => {
        this.setState({timeSlot:event.target.value})
    };

    render() {
        const { selected, loading, isUpdate, isSetTime, disable } = this.state

            return (
                <div className={'container-fluid'}>
                    <LoadingScreen
                        loading={loading}
                        bgColor='#ffffff'
                        spinnerColor='#9ee5f8'
                        textColor='#676767'
                        text='Loading'
                    >
                <Container>
                    <Typography component="h1" variant="h4" align="center">
                        Set Working Times of a Day
                    </Typography>

                    <Row>
                        <div style={{ backgroundColor: 'lightgrey', width: '600px', border: '15px solid green', padding: '10px', margin: 'auto', alignItems:'center'}}>

                            <Row>
                                <Col xs="4" style={{marginTop:'10px',marginLeft:'0px'}}>
                                    <p style={{marginTop:'10px',marginLeft:'0px'}} >Start Time</p>
                                </Col>
                                <Col  xs="6"  style={{marginTop:'10px'}}>
                                    <TimePicker style={{alignItems:'right'}} colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.startTime}
                                                timeConfig={{
                                                    from: 6,
                                                    to: 20,
                                                    step: 15,
                                                    unit: 'minutes'
                                                }}  onTimeChange={this.onTimeChangeStartTime.bind(this)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4" style={{marginTop:'10px',marginLeft:'0px'}}>
                                    <p style={{marginTop:'10px',marginLeft:'0px'}}>End Time</p>
                                </Col>
                                <Col xs="6" style={{marginTop:'10px'}}>
                                    <TimePicker  colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.endTime}
                                                onTimeChange={this.onTimeChangeEndTime.bind(this)}/>
                                </Col>
                            </Row>
                        </div>
                    </Row>

                    <Row style={{marginBottom:'10px'}}>
                        <div style={{ backgroundColor: 'lightgrey', width: '600px', border: '15px solid green', padding: '10px', margin: 'auto'}}>

                            <Row>
                                <Col xs="4" style={{marginTop:'10px',marginLeft:'0px'}}>
                                    <p style={{marginTop:'10px',marginLeft:'0px'}} >Interval Start Time</p>
                                </Col>
                                <Col  xs="6"  style={{marginTop:'10px'}}>
                                    <TimePicker style={{alignItems:'right'}} colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.lunchStart}
                                                onTimeChange={this.onTimeChangeIntStartTime.bind(this)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4" style={{marginTop:'10px',marginLeft:'0px'}}>
                                    <p style={{marginTop:'10px',marginLeft:'0px'}}>Interval End Time</p>
                                </Col>
                                <Col xs="6" style={{marginTop:'10px'}}>
                                    <TimePicker colorPalette="light" theme="classic"  format={'HH:mm'} time={this.state.lunchEnd}
                                                onTimeChange={this.onTimeChangeIntEndTime.bind(this)}/>
                                </Col>
                            </Row>
                        </div>
                    </Row>


                    <FormControl variant="outlined" >
                        <InputLabel htmlFor="outlined-age-native-simple">TimeSlot</InputLabel>
                        <Select
                            native
                            value={this.state.timeSlot}
                            onChange={this.handleChange}
                            label="TimeSlot"
                            inputProps={{
                                name: 'TimeSLot',
                                id: 'outlined-age-native-simple',
                            }}>
                            <option value={60}>1 Hour</option>
                            <option value={30}>30 Minute</option>
                        </Select>
                    </FormControl>

                    {this.checkWithTimeSlot()}

                    <Row style={{marginTop:'10px'}}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveOutlined />}
                                onClick={this.onSaveTime}
                                hidden={isSetTime}
                                style={{marginTop:'10px'}}
                                disabled={disable}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'10px'}}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<UpdateOutlined />}
                                onClick={this.accessUpdate}
                                hidden={ !isUpdate || !isSetTime}
                                style={{marginTop:'10px'}}
                            >
                                Do You Want To update
                            </Button>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'10px'}}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<UpdateSharp />}
                                onClick={this.updateDates}
                                hidden={!isSetTime || isUpdate }
                                style={{marginTop:'10px'}}
                                disabled={disable}
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'10px'}}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteForeverRounded />}
                                onClick={this.deletealls}
                                hidden={!isSetTime}
                                style={{marginRight:'10px'}}
                            >
                                Delete All
                            </Button>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'10px'}}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteForeverRounded />}
                                onClick={()=>this.props.history.push('/')}
                                style={{marginRight:'10px'}}
                            >
                                MainView
                            </Button>
                        </Col>
                    </Row>



                </Container>
                    </LoadingScreen>
                </div>
            )

    }

    onSaveTime = () => {
        this.setState({ loading: true }, () => {
            window.location.reload()

                firebase.database().ref('WorkingTime').set({
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    lunchStart : this.state.lunchStart,
                    lunchEnd : this.state.lunchEnd,
                    timeSlot:this.state.timeSlot
                })

        })
    }

    accessUpdate = () => {
        if(this.state.isSetTime){
            confirmAlert({
                title: 'Confirm',
                message: 'Are you sure to Update Working Daye',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>  this.setState({isUpdate:false})
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
    }

    updateDates = () => {
        confirmAlert({
            title: 'Confirm Update',
            message: 'Are you sure to Update  Working Days',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ loading: true }, () => {
                            window.location.reload()
                            firebase.database().ref('WorkingTime').remove()
                            firebase.database().ref('WorkingTime').set({
                                startTime: this.state.startTime,
                                endTime: this.state.endTime,
                                lunchStart : this.state.lunchStart,
                                lunchEnd : this.state.lunchEnd,
                                timeSlot:this.state.timeSlot
                            })
                            this.getData()
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    deletealls = () => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure to Delete All Working Days',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ loading: true }, () => {
                            window.location.reload()
                            firebase.database().ref('WorkingTime').remove().then(this.getData)
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    checkWithTimeSlot = () => {
        var start = moment(this.state.startTime, 'HH:mm');
        var end = moment(this.state.endTime, 'HH:mm');

        var result = [];

        var current = moment(start);

        while (current <= end) {
            result.push(current.format('HH:mm'));
            current.add(this.state.timeSlot, 'minutes');
        }
        var last = moment(result[result.length-1], 'HH:mm');
        var gap = end.diff(last, 'minutes')

        if(gap === 0) {
            var keyS = result.indexOf(this.state.lunchStart)
            var keyE = result.indexOf(this.state.lunchEnd)
            if(keyE === -1 || keyS === -1){
                return(<Alert style={{height:'50px'}}  color="warning">
                    <p style={{textAlign:'center',paddingTop:'0px'}}>Change Lunch Start or End Time or TimeSlot</p>
                </Alert>)
            }
        }else {
            return (
                <Alert style={{height:'50px'}}  color="success">
                    <p style={{textAlign:'center',paddingTop:'0px'}}>Change Start or End Time or TimeSlot</p>
                </Alert>
            )
        }




    }

}
