//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import CustomerManagement from './create/CreateCustomer';
import ApproveCustomer from './approve/ApproveCustomer';
import CustomerTable from './list/CustomerTable';

//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;


class Customer_Management extends Component {

  render() {

    return (
      <div className={"admin-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'header-terms-title'}>Gestionar clientes</h2>
          </Col>
        </Row>
        <Row className={"admin-row-content"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            {
              (parseInt(localStorage.role_id, 10) === 2 || parseInt(localStorage.role_id, 10) === 1 ) &&
              <TabPane tab={<span> <Icon type="unordered-list" />Ver clientes</span>} key="1">
                <CustomerTable/>
              </TabPane>
            }
            {
              (parseInt(localStorage.role_id, 10) === 2 || parseInt(localStorage.role_id, 10) === 1 ) &&
              <TabPane tab={<span> <Icon type="usergroup-add" /> Crear cliente </span>} key="2">
                            <CustomerManagement/>
              </TabPane>
            } 
            <TabPane tab={<span> <Icon type="check-circle" /> Aprobar cliente </span>} key="3">
              <ApproveCustomer/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Customer_Management;