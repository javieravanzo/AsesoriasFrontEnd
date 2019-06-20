//Libraries
import {Form, Icon, Input, Button, Alert} from 'antd';
import {Link, Redirect, NavLink} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

//Subcomponents
import routes from "../../../configuration/routing/Routes";

//Actions
//import {recoverPassword} from '../../../../../../../../GeekCore/InspektorFrontEnd/Inspektor.Frontend/inspektor.frontend/src/app/store/redux/actions/account/accountActions';
import secondIcon from "../../assets/authentication/avanzo.jpg"
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';

//Constants
const FormItem = Form.Item;

class ConfirmedPassword extends Component {

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
    const {requestSent, modal} = this.state;

    return (
        <div>
          <div className="div-logo">
            <img src={secondIcon} alt="icon" className={"logo-confirmed"} />
          </div>
          <div className={"login-card-confirmed"}>
            <div className="login-form">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <div className={"confirm_account"}>
                  <div className={"confirm_account_text"}>
                    <Icon className='question-button' type='check-circle'/>
                       La cuenta ha sido confirmada satisfactoriamente.
                      Ahora puede iniciar sesión con la contraseña asignada.
                      <br/>
                  </div>
                </div>
                <FormItem className={"submit"}>
                  <NavLink to={routes.login} >
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                      <p className={"login-button-text"}>Iniciar Sesión</p>
                    </Button>
                  </NavLink>
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

export default (ConfirmedPassword);