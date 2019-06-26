//Libraries
import {Layout, Menu, Modal, Icon} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {withRouter, NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Subcomponents
import routes from "../../../configuration/routing/Routes";
import icon from "../../assets/authentication/avanzoMenu.jpg";

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
    if (localStorage.isLogged !== undefined && localStorage.isLogged !== null &&
        localStorage.isLogged !== 'null' && localStorage.isLogged){
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  };
 
  render(){
    
    let {loggedIn} = this.state;
    //let {role} = this.props;
    let defaultSelectedKeys = this.props.location.pathname;

    return(
      <Layout className="layout" >
        <Header className={"header-menu1"} >         
          <Menu
            mode="horizontal"
            className={"menu-style"}>
              <Menu.Item>
                <img src={icon} alt="menulogo" className="menu-logo" />
              </Menu.Item>
              <Menu.Item key={routes.home} className={"menu-key-home"}>
                <NavLink to={routes.home}><Icon type="home"/>Inicio</NavLink>
              </Menu.Item>
              {
                defaultSelectedKeys === "/admin-home" && 
                <Menu.Item>
                  <Icon type="cluster"/>Gestionar Empresas
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/admin-home" && 
                <Menu.Item>
                  <Icon type="idcard"/>Gestionar Clientes
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/admin-home" && 
                <Menu.Item>
                  <Icon type="percentage"/>Gestionar Créditos
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/company-home" && 
                <Menu.Item>
                  <Icon type="file-done"/>Aprobación créditos
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/company-home" && 
                <Menu.Item>
                  <Icon type="file-text"/>Generar informes
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/company-home" && 
                <Menu.Item>
                  <Icon type="percentage"/>Gestionar créditos
                </Menu.Item>
              }
              
              {
                defaultSelectedKeys === "/customer-home" && 
                <Menu.Item>
                  <Icon type="dollar"/>Solicitar préstamo
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/customer-home" && 
                <Menu.Item>
                  <Icon type="profile"/>Transacciones
                </Menu.Item>
              }
              {
                defaultSelectedKeys === "/customer-home" && 
                <Menu.Item>
                  <Icon type="schedule"/>Revisar solicitudes
                </Menu.Item>
              }
              <Menu.Item onClick={() => this.setState({visible: true})}>
                <Icon type="poweroff" />Cerrar sesión
              </Menu.Item>
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
          !loggedIn &&
          <Redirect to={"/"}/>
        }
      </Layout>
    );
  };
  
}

/*MainMenu.propTypes = {
  logout: PropTypes.func,
  isLogin: PropTypes.bool,
  role: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    role: state.login.role
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
};*/

//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainMenu));

export default (withRouter(MainMenu));