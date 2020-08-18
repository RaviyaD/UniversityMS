import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import testComponent1 from "./component/testComponent1";
import testComponent2 from "./component/testComponent2";
import HomePage from "./component/Home/HomePage";

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
                        <Route path="/test1" exact component={testComponent1}/>
                        <Route path="/test2" exact component={testComponent2}/>

                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
