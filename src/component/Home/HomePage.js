import React from "react";
import {Carousel} from "react-bootstrap";

class HomePage extends React.Component{
    render() {
        return(
            <div>
                <div className='container-fluid' >
                    <Carousel>
                        <Carousel.Item style={{'height':"450px"}} >
                            <img style={{'height':"500px"}}
                            className="d-block w-100"
                            src={'../../assets/img/12.jpg'}  />
                        <Carousel.Caption>
                            <h3>University Time-Table Generator</h3>
                        </Carousel.Caption>
                    </Carousel.Item  >
                    <Carousel.Item style={{'height':"450px"}}>
                        <img style={{'height':"500px"}}
                        className="d-block w-100"
                        src={'../../assets/img/13.jpg'}    />
                    <Carousel.Caption>
                        <h3>The challenge is not to manage time, but to manage ourselves</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{'height':"450px"}}>
                    <img style={{'height':"500px"}}
                    className="d-block w-100"
                    src={'../../assets/img/14.jpg'}   />
                <Carousel.Caption>
                    <h3>WE-27</h3>
                </Carousel.Caption>
            </Carousel.Item>
    </Carousel>
    </div>
    </div>
    )
    }
}
export default HomePage;
