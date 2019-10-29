//Libraries
import {Layout, Menu} from 'antd';
import React, {Component} from 'react';
//import { Redirect } from "react-router";
import {withRouter, NavLink} from 'react-router-dom';

//Subcomponents
import routes from "../../../configuration/routing/Routes";
//import icon from "../../assets/authentication/avanzoMenu.jpg";

//Styles
import '../../styles/integration/integrationmenu.css';

//Constants
const { Header } = Layout;

class IMainMenu extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      log_out: 0,
      visible: false,
      redirectTo: "",
      //loggedIn: this.isSignedIn()
    };

    /*this.logOut = this.logOut.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.isSignedIn=this.isSignedIn.bind(this);*/

  };

  /*logOut(){
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
  };*/
  render(){
    
    return(
      <Layout className="layout" >
        <Header className={"header-menu1"} >         
          <Menu
            mode="horizontal"
            className={"menu-style"}>
              <Menu.Item>
                <NavLink to={routes.integration_form}>
                  Solicitar préstamo
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={routes.integration_transactions}>
                  Transacciones
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={routes.integrations_requests}>
                  Revisar solicitudes
                </NavLink>
              </Menu.Item>
            </Menu>
        </Header>
      </Layout>
    );
  };
  
}

export default (withRouter(IMainMenu));