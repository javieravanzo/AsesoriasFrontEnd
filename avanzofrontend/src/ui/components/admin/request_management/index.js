//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon, Input} from 'antd';

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
            <h2 className={'header-terms-title'}>Gestionar solicitudes</h2>
          </Col>
        </Row>
        <Row style={{width: "80% !important", margin: "auto"}}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="check-circle" />Aprobar solicitudes </span>} key="1">
              <Row gutter={8} className={"approve-request-filter"}>
                <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                  <p className="field-title-visible">Número solicitud </p>
                  <Input placeholder={"Número solicitud"}/>
                </Col>
                <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                  <p className="field-title-visible">Cliente</p>
                  <Input placeholder={"No. de cédula"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
                  <p className="field-title-visible">Estado</p>
                  <Input placeholder={"Estado"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
                  <p className="field-title-visible">Fecha Solicitud</p>
                  <Input placeholder={"Fecha Solicitud"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                  <p className="field-title-visible">Fecha Transacción</p>
                  <Input placeholder={"Fecha Transacción"}/>
                </Col>
              </Row>
              <br/>
              <ApproveRequest/>
            </TabPane>
            {
              parseInt(localStorage.role, 10) === 1 &&
              <TabPane tab={<span> <Icon type="dollar" />Desembolsar solicitudes </span>} key="2s">
                <MakeOutlay/>
              </TabPane>
            }
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Customer_Management;