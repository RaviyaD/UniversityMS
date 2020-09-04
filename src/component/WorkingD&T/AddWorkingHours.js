import React, {Component} from "react";
import * as firebase from "firebase";
import {Container, Row, Col} from 'reactstrap';
import Alert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import {Button} from "@material-ui/core";
import {
    DateRangeRounded,
    DeleteForeverRounded,
    HomeRounded,
    SaveOutlined,
    UpdateSharp
} from "@material-ui/icons";
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
                        spinnerColor='#000000'
                        textColor='#000000'
                        text='Loading'
                    >
                <Container>
                    <Typography style={{fontFamily:'Lucida Bright'}} component="h1" variant="h4" align="center">
                        Working Hours
                    </Typography>

                    <Row>
                        <div  style={{ backgroundColor: '#d5d0e5', width: '600px', border: '10px solid black', padding: '10px', margin: 'auto', alignItems:'center'}}>

                            <Row>
                                <Col xs="4" style={{marginTop:'5px',marginLeft:'0px'}}>
                                    <p align={"center"} style={{marginTop:'10px',marginLeft:'0px'}} className={"font-weight-bolder"} >Start Time</p>
                                </Col>
                                <Col  xs="6"  style={{marginTop:'5px'}}>
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
                                <Col xs="4" style={{marginTop:'5px',marginLeft:'0px'}}>
                                    <p align={"center"} className={"font-weight-bolder"}  style={{marginTop:'10px',marginLeft:'0px'}}>End Time</p>
                                </Col>
                                <Col xs="6" style={{marginTop:'10px'}}>
                                    <TimePicker  colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.endTime}
                                                 timeConfig={{
                                                     from: 6,
                                                     to: 20,
                                                     step: 15,
                                                     unit: 'minutes'
                                                 }}   onTimeChange={this.onTimeChangeEndTime.bind(this)}/>
                                </Col>
                            </Row>
                        </div>
                    </Row>

                    <Row style={{marginBottom:'10px'}}>
                        <div style={{ backgroundColor: '#d5d0e5', width: '600px', border: '10px solid black', padding: '10px', margin: 'auto'}}>

                            <Row>
                                <Col xs="4" style={{marginTop:'5px',marginLeft:'0px'}}>
                                    <p align={"center"} className={"font-weight-bolder"} style={{marginTop:'10px',marginLeft:'0px'}} >Interval Start Time</p>
                                </Col>
                                <Col  xs="6"  style={{marginTop:'5px'}}>
                                    <TimePicker style={{alignItems:'right'}} colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.lunchStart}
                                                timeConfig={{
                                                    from: 6,
                                                    to: 20,
                                                    step: 15,
                                                    unit: 'minutes'
                                                }}   onTimeChange={this.onTimeChangeIntStartTime.bind(this)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="4" style={{marginTop:'5px',marginLeft:'0px'}}>
                                    <p align={"center"} className={"font-weight-bolder"} style={{marginTop:'10px',marginLeft:'0px'}}>Interval End Time</p>
                                </Col>
                                <Col xs="6" style={{marginTop:'5px'}}>
                                    <TimePicker colorPalette="dark" theme="classic"  format={'HH:mm'} time={this.state.lunchEnd}
                                                timeConfig={{
                                                    from: 6,
                                                    to: 20,
                                                    step: 15,
                                                    unit: 'minutes'
                                                }}   onTimeChange={this.onTimeChangeIntEndTime.bind(this)}/>
                                </Col>
                            </Row>
                        </div>
                    </Row>


                    <FormControl size={'small'} className={'d-flex justify-content-center'} style={{margin:'5px'}} variant="outlined" >
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
                    <p  className={"d-flex justify-content-center"} style={{margin:'5px',display:'inline', fontFamily:'Candara',fontSize:'25px'}}>Total  Hours of a Day  :  <strong style={{fontSize:'25px'}}> {this.totHours()}</strong></p>

                    <Row className={'d-flex justify-content-center'} style={{marginTop:'5px'}}>
                    {this.checkWithTimeSlot()}
                    </Row>

                    <Row className={'d-flex justify-content-center'} style={{marginTop:'5px'}}>
                        <Col sm="auto" >
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<SaveOutlined />}
                                onClick={this.onSaveTime}
                                hidden={isSetTime}
                                style={{marginTop:'10px'}}
                                disabled={disable}
                                size={'small'}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>



                    <Row  className={'d-flex justify-content-center'} style={{marginTop:'5px'}}>

                        <Col sm="auto" >
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<UpdateSharp />}
                                onClick={this.updateDates}
                                hidden={!isSetTime }
                                style={{marginTop:'10px'}}
                                disabled={disable}
                                size={'small'}
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>


                    <Row style={{marginTop:'10px'}} >

                        <Button
                            variant="outlined"
                            color={"primary"}
                            startIcon={<HomeRounded />}
                            onClick={()=>this.props.history.push('/workingView')}
                            size={'small'}
                        >
                            MainView
                        </Button>

                        <Button
                            hidden={ !isSetTime }
                            className={'justify-content-center'}
                            variant="outlined"
                            color="secondary"
                            startIcon={<DeleteForeverRounded />}
                            onClick={this.deletealls}
                            style={{marginLeft:'auto'}}
                            size={'small'}
                        >
                            Delete All Data
                        </Button>


                        <Button style={{marginLeft:'auto'}}
                            variant="outlined"
                            color={"primary"}
                            startIcon={<DateRangeRounded />}
                            onClick={()=>this.props.history.push('/workingDays')}
                            size={'small'}
                        >
                            Working Days
                        </Button>

                    </Row>




                </Container>
                    </LoadingScreen>
                </div>
            )

    }

    onSaveTime = () => {

        confirmAlert({
            title: 'Confirm Update',
            message: 'Are you sure to Save Details',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState({ loading: true }, () => {
                           // window.location.reload()
                            firebase.database().ref('WorkingTime').set({
                                startTime: this.state.startTime,
                                endTime: this.state.endTime,
                                lunchStart : this.state.lunchStart,
                                lunchEnd : this.state.lunchEnd,
                                timeSlot:this.state.timeSlot
                            }).then(()=>this.props.history.push('/workingView'))

                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
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
                           // window.location.reload()
                            firebase.database().ref('WorkingTime').remove()
                            firebase.database().ref('WorkingTime').set({
                                startTime: this.state.startTime,
                                endTime: this.state.endTime,
                                lunchStart : this.state.lunchStart,
                                lunchEnd : this.state.lunchEnd,
                                timeSlot:this.state.timeSlot
                            }).then(()=>this.props.history.push('/workingView'))

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

                            firebase.database().ref('WorkingTime').remove().then(() => {this.props.history.push('/workingView')})
                            this.props.history.push('/workingView')
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
                return(<Alert className={'d-flex justify-content-center'} style={{height:'40px',margin:'10px',textAlign:'center'}} severity={"error"}>
                    <p style={{textAlign:'center',paddingTop:'0px'}}>Change Lunch Start or End Time or TimeSlot</p>
                </Alert>)
            }
        }else {
            return (
                <Alert className={'d-flex justify-content-center'} style={{height:'40px',margin:'10px',textAlign:'center'}} severity={"error"}>
                    <p style={{textAlign:'center',paddingTop:'0px'}}>Change Start or End Time or TimeSlot</p>
                </Alert>
            )
        }




    }

    totHours = () => {
        var start = moment(this.state.startTime, 'HH:mm');
        var end = moment(this.state.endTime, 'HH:mm');


        var gap = end.diff(start, 'minutes')
        var x = gap
        var d = moment.duration(x, 'minutes');
        var hours = Math.floor(d.asHours());
        var mins = Math.floor(d.asMinutes()) - hours * 60;
        let j
        if(mins === 0)
            j = hours +" hours"
        else
            j = hours +" hours : "+mins + " mins"
        return j
    }

}
