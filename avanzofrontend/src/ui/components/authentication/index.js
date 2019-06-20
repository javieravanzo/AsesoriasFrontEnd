//Libraries
import React, {Component} from 'react';
import { Form, Layout } from 'antd';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

//Subcomponents
import ConfirmResetPassword from './ConfirmedPassword';
import ResetPassword from './ResetPassword';
import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";
import Register from "./Register";
import routes from "../../../configuration/routing/Routes";

//Styles
import '../../styles/authentication/login.css';

//Assets
import second_background from "../../assets/authentication/background2.png";


//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
const WrappedRegister = Form.create()(Register);
const WrappedForgotPassword = Form.create()(ForgotPassword);
const WrappedResetPassword = Form.create()(ResetPassword);
const WrappedConfirmPassword = Form.create()(ConfirmResetPassword);


class Login extends Component {
  1
  render() {
  
    return (
      <div className='login'>
        <Layout>
          <Sider width={400} style={{backgroundColor: "#fff"}}>
              <Switch>
                <Route path={routes.login} component={WrappedNormalLoginStandard} />
                <Route path={routes.register} component={WrappedRegister} />
                <Route path={routes.forgot_password} component={WrappedForgotPassword} />
                <Route path={routes.reset_password} component={WrappedResetPassword} />
                <Route path={routes.confirm_password} component={WrappedConfirmPassword} />
                <Route render = {()=><Redirect to={routes.login}/>}/>
              </Switch>
          </Sider>
          <Layout className={"background-sider"}>
            <Content className={"background-picture-login"}>
              <img src={second_background} alt="shopping_cart" className="shop"/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Login;