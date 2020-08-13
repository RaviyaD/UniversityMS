import React from "react";
import * as firebase from 'firebase'

class TestComponent extends React.Component{
    testFunction(){
        firebase.database().ref('users/' + '102').set({
            username: 'raviya',
            email: 'raveend1997@gmail.com',
            profile_picture: 'imageUrl'
        })
    };

    render(){
        return(
            <div>
                testing purposes!
                <button onClick={this.testFunction}>click</button>
            </div>
        )
    }

}

export default TestComponent