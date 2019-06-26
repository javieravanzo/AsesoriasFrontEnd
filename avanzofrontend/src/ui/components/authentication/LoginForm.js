//Libraries
import { Form, Icon, Input, Button } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
//import connect from 'react-redux/es/connect/connect';
//import PropTypes from 'prop-types';

//Subcomponents
import routes from "../../../configuration/routing/Routes";

//Actions
import {ERROR_MODAL, SUCCESS_MODAL} from "../subcomponents/modalMessages";
import secondIcon from "../../assets/authentication/avanzo.jpg"

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
      isLogin: false,
      token: null,
      loginError: null,
    };

  };

  onChangeEmail (email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword (password) {
    this.setState({ password: password.target.value })
  };

  sendMessage = (e) => {
    localStorage.setItem('isLogged', true);
    this.setState({
      isLogin: true,
    });
    SUCCESS_MODAL("Acción realizada satisfactoriamente", 
      "Ha ingresado a nuestra plataforma exitosamente.")
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { email, password, isLogin } = this.state;

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
                  {getFieldDecorator('text', { initialValue: '',
                    rules: [
                      {type: "email", message: "Ingrese un correo válido, por favor."},
                      {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                  })(
                    <Input className={"form-content"} prefix={<Icon type="user" className={"field-icon"} />} placeholder="Email" 
                    onChange={(value) => this.onChangeEmail(value)}/>
                  )}
                </FormItem>
                <FormItem>
                  <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"
                    onChange={(value) => this.onChangePassword(value)}/>
                </FormItem>
                <FormItem className={"submit"}>
                  <Button type="primary" htmlType="submit" className="login-form-button" 
                          onClick={() => this.sendMessage()}>
                    <p className={"login-button-text"}>Iniciar Sesión</p>
                  </Button>
                  {isLogin &&
                    <Redirect to={routes.admin}/>
                  }
                  <div className={"for-links"}>
                    <Link to={routes.forgot_password}>
                      <p className={"url-form"}>¿Olvidó su contraseña?</p>
                    </Link>
                    <Link to={routes.register}>
                      <p className={"url-form"}>¿Desea Registrarse?</p>
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
      </div>
    );
  }
}

/*LoginForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);*/

export default withRouter(LoginForm);