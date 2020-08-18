import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'
import LecturerRow from "./lecturerRow";

class ViewLecturer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            empID: '',
            faculty: '',
            department: '',
            center: '',
            building: '',
            level: '',
            rank: '',
            list:[]
        };
    }
    componentDidMount() {
        const lecturer =[];
        firebase.database().ref('lecturers').on('value', snapshot =>{
            console.log(snapshot);
            if(snapshot.exists()){
                snapshot.forEach(lectSnapshot => {
                    this.state.list.push(lectSnapshot.val())
                  lecturer.push(lectSnapshot.key);
                  console.log(this.state.list)
                    if(lectSnapshot.hasChild('Name')){
                        this.setState({
                            Name: lectSnapshot.val().Name,
                            empID: lectSnapshot.val().empID,
                            faculty: lectSnapshot.val().faculty,
                            department: lectSnapshot.val().department,
                            center: lectSnapshot.val().center,
                            building: lectSnapshot.val().building,
                            level: lectSnapshot.val().level,
                            rank: lectSnapshot.val().rank
                    }, () => console.log(lecturer))
                    }
            })
            }
        })
    }
    handleList(){
        return this.state.list.map((res , i )=>{
            return  <LecturerRow obj={res} key={i} /> ;
        });
    }

    render() {
        return (
            <div>
                {this.handleList()}
            </div>
        );
    }


}
export default ViewLecturer
