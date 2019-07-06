//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import ApproveRequest from './approve_requests/ApproveRequest';
import MakeOutlay from './make_outlay/MakeOutlay';

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
            <h2 className={'header-terms-title'}>Gestionar empresas</h2>
          </Col>
        </Row>
        <Row style={{width: "80% !important", margin: "auto"}}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="check-circle" />Aprobar solicitudes </span>} key="1">
              <ApproveRequest/>
            </TabPane>
            <TabPane tab={<span> <Icon type="dollar" />Desembolsar solicitudes </span>} key="2s">
              <MakeOutlay/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Customer_Management;