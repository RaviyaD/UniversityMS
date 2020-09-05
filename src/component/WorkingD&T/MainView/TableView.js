import React, {Component} from "react";
import {Col, Row, Table} from 'reactstrap';
import moment from "moment";
import {DateRangeRounded, HourglassEmptyRounded} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
class TableView extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {selected,result,lstrt,lend,isSetTime} = this.props
       return(

           <Table style={ isSetTime ? { textAlign:'center', marginTop: '5px', border: '3px solid black'} : {marginTop: '100px',marginBottom:'100px',border: '3px solid black'}} bordered >
            <thead >
            <tr style={{border: '3px solid black'}}>
                {this.showTableHeaders(selected)}
                {selected.map((index) => {
                    return(
                        <th key={index} style={{fontFamily:'Optima',fontSize:'20px',border: '3px solid black'}} className={"text-center"} >{index}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody >
            {this.showTableNoColumn(result)}
            {
                result.map((index,value) => {
                    if(selected.length === 0){
                        return(
                            <tr style={{border:'#000000'}} hidden={result.length === (value+1)}>
                                {Array.from(Array(1).keys()).map((i) => {
                                    if(moment(index,'HH:mm') >= moment(lstrt,'HH:mm') && moment(result[(value + 1)],'HH:mm') <= moment(lend,'HH:mm') ){
                                        return(
                                            <td key={value} className={"text-center"} style={{backgroundColor:'RED'}}>{index} - {result[(value + 1)]}</td>
                                        )
                                    }else{
                                        return(
                                            <td  key={value} className={"text-center"}>{index} - {result[(value + 1)]}</td>
                                        )
                                    }

                                })}
                            </tr>
                        )
                    }else {

                    return(
                        <tr hidden={result.length === (value+1)}>
                            {selected.map((i) => {
                                if(moment(index,'HH:mm') >= moment(lstrt,'HH:mm') && moment(result[(value + 1)],'HH:mm') <= moment(lend,'HH:mm') ){
                                    return(
                                        <td key={value} style={{fontFamily:'Copperplate',fontSize:'18px',backgroundColor:'#F34646'}} className={"text-center"} >{index} - {result[(value + 1)]}</td>
                                    )
                                }else{
                                    return(
                                        <td key={value} style={{fontFamily:'Optima',fontSize:'15px'}} className={"text-center"}>{index} - {result[(value + 1)]}</td>
                                    )
                                }

                            })}
                        </tr>
                    )}
                })
            }
            </tbody>
        </Table>
          )

    }

    showTableHeaders = (array) => {
        if (array.length === 0) {
            return (
                <th style={{padding:'30px'}} className={"text-center"}>Please Select Working Days <Button
                    variant="outlined"
                    style={{marginLeft:'30px'}}
                    color={"primary"}
                    startIcon={<DateRangeRounded />}
                    onClick={()=> this.props.history.push('/workingDays')}
                    size={'small'}
                >
                    Working Days
                </Button></th>
            )
        }
    }

    showTableNoColumn = (array) => {
        if (array.length === 0) {
            return (
                <tr style={{padding:'90px'}}>
                    <td  className={"text-center"} colSpan={this.props.selected.length}>Set Working Hours
                        <Button
                            style={{marginLeft:'30px'}}
                            variant="outlined"
                            color={"primary"}
                            startIcon={<HourglassEmptyRounded />}
                            onClick={()=>this.props.history.push('/workingTimes')}
                            size={'small'}
                        >
                            Working Hours
                        </Button></td>
                </tr>
            )
        }
    }

}
export default withRouter(TableView)
