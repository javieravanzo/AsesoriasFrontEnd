//Libraries
import React, {Component} from 'react';
import {Carousel, Row, Col, Icon, Divider} from 'antd';

//Styles
//import '../../../styles/home/home.css'


class Company extends Component {

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
                Empresa
              </div>
            <Divider/>
            <div className={"arrows"}>
              <Row>
                <Col span = {1}>
                  <Icon type="left" className={"left-arrow"} onClick={this.previous}/>
                </Col>
                <Col xs = {14} sm={18} md={19} lg={21}/>
                <Col span = {1}>
                  <Icon type="right" className={"right-arrow"} onClick={this.next} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
    );
  }
}

export default Company;