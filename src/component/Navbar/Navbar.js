import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <a to="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>&times;</a>
                    <Link to="/lecturer">Lecturer</Link>
                    <Link to="/subject">Subject</Link>
                    <Link to="/test1">Test 1</Link>
                    <Link to="/test2">Test 2</Link>
                    <Link to="/addworkindays">WorkingDays</Link>
                    <Link to="/location-info">Location Details</Link>
                    <Link to="/workingView">Working Times</Link>
                </div>
            </div>
        )
    }
}

export default Navbar;
