import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"
import {
   HomeRounded
} from "@material-ui/icons";
class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <a to="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>&times;</a>
                    <Link to="/lecturer">Lecturer</Link>
                    <Link to="/subject">Subject</Link>
                    <Link to="/Session">Session</Link>
                    <Link to="/workingView">Working Times</Link>
                    <Link to="/Student">Students</Link>
                    <Link to="/Tags">Tags</Link>
                    <Link to="/location-info">Locations</Link>
                    <Link to="/stat-info">Statistics</Link>
                    <Link to="/availableTime">Unavailability</Link>
                    <Link to="/OverLapping">Over Lapping sessions</Link>
                    <Link to="/consecutiveSessions">Consecutive Sessions</Link>
                    <Link to="/genarate">Genarate Time Table</Link>
                    <Link to="/"><HomeRounded/>Home</Link>

                </div>
            </div>
        )
    }
}

export default Navbar;
