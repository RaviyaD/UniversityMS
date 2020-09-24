import React, {Component} from 'react';
import * as firebase from "firebase";
import LoadingScreen from "react-loading-screen";
import moment from "moment";

class Genarate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            roomAllocations: [],
            lectures: [],
            students: [],
            subGroup: [],
            workingDays: [],
            buildings: [],
            parallelSessions: [],
            workingTime:{},
            loadingData : true
        }
    }

    componentDidMount() {
        this.getAllSession()
    }

    //  fetch = () => {
    //   //  this.getAllSession()
    //     this.setState({sessions :  this.getAllSession()},
    //         () => this.setState({roomAllocations: this.getAllRoomAllocations()},
    //             () => this.setState({lectures: this.getAllLectures()},
    //                 ()=>this.setState({students:this.getAllStudents()},
    //                     () => this.setState({subGroup:this.getAllSubGroups()},
    //                         () => this.setState({workingDays:this.getAllWorkingDays()},
    //                             () => this.setState({buildings:this.getAllBuildings()},
    //                                 () => this.setState({parallelSessions:this.getAllParallelSessions()},
    //                                     () => this.setState({workingTime:this.getAllWorkingTime()},
    //                                         () => this.setState({loadingData:false},
    //                                             () =>this.createSlotIDs() ))))))))))
    // }

    getAllSession = () => {
        const array = []
        firebase.database().ref('sessions').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({sessions:array},() => this.getAllRoomAllocations())

    }

    getAllRoomAllocations = () => {
        const array = []
        firebase.database().ref('RoomAllocation').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({roomAllocations:array},() => this.getAllLectures())
    }

    getAllLectures = () => {
        const array = []
        firebase.database().ref('lecturers').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({lectures:array},() => this.getAllStudents())
    }

    getAllStudents = () => {
        const array = []
        firebase.database().ref('Student').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({students:array},() => this.getAllSubGroups())
    }

    getAllSubGroups = () => {
        const array = []
        firebase.database().ref('SubGroup').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({subGroup:array},() => this.getAllWorkingDays())
    }

    getAllWorkingDays = () => {
        const array = []
         firebase.database().ref('Workingdays').on('value', snapshot => {
             snapshot.forEach(data => {
                 console.log(data.val())
               array.push(data.toJSON())
           })
        })
        this.setState({workingDays:array},() => this.getAllBuildings())
    }

    getAllBuildings = () => {
        const array = []
        firebase.database().ref('Buildings').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({buildings:array},() => this.getAllParallelSessions())
    }

    getAllParallelSessions = () => {
        const array = []
        firebase.database().ref('parallelSessions').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({parallelSessions:array},() => this.getAllWorkingTime())
    }

    getAllWorkingTime = () => {
        const array = []
        firebase.database().ref('WorkingTime').on('value', snapshot => {
            this.setState({workingTime:snapshot.val()}, () => {this.setState({loadingData:false}, () => this.createSlotIDs()) })
        })
       // this.setState({workingTime:array},() => console.log(this.state.sessions,this.state.roomAllocations,this.state.lectures,this.state.students,this.state.buildings,this.state.workingDays,this.state.parallelSessions,this.state.workingTime))

    }

    createSlotIDs = () => {
        console.log(this.state.workingDays[0].day)
        let start = moment(this.state.workingTime.startTime, 'HH:mm');
        let end = moment(this.state.workingTime.endTime, 'HH:mm');
        let result = [];
        let current = moment(start);
        while (current <= end) {
            result.push(current.format('HH:mm'));
            current.add(this.state.workingTime.timeSlot, 'minutes');
            }

            let all = [];
            let d = 0;
            for(let i = 0; i<this.state.workingDays.length; i++){

                for(let j = 0; j<result.length-1; j++){
                    var type = true
                    if(moment(result[j],'HH:mm') >= moment(this.state.workingTime.lunchStart,'HH:mm') && moment(result[(j + 1)],'HH:mm') <= moment(this.state.workingTime.lunchEnd,'HH:mm') )
                        type = false
                    else
                        type = true

                    let obj = {
                        id:d,
                        day:this.state.workingDays[i].day,
                        type:type,
                        slot:result[j] + '-' + result[j+1]
                    }
                    d=d+1
                    all.push(obj)
                }
            }
            console.log(all)


    }

    render() {
        // if(this.state.lectures.length === 0)
        //     return null
        return (
            <div>

                <LoadingScreen
                    loading={this.state.loadingData}
                    bgColor='#ffffff'
                    spinnerColor='#000000'
                    textColor='#000000'
                    text='Loading Data'
                >
                    <h1>Kala</h1>
                    <button onClick={this.createSlotIDs}>Press</button>
                </LoadingScreen>
            </div>
        );
    }
}

export default Genarate;
