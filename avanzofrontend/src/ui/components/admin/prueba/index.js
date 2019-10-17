//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';


import Prueba2 from './prueba';


//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;


class prueba extends Component {

  render() {

    return (
      <div className={"admin-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'header-terms-title'}>Prueba</h2>
          </Col>
        </Row>
        <Row className={"admin-row-content"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span> <Icon type="dollar" />Prueba2</span>} key="1">
              <Prueba2/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default prueba;