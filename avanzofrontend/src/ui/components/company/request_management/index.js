//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import ApproveRequest from './approve_requests/ApproveRequest';

//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;

class Company extends Component {

  render() {

    return (
      <div className={"admin-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'header-terms-title'}>Gestionar solicitudes</h2>
          </Col>
        </Row>
        <Row className={"admin-row-content"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="plus-circle" /> Aprobar solicitudes </span>} key="1">
              <ApproveRequest/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Company;