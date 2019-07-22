//Libraries
import {Form, Icon, Button} from 'antd';
import {Redirect, NavLink} from "react-router-dom";
import React, {Component} from 'react';

//Subcomponents
import routes from "../../../configuration/routing/Routes";

//Actions
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';

//Assets
import secondIcon from "../../assets/authentication/avanzo.jpg";

//Constants
const FormItem = Form.Item;

class ConfirmedAccount extends Component {

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

    //const { getFieldDecorator } = this.props.form;
    const {requestSent} = this.state;

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
                   
                      <p>  <Icon className='question-button' type='check-circle'/>La cuenta ha sido creada satisfactoriamente.</p>
                      <p>Ahora puede asignar una contraseña a su cuenta.</p>
                  </div>
                </div>
                <FormItem className={"submit"}>
                  <NavLink to={routes.reset_password} >
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                      <p className={"login-button-text"}>Asignar</p>
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

export default (ConfirmedAccount);