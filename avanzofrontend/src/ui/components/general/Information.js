//Libraries

import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Clock from 'react-live-clock';

//Subcomponents

//Styles
import '../../styles/general/information.css';

class Information extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visible: false,
    };

  };

  render(){

    return(
      <Row className={"general-row"}>
        <Row className={"row-information"}>
          <Col  xxl={4} lg={4} md={8} sm={8} xs={10} className={"name-col"}>
          <span className="information-name">Hola, Juan Camilo</span>
          </Col>
          <Col xxl={16} lg={16} md={8} sm={8} xs={4} className={"page-col"}>
          <span className="information-page"><a className={"page-link"} href="http://www.avanzo.co" target="_blank" rel="noopener noreferrer">www.avanzo.co</a></span>
          </Col>
          <Col xxl={4} lg={4} md={8} sm={8} xs={10} className={"clock-col"}>
           <span><Clock format={'DD/MM/YYYY-HH:mm:ss'} ticking={true} timezone={'America/Bogota'} className={"information-clock"}/></span>
          </Col>
        </Row>
      </Row>
         
    );
  };
  
}
  
export default Information;