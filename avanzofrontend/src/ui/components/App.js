//Libraries
import React, { Component } from 'react';
import {Divider, Layout, Form} from "antd";
import {withRouter, Route, Switch,} from 'react-router-dom';

//Components
import MainMenu from "../components/general/MainMenu";
import Login from "../components/authentication/index";
import Information from "../components/general/Information";
//import ConfirmedAccount from "../components/authentication/AccountRouting";

//IntegrationSubcomponents
import IFormRequest from "./integration/IFormRequest";
import ITransactions from "./integration/ITransactions";
import ResetPassword from "./authentication/password/ResetPassword";
import Home from "./home/index";

//Subcomponents
import Router from "../components/general/Router";
import routes from "../../configuration/routing/Routes";

//Styles
import '../styles/App.css';
import 'antd/dist/antd.css';
import { WARNING_MODAL } from './subcomponents/modalMessages';

//Constants
const { Footer } = Layout;
const WrappedResetPassword = Form.create()(ResetPassword);


class App extends Component {

  constructor(props){
    
    super(props);
    
    this.state = {
      viewportWidth: 0
    };

    this.isSignedIn = this.isSignedIn.bind(this);

  };

  componentDidUpdate(){
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

    let signedIn = (this.props.location.pathname).includes('integration-form') ? true: this.isSignedIn();
    //console.log("Route", this.props.location.pathname);
    
    if((this.props.location.pathname).includes('integration-form')){
      return(
        <div>           
          <Layout className={'back-home'}>
            <Switch>         
              <Route exact path={routes.integration_form} component={IFormRequest}/>
              <Route render = {()=><IFormRequest/>}/>
            </Switch>
          </Layout>
        </div>
      );
    }else{
      if(!signedIn){
        if (this.props.location.pathname === routes.login ||
            this.props.location.pathname === routes.forgot_password ||
            this.props.location.pathname === routes.confirm_password ||
            this.props.location.pathname === routes.confirm_account ||
            this.props.location.pathname === routes.admin_register){
            return( <Login pathname={this.props.location.pathname}/> );
          }else{
            return(
              <div>           
                <Layout className={'back-home'}>
                  <Switch>         
                    <Route exact path={routes.integration_form} component={IFormRequest}/>
                    <Route exact path={routes.integration_transactions} component={ITransactions} />
                    <Route exact path={routes.reset_password} component={WrappedResetPassword}/>
                    <Route render = {()=><Home/>}/>
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
                    Avanzo © 2020 
                  </div>
                </Footer>
              </Layout>
            </div>)
      }
    } 
  };

}

export default withRouter(App);
