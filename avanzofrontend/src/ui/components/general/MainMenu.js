//Libraries
import {Layout, Menu, Modal, Icon, Badge, Tooltip} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {withRouter, NavLink} from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import routes from "../../../configuration/routing/Routes";
import icon from "../../assets/authentication/avanzoMenu.png";

//Actions
import {getCustomersCountToApprove} from "../../../store/redux/actions/admin/adminActions";

//Styles
import '../../styles/general/mainmenu.css';

//Constants
const { Header } = Layout;

class MainMenu extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      log_out: 0,
      visible: false,
      redirectTo: "",
      loggedIn: this.isSignedIn()
    };

    this.logOut = this.logOut.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.isSignedIn=this.isSignedIn.bind(this);

    this.props.getCustomersCountToApprove();

  };

  logOut(){
    //this.props.logout();
    localStorage.clear();
    this.setState({loggedIn: false})
  };

  handleCancelModal(){
    this.setState({
      visible: false,
    });
  };
  
  isSignedIn(){
    if (localStorage.access_token !== undefined && localStorage.access_token !== null &&
        localStorage.access_token !== 'null' && localStorage.access_token){
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  };
 
  render(){
    
    let {loggedIn} = this.state;
    //let {role} = this.props;
    let role = parseInt(localStorage.role_id, 10);
    //console.log("Props",  this.props.countCustomerData.count);
    let menu = [];
    if(localStorage.menu != undefined){
      menu = JSON.parse(localStorage.menu);
    }
    

    return(
      <Layout className="layout" >
        <Header className={"header-menu1"} >         
          <Menu
            mode="horizontal"
            className={"menu-style"}>
              <Menu.Item>
                <img src={icon} alt="menulogo" className="menu-logo" />
              </Menu.Item>
              <Menu.Item className={"menu-logout"} onClick={() => this.setState({visible: true})}>
                <Icon type="poweroff" />Cerrar sesión
              </Menu.Item>

              {menu.map((it, index) =>
                <Menu.Item className={it.className} key={index}>
                  <NavLink to={it.serviceRoute}>
                    <Icon type={it.serviceIcon}/>{it.serviceName}
                  </NavLink>
                </Menu.Item>
              )}


               
            </Menu>
            
        </Header>
        <Modal
            title="Cerrar sesión"
            visible={this.state.visible}
            onOk={this.logOut}
            okText={"Confirmar"}
            onCancel={this.handleCancelModal}
            cancelText={"Cancelar"}
            width={400}
            className={"log-out-modal"}>
          <p>¿Confirma que desea cerrar sesión?</p>
        </Modal>
        {
          (parseInt(role,10) === 2 && this.props.countCustomerData !== null ) &&
          <Badge className={"menu-counter-badge"} style={{ backgroundColor: '#1890ff'}} count={this.props.countCustomerData.count}>
            <Tooltip title="Nuevos clientes por aprobar" placement="topLeft">  
              <UserAddOutlined className={"menu-counter-text"}/>
            </Tooltip> 
          </Badge> 
        }
        {
          !loggedIn &&
          <Redirect to={"/"}/>
        }
      </Layout>
    );
  };
  
}

MainMenu.propTypes = {
  isLogin: PropTypes.bool,
  countCustomerData: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    role: state.login.role,
    countCustomerData: state.admin.countCustomerData,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomersCountToApprove: () => dispatch(getCustomersCountToApprove())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainMenu));

//export default (withRouter(MainMenu));