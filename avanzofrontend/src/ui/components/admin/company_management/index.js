//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import CreateCompanyForm from './CreateCompany';
import CompanyTable from './CompanyTable';
import ManageCompany from './ManageCompany';

//Styles
import '../../../styles/admin/index.css';

//Assets

//Constants
const { TabPane } = Tabs;


class Administrator extends Component {

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
        <Row className={"admin-row-content"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="unordered-list" /> Lista de empresas </span>} key="1">
              <CompanyTable/>
            </TabPane>
            <TabPane tab={<span> <Icon type="plus-circle" /> Crear empresa </span>} key="2">
              <CreateCompanyForm/>
            </TabPane>
            <TabPane tab={<span> <Icon type="team" /> Administrar empresas</span>} key="3">
              <ManageCompany/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Administrator;