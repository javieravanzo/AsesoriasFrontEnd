//Libraries
import { Form, Icon, Input, Button, Select } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from "../../../configuration/routing/Routes";
import {SUCCESS_MODAL} from "../subcomponents/modalMessages";


import CustomerRegister from "./register/RegisterCustomer";
//Actions
import {login} from "../../../store/redux/actions/general/loginActions";

//Assets
import secondIcon from "../../assets/authentication/avanzo.jpg";

//Constants
const FormItem = Form.Item;

class LoginForm extends Component {

  constructor(props){
    
    super(props);

    this.state={

      isLoading: false,
      login_success: 0,
      email: '',
      password: '',
      rol: null,
      isLogin: false,
      token: null,
      loginError: null,
    };

    this.changeRol = this.changeRol.bind(this);

  };

  onChangeEmail(email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword(password) {
    this.setState({ password: password.target.value })
  };

  changeRol(role){
    localStorage.setItem('role', role);
    this.setState({ role: role});
  };

  sendMessage = (e) => {
    this.props.login(this.state.email, this.state.password);

    SUCCESS_MODAL("Acción realizada satisfactoriamente", 
      "Ha ingresado a nuestra plataforma exitosamente.")
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { isLogin, role } = this.state;
    let isLogged = localStorage.isLogged !== undefined ? localStorage.isLogged === 'true' : false;

    return (
      <div>
        <div className="div-logo">
          <img src={secondIcon} alt="icon" className="logo" />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div>
                <FormItem>
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: 'Por ingrese su rol' }],
                })(
                    <Select className={"form-select-content"} placeholder="Rol" onChange={(e) => this.changeRol(e)}>
                      <Select.Option value={0}>Usuario</Select.Option>
                      <Select.Option value={1}>Empresa</Select.Option>
                      <Select.Option value={2}>Administrador</Select.Option>
                    </Select>)
                }
                </FormItem>
                <FormItem>
                  {getFieldDecorator('text', { initialValue: '',
                    rules: [
                      {type: "email", message: "Ingrese un correo válido, por favor."},
                      {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                  })(
                    <Input prefix={<Icon type="user" className={"field-icon"} />} placeholder="Email" 
                    onChange={(value) => this.onChangeEmail(value)}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por ingrese su contraseña' }],
                  })(
                  <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"
                    onChange={(value) => this.onChangePassword(value)}/>)
                  }
                </FormItem>
                <FormItem className={"submit"}>
                  <Button type="primary" htmlType="submit" className="login-form-button" 
                          onClick={() => this.sendMessage()}>
                    <p className={"login-button-text"}>Iniciar Sesión</p>
                  </Button>
                  <div className={"for-links"}>
                    <Link to={routes.forgot_password}>
                      <p className={"url-form"}>¿Olvidó su contraseña?</p>
                    </Link>
                    <Link to={routes.customer_register}>
                      <p className={"url-form"}>¿Desea Registrarse?</p>
                    </Link>
                    <Link to={routes.customer_register_image}>
                      <p className={"url-form"}>¿Desea Registrarse con foto?</p>
                    </Link>
                    
                  </div>
                </FormItem>
              </div>
            </Form>
            
          </div>
        </div>
        <div className={"bottom-title"}>
          Avanzo © 2019
        </div>
        {(isLogged && (role===0)) &&
          <Redirect to={routes.customer}/>
        }
        {(isLogged && (role===1)) &&
          <Redirect to={routes.company_request_management}/>
        }
        {(isLogged && (role===2)) &&
          <Redirect to={routes.admin_company_management}/>
        }
      </div>
    );
  }
}

LoginForm.propTypes = {
  isLogin: PropTypes.bool,
  login: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
