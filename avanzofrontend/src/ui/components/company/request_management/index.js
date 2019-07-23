//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon, Input} from 'antd';

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
              <Row gutter={8} className={"approve-request-filter"}>
                <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                  <p className="field-title-visible">Nombres/Apellidos</p>
                  <Input placeholder={"Nombres/Apellidos"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                  <p className="field-title-visible">No. de documento</p>
                  <Input placeholder={"No. de documento"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                  <p className="field-title-visible">Fecha Transacción</p>
                  <Input placeholder={"Fecha Transacción"}/>
                </Col>

                <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
                  <p className="field-title-visible">Valor</p>
                  <Input placeholder={"Valor total"}/>
                </Col>
              </Row>
              <br/>
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