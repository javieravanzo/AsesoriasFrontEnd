//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import ApproveRequest from './approve_requests/ApproveRequest';
import MakeOutlay from './make_outlay/MakeOutlay';
import RejectedRequest from './rejected_requests/RejectedRequest';
import PendingRequest from './pending_rrhh/PendingRequest';

//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;


class Customer_Management extends Component {

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

    return (
      <div className={"admin-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'header-terms-title'}>Gestionar solicitudes</h2>
          </Col>
        </Row>
        <Row style={{width: "80% !important", margin: "auto"}}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey={parseInt(localStorage.role_id, 10) === 2 ? "1" : "2"}>
            {
              parseInt(localStorage.role_id, 10) === 2 &&
              <TabPane tab={<span> <Icon type="check-circle" />Aprobar solicitudes </span>} key="1">
                <ApproveRequest/>
              </TabPane>
            }
            {
              parseInt(localStorage.role_id, 10) === 1 &&
              <TabPane tab={<span> <Icon type="dollar" />Desembolsar solicitudes </span>} key="2">
                <MakeOutlay/>
              </TabPane>
            }
            <TabPane tab={<span> <Icon type="close-circle" />Solicitudes rechazadas </span>} key="3">
              <RejectedRequest/>
            </TabPane>
            <TabPane tab={<span> <Icon type="team" />Pendientes RR.HH.</span>} key="4">
              <PendingRequest/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Customer_Management;