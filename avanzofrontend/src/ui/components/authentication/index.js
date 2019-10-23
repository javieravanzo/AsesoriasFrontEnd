//Libraries
import React, {Component} from 'react';
import {Form, Layout} from 'antd';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

//Subcomponents
import ConfirmResetPassword from './password/ConfirmedPassword';
import ResetPassword from './password/ResetPassword';
import ForgotPassword from "./password/ForgotPassword";
import LoginForm from "./LoginForm";
import CustomerRegister from "./register/RegisterCustomer";
import CustomerRegisterImage from "./register/RegisterCustomerImage";
import ConfirmAccount from "./ConfirmedAccount";
import routes from "../../../configuration/routing/Routes";

//Styles
import '../../styles/authentication/login.css';

//Assets
import second_background from "../../assets/authentication/background2.png";


//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
const WrappedForgotPassword = Form.create()(ForgotPassword);
const WrappedResetPassword = Form.create()(ResetPassword);
const WrappedConfirmPassword = Form.create()(ConfirmResetPassword);
const WrappedConfirmAccount = Form.create()(ConfirmAccount);


class Login extends Component {

  constructor(props){

    super(props);

    this.state = {
      customer_register: true
    };

  };
 
  
  render() {

     return (
      <div className='login'>
        {
          (this.props.pathname === routes.customer_register) && 
          <Layout>
            <Route path={routes.customer_register} component={CustomerRegister}/>

          </Layout>          
        }
        {
          (this.props.pathname === routes.customer_register_image) && 
          <Layout>
            <Route path={routes.customer_register_image} component={CustomerRegisterImage}/>

          </Layout>          
        }
        {
          (this.props.pathname !==  routes.customer_register && this.props.pathname !== routes.customer_register_image && this.props.pathname !== routes.company_register) && 
          <Layout>
            <Sider width={400} style={{backgroundColor: "#fff"}}>
                <Switch>            
                  <Route path={routes.login} component={WrappedNormalLoginStandard} />
                  <Route path={routes.forgot_password} component={WrappedForgotPassword} />
                  <Route path={routes.reset_password} component={WrappedResetPassword} />
                  <Route path={routes.confirm_password} component={WrappedConfirmPassword} />
                  <Route path={routes.confirm_account} component={WrappedConfirmAccount} />
                  <Route render = {()=><Redirect to={routes.login}/>}/>
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

export default Login;