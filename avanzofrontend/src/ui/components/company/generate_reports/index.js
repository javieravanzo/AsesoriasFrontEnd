//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Divider, Icon} from 'antd';

//Components
import ReceiptManagement from "./ReceiptManagement";

//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;


class GenerateReports extends Component {

  constructor(props){
    
    super(props);

  };

  render() {

    return (
      <div className={"admin-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'header-terms-title'}>Informes</h2>
          </Col>
        </Row>
        <Row className={"admin-row-content"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span> <Icon type="dollar" />Gestionar cobros</span>} key="1">
                <ReceiptManagement/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GenerateReports;