import React,{Component} from 'react'
import ReactApexChart from 'react-apexcharts'
import * as firebase from "firebase";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class LecturerStatistics extends Component{
    constructor(props){
        super(props)
        this.handleBranchType = this.handleBranchType.bind(this);
        this.handleBranchType2 = this.handleBranchType2.bind(this);
        this.handleFacultyType = this.handleFacultyType.bind(this);

        this.state = {
            Lecturers:[],
            branchType:'Matara',
            branchType2:'Malabe',
            facultyType:'Faculty of Computing',
            lecturer_count: [{
                data:[]
            }],
            options1: {
                chart: {
                    type: 'bar',
                    height: 350,
                    width: '80%',
                    borderWidth:'1'
                },
                stroke: {
                    width: [0, 2]
                },
                title: {
                    text: 'Lecturer Percentage By Faculties',
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
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth:'40%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    axisBorder: { show: true },
                    axisTicks: { show: true },
                    width:'400px',
                    categories: ['Computing', 'Engineering','Business','Architecture',
                        'Humanities&Security','Research Works'
                    ],
                },
                yaxis: {
                    show: true,
                    forceNiceScale: false,
                    max: 100,
                    title: 'count in percentage',
                    labels: {
                        formatter: (value) => value.toFixed(0) +'%',
                    },
                },
                grid: {
                    show: true,
                },
            },
            levels: [],
            options2: {
                chart: {
                    width: 500,
                    type: 'pie',
                    position: 'center'

                },
                labels: ['Professor', 'Assistant Professor', 'Senior Lecturer(HG)', 'Senior Lecturer', 'Lecturer',
                'Assistant Lecturer','Instructor'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 500,
                            position:'center'
                        },
                        legend: {
                            position: 'bottom',
                        }
                    }
                }]
            }


        };
    }
    componentDidMount(){

        firebase.database().ref('lecturers').on('value', snapshot => {
            let allLecturers = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allLecturers.push(snap.val());
            });
            this.setState({ Lecturers: allLecturers},()=>this.getCountByCenter(),this.getCountByLevel());

        })


    }

    handleBranchType(event){
        this.setState({
            branchType: event.target.value
        },()=>{this.getCountByCenter()})
    }
    handleBranchType2(event){
        this.setState({
            branchType2: event.target.value
        },()=>{this.getCountByLevel()})
    }
    handleFacultyType(event){
        this.setState({
            facultyType: event.target.value
        },()=>{this.getCountByLevel()})
    }


    getCountByCenter(){
        let count = []
        let foc = 0;
        let foe = 0;
        let fob = 0;
        let soa = 0;
        let foh = 0;
        let fogr = 0;

        for(let j =0 ; j< this.state.Lecturers.length; j++){
            if(this.state.Lecturers[j].Center === this.state.branchType){
                if(this.state.Lecturers[j].Faculty === 'Faculty of Computing'){
                    foc = foc + 1
                }else if(this.state.Lecturers[j].Faculty === 'Faculty of Engineering'){
                    foe = foe + 1
                }else if(this.state.Lecturers[j].Faculty === 'Faculty of Business'){
                    fob = fob + 1
                }else if(this.state.Lecturers[j].Faculty === 'School of Architecture'){
                    soa = soa + 1
                }else if(this.state.Lecturers[j].Faculty === 'Faculty of Humanities and Security'){
                    foh = foh + 1
                }else if(this.state.Lecturers[j].Faculty === 'Faculty of Graduate Studies and Research'){
                    fogr = fogr + 1
                }

            }
        }
        count.push(foc);
        count.push(foe);
        count.push(fob);
        count.push(soa);
        count.push(foh);
        count.push(fogr);
        console.log(count)
        this.setState({
            lecturer_count:[{
                data:count
            }]
        })

    }
    getCountByLevel(){

        let level_count = []
        let prof = 0;
        let aprof = 0;
        let slecHG = 0;
        let slec = 0;
        let lec = 0;
        let alec = 0;
        let ins = 0;

        for(let j =0 ; j< this.state.Lecturers.length; j++){
            if(this.state.Lecturers[j].Center === this.state.branchType2){
                if(this.state.Lecturers[j].Faculty === this.state.facultyType){
                    if(this.state.Lecturers[j].Level === 'Professor'){
                        prof = prof + 1
                    }else if(this.state.Lecturers[j].Level === 'Assistant Professor'){
                        aprof = aprof + 1
                    }else if(this.state.Lecturers[j].Level === 'Senior Lecturer(HG)'){
                        slecHG = slecHG + 1
                    }else if(this.state.Lecturers[j].Level === 'Senior Lecturer'){
                        slec = slec + 1
                    }else if(this.state.Lecturers[j].Level === 'Lecturer'){
                        lec = lec + 1
                    }else if(this.state.Lecturers[j].Level === 'Assistant Lecturer'){
                        alec = alec + 1
                    }else if(this.state.Lecturers[j].Level === 'Instructor'){
                        ins = ins + 1
                    }

                }

            }
        }
        level_count.push(prof);
        level_count.push(aprof);
        level_count.push(slecHG);
        level_count.push(slec);
        level_count.push(lec);
        level_count.push(alec);
        level_count.push(ins);
        console.log("count is " + level_count)
        this.setState({
            levels:level_count
        })


    }

    render(){
     if(this.state.Lecturers.length===0){
         return null;
     }

        return(
            <div>
                <Form>
                    <Col sm="7" style={{ marginTop: '30px',marginBottom:'30px',borderColor:'#333333'}}>
                        <Form.Control as="select"  style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleBranchType} value={this.state.branchType}>
                            <option>Malabe</option>
                            <option>Metro</option>
                            <option>Matara</option>
                            <option>Kandy</option>
                            <option>Kurunagala</option>
                            <option>Jaffna</option>
                        </Form.Control>

                    </Col>
                </Form>


                <div id="chart">
                <ReactApexChart options={this.state.options1} series={this.state.lecturer_count} type="bar" height={350} />
                <hr/>
                <br/>
                    <h5 align="center">Lecturer Percentage By Levels</h5>
                    <Form>
                        <Row>
                        <Col sm="4" style={{ marginTop: '30px',marginBottom:'30px',borderColor:'#333333'}}>
                            <Form.Control as="select"  style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleBranchType2} value={this.state.branchType2}>
                                <option>Malabe</option>
                                <option>Metro</option>
                                <option>Matara</option>
                                <option>Kandy</option>
                                <option>Kurunagala</option>
                                <option>Jaffna</option>
                            </Form.Control>

                        </Col>
                        <Col sm="6" style={{ marginTop: '30px',marginBottom:'30px',borderColor:'#333333'}}>
                            <Form.Control as="select"  style={{  marginRight: '30px',fontcolor:'black' }} onChange={this.handleFacultyType} value={this.state.facultyType}>
                                <option>Faculty of Computing</option>
                                <option>Faculty of Engineering</option>
                                <option>Faculty of Business</option>
                                <option>School of Architecture</option>
                                <option>Faculty of Humanities and Security</option>
                                <option>Faculty of Graduate Studies and Research</option>
                            </Form.Control>

                        </Col></Row>
                    </Form>

                        <ReactApexChart options={this.state.options2} series={this.state.levels} type="pie" width={380} />
            </div>
            </div>
        )
    }
}
