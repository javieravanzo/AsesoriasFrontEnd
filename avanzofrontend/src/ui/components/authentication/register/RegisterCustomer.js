//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, Icon, Input, Col, Row, Modal, Select, InputNumber, DatePicker} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../../configuration/routing/Routes';
import {ERROR_MODAL} from "../../subcomponents/modalMessages";

//Actions
import {getDocumentsTypes, register} from "../../../../store/redux/actions/customer/customerActions";

//Styles
import '../../../styles/authentication/loginCustomer.css';

//Assets
import logo from '../../../assets/authentication/avanzo.jpg';
import signInBackground from '../../../assets/authentication/background.png';
import signInBackground2 from  '../../../assets/authentication/background.png';

//Constants

const FormItem = Form.Item;

/*
                      {idDocumentsTypes.map((type) => (
                        <Select.Option key={type.id} value={type.name}>
                          {type.name}
                        </Select.Option>))
                      }*/

class RegisterCustomer extends Component {

  constructor (props) {


    super(props);
    
    this.state = {
      isLoading: false,
      isLogged: false,
      captchaSolved: true,
      email: null,
      meeting: null,
      login: null,
      registerOk: null,
    };

    this.onSignInClicked = this.onSignInClicked.bind(this);
    this.handleEmail = this.handleEmail.bind(this);

    this.props.getDocumentsTypes();

  };

  onSignInClicked(){
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese un email y contraseña válidos.");
      }else{
        this.props.register(values);
        this.setState({
          isLogged: true,
        });
      }     
    });
  };

  handleEmail(e){
    this.setState({
      email: e,
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Las dos contraseñas no coinciden');
    } else {
      callback();
    }
  };

  render(){
    
    let { login } = this.state;
    let { idDocumentsTypes, registerResponse } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="div-meeting">
          <div className='sign-in-background-crop'>
            <img className='sign-in-background' alt='background' src={signInBackground} />
            <img className='background2' alt='background2' src={signInBackground2} />
          </div>
          <Form className='home-form'>        
          <div className='home-logo-div'>
            <div className='home-logo-container'>
              <img className='home-logo' alt='home-logo' src={logo} />
            </div>
          </div>
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('name', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese su(s) nombre(s).' }],
                })(
                    <Input prefix={<Icon type="user" className={'icon-prefix'} />}
                          placeholder="Nombres"/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('lastName', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese su(s) apellido(s).' }],
                })(
                    <Input prefix={<Icon type="user" className={'icon-prefix'} />}
                          placeholder="Apellidos"/>
                )}
              </FormItem>
            </Col>
          </Row> 
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
            <FormItem className='home-form-item'>
                {getFieldDecorator('documentType', {
                  rules: [{ required: true, message: 'Por ingrese su tipo de documento' }],
                })(
                  <Select placeholder={'Tipo de documento'} allowClear={true} showSearch={true}
                    notFoundContent={"No hay tipos de documento disponibles"}>
                    
                      <Select.Option value={0}>Cédula</Select.Option>
                      <Select.Option value={1}>Pasaporte</Select.Option>
                      <Select.Option value={2}>Otro</Select.Option>
                  </Select>)
                }
                </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('documentNumber', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese su número de cédula' }],
                })(
                    <InputNumber prefix={<Icon type="idcard" className={'icon-prefix'} />}
                                 placeholder="Número de documento" className={"input-number"}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('expeditionDate', {
                  rules: [{ required: true, message: 'Por favor ingrese la fecha de expedición de su documento' }],
                })(
                  <DatePicker placeholder="Fecha de expedición" className={"input-number"}/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('birthDate', {
                  rules: [{ required: true, message: 'Por ingrese su fecha de nacimiento' }],
                })(
                    <DatePicker placeholder="Fecha de nacimiento" className={"input-number"}/>)}
              </FormItem>
            </Col>
          </Row>          
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('email', { initialValue: '',
                  rules: [ 
                    {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                    {required: true, message: 'Por favor, ingrese su correo electrónico.' }],
                })(
                    <Input prefix={<Icon type="mail" className={'icon-prefix'} />}
                          placeholder="Correo electrónico"/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese el celular' }],
                })(
                <InputNumber prefix={<Icon type="phone" className={'icon-prefix'} />} 
                             placeholder="Celular" className={"input-number"}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('password', { 
                  initialValue: '',
                  rules: [ 
                    {required: true, message: 'Por favor, ingrese su contraseña.' }, {min: 6, message: "Mínimo 6 caracteres."},
                    {pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)^(?=.*[!@#\\$%\\^&.,\\*])', message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"}],
                })(<Input type="password" prefix={<Icon type="lock" className={'icon-prefix'} />}
                          placeholder="Contraseña"/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('confirmPassword', {
                  initialValue: '',
                  rules: [
                    {required: true, message: 'Confirme la contraseña'},
                    {validator: this.compareToFirstPassword}
                  ],
                })(<Input type="password" prefix={<Icon type="lock" className={'icon-prefix'} />} 
                             placeholder="Confirme contraseña" className={"input-number"}/>
                )}
              </FormItem>
            </Col>
          </Row>
          
          <div className={'home-buttons-div'}>
            <Row gutter={24}>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"register-col"}>
                <Button className={"register-button"}  onClick={() => this.onSignInClicked()}
                        icon="user-add" 
                        >
                  Registrarse
                </Button>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"login-col"}>
                <Button type="primary" className={"login-button"} onClick={() => this.setState({login: true})}
                      icon="login" loading={false}
                      >
                    Iniciar sesión
                </Button>
              </Col>
            </Row>
            
          </div>
          <Modal
            title={"Términos y Condiciones"}
            visible={this.state.visibleTermModal}
            onCancel={() => this.setState({visibleTermModal: false})}
            footer={
              <Button key='submit' type='primary' onClick={() => this.setState({visibleTermModal: false})}>
                Aceptar
              </Button>}
          >
            <div>
              <p dangerouslySetInnerHTML={{ __html: this.props.terms }}/>
            </div>
          </Modal>
        </Form>    

          {
            (login) && 
            <Redirect to={routes.login}/>
          }
          {
            (JSON.stringify(registerResponse) !== '{}' ? registerResponse.status : false) && 
            <Redirect to={routes.confirm_account}/>
          }
        </div> 
    );
  
  };
  
}

RegisterCustomer.propTypes = {
  idDocumentsTypes: PropTypes.array,
  registerResponse: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    idDocumentsTypes: state.customer.idDocumentsTypes,
    registerResponse: state.customer.registerResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDocumentsTypes: () => dispatch(getDocumentsTypes()),
    register: (data) => dispatch(register(data)),
  }
};

let WrappedRegisterCustomer = Form.create()(RegisterCustomer);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterCustomer);
