import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import testComponent1 from "./component/testComponent1";
import testComponent2 from "./component/testComponent2";
import HomePage from "./component/Home/HomePage";
import Subject from "./component/Subject/subject";
import MainLecturer from "./component/Lecturer/mainLecturer";
import Lecturer from "./component/Lecturer/lecturer";
import ViewLecturer from "./component/Lecturer/viewLecturer";
import Updatelecturer from "./component/Lecturer/updatelecturer";
import DeleteLecturer from "./component/Lecturer/deleteLecturer";
import MainSubject from "./component/Subject/mainSubject";

class App extends React.Component {

    openNav() {
        document.getElementById("mySidenav").style.width = "200px";
        document.getElementById("main").style.marginLeft = "200px";
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
                        <Route path="/addLecturer" exact component={Lecturer}/>
                        <Route path="/viewLecturer" exact component={ViewLecturer}/>
                        <Route path="/editLecturer" exact component={Updatelecturer}/>
                        <Route path="/deleteLecturer" exact component={DeleteLecturer}/>
                        <Route path="/test2" exact component={testComponent2}/>

                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
