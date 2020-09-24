import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import HomePage from "./component/Home/HomePage";
import MainLecturer from "./component/Lecturer/mainLecturer";
import MainSubject from "./component/Subject/mainSubject";
import Session from "./component/Session/session";
import AddWorkingHours from "./component/WorkingD&T/AddWorkingHours";
import LocationMain from "./component/Location/LocationMain";
import AddWorkingDays from "./component/WorkingD&T/AddWorkingDays";
import MainView from "./component/WorkingD&T/MainView/MainView";
import EditBuilding from "./component/Location/Building/EditBuilding";
import EditRoom from "./component/Location/Room/EditRoom";
import RoomInformation from "./component/Location/Room/RoomInformation";
import BuildingInformation from "./component/Location/Building/BuildingInformation";
import Student from "./component/Students/Student";
import Tags from "./component/Tags/Tags";
import Semester from "./component/Students/Semester/Semester";
import Programme from "./component/Students/Programme/Programme";
import Group from "./component/Students/Group/Groups";
import SubGroups from "./component/Students/SubGroup/SubGroups";
import StatisticsMain from "./component/Statistics/StatisticsMain";
import Genarate from "./component/GenarateTimeTable/Genarate";

class App extends React.Component {

    openNav() {
        document.getElementById("mySidenav").style.width = "230px";
        document.getElementById("main").style.marginLeft = "230px";
        document.body.style.backgroundColor = "rgba(0,0,0,0)";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    }


    render() {
        return (
            <div className="App">
                <div id="main">
                    <span style={{fontSize: 30, cursor: "pointer"}} onClick={this.openNav}>&#9776;</span>
                    <div style={{float:'right',marginTop:'-15px',marginRight:'25px'}}>
                        <img src={require('./avatar.jpg')} style={{width:'50px',height:"50px"}}/>
                        <p style={{margin:'2px', fontFamily:'Candara',fontSize:'15px'}}><strong>Admin</strong></p>
                    </div>

                    <BrowserRouter>
                        <Navbar openNav={this.openNav} closeNav={this.closeNav}/>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/subject" exact component={MainSubject}/>
                        <Route path="/lecturer" exact component={MainLecturer}/>
                        <Route path="/Student" exact component={Student}/>
                        <Route path="/Session" exact component={Session}/>
                        <Route path="/Student/Semester" exact component={Semester}/>
                        <Route path="/Student/Semester/Programme" exact component={Programme}/>
                        <Route path="/Student/Semester/Programme/Group" exact component={Group}/>
                        <Route path="/Student/Semester/Programme/Group/SubGroup" exact component={SubGroups}/>
                        <Route path="/Tags/" exact component={Tags}/>
                        <Route path="/workingTimes" exact component={AddWorkingHours}/>
                        <Route path="/workingDays" exact component={AddWorkingDays}/>
                        <Route path="/workingView" exact component={MainView}/>
                        <Route path="/location-info" exact component={LocationMain}/>
                        <Route path="/edit-building/:id" exact component={EditBuilding}/>
                        <Route path="/edit-room/:id/:bid" exact component={EditRoom}/>
                        <Route path="/room-info" exact component={RoomInformation}/>
                        <Route path="/building-info" exact component={BuildingInformation}/>
                        <Route path="/stat-info" exact component={StatisticsMain}/>
                        <Route path="/stat-info" exact component={StatisticsMain}/>
                        <Route path="/genarate" exact component={Genarate}/>



                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
