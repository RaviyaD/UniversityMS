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
                    <Link to="/workingView">Working Times</Link>
                    <Link to="/Student">Students</Link>
                    <Link to="/Tags">Tags</Link>
                    <Link to="/location-info">Locations</Link>
                    <Link to="/stat-info">Statistics</Link>

                </div>
            </div>
        )
    }
}

export default Navbar;
