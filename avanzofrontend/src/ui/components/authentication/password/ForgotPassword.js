//Libraries
import {Form, Icon, Input, Button} from 'antd';
import {Link, Redirect} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

//Subcomponents
import routes from "../../../../configuration/routing/Routes";

//Actions
import {forgetPassword} from "../../../../store/redux/actions/general/loginActions";

//Assets
import secondIcon from "../../../assets/authentication/avanzo.jpg"

//Constants
const FormItem = Form.Item;

class ForgotPassword extends Component {

  constructor(props) {

    super(props);

    this.state={
      loading: false,
      requestSent: false,
      modal: false,
    };

  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log(values);
        let email = values.email;
        this.props.forgetPassword(email);
      }
    });

  };

  sendMessage = (e) => {
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { forgetPasswordResponse } = this.props;

    return (
        <div>
          <div className="div-logo">
            <img src={secondIcon} alt="icon" className={"logo"} />
          </div>
          <div className={"login-card"}>
            <div className="login-form">
              <Form onSubmit={this.handleSubmit} className="login-form">
                  <div className={"info"}>
                    Ingrese su correo electrónico para poder restablecer la contraseña
                  </div>
                  <FormItem>
                      {getFieldDecorator('email', {
                          rules: [{
                              type: 'email', message: 'El texto no es un email válido',
                          },
                              { required: true, message: 'Por favor, inserte su email para enviar un correo' }]
                      })(
                          <Input className={"form-content"} prefix={<Icon type="mail" className={"field-icon"}/>} placeholder="Email"/>
                      )}
                  </FormItem>
                  
                  <FormItem className={"submit"}>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                          Restablecer
                      </Button>
                      <div>
                          <Link to={routes.login}>
                              <p className={"url-form"}>Iniciar Sesión</p>
                          </Link>
                          <Link to={routes.customer_register}>
                              <p className={"url-form"}>¿Desea Registrarse?</p>
                          </Link>
                      </div>
                  </FormItem>
              </Form>
            </div>
            
          {(forgetPasswordResponse !== null ? forgetPasswordResponse.message === "Sample text" : false) &&
            <Redirect to={routes.login}/>
          }
        </div>
        <div className={"bottom-title"}>
          Avanzo © 2020
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgetPasswordResponse: PropTypes.object,
};


const mapStateToProps = (state) => {
  return {
    forgetPasswordResponse: state.login.forgetPasswordResponse,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    forgetPassword: (email) => dispatch(forgetPassword(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
