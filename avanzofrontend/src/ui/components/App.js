//Libraries
import React, { Component } from 'react';
import {Divider, Layout} from "antd";
import {withRouter, Route, Switch,} from 'react-router-dom';

//Components
import MainMenu from "../components/general/MainMenu";
import Login from "../components/authentication/index";
import Information from "../components/general/Information";
import CustomerRegister from "./authentication/register/RegisterCustomer";

//IntegrationSubcomponents
import IFormRequest from "./integration/IFormRequest";
import ITransactions from "./integration/ITransactions";

//Subcomponents
import Router from "../components/general/Router";
import routes from "../../configuration/routing/Routes";

//Styles
import '../styles/App.css';
import 'antd/dist/antd.css';
import { WARNING_MODAL } from './subcomponents/modalMessages';

//Constants
const { Footer } = Layout;


class App extends Component {

  constructor(props){
    
    super(props);
    
    this.state = {
      viewportWidth: 0
    };

    this.isSignedIn = this.isSignedIn.bind(this);

  };

  componentWillUpdate(){
    this.isSignedIn();
  }

  isSignedIn(){
    if (localStorage.access_token !== undefined && localStorage.access_token !== null &&
       localStorage.access_token){
      let expireTime = new Date(localStorage.expires_on);
      let today = new Date();
      //console.log("Dates", expireTime, today);
      if(today<=expireTime){
        return true;
      }else{
        localStorage.clear();
        WARNING_MODAL("Advertencia", "La sesión ha caducado. Por favor, vuelve a iniciar sesión.")
        return false;
      }
    }else{
      return false;
    }
  };

  render(){

    let signedIn = this.isSignedIn();

    if(!signedIn){
      if (this.props.location.pathname === routes.login || this.props.location.pathname === routes.forgot_password ||
        this.props.location.pathname === routes.reset_password || this.props.location.pathname === routes.confirm_password ||
        this.props.location.pathname === routes.confirm_account){
          return( <Login pathname={this.props.location.pathname}/> );
        }else{
          return(
            <div>           
              <Layout className={'back-home'}>
                <Switch>            
                  <Route exact path={routes.integration_form} component={IFormRequest}/>
                  <Route exact path={routes.integration_transactions} component={ITransactions} />
                  <Route render = {()=><CustomerRegister/>}/>
                </Switch>
              </Layout>
            </div>
          );
        }          
    }else{
      return(
          <div>
            <MainMenu viewPortWidth={this.state.viewportWidth}/>
            <Information/>
            <Layout className={'back-home'}>
              <Router/>
            </Layout>
            <Layout >
              <Footer className={'back-home2'}>
                <br/>
                <Divider className={"layout-divider"}/>
                <div className={"footer-div"}>
                  Avanzo © 2019 
                </div>
              </Footer>
            </Layout>
          </div>)
    }
  };

}

export default withRouter(App);
