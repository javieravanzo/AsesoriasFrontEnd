//Libraries
import React, {Component} from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

//Components
import CustomerManagement from './create/CreateCustomer';
import ApproveCustomer from './approve/ApproveCustomer';
import CustomerTable from './list/CustomerTable';

//Subcomponents
import { ERROR_MODAL} from '../../subcomponents/modalMessages';

//Styles
import '../../../styles/admin/index.css';

//Services 
import adminServices from '../../../../services/admin/adminServices';

//Constants
const { TabPane } = Tabs;




class Customer_Management extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      razones : [] 
    };
  
  };

  getRazones = () =>{
    if(this.state.razones.length == 0){
      let token = localStorage.access_token;
      return adminServices.getReasons(token )
        .then(response => {
          this.setState({
            razones: response.data
          })
    
        }).catch(err => {
          ERROR_MODAL('Error al traer la lista de razones de rechazo', err.data);
        });
    }    
  }

  render() {
    this.getRazones();

    if (!this.state.razones){     
      return <div></div>
    }

    if(this.state.razones){
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
              <ApproveCustomer razones={this.state.razones}/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
   }
  }
}

export default Customer_Management;