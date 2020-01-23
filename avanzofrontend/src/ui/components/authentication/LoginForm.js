//Libraries
import { Form, Icon, Input, Button } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from "../../../configuration/routing/Routes";
import {ERROR_MODAL} from "../subcomponents/modalMessages";

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

  };

  onChangeEmail(email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword(password) {
    this.setState({ password: password.target.value })
  };

  sendMessage = (e) => {
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese un email y contraseña válidos.");
      }else{
        this.props.login(values.email, values.password);
      }     
    });
  };

  render() {  

    const { getFieldDecorator } = this.props.form;
    let role = parseInt(localStorage.getItem("role_id"), 10);
    let isLogged = this.props.isLogin !== undefined ? this.props.isLogin : false;


    return (
      <div>
        <div className="div-logo">
          <img src={secondIcon} alt="icon" className="logo" />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div>
                <br/>
                <br/>
                <FormItem>
                  {getFieldDecorator('email', { initialValue: '',
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
                    rules: [{ required: true, message: 'Por favor, ingrese su contraseña' }],
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
                    <Link to={routes.home }>
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
        {(isLogged && (role===4)) &&
          <Redirect to={routes.customer}/>
        }
        {(isLogged && (role===3)) &&
          <Redirect to={routes.company_request_management}/>
        }
        {(isLogged && (role===2 || role===1)) &&
          <Redirect to={routes.admin_company_management}/>
        }
      </div>
    );
  }
}

LoginForm.propTypes = {
  isLogin: PropTypes.bool,
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
