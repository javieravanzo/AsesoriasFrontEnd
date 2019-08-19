//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Form, Input, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

//Subcomponents
import routes from "../../../../configuration/routing/Routes";
import { ERROR_MODAL } from '../../subcomponents/modalMessages';

//Actions
import {changePassword} from "../../../../store/redux/actions/general/loginActions";

//Assets
import secondIcon from "../../../assets/authentication/avanzo.jpg";

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
        this.props.changePassword(values);
      }else{
        ERROR_MODAL("Ingrese los datos correctos, por favor.");
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
    let { resetPasswordResponse } = this.props;
  
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
          {
            (resetPasswordResponse !== null ? resetPasswordResponse.message === "Sample text" : false) &&
            <Redirect to={routes.login}/>
          }
        </div>  
    );
  }
}

ResetPassword.propTypes = {
  resetPasswordResponse: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    resetPasswordResponse: state.login.resetPasswordResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data) => dispatch(changePassword(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);