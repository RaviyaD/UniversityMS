import React, {Component} from 'react';
import * as firebase from "firebase";
import LoadingScreen from "react-loading-screen";
import moment from "moment";
import LecTimeTableView from "./LecTimeTableView";
import {ListGroup,ListGroupItem,Modal,ModalBody,ModalFooter,ModalHeader,Badge} from 'reactstrap'
import {Button, Col, Row, Tab, Tabs} from "react-bootstrap";
import GroupTimeTable from "./GroupTimeTable";
import RoomTimeTable from "./RoomTimeTable";



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
        this.setState({workingDays:sorted},()=> this.startGenarateTimetable())
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

                <LoadingScreen
                    loading={this.state.loadingData}
                    bgColor='#ffffff'
                    spinnerColor='#000000'
                    textColor='#000000'
                    text='Loading Data'
                >
                    <Button className='float-right btn-warning' onClick={()=>this.setState({model:true})}>Errors<Badge pill>{this.state.errors.length}</Badge></Button>
                    <Modal isOpen={this.state.model} >
                        <ModalHeader >Errors & Warnings</ModalHeader>
                        <ModalBody>
                            <ListGroup>
                                {
                                    this.state.errors.map((val,i) => {
                                        return <ListGroupItem className="justify-content-between">{val.msg}<Badge pill>{val.sid}</Badge></ListGroupItem>
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
                </LoadingScreen>
            </div>
        );
    }

    startGenarateTimetable = () => {
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

            sessionGroup.obj.sessions.forEach((session) => {
                let notOk = true
                let lectures = this.getLectureDetailsBySessionID(session)
                numberSlot = parseInt(this.getDurationBySessionID(session))
                this.alreadySetSession(session)
                while (notOk){
                    if(this.checkGroupAvalability(groupNo,day,startSlot,numberSlot) && this.checkLecturesAvalability(lectures,day,startSlot,numberSlot) && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                        this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot)
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
                    let numberSlot = parseInt(this.getDurationBySessionID(session))
                    this.alreadySetSession(session)
                    while (notOk){

                        if(this.checkGroupAvalability(groupNo,day,startSlot,numberSlot) && this.checkLecturesAvalability(lectures,day,startSlot,numberSlot) && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                            this.allocateToTimeTable(session, lectures, groupNo, roomName, day, numberSlot, startSlot)
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
                while (notOk){
                    let day = this.state.workingDays[dayNum]
                    if(this.checkLecturesAvalability(lectures,day,startSlot,numberSlot) && this.checkRoomAvalability(roomName,day,startSlot,numberSlot) && this.slot()[startSlot].type) {
                        this.allocateToTimeTable(session.key, lectures, groupNo, roomName, day, numberSlot, startSlot)
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

    getDurationBySessionId = (sid) => {
        const {sessions} = this.state
        let duration = ''
        sessions.map(value => {
            if(value.key === sid){
                duration = value.data.Duration
            }
        })
        if(this.state.workingTime.timeSlot === 30)
            duration = duration * 2
        return duration
    }

    getRoomNameConSession = (sid) => {
        let room = ''
        this.state.roomAllocations.forEach((obj) => {
            if(sid === obj.name)
                room = obj.roomId
        })

        if(room === '') {
            room = this.selectRandomRoom(sid,'Not room set for this Consective session id. Random room is selected')
        }

        return room
    }

    selectPreferedRoom = (lec , grp, sid) => {
        const {roomAllocations} = this.state
        let room = []
        roomAllocations.map(value => {
          lec.map(ln => {
              if(ln === value.name)
                  room.push(value.roomId)
          })
              if(grp === value.name)
                  room.push(value.roomId)
              else if (sid === value.name)
                  room.push(value.roomId)

        })
        if(room.length === 0){
            room.push( room = this.selectRandomRoom(sid,'Not room set for this session id. Random room is selected'))
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

    allocateToTimeTable = (sessionId,lecNames,grpName,RoomNo,day,numOfSlot,startSlot) => {
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

        this.setState({genaratedTabel:a})
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

    checkLecturesAvalability = (lecture,day,startSlot,numOfSlot) => {
        const {genaratedTabel} = this.state
        let status = true
        genaratedTabel.forEach((row) => {
            lecture.map(lname => {
                if(row.obj.lecName.includes('Dulmini Dissanayake')){
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

        })
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
        const {lectures,sessions} = this.state
        let duration = ''
        sessions.map(value => {
            if(value.key === sid){
                duration = value.data.Duration
            }
        })
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
        this.setState({errors:a},()=>console.log(this.state.errors))
    }


}



export default Genarate;
