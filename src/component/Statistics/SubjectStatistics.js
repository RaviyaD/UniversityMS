import React,{Component} from 'react'
import ReactApexChart from 'react-apexcharts'
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class SubjectStatistics extends Component{
    constructor(props){
        super(props)
        this.state = {
            Subjects:[],
            Lectures:[],
            Labs:[],
            Tutes:[],
            totSub: [ {
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }],
            options1: {
                chart: {
                    type: 'bar',
                    height: 350,
                    width:500,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                title: {
                    text: 'Subject Count By Year & Semester',
                    align: 'center',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: '#263238'
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth:'40%',
                    },
                },
                xaxis: {
                    type: 'string',
                    categories: ['Year 1','Year 2','Year 3','Year 4'],
                },
                yaxis:{
                    labels: {
                        formatter: function(val, index) {
                            return val.toFixed(0);
                        }
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },
        };
    }
    componentDidMount(){

        firebase.database().ref('subjects').on('value', snapshot => {
            let allSubjects = [];
            let allLecHrs = [];
            let allTutHrs = [];
            let allLabHrs = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allSubjects.push(snap.val());
                allLecHrs.push(snap.val().LectureHours);
                allLabHrs.push(snap.val().LabHours);
                allTutHrs.push(snap.val().TuteHours);
            });
            this.setState({
                Subjects: allSubjects,
                Lectures:allLecHrs,
                Labs:allLabHrs,
                Tutes:allTutHrs
            },()=>this.calculations());

        })


    }
    calculations(){
        let year_sem1 = [];
        let year_sem2 = [];
        let y1s1 = 0;
        let y1s2 = 0;
        let y2s1 = 0;
        let y2s2 = 0;
        let y3s1 = 0;
        let y3s2 = 0;
        let y4s1 = 0;
        let y4s2 = 0;
        for(let j =0 ; j< this.state.Subjects.length; j++){
            if(this.state.Subjects[j].Year === '1'){
                if(this.state.Subjects[j].Semester === '1'){
                    y1s1 = y1s1 + 1
                }else if(this.state.Subjects[j].Semester === '2'){
                    y1s2 = y1s2 + 1
                }
            }else if(this.state.Subjects[j].Year === '2'){
                if(this.state.Subjects[j].Semester === '1'){
                    y2s1 = y2s1 + 1
                }else if(this.state.Subjects[j].Semester === '2'){
                    y2s2 = y2s2 + 1
                }
            }else if(this.state.Subjects[j].Year === '3'){
                if(this.state.Subjects[j].Semester === '1'){
                    y3s1 = y3s1 + 1
                }else if(this.state.Subjects[j].Semester === '2'){
                    y3s2 = y3s2 + 1
                }
            }else if(this.state.Subjects[j].Year === '4'){
                if(this.state.Subjects[j].Semester === '1'){
                    y4s1 = y4s1 + 1
                }else if(this.state.Subjects[j].Semester === '2'){
                    y4s2 = y4s2 + 1
                }
            }
        }
        year_sem1.push(y1s1);
        year_sem1.push(y2s1);
        year_sem1.push(y3s1);
        year_sem1.push(y4s1);

        year_sem2.push(y1s2);
        year_sem2.push(y2s2);
        year_sem2.push(y3s2);
        year_sem2.push(y4s2);
        console.log("s1====" + year_sem1);
        console.log("s2====" + year_sem2);

        this.setState({
            totSub: [ {
                name:'Semester 1',
                data: year_sem1
            }, {
                name:'Semester 2',
                data: year_sem2
            }]
        })
    }


    render(){


        return(
            <div id="chart">
                <ReactApexChart options={this.state.options1} series={this.state.totSub} type="bar" height={350} />
            </div>
        )
    }
}
