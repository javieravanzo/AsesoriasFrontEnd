//Libraries
import React, {Component} from 'react';
import {Form, Layout} from 'antd';
import {Route, Switch, withRouter} from "react-router-dom";
import {Redirect} from "react-router";

//Subcomponents
import ConfirmResetPassword from './password/ConfirmedPassword';
//import ResetPassword from './password/ResetPassword';
import ForgotPassword from "./password/ForgotPassword";
import LoginForm from "./LoginForm";
import CustomerRegister from "./register/RegisterCustomer";
import ConfirmAccount from "./ConfirmedAccount";
import AdminRegister from "./register/Register";
import Home from "../home/index";
import routes from "../../../configuration/routing/Routes";

//Styles
import '../../styles/authentication/login.css';

//Assets
import second_background from "../../assets/authentication/background.png";


//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
const WrappedForgotPassword = Form.create()(ForgotPassword);
//const WrappedResetPassword = Form.create()(ResetPassword);
const WrappedConfirmPassword = Form.create()(ConfirmResetPassword);
const WrappedConfirmAccount = Form.create()(ConfirmAccount);


class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, height: 0 
    };
    
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ 
      width: window.innerWidth,
      height: window.innerHeight });
  }

  render() {

    //console.log("Width: ", this.state.width);
    
     return (
      <div className='login'>
        {
          (this.props.pathname === routes.home) && 
          <Layout>
            <Route path={routes.home} component={Home}/>
          </Layout>     
        }
        {
          (this.props.pathname === routes.admin_register) && 
          <Layout>
            <Sider width={400} style={{backgroundColor: "#fff"}}>
              <Route path={routes.admin_register} component={AdminRegister}/>
            </Sider>
            <Layout className={"background-sider"}>
              <Content className={"background-picture-login"}>
                <img src={second_background} alt="shopping_cart" className="shop"/>
              </Content>
            </Layout>
          </Layout>     
        }
        {
          (this.props.pathname === routes.customer_register) && 
          <Layout>
            <Route path={routes.customer_register} component={CustomerRegister}/>
          </Layout>          
        }
        {
          (this.props.pathname !== routes.customer_register && this.props.pathname !== routes.company_register && this.props.pathname !== routes.admin_register && this.props.pathname !== routes.home) && 
          <Layout>
            <Sider width={this.state.width < 500 ? this.state.width : 400} style={{backgroundColor: "#fff"}}>
                <Switch>            
                  <Route path={routes.login} component={WrappedNormalLoginStandard} />
                  <Route path={routes.forgot_password} component={WrappedForgotPassword} />
                  <Route path={routes.confirm_password} component={WrappedConfirmPassword} />
                  <Route path={routes.confirm_account} component={WrappedConfirmAccount} />
                  <Route render = {()=><Redirect to={routes.home}/>}/>
                </Switch>
            </Sider>
            <Layout className={"background-sider"}>
              <Content className={"background-picture-login"}>
                <img src={second_background} alt="shopping_cart" className="shop"/>
              </Content>
            </Layout>
          </Layout>
        }        
      </div>
     );
  }
}

export default withRouter(Login);