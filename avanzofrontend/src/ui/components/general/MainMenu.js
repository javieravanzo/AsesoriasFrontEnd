//Libraries
import {Layout, Menu, Modal, Icon} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {withRouter, NavLink} from 'react-router-dom';

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
    let role = localStorage.role;

    return(
      <Layout className="layout" >
        <Header className={"header-menu1"} >         
          <Menu
            mode="horizontal"
            className={"menu-style"}>
              <Menu.Item>
                <img src={icon} alt="menulogo" className="menu-logo" />
              </Menu.Item>
              {
                (parseInt(role,10) === 2) && 
                <Menu.Item className={"menu-admin-home"}>
                  <NavLink to={routes.admin_company_management}>
                    <Icon type="cluster"/>Gestionar Empresas
                  </NavLink>
                  
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 2) && 
                <Menu.Item>
                  <NavLink to={routes.admin_customer_management}>
                    <Icon type="idcard"/>Gestionar Clientes
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 2) && 
                <Menu.Item>
                  <NavLink to={routes.admin_request_management}>
                    <Icon type="percentage"/>Gestionar Créditos
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 2) && 
                <Menu.Item>
                  <NavLink to={routes.admin_generate_reports}>
                    <Icon type="file"/>Generar Reportes
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 1) && 
                <Menu.Item className={"menu-company-home"}>
                  <NavLink to={routes.company_request_management}>
                    <Icon type="file-done"/>Aprobación créditos
                  </NavLink>  
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 1) && 
                <Menu.Item>
                  <NavLink to={routes.company_generate_reports}>
                    <Icon type="file-text"/>Generar informes
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 1) && 
                <Menu.Item>
                  <Icon type="percentage"/>Gestionar créditos
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 0) && 
                <Menu.Item className={"menu-key-home"}>
                  <NavLink to={routes.customer}>
                    <Icon type="home"/>Inicio
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 0) && 
                <Menu.Item>
                  <NavLink to={routes.customer_form_request}>
                    <Icon type="dollar"/>Solicitar préstamo
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 0) && 
                <Menu.Item>
                  <NavLink to={routes.customer_transactions}>
                    <Icon type="profile"/>Transacciones
                  </NavLink>
                </Menu.Item>
              }
              {
                (parseInt(role,10) === 0) && 
                <Menu.Item>
                  <NavLink to={routes.customer_review_requests}>
                    <Icon type="schedule"/>Revisar solicitudes
                  </NavLink>
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