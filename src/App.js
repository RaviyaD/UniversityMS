import React from 'react';
import './App.css';
import Subject from "./component/Subject/subject";
import Lecturer from "./component/Lecturer/lecturer";
import ViewLecturer from "./component/Lecturer/viewLecturer";
import ViewSubject from "./component/Subject/viewSubject";
import Updatelecturer from "./component/Lecturer/updatelecturer";
import UpdateSubject from "./component/Subject/updateSubject";
import DeleteLecturer from "./component/Lecturer/deleteLecturer";
import DeleteSubject from "./component/Subject/deleteSubject";

function App() {
    return (
        <div className="App">
            <h4>TEST</h4>
            ddsd
            <DeleteSubject/>
            <DeleteLecturer/>
            <UpdateSubject/>
            <Updatelecturer/>
            <ViewSubject/>
            <ViewLecturer/>
            <Lecturer/>
            <Subject/>
        </div>
    );
}

export default App;
