import React from "react";
import {Carousel} from "react-bootstrap";
import logo1 from '../../assets/12.jpg';
import logo2 from '../../assets/13.jpg'
import logo3 from '../../assets/14.jpg'


class HomePage extends React.Component{
    render() {
        return(
            <div>
                <div className='container-fluid' >
                    <Carousel>
                        <Carousel.Item style={{'height':"450px"}} >
                            <img style={{'height':"500px"}}
                            className="d-block w-100"
                            src={logo1}  />
                        <Carousel.Caption>
                            <h3>University Time-Table Generator</h3>
                        </Carousel.Caption>
                    </Carousel.Item  >
                    <Carousel.Item style={{'height':"450px"}}>
                        <img style={{'height':"500px"}}
                        className="d-block w-100"
                        src={logo2}    />
                    <Carousel.Caption>
                        <h3>The challenge is not to manage time, but to manage ourselves</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{'height':"450px"}}>
                    <img style={{'height':"500px"}}
                    className="d-block w-100"
                    src={logo3}   />
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
