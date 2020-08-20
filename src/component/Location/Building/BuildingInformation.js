import React,{Component} from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom";

export default class BuildingInformation extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Link className="edit-link" to={"/add-building" }>
                   <h6>Click here to ADD Building</h6>
                </Link>

            </div>
        );
    }
}