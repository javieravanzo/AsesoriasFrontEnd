//Libraries
import React, {Component} from 'react';
import {Carousel, Row, Col, Icon, Divider} from 'antd';

//Styles
//import '../../../styles/home/home.css'

//Assets

class Administrator extends Component {

  constructor(props){
    
    super(props);
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

  };

  next() {
    this.carousel.next();
  };

  previous() {
    this.carousel.prev();
  };

  render() {

    const props = {
      autoplay: true,
      autoplaySpeed:5000
    };

    return (
        <div className={"initial-home-div"}>
          <div className={"second-div"}>
            <Divider/>
              <div>
                Admnistrador
              </div>
            <Divider/>
          </div>
        </div>
    );
  }
}

export default Administrator;