//Libraries
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Form, Input, Button, Icon, Layout} from 'antd';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

//Subcomponents
import routes from "../../../../configuration/routing/Routes";
import { ERROR_MODAL } from '../../subcomponents/modalMessages';

//Actions
import {changePassword} from "../../../../store/redux/actions/general/loginActions";

//Assets
import secondIcon from "../../../assets/authentication/avanzo.jpg";
import second_background from "../../../assets/authentication/background2.png";

//Constants
const { Content, Sider } = Layout;

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
        //console.log("Values", values, "Params", this.props.match.params);
        this.props.changePassword(values, this.props.match.params.token);
        this.setState({
          burstingKey: this.state.burstingKey+1 
        });
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
    //let { resetPasswordResponse } = this.props;

    //console.log("RP", resetPasswordResponse);
  
      return(
        <Layout>
            <Sider width={400} style={{backgroundColor: "#fff"}}>
            <div>
                {requestSent === true &&
                  <Redirect to={routes.login}/>
                }
                <div className="div-logo">
                  <img src={secondIcon} alt="icon" className={"logo-reset"} />
                </div>
                <div className={"login-card"}>
                  <div className="login-form">
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('password',{
                          rules: [{ required: true, message: 'Por favor, ingrese su contraseña' }, {min: 6, message: "Mínimo 6 caracteres."}, {pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)^(?=.*[!@#\\$%\\^&.,\\*])', message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"}],
                        })( <Input key={this.state.burstingKey} className={"form-content"} prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                              placeholder="Contraseña"/> )}
                      </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('confirmPassword', {
                        rules: [
                          {required: true, message: 'Confirme la contraseña'},
                          {validator: this.compareToFirstPassword}
                        ]
                      })( <Input key={this.state.burstingKey} prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                                placeholder="Confirmar contraseña"/>  )
                      }
                    </Form.Item>
                    <Form.Item className={"submit"}>
                      <Button type="primary" htmlType="submit" className="my-button login-form-button">
                        Cambiar
                      </Button>
                    </Form.Item>
                    <Form.Item className={"submit"}>
                      <div>
                          <Link to={routes.login}>
                              <p className={"url-form"}>Iniciar Sesión</p>
                          </Link>
                          <Link to={routes.customer_register}>
                              <p className={"url-form"}>¿Desea Registrarse?</p>
                          </Link>
                      </div>
                    </Form.Item>
                  </Form>
                  </div>
                </div>
                <div className={"bottom-title"}>
                  Avanzo © 2020
                </div>           
                {
                  (this.props.correct === true) &&
                  <Redirect to={routes.login}/>
                }
              </div>  
            </Sider>
          <Layout className={"background-sider"}>
            <Content className={"background-picture-login"}>
              <img src={second_background} alt="shopping_cart" className="shop"/>
            </Content>
          </Layout>
        </Layout>
    );
  }
}

ResetPassword.propTypes = {
  resetPasswordResponse: PropTypes.string,
  correct: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    resetPasswordResponse: state.login.resetPasswordResponse,
    correct: state.login.correct,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data, token) => dispatch(changePassword(data, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);