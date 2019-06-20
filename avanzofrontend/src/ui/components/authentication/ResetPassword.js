import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Form, Input, Button, Icon} from 'antd';
import secondIcon from "../../assets/authentication/avanzo.jpg"

//import {resetPassword} from '../../../../store/redux/actions/account/accountActions';
//Subcomponents
import routes from "../../../configuration/routing/Routes";

class ResetPassword extends Component{
  constructor(props) {
    super(props);
    this.state = {
      requestSent: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const {code} = this.props.match.params;
        
        const resetPasswordInfo = {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          code
        };

        //this.props.resetPassword(resetPasswordInfo);
        this.setState({requestSent: true});
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Las dos contraseñas no coinciden');
    } else {
      callback();
    }
  };

  render(){
  const {getFieldDecorator} = this.props.form;
  const {requestSent} = this.state;
  return(
      <div>
        {requestSent === true &&
          <Redirect to={routes.login}/>
        }
        <div className="div-logo">
          <img src={secondIcon} alt="icon" className={"logo"} />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {required: true, message: 'Ingrese un correo válido, por favor.'},
                  {type: 'email', message: 'Por favor, ingrese su correo electrónico.'}
                ]
              })( <Input className={"form-content"} prefix={<Icon type="user" className={"field-icon"} />} 
                    placeholder="Email"/>  )
              }
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password',{
                  rules: [{ required: true, message: 'Por favor, ingrese su contraseña' }, {min: 6, message: "Mínimo 6 caracteres."}, {pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)^(?=.*[!@#\\$%\\^&.,\\*])', message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"}],
                })( <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                      placeholder="Contraseña"/> )}
              </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {required: true, message: 'Confirme la contraseña'},
                  {validator: this.compareToFirstPassword}
                ]
              })( <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                         placeholder="Confirmar contraseña"/>  )
              }
          </Form.Item>
           <Form.Item className={"submit"}>
              <Button type="primary" htmlType="submit" className="my-button login-form-button">
                Cambiar
              </Button>
            </Form.Item>
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

/*ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

ResetPassword.defaultProps = {
  resetPassword: f => f
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (accountInfo) => dispatch(resetPassword(accountInfo))
  };
};*/

//export default connect(null, mapDispatchToProps)(ResetPassword);
export default (ResetPassword);