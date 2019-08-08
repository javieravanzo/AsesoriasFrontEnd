//Libraries
import {Form, Icon, Input, Button} from 'antd';
import {Link, Redirect} from "react-router-dom";
import React, {Component} from 'react';
//import {connect} from 'react-redux';
//import PropTypes from "prop-types";

//Subcomponents
import routes from "../../../../configuration/routing/Routes";

//Actions
//import {recoverPassword} from '../../../../../../../../GeekCore/InspektorFrontEnd/Inspektor.Frontend/inspektor.frontend/src/app/store/redux/actions/account/accountActions';
import secondIcon from "../../../assets/authentication/avanzo.jpg"
import { SUCCESS_MODAL } from '../../subcomponents/modalMessages';

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
        const accountInfo = {
          email: values.email
        };
        this.props.recoverPassword(accountInfo);
        this.setState({requestSent: true});
      }
    });

  };

  sendMessage = (e) => {
    SUCCESS_MODAL("Acción realizada satisfactoriamente", "Se ha enviado un correo electrónico con las instrucciones necesarias para restablecer la contraseña.")
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const {requestSent} = this.state;

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
                          <Input className={"form-content"} prefix={<Icon type="mail" className={"field-icon"}/>} placeholder="Email" />
                      )}
                  </FormItem>
                  
                  <FormItem className={"submit"}>
                      <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => this.sendMessage()}>
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
            
          {requestSent === true &&
            <Redirect to={routes.login}/>
          }
        </div>
        <div className={"bottom-title"}>
          Avanzo © 2019
        </div>
      </div>
    );
  }
}

/*ForgotPassword.propTypes = {
  postForgotPassword: PropTypes.func,
  onSwap: PropTypes.func,
  forgot_password: PropTypes.object,
  recoverPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    recoverPassword: (accountInfo) => dispatch(recoverPassword(accountInfo))
  };
};*/

//export default connect(null, mapDispatchToProps)(ForgotPassword);

export default (ForgotPassword);