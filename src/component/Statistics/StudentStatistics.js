import React,{Component} from 'react'
import ReactApexChart from 'react-apexcharts'
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class StudentStatistics extends Component{
    constructor(props){
        super(props);
        this.handleYear = this.handleYear.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleType = this.handleType.bind(this);
        this.state = {
            year1:'1',
            semester:'1',
            Programmes:[],
            proNo:0,
            gNo:0,
            Groups:[],
            proType:'',
            totProgrammes: [{
                data: []
            }],
            options1: {
                chart: {
                    type: 'bar',
                    height: 50,
                    width: 50,

                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        columnWidth:"20%",
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    fontSize:'20px',
                    categories: ['Percentage'
                    ],
                },
                yaxis:{
                    forceNiceScale: false,
                    max: 100,
                    labels: {
                        formatter: (value) => value+ "%",
                    },
                }
            },
            totGroupss: [{
                data: []
            }],
            options2: {
                chart: {
                    type: 'bar',
                    height: 50,
                    width: 50,

                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        columnWidth:"20%",
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    fontSize:'20px',
                    categories: ['Percentage'
                    ],
                },
                yaxis:{
                    forceNiceScale: false,
                    max: 100,
                    labels: {
                        formatter: (value) => value+ "%",
                    },
                }
            },
        };
    }

    handleYear(event){
        this.setState({
            year1: event.target.value
        },()=>{this.calculations()})
    }
    handleSemester(event){
        this.setState({
            semester: event.target.value
        },()=>{this.calculations()})
    }
    handleType(event){
        this.setState({
            proType: event.target.value
        },()=>{this.calculateGroups()})
    }

    calculations(){
        firebase.database().ref('Student/' + this.state.year1 + "/semesters/" + this.state.semester + "/programmes/").on('value', snapshot => {
            let allProgramme = [];
            let p =0;
            snapshot.forEach(snap => {
                console.log(snap.val().Groups);
                allProgramme.push(snap.key);
                p = p + 1;
            });
            console.log("pno" + p)
            let totP = [];

            totP.push(0);
            totP.push(p);
            totP.push(0);
            this.setState({
                totProgrammes: [{
                    data: totP
                }],
                Programmes: allProgramme,
            },()=>console.log("success"));

        })
    }
    calculateGroups(){
        firebase.database().ref('Student/' + this.state.year1 + "/semesters/" + this.state.semester + "/programmes/" + this.state.proType + "/Groups").on('value', snapshot3 => {
            let g =0;
            snapshot3.forEach(snap3 => {
                console.log(snap3.key);
                g = g + 1
            });
            console.log("gno" + g)
            let totG =[];
            totG.push(0);
            totG.push(g);
            totG.push(0);
            this.setState({

                totGroupss: [{
                    data: totG
                }],
            })

            this.setState({
                gNo: g
            },()=>console.log("success"));

        })



    }


    render(){


        return(
            <div id="chart">
                <h6 style={{ marginTop: '30px',marginBottom:'30px'}} align="center">Programme Percentage by Year & Semester</h6>
                <Form style={{ marginLeft: '20%'}}>
                    <Row>
                    <Col sm="4" style={{ marginTop: '30px',marginBottom:'30px',borderColor:'#333333'}}>
                        <label>Select Year</label>
                        <Form.Control as="select"  style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleYear} value={this.state.year1}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Col>
                    <Col sm="4" style={{ marginTop: '30px',marginBottom:'30px',borderColor:'#333333'}}>
                        <label>Select Semester</label>
                        <Form.Control as="select"  style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleSemester} value={this.state.semester}>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                    </Col>
                    </Row>
                </Form>

                <Form style={{ marginLeft: '10%'}}>
                    <Col sm="9">
                        <ReactApexChart options={this.state.options1} series={this.state.totProgrammes} type="bar" height={350} />
                    </Col></Form>
                <h6 style={{ marginTop: '30px',marginBottom:'30px'}} align="center">Group Percentage by Programmes</h6>
              <Form style={{ marginLeft: '20%'}}>
                <Col sm="8">
                    <label>Select Programme</label>
                    <Form.Control as="select" placeholder={this.state.proType} onChange={this.handleType}>
                        <option>select</option>
                        {this.state.Programmes.map(name => (
                            <option
                                key={name}
                                value={name}
                            >
                                {name}
                            </option>
                        ))}
                    </Form.Control>
                </Col></Form>
                <Form style={{ marginLeft: '10%'}}>
                    <Col sm="9">
                        <ReactApexChart options={this.state.options2} series={this.state.totGroupss} type="bar" height={350} />
                    </Col></Form>
            </div>


        )
    }
}
