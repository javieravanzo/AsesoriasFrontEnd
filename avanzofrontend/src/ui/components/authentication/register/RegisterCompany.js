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
//import {login} from "../../../store/redux/actions/accountManagement/loginActions";

//Styles
import '../../../styles/authentication/loginCustomer.css';

//Assets
import logo from '../../../assets/authentication/avanzo.jpg';
import signInBackground from '../../../assets/authentication/background.png';
import signInBackground2 from  '../../../assets/authentication/background.png';

//Constants

const FormItem = Form.Item;

class RegisterCompany extends Component {

  constructor (props) {


    super(props);
    
    this.state = {
      isLoading: false,
      isLogged: false,
      captchaSolved: true,
      email: null,
      meeting: null,
      login: null,
    };

    this.onSignInClicked = this.onSignInClicked.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
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
        this.props.login(values.email, values.password);
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

  render(){
    
    let { login} = this.state;
    //let { isLogin } = this.props;
    //let { role } = localStorage;
    const { getFieldDecorator } = this.props.form;
    //let loading = (isLogin) ? false : (isLogin === false ) ? false : isLoading;

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
                {getFieldDecorator('text', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese la(s) razón social(s).' }],
                })(
                    <Input prefix={<Icon type="user" className={'icon-prefix'} />}
                          placeholder="Razón Social"/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('documentNumber', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese su número NIT' }],
                })(
                    <InputNumber prefix={<Icon type="idcard" className={'icon-prefix'} />}
                                 placeholder="NIT" className={"input-number"}/>
                )}
              </FormItem>
            </Col>
          </Row> 
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('text', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese la(s) actividad económica.' }],
                })(
                    <Input prefix={<Icon type="tool" className={'icon-prefix'} />}
                          placeholder="Actividad económica"/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('documentNumber', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese su dirección' }],
                })(
                  <Input prefix={<Icon type="bank" className={'icon-prefix'} />}
                  placeholder="Dirección"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <h3>Representante legal</h3>
          <Row gutter={8}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('text', { initialValue: '',
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
                {getFieldDecorator('lastNames', { initialValue: '',
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
                    <Select placeholder="Tipo de documento">
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
          <div className={'home-buttons-div'}>
            <Row gutter={24}>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"register-col"}>
                <Button className={"register-button"}  onClick={this.askForMeeting}
                        icon="user-add" 
                        >
                  Registrarse
                </Button>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"login-col"}>
                <Button type="primary" className={"login-button"} onClick={this.scheduleMeeting}
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
        </div> 
    );
  
  };
  
}

RegisterCompany.propTypes = {
  isLogin: PropTypes.bool,
  login: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*login: (email, password) => dispatch(login(email, password))*/
  }
};

let WrappedRegisterCustomer = Form.create()(RegisterCompany);



export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterCustomer);
