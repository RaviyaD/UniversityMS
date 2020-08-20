import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import testComponent2 from "./component/testComponent2";
import HomePage from "./component/Home/HomePage";
import MainLecturer from "./component/Lecturer/mainLecturer";
import MainSubject from "./component/Subject/mainSubject";
import AddWorkingHours from "./component/WorkingD&T/AddWorkingHours";
import LocationMain from "./component/Location/LocationMain";
import AddBuilding from "./component/Location/Building/AddBuilding";

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
                        <Route path="/test2" exact component={testComponent2}/>
                        <Route path="/addworkindays" exact component={AddWorkingHours}/>
                        <Route path="/location-info" exact component={LocationMain}/>
                        <Route path="/add-building" exact component={AddBuilding}/>

                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
