import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import HomePage from "./component/Home/HomePage";
import MainLecturer from "./component/Lecturer/mainLecturer";
import MainSubject from "./component/Subject/mainSubject";
import AddWorkingHours from "./component/WorkingD&T/AddWorkingHours";
import Student from "./component/Students/Student";
import Tags from "./component/Tags/Tags";
import Semester from "./component/Students/Semester/Semester";
import Programme from "./component/Students/Programme/Programme";
import Group from "./component/Students/Group/Groups";
import SubGroups from "./component/Students/SubGroup/SubGroups";

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
                    <BrowserRouter>
                        <Navbar openNav={this.openNav} closeNav={this.closeNav}/>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/subject" exact component={MainSubject}/>
                        <Route path="/lecturer" exact component={MainLecturer}/>
                        <Route path="/addworkindays" exact component={AddWorkingHours}/>
                        <Route path="/Student" exact component={Student}/>
                        <Route path="/Student/Semester" exact component={Semester}/>
                        <Route path="/Student/Semester/Programme" exact component={Programme}/>
                        <Route path="/Student/Semester/Programme/Group" exact component={Group}/>
                        <Route path="/Student/Semester/Programme/Group/SubGroup" exact component={SubGroups}/>
                        <Route path="/Tags/" exact component={Tags}/>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
