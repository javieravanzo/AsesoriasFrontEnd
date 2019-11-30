//Libraries
import {Form, Icon, Input, Button} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Assets
import secondIcon from "../../../assets/authentication/avanzo.jpg"

//Subcomponents
import {ERROR_MODAL} from "../../subcomponents/modalMessages";
import routes from "../../../../configuration/routing/Routes";

//Actions
import {registerAdmin} from "../../../../store/redux/actions/admin/adminActions";

//Constants
const FormItem = Form.Item;

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      names: null,
      username: null,
      description: null,
      email: null,
      password: null,
      loginError: null,
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  };

  onChangeValue(value, param){
    let modifier = this.state;
    modifier[param] = value.target.value;
    if(param !== ""){
      this.setState({
        state: modifier
      });
    }else{
      ERROR_MODAL("Acción erronea", "Los valores ingresados están incompletos o están vacíos.")
    }
  };

  onChangeEmail(e){
    this.setState({
      email: e,
    });
  };

  onChangePassword(e){
    this.setState({
      email: e,
    });
  };

  onSignInClicked(){
    this.props.form.validateFields((err, values) => {
      if (err){
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese un email y contraseña válidos.");
      }else{
        
        let data = values;
        let nameSplit = values.name.split(" ");
        data.name = nameSplit[0];
        data.lastName = nameSplit[1];
        data.confirmationPassword = values.password;
        this.props.registerAdmin(data);
      }     
    });
  };

  render() {

    //let { login } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="div-logo">
          <img src={secondIcon} alt="icon" className="logo" />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form className="login-form">
              <div>
                <br/>
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Ingrese sus nombres y apellidos, por favor.' }],
                  })(
                    <Input prefix={<Icon type="user" className={"field-icon"} />} placeholder="Nombre - Apellido"/>)
                  }
                </FormItem>
                <FormItem>
                  {getFieldDecorator('identificationId', {
                    rules: [{ required: true, message: 'Ingrese su número de identificación, por favor.' }],
                  })(
                    <Input prefix={<Icon type="number" className={"field-icon"} />} placeholder="Número de identificación"/>)
                  }
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', { initialValue: '',
                    rules: [
                      {type: "email", message: "Ingrese un correo válido, por favor."},
                      {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                  })(
                    <Input prefix={<Icon type="mail" className={"field-icon"} />} placeholder="Email"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por ingrese su contraseña' }],
                  })(
                  <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"/>)
                  }
                </FormItem>
                
                <FormItem className={"submit"}>
                  <Button type="primary" htmlType="submit" className="login-form-button" 
                          onClick={() => this.onSignInClicked()}>
                    <p className={"login-button-text"}>Registrarse</p>
                  </Button>
                  <div className={"for-links"}>
                    <Link to={routes.login}>
                      <p className={"url-form"}>Iniciar sesión</p>
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
        {
          (this.props.registerAdminResponse) && 
          <Redirect to={routes.login}/>
        }
      </div>
    );
  }
}

Register.propTypes = {
  registerAdminResponse: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    registerAdminResponse: state.admin.registerAdminResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAdmin: (data) => dispatch(registerAdmin(data)),
  }
};

let WrappedRegisterAdmin = Form.create()(Register);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterAdmin);