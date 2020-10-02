import React, {Component} from 'react';
import * as firebase from "firebase";
import moment from "moment";
import LecTimeTableView from "./LecTimeTableView";
import {ListGroup,ListGroupItem,Modal,ModalBody,ModalFooter,ModalHeader,Badge} from 'reactstrap'
import {Button,Tab, Tabs} from "react-bootstrap";
import GroupTimeTable from "./GroupTimeTable";
import RoomTimeTable from "./RoomTimeTable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



class Genarate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            roomAllocations: [],
            lectures: [],
            students: [],
            group:[],
            subGroup: [],
            workingDays: [],
            buildings: [],
            parallelSessions: [],
            consectiveSession: [],
            notAvalibleTime : [],
            workingTime:{},
            loadingData : true,
            genaratedTabel : [],
            setSession : [],
            type : '',
            value:'',
            errors : [],
            model : false
        }
    }

    componentDidMount() {
        this.getAllSession()
    }

    getAllSession = () => {
        const array = []
        firebase.database().ref('sessions').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push({key:data.key, data: data.val()})
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
        this.setState({students:array},() => this.getAllGroups())
    }

    getAllGroups = () => {
        const array = []
        firebase.database().ref('GroupIDs').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val().ID)
            })
        })
        this.setState({group:array},() => this.getAllSubGroups())
    }

    getAllSubGroups = () => {
        const array = []
        firebase.database().ref('SubGroup').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val().ID)
            })
        })
        this.setState({subGroup:array},() => this.getAllWorkingDays())
    }

    getAllWorkingDays = () => {
        const array = []
        firebase.database().ref('Workingdays').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.key)
            })
        })
        this.setState({workingDays:array},() => {
            this.getAllBuildings()
        })
    }

    getAllBuildings = () => {
        firebase.database().ref('Buildings').on('value', snapshot => {
            let allRooms = [];
            snapshot.forEach(snap => {
                firebase.database().ref('Buildings/'+snap.key).on('value', snapshot2 => {

                    snapshot2.forEach(snap2 => {
                        if(snap2.key !== 'buildingName' && snap2.key !== 'buildingId'){
                            allRooms.push(snap2.val());}
                    });
                })
            });

            this.setState({
                buildings:allRooms
            },() => {this.getAllParallelSessions()})
        })
    }

    getAllParallelSessions = () => {
        const array = []
        firebase.database().ref('overLapping').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({parallelSessions:array},() => this.getAllConsecSession())
    }

    getAllConsecSession = () => {
        const array = []
        firebase.database().ref('ConsecutiveSessions').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push({id:data.key, obj:data.val()})
            })
        })
        this.setState({consectiveSession:array},() => this.getAllNotAvailbleTimes())
    }

    getAllNotAvailbleTimes = () => {
        const array = []
        firebase.database().ref('Availability').on('value', snapshot => {
            snapshot.forEach(data => {
                array.push(data.val())
            })
        })
        this.setState({notAvalibleTime:array},() => {
            this.getAllWorkingTime()
        })
    }

    getAllWorkingTime = () => {
        const array = []
        firebase.database().ref('WorkingTime').on('value', snapshot => {
            this.setState({workingTime:snapshot.val()}, () => {this.setState({loadingData:false}, () => this.sortDayArray()) })
        })
        // this.setState({workingTime:array},() => console.log(this.state.sessions,this.state.roomAllocations,this.state.lectures,this.state.students,this.state.buildings,this.state.workingDays,this.state.parallelSessions,this.state.workingTime))

    }

    sortDayArray = () => {
        const list = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        let sorted = []
        for(let i=0;i<7;i++){
            for(let j=0;j<this.state.workingDays.length;j++){
                if(list[i] === this.state.workingDays[j])
                    sorted.push(this.state.workingDays[j])
            }
        }
        this.setState({workingDays:sorted})
    }

    slot = () => {
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

        for(let j = 0; j<(result.length-1); j++){
                var type = true
                if(moment(result[j],'HH:mm') >= moment(this.state.workingTime.lunchStart,'HH:mm') && moment(result[(j + 1)],'HH:mm') <= moment(this.state.workingTime.lunchEnd,'HH:mm') )
                    type = false
                else
                    type = true

                let obj = {
                    id:d,
                    type:type,
                    slot:result[j] + '-' + result[j+1]
                }
                d=d+1
                all.push(obj)

        }

        return all

    }

    createSlotIDs = () => {
        let start = moment(this.state.workingTime.startTime, 'HH:mm');
        let end = moment(this.state.workingTime.endTime, 'HH:mm');
        let result = [];
        let current = moment(start);
        while (current <= end) {
            result.push(current.format('HH:mm'));
            current.add(this.state.workingTime.timeSlot, 'minutes');
        }

        // let all = [];
        // let d = 0;
        // for(let i = 0; i<this.state.workingDays.length; i++){
        //
        //     for(let j = 0; j<result.length-1; j++){
        //         var type = true
        //         if(moment(result[j],'HH:mm') >= moment(this.state.workingTime.lunchStart,'HH:mm') && moment(result[(j + 1)],'HH:mm') <= moment(this.state.workingTime.lunchEnd,'HH:mm') )
        //             type = false
        //         else
        //             type = true
        //
        //         let obj = {
        //             id:d,
        //             day:this.state.workingDays[i].day,
        //             type:type,
        //             slot:result[j] + '-' + result[j+1]
        //         }
        //         d=d+1
        //         all.push(obj)
        //     }
        // }
       return result


    }

    render() {

        return (
            <div>
               <div className='mr-auto ml-auto'>

               </div>
                <Button hidden={this.state.genaratedTabel.length === 0} className='float-right btn-warning' onClick={()=>this.setState({model:true})}>Errors<Badge pill>{this.state.errors.length}</Badge></Button>

                { this.state.genaratedTabel.length === 0 ?

                    <div className='container h-100'>
                        <div className='row h-100 justify-content-center align-items-center'>
                            { this.state.loadingData ? <Loader type="ThreeDots" color="#00BFFF" height={40} width={40} timeout={10000} /> :
                                <Button className='col-4' style={{marginTop:'25%'}} onClick={this.startGenarateTimetable} >Start Genarate Time Tables</Button>}
                   </div> </div> :

                <div>
                <Modal isOpen={this.state.model} >
                        <ModalHeader >Errors & Warnings</ModalHeader>
                        <ModalBody>
                            <ListGroup>
                                {
                                    this.state.errors.map((val,i) => {
                                        return <ListGroupItem key={i} className="justify-content-between">{val.msg}<Badge pill className='badge-warning'>{val.sid}</Badge></ListGroupItem>
                                    })
                                }
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={()=>this.setState({model:false})}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        <Tab eventKey="home" title="Lectures">
                            <LecTimeTableView days={this.state.workingDays} slots = {this.slot()} table={this.state.genaratedTabel} result ={this.createSlotIDs()}
                                              times={this.state.workingTime} lecName = {this.state.lectures} sessions={this.state.sessions} />
                        </Tab>
                        <Tab eventKey="group" title="Group">
                           <GroupTimeTable days={this.state.workingDays} slots = {this.slot()} table={this.state.genaratedTabel} result ={this.createSlotIDs()} times={this.state.workingTime} lecName = {this.state.lectures}
                                           group={this.state.group} subgroup = {this.state.subGroup} sessions={this.state.sessions}/>
                        </Tab>
                        <Tab eventKey="room" title="Room">
                            <RoomTimeTable days={this.state.workingDays} slots = {this.slot()} table={this.state.genaratedTabel} result ={this.createSlotIDs()} times={this.state.workingTime} lecName = {this.state.lectures}
                                            room={this.state.buildings} subgroup = {this.state.subGroup} sessions={this.state.sessions}/>
                        </Tab>
                    </Tabs>
                    </div>}
            </div>
        );
    }

     sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startGenarateTimetable = async  () => {
        const {  sessions,roomAllocations, lectures, students, subGroup,workingDays, buildings, parallelSessions, consectiveSession, notAvalibleTime, workingTime} = this.state
        // slot of a day
        let slotArr = this.slot()
        console.log(buildings)
        // Add Consective Session
        consectiveSession.forEach((sessionGroup) => {
            let  dayNum = 0
            let day = this.state.workingDays[dayNum]
            let startSlot = 0;
            let numberSlot = 0
            let groupNo = this.getBatchDetailsBySessionID(sessionGroup.obj.sessions[0])
            let roomName = this.getRoomNameConSession(sessionGroup.id)
            this.sleep(2000)
            sessionGroup.obj.sessions.forEach((session) => {
                let notOk = true
                let lectures = this.getLectureDetailsBySessionID(session)
                numberSlot = parseInt(this.getDurationBySessionID(session))
                this.alreadySetSession(session)
                this.sleep(2000)
                while (notOk){
                    let l = this.checkLecturesAvalability(lectures,day,startSlot,numberSlot)
                    this.sleep(2000)
                    if(this.checkGroupAvalability(groupNo,day,startSlot,numberSlot) && l && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                      setTimeout(() =>this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot),200)
                        //this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot)
                        notOk = false
                    }else {
                        startSlot++
                        if(startSlot+numberSlot >= this.slot().length){
                            dayNum++
                            startSlot = 0
                            if(dayNum > this.state.workingDays.length)
                                this.addErrorMessage('This session is not inserted',session)
                        }

                    }
                }
                startSlot += parseInt(this.getDurationBySessionID(session))
            })

        })

        parallelSessions.forEach((sessionsGroup) => {
            if(sessionsGroup.OverLapping){
                let  dayNum = 0
                let day = this.state.workingDays[dayNum]
                let startSlot = 0;
                sessionsGroup.sessions.forEach((session) => {
                    let notOk = true
                    let groupNo = this.getBatchDetailsBySessionID(session)
                    let lectures = this.getLectureDetailsBySessionID(session)
                    let roomName = this.selectPreferedRoom(lectures,groupNo,session)[0]
                    this.sleep(2000)
                    let numberSlot = parseInt(this.getDurationBySessionID(session))
                    this.alreadySetSession(session)
                    this.sleep(2000)
                    while (notOk){
                        let l = this.checkLecturesAvalability(lectures,day,startSlot,numberSlot)
                        this.sleep(2000)
                        if(this.checkGroupAvalability(groupNo,day,startSlot,numberSlot) && l && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                            setTimeout(() => this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot),200)
                           // this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot)
                            notOk = false
                        }else {
                            startSlot++
                            if(startSlot+numberSlot >= this.slot().length){
                                dayNum++
                                startSlot = 0
                                if(dayNum > this.state.workingDays.length)
                                    this.addErrorMessage('This session is not inserted',session)
                            }

                        }
                    }
                })
            }
        })

        sessions.forEach((session) => {
            if(!this.iSSetSession(session.key)){
                let dayNum = 0
                let startSlot = 0;
                let numberSlot = parseInt(this.getDurationBySessionID(session.key))
                let notOk = true
                let groupNo = this.getBatchDetailsBySessionID(session.key)
                let lectures = this.getLectureDetailsBySessionID(session.key)
                let roomName = this.selectPreferedRoom(lectures,groupNo,session.key)[0]
                this.sleep(2000)
                while (notOk){
                    let day = this.state.workingDays[dayNum]
                    let l = this.checkLecturesAvalability(lectures,day,startSlot,numberSlot)
                    this.sleep(2000)
                    if( l && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                       setTimeout(()=> this.allocateToTimeTable(session.key, lectures, groupNo, roomName, day, numberSlot, startSlot), 200)
                      //  this.allocateToTimeTable(session.key, lectures, groupNo, roomName, day, numberSlot, startSlot)
                        notOk = false
                    }else {
                        startSlot++
                        if(startSlot+numberSlot >= this.slot().length){
                            dayNum++
                            startSlot = 0
                            if(dayNum > this.state.workingDays.length) {
                                this.addErrorMessage('This session is not inserted', session)
                                notOk = false
                            }
                        }

                    }
                }
            }
        })

    }

    getLectureDetailsBySessionID = (sid) => {
        const {lectures,sessions} = this.state
        const lectureName = []
        sessions.map(value => {
           if(value.key === sid){
               value.data.Lecturers.map(name => {
                   lectureName.push(name)
               })
           }
        })
        return lectureName
    }

    getBatchDetailsBySessionID = (sid) => {
        const {lectures,sessions} = this.state
        let batch = ''
        sessions.map(value => {
            if(value.key === sid){
               batch = value.data.GroupID
            }
        })
        return batch
    }

    // getDurationBySessionId = (sid) => {
    //     const {sessions} = this.state
    //     let duration = 1
    //     sessions.map(value => {
    //         if(value.key === sid){
    //             duration = value.data.Duration
    //         }
    //     })
    //     if(this.state.workingTime.timeSlot === 30)
    //         duration = duration * 2
    //     return duration
    // }

    getRoomNameConSession = (sid) => {
        let room = ''
        this.state.roomAllocations.forEach((obj) => {
            if(sid === obj.name)
                room = obj.roomId
        })

        if(room === '') {
            room = this.selectRandomRoom(sid,'Not room set for this Consective session id. Random room is selected')
            this.sleep(2000)
        }
        return room
    }

    selectPreferedRoom = (lec , grp, sid) => {
        const {roomAllocations} = this.state
        let room = []
        roomAllocations.map(value => {
          lec.map(ln => {
              if(ln === value.name) {
                  room.push(value.roomId)
                  this.sleep(2000)
              }
          })
              if(grp === value.name) {
                  room.push(value.roomId)
                  this.sleep(2000)
              }
              else if (sid === value.name) {
                  room.push(value.roomId)
                  this.sleep(2000)
              }

        })
        if(room.length === 0){
            room.push(this.selectRandomRoom(sid,'Not room set for this session id. Random room is selected'))
            this.sleep(2000)
        }
        return room
    }

    selectRandomRoom = (sid,msg) => {
        const a = this.state.buildings
        const random = Math.floor(Math.random() * a.length);
        this.addErrorMessage(msg,sid)
        return a[random].roomName
    }

    range = (start, end, step) => {
        return Array.from(Array.from(Array(Math.ceil((end-start)/step)).keys()), x => start+ x*step);
    }

    allocateToTimeTable = async (sessionId,lecNames,grpName,RoomNo,day,numOfSlot,startSlot) => {
        let a = this.state.genaratedTabel

            let obj = {
                sessionId : sessionId,
                lecName : lecNames,
                grpName : grpName,
                RoomNo : RoomNo,
                day : day,
                startSlot : startSlot,
                numOfSlot : numOfSlot,
                slots : this.range(startSlot,(startSlot+numOfSlot),1)
            }
           a.push({"obj":obj})

       await this.setState({genaratedTabel:a}, () => this.sleep(5000))

    }

    checkRoomAvalability = (room,day,startSlot,numOfSlot) => {
        const {genaratedTabel} = this.state
        let status = true
        genaratedTabel.forEach((row) => {
            if(row.obj.RoomNo === room){
                if(row.obj.day === day){
                    if(row.obj.startSlot === startSlot){
                        status = false
                    }else {
                        let s = this.range(startSlot,(startSlot+numOfSlot),1)
                        s.map(v => {
                            row.obj.slots.map(y => {
                                if(v === y)
                                    status = false
                            })
                        })
                    }

                }
            }
        })
        return status
    }

    checkGroupAvalability = (group,day,startSlot,numOfSlot) => {
        const {genaratedTabel} = this.state
        let status = true
        genaratedTabel.forEach((row) => {
            if(row.obj.grpName === group){
                if(row.obj.day === day){
                    if(row.obj.startSlot === startSlot){
                        status = false
                    }else {
                        let s = this.range(startSlot,(startSlot+numOfSlot),1)
                        s.map(v => {
                            row.obj.slots.map(y => {
                                if(v === y)
                                    status = false
                            })
                        })
                    }

                }
            }
        })
        return status
    }

    checkLecturesAvalability = async (lecture,day,startSlot,numOfSlot) => {
        const {genaratedTabel} = this.state
        await this.sleep(2000)
        let status = true
       await genaratedTabel.forEach((row) => {
            lecture.map(lname => {
                if(row.obj.lecName.includes('Dulmini Dissanayake')){
                    if(row.obj.day === day){
                        if(row.obj.startSlot === startSlot){
                            status = false
                            this.sleep(2000)
                        }else {
                            let s = this.range(startSlot,(startSlot+numOfSlot),1)
                            s.map(v => {
                                row.obj.slots.map(y => {
                                    if(v === y) {
                                        status = false
                                        this.sleep(2000)
                                    }
                                })
                            })
                        }

                    }
                }
            })

        })
        await this.sleep(2000)
        return status
    }

    selectBestTimeSlot = (sid) => {
        const d = this.getDurationBySessionID(sid)
        //let noOfSlot = (d * 60)/this.state.workingTime.slot
        let time = this.createSlotIDs()
        let startTime = moment(time[0],'HH:mm')
        let endTime = moment(startTime).add(2, 'hours');
        const random = Math.floor(Math.random() * this.state.workingDays.length);
        let timeObj = {
            stime : startTime.format('HH:mm'),
            etime : endTime.format('HH:mm'),
            day : this.state.workingDays[random]
        }
        return timeObj
    }

    getDurationBySessionID = (sid) => {
        const {sessions} = this.state
        let duration = 1
        sessions.map(value => {
            if(value.key === sid){
                duration = parseInt(value.data.Duration)
            }
        })
        if(this.state.workingTime.timeSlot === 30)
            duration = duration * 2
        return duration
    }

    alreadySetSession = (sid) => {
        let a = this.state.setSession
        a.push(sid)
        this.setState({setSession:a})
    }

    iSSetSession = (sid) => {
        let status = false
        this.state.setSession.map(s => {
            if (s===sid)
                status = true
        })
        return status
    }

    addErrorMessage = (msg,sesid) => {
        let a = this.state.errors
        let obj = {
            sid: sesid,
            msg : msg
        }
        a.push(obj)
        this.setState({errors:a})
    }


}



export default Genarate;
