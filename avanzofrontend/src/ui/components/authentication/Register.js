//Libraries
import {Form, Icon, Input, Button} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";

//Assets
import secondIcon from "../../assets/authentication/avanzo.jpg"

//Subcomponents
import {ERROR_MODAL, SUCCESS_MODAL} from "../subcomponents/modalMessages";
import routes from "../../../configuration/routing/Routes";

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
      isLogged: null,
    };

    this.onChangeValue = this.onChangeValue.bind(this);
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

  /*handleSubmit(){
    let {names, username, description, email, password} = this.state;
    userSessionService.token()
      .then( response => {
        localStorage.setItem('access_token', response.data.access_token);
        this.setState({
          loginError: false
        });
        if(names !== "" && names !== null && username !== "" && username !== null && description !== "" &&
          description !== null && email !== "" && email !== null && password !== "" && password !== null ){
            let name = names.split(" ");
            console.log(names, name);
            let data = {     
              first_name: name[0],
              last_name: name[1],
              profile_description: description,
              user_name: username,
              password: password,
              email: email          
            }
            registerService.register(data, response.data.access_token)
            .then( response => {
              this.setState({
                isLogged: true,
              }, SUCCESS_MODAL("Operación realizada exitosamente", "Se ha registrado satisfactoriamente. Por favor, ingrese con su correo electrónico y contraseña."));
            })
            .catch( () => {
              ERROR_MODAL("Error al registrarse", "Intente nuevamente más tarde");
            }); 
        }
      })
      .catch( () => {
        ERROR_MODAL("Error al ingresar", "Intente nuevamente más tarde");
          this.setState({
            loginError: true
          });
      }); 
  }*/

  registerInformation(){
 
  }

  sendMessage = (e) => {
    SUCCESS_MODAL("Acción realizada satisfactoriamente", 
      "Ha ingresado a nuestra plataforma exitosamente.")
  };

  render() {
    
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="div-logo">
          <img src={secondIcon} alt="icon" className={"logo2"} />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form className="login-form">
              <FormItem className={"form-content"} >
                <Input className="my-form" prefix={<Icon type="user" className={"field-icon"} />} 
                      placeholder="Nombres - Apellidos" onChange={(value) => this.onChangeValue(value, 'names')}/>
              </FormItem>

              <FormItem>
                  {getFieldDecorator('text', { initialValue: '',
                    rules: [
                      {type: "email", message: "Ingrese un correo válido, por favor."},
                      {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                  })(
                    <Input className="my-form" prefix={<Icon type="mail" className={"field-icon"} />} placeholder="Email" 
                    onChange={(value) => this.onChangeValue(value, 'email')}/>
                  )}
              </FormItem>

              <FormItem >
              <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                       placeholder="Contraseña" onChange={(value) => this.onChangeValue(value, 'password')} />
              </FormItem>

              <FormItem>
                <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                       placeholder="Confirmar contraseña" onChange={(value) => this.onChangeValue(value, 'password')} />
              </FormItem>

              <FormItem className={"submit"}>
                <Button type="primary" htmlType="submit" className=" my-button login-form-button" 
                        onClick={() => this.sendMessage()}>
                  Registrar
                </Button>
                <div>
                  <Link to={routes.login}>
                    <p className={"url-form"}>¿Ya está registrado? Inicie Sesión.</p>
                  </Link>
                </div>
                {this.state.isLogged &&
                  <Redirect to={routes.login}/>
                }
              </FormItem>
            </Form>
        </div>
      </div>
      <div className={"bottom-title2"}>
      Avanzo © 2019
      </div>
    </div>
    );
  }
}

export default Register;