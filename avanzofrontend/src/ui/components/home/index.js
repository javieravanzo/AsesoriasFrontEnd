//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row, Col, Form, Input, Icon, Button} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { InstagramOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import Register from './newRegister';

import routes from '../../../configuration/routing/Routes';

//Actions
import {newRegister, getCompanies} from "../../../store/redux/actions/general/loginActions";
import {login} from "../../../store/redux/actions/general/loginActions";

//Assets
import icon from "../../assets/authentication/avanzoMenu.png";
import home from "../../assets/home3.PNG";

//Styles
import '../../styles/home/home.css'
import { ERROR_MODAL, WARNING_MODAL, allowEmergingWindows } from '../subcomponents/modalMessages';

//Functions


//Constants
const FormItem = Form.Item;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

class Home extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      documentId: null,
      photo: null,
      paymentReport: null,
      sliderValue: 300000,
      login: null,
      checkBox1: false,
      visibleTermModal: false,
      clicked: false,
      email: null,
      password: null,
      registroForm:false
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.carousel = React.createRef();

    this.showLoginForm = this.showLoginForm.bind(this);

    this.props.getCompanies();

  };

  componentDidUpdate(prevProps, prevState) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (prevProps.newRegisterResponse !== this.props.newRegisterResponse) {
      this.setState({ clicked: null });
    }
  }

  next() {
    this.carousel.next();
  };

  previous() {
    this.carousel.prev();
  };

  onSignInClicked(){
    //console.log("entro");
    let { documentId, photo, paymentReport, checkBox1 } = this.state;
    this.props.form.validateFields((err, values) => {

      if (err ){
        ERROR_MODAL("Error al realizar la acción", "Por favor, ingresa datos válidos, carga los archivos correspondientes y acepta los términos y condiciones.");
      }else if(documentId === null && photo === null && paymentReport === null ){
        ERROR_MODAL("Error al realizar la acción", "Por favor, carga los archivos correspondientes.");
      }else if(checkBox1 === false ){
        ERROR_MODAL("Error al realizar la acción", "Por favor, acepta los términos y condiciones.");
      }else{
        if(documentId !== null && photo !== null && paymentReport !== null ){
  
          if(values.password !== values.confirmPassword){
            WARNING_MODAL("Las contraseñas no coinciden");
          }else if(values.phoneNumber.toString()[0] !== "3" || values.phoneNumber.toString().length !== 10 ){
            ERROR_MODAL("Error al realizar la acción", "Por favor ingresa un número de teléfono válido.");
          }else{
            
            let data = values;
            data.documentId = documentId;
            data.photo = photo;
            data.documentId = documentId;
            data.paymentReport = paymentReport;
            data.sliderValue = this.state.sliderValue;
            
            //Actions
            this.props.newRegister(data);
          }
        }else{
          ERROR_MODAL("Error al realizar la acción", "Alguno de los archivos no ha sido cargado correctamente.");
        }

      }     
    });
  };

  handleSliderChange = (e) => {
    this.setState({
      sliderValue: Math.round(e),
    });
  };

  onChange(e) {
    //let { documentId, photo, paymentReport } = this.state;
    let fileType = e.target.files;
    for (let file in fileType){
      //console.log(file===0);
      if(parseInt(file,10) === 0){
        this.setState({
          documentId: fileType[0]
        });
      }
      if(parseInt(file,10) === 1){
        this.setState({
          photo: fileType[1]
        });
      }
      if(parseInt(file,10) === 2){
        this.setState({
          paymentReport: fileType[2]
        });
      }
    }
    //console.log(fileType);
    /*if (status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }*/
  };

  onChangeField(e, param){
    let partner = this.state.partner;
    if(param !== "checkBox1"){
      this.setState({
        [param]: e.target.value
      });
    }else{
      this.setState({
        checkBox1: e.target.checked
      });
    }
    this.setState({
      partner: partner
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

  onChangeName = (rule, value, callback) => {
    //const { value } = e.target;
    //const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    const reg = /[^a-zA-Z\s]$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      callback('Ingresa los nombres correctamente.');
    }else{
      callback();
    }
  };

  validationLetters = (e) => {
    const input = e.target.value;
    //e.target.value = input.replace(/[^a-zA-Z\s]$/g, '');
    e.target.value = input.replace(/[^A-zÀ-ú\s]$/g, '');
    
    //e.target.value = input.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]$/g, '');
    //[A-Za-zÀ-ÖØ-öø-ÿ]
  };

  validationNumbers = (e) => {
    const input = e.target.value
    e.target.value = input.replace(/[^0-9]/g, '')
  };

  openTermsandConditions = () => {
    this.setState({
      visibleTermModal: true
    });
    
    let file1 = "https://drive.google.com/open?id=1QmZLrbxljJAcsHqY9EOL8epl6-wPLloj";
    let file2 = "https://drive.google.com/open?id=1tW9L5Mg7mKxfhZdwR2QqcAvJNnc8PXev";

    if (file1 !== null && file2 !== null) {
      let newWindow = window.open(file1, "_blank");
      let newWindow1 = window.open(file2, "_blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined' ||
          !newWindow1 || newWindow1.closed || typeof newWindow1.closed === 'undefined'){
        allowEmergingWindows();
      }
    }else {
      WARNING_MODAL('Advertencia', 'Los términos y condiciones no están disponibles. Intenta más tarde.');
    }

    this.setState({
      visibleTermModal: true
    });

  };

  sendMessage = (e) => {
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese un email y contraseña válidos.");
      }else{
        this.props.login(values.email, values.password);
      }     
    });
  };

  onChangeEmail(email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword(password) {
    this.setState({ password: password.target.value })
  };

  showRegisterForm = ()=>{

    this.setState({
      registroForm: true
    });
   
  }

  showLoginForm(){
    this.setState({
      registroForm: false
    });   
  }
  

  render() {

    /*const marks = {0: { style: { color: '#000', }, label: <p className={"left-marker"}>$80.000</p>},
                   100: { style: { color: '#1c77ff', }, label: <p className={"right-marker"}>$300.000</p>}};*/
    const { getFieldDecorator } = this.props.form;
    let role = parseInt(localStorage.getItem("role_id"), 10);
    let isLogged = this.props.isLogin !== undefined ? this.props.isLogin : false;
    let { registerInfo } = this.props;
    
      return (    
        <div>
          <a className={"page-link"} href="https://www.facebook.com/avanzo.co" target="_blank" rel="noopener noreferrer">
            <IconFont className={"network-fb-icon"} type="icon-facebook" />
          </a>
          <a className={"page-link"} href="https://www.instagram.com/avanzocreditos" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined className={"network-ig-icon"} />
          </a>
          <div className="home-main-div" >
              <Row className="home-header-row all-margin">
                <Col xxl={6} lg={6} md={8} sm={10} xs={12}>
                  <img src={icon} alt="menulogo" className="home-menu-logo" />
                </Col>
                <Col xxl={10} lg={10} md={10} sm={4} xs={0}/>
                <Col xxl={8} lg={8} md={6} sm={10} xs={12} className="home-header-third-col">
                  <span className="home-menu-text">{"Centro de ayuda     |    Políticas de uso"}</span>
                </Col>
              </Row>{
                  (this.state.registroForm === false) ? ( 
              
             
              <Row className="home-second-row">
                  <Card className={"customer-home-card"}>
                  <svg id="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	<path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
</svg>
                    <Col xxl={11} lg={11} md={12} sm={24} xs={24} className="home-second-row-col1 left-margin z-index-2">
                      <Row className={"home-left-col-row"}>
                        <span className={"home-zero-text"}>Bienvenido, si ya estás registrado en nuestra plataforma, inicia sesión.</span>
                      </Row>
                      <br/>
                      <br/>
                      <Form onSubmit={this.handleSubmit} className={"form-home"}>
                        <Row className={"home-zero-row-text"}>
                          <p className={"home-zero-input-text"}>Correo electrónico</p>
                          <FormItem>
                            {getFieldDecorator('email', {
                              rules: [
                                {type: "email", message: "Ingrese un correo válido, por favor."},
                                {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                            })(
                              <Input prefix={<Icon type="user" className={"field-icon"} />} placeholder="Email" 
                              onChange={(value) => this.onChangeEmail(value)}/>
                            )}
                          </FormItem>
                        </Row>
                        
                        <br/>
                        <Row className={"home-zero-row-text"}>
                          <p className={"home-zero-input-text"}>Contraseña</p>
                          <FormItem>
                            {getFieldDecorator('password', {
                              rules: [{ required: true, message: 'Por favor, ingrese su contraseña' }],
                            })(
                            <Input className={"home-input-login"} prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"
                              onChange={(value) => this.onChangePassword(value)}/>)
                            }
                          </FormItem>
                        </Row>

                        <Button type="primary" htmlType="submit" className="home-login-button" 
                                onClick={() => this.sendMessage()}>Iniciar sesión</Button>
                        <p className="home-text-register"><u><a href="#" onClick={this.showRegisterForm}>Registrarse</a></u></p>
                        <br/>
                      </Form>
                    </Col>
                    <Col xxl={12} lg={12} md={12} sm={24} xs={24} className="home-second-row-col2">
                      <img src={home} alt="homes" className="home-img" />
                      <br/>
                    </Col>
                  </Card>
                </Row>):null
              }
              {
                (this.state.registroForm === true) ?(JSON.stringify(registerInfo) !== '{}' &&
                <Register registerInfo={registerInfo} showLoginForm={this.showLoginForm}/>):null
              
              }

            {
              (this.props.newRegisterResponse === true) &&
              <Redirect to={routes.confirm_account}/> 
            }
 
            {(isLogged && (role===4)) &&
              <Redirect to={routes.customer}/>
            }
            {(isLogged && (role===3)) &&
              <Redirect to={routes.company_request_management}/>
            }
            {(isLogged && (role===2 || role===1)) &&
              <Redirect to={routes.admin_company_management}/>
            }
            {(isLogged && (role===5)) &&
              <Redirect to={routes.admin_request_management}/>
            }
          </div>
        </div>
      );
    
  }
}

Home.propTypes = {
  newRegisterResponse: PropTypes.bool,
  registerInfo: PropTypes.object,
  isLogin: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    newRegisterResponse: state.login.newRegisterResponse,
    registerInfo: state.login.registerInfo,
    isLogin: state.login.isLogin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newRegister: (customerId) => dispatch(newRegister(customerId)),
    getCompanies: ( ) => dispatch(getCompanies( )),
    login: (email, password) => dispatch(login(email, password))
  }
};

let WrappedHome = Form.create()(Home);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHome);
