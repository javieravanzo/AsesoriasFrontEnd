//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, Icon, Input, Col, Row, Tooltip, Select, Modal, Checkbox, Popover} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../configuration/routing/Routes';
import {ERROR_MODAL} from "../subcomponents/modalMessages";

//Actions
//import {login} from "../../../store/redux/actions/accountManagement/loginActions";

//Styles
import '../../styles/authentication/loginCustomer.css';

//Assets
import logo from '../../assets/authentication/avanzoMenu.jpg';
import signInBackground from '../../assets/authentication/bogota.jpg';
import signInBackground2 from  '../../assets/authentication/background.png';

//Constants

const FormItem = Form.Item;

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
    
    let { isLoading, meeting, login} = this.state;
    let { isLogin } = this.props;
    let { role } = localStorage;
    const { getFieldDecorator } = this.props.form;
    let loading = (isLogin) ? false : (isLogin === false ) ? false : isLoading;

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
          <Row gutter={4}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('text', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese su(s) nombre(s).' }],
                })(
                    <Input prefix={<Icon type="user" className={'icon-prefix'} />}
                          placeholder="Nombres" onChange={(e) => this.onChangeField(e, 'names')}/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('lastNames', { initialValue: '',
                  rules: [
                    { required: true, message: 'Por favor, ingrese su(s) apellido(s).' }],
                })(
                    <Input prefix={<Icon type="user" className={'icon-prefix'} />}
                          placeholder="Apellidos" onChange={(e) => this.onChangeField(e, 'lastNames')}/>
                )}
              </FormItem>
            </Col>
          </Row> 
          <Row gutter={4}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('email', { initialValue: '',
                  rules: [ 
                    {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                    {required: true, message: 'Por favor, ingrese su correo electrónico.' }],
                })(
                    <Input prefix={<Icon type="mail" className={'icon-prefix'} />}
                          placeholder="Correo electrónico" onChange={(e) => this.onChangeField(e, 'email')}/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese el telefono' }],
                })(
                    <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('email', { initialValue: '',
                  rules: [ 
                    {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                    {required: true, message: 'Por favor, ingrese su correo electrónico.' }],
                })(
                    <Input prefix={<Icon type="mail" className={'icon-prefix'} />}
                          placeholder="Correo electrónico" onChange={(e) => this.onChangeField(e, 'email')}/>
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <FormItem className='home-form-item'>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Por favor ingrese el telefono' }],
                })(
                    <Input/>
                )}
              </FormItem>
            </Col>
          </Row>          
         
          <div className={'home-buttons-div'}>
            <Row gutter={5}>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24}>
                <Button type="primary" className={"schedule-button"}  onClick={this.askForMeeting}
                        icon="login" 
                        >
                  Registrar
                </Button>
                <Popover content={"hola"} placement="rightTop" >
                  <Icon className='question-button' type='question-circle'/>
                </Popover>
                
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24}>
                <Button type="primary" className={"schedule-button"} onClick={this.scheduleMeeting}
                      icon="carry-out" loading={false}
                      >
                    Olvidar
                </Button>
                <Popover content={"hola"} placement="rightTop">
                  <Icon className='question-button' type='question-circle'/>
                </Popover>
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

RegisterCustomer.propTypes = {
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

let WrappedRegisterCustomer = Form.create()(RegisterCustomer);



export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterCustomer);
