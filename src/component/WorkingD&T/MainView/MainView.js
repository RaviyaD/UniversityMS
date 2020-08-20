import React, {Component} from "react";
import LoadingScreen from 'react-loading-screen'
import Container from "reactstrap/es/Container";
import {Button, Typography} from "@material-ui/core";
import * as firebase from "firebase";
import moment from "moment";
import {Row} from 'reactstrap';
import {DateRangeRounded, HourglassEmptyRounded} from "@material-ui/icons";
import TableView from "./TableView";

export default class MainView extends Component{
    constructor() {
        super();
        this.state = {
            selected :[],
            loading : true,
            isSetData:false,
            isSetTime:false,
            setSame : false,
            startTime: null,
            endTime: null,
            lunchStart : null,
            lunchEnd : null,
            timeSlot:null,
            result:[],
            tothr:"0 hours : 0 mins"
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        console.log(this.state.loading)
        const day = []
        let ref = firebase.database();

        ref.ref("Workingdays").on("value", snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach(daySnapShot => {
                    day.push(daySnapShot.key)

                })
                this.setState({selected: day})
            }else {
                console.log('hellow')
                this.setState({isSetData:false})
            }
        })

        ref.ref("WorkingTime").on("value", tsnapshot => {
            if(tsnapshot.exists()) {
                if(tsnapshot.hasChild('startTime')) {
                    this.setState({
                        startTime: tsnapshot.val().startTime,
                        endTime: tsnapshot.val().endTime,
                        lunchStart : tsnapshot.val().lunchStart,
                        lunchEnd : tsnapshot.val().lunchEnd,
                        timeSlot : tsnapshot.val().timeSlot
                    },() => this.setState({isSetTime: true}, () => {
                        this.setState({loading: false},() => {
                            this.setTableData(this.state.startTime, this.state.endTime,this.state.timeSlot)
                        })
                    }))

                }

            }else {
                this.setState({isSetTime:false},()=>this.setState({loading:false}))
            }
        });
    }

    render() {
       const {selected,result} = this.state
        return(
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#ffffff'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Loading'
            >
               <Container>
                   <Typography style={{fontFamily:'Lucida Bright'}} component="h1" variant="h4" align="center">
                       Working Dates & Times
                   </Typography>

                   <TableView selected={selected} result={result} lstrt={this.state.lunchStart} lend={this.state.lunchEnd}
                    isSetTime={this.state.isSetTime}/>

                   <Row style={{marginTop:'10px'}} >

                           <Button
                               variant="outlined"
                               color={"primary"}
                               startIcon={<DateRangeRounded />}
                               onClick={()=>this.props.history.push('/workingDays')}
                               size={'small'}
                           >
                               Working Days
                           </Button>


                           <p  className={"text-center"} style={{margin:'auto',display:'inline', fontFamily:'Candara',fontSize:'15px'}}>Total  Hours of a Week :<strong style={{fontSize:'20px'}}> {this.state.tothr}</strong></p>

                           <Button style={{marginLeft:'auto'}}
                               variant="outlined"
                               color="primary"
                               startIcon={<HourglassEmptyRounded />}
                               onClick={()=>this.props.history.push('/workingTimes')}
                                   size={'small'}
                           >
                                Working Hours
                           </Button>

                   </Row>
               </Container>
            </LoadingScreen>
        )

    }

    setTableData = (strt,end,slot) => {
        var start = moment(strt, 'HH:mm');
        var end = moment(end, 'HH:mm');

        var result = [];

        var current = moment(start);

        var gap = end.diff(start, 'minutes') * this.state.selected.length

        var x = gap
        var d = moment.duration(x, 'minutes');
        var hours = Math.floor(d.asHours());
        var mins = Math.floor(d.asMinutes()) - hours * 60;
        let j
        if(mins === 0)
            j = hours +" hours"
        else
            j = hours +" hours : "+mins + " mins"
        this.setState({tothr:j})

        while (current <= end) {
            result.push(current.format('HH:mm'));
            current.add(slot, 'minutes');
        }
       console.log(result)
       this.setState({result:result})

    }

    gotoAddTime = () => {
        this.props.history.push('/workingTimes')
    }

}