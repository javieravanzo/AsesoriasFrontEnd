//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row, Col, DatePicker, Form, Input, Icon, Button, Select, Checkbox,
         Modal} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../configuration/routing/Routes';

//Actions
import {newRegister, getCompanies} from "../../../store/redux/actions/general/loginActions";
import {documentTypes, citys, genders} from "../../../configuration/constants";

//Styles
import '../../styles/home/home.css'
import { ERROR_MODAL, WARNING_MODAL, allowEmergingWindows } from '../subcomponents/modalMessages';


//Services 
import registerService from '../../../services/customer/registerServices';

//Constants
const FormItem = Form.Item;

class NewRegister extends Component {

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
      registroForm:true,
      ciclos:[],
      selected:[],
      vehicle:0,
      otro:false
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.carousel = React.createRef();

    
    this.showLogin = this.showLogin.bind(this);
    //this.props.getCompanies();

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
    let { documentId, paymentReport, checkBox1 } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err){
        ERROR_MODAL("Error al realizar la acción", "Por favor, ingresa datos válidos, carga los archivos correspondientes y acepta los términos y condiciones.");
      }else if(documentId === null && paymentReport === null ){
        ERROR_MODAL("Error al realizar la acción", "Por favor, carga los archivos correspondientes.");
      }else if(checkBox1 === false ){
        ERROR_MODAL("Error al realizar la acción", "Por favor, acepta los términos y condiciones.");
      }else{
        if(documentId !== null && paymentReport !== null ){

          if(values.email !== values.emailConfirmation){
            WARNING_MODAL("Los correos no coinciden");
            return false;
          }
  
          if(values.password !== values.confirmPassword){
            WARNING_MODAL("Las contraseñas no coinciden");
          }else if(values.phoneNumber.toString()[0] !== "3" || values.phoneNumber.toString().length !== 10 ){
            ERROR_MODAL("Error al realizar la acción", "Por favor ingresa un número de teléfono válido.");
          }else{
            
            let data = values;
            
            data.company = values.company.split('*')[1];
            data.documentId = documentId;
            data.paymentReport = paymentReport;
            data.sliderValue = this.state.sliderValue;
            data.birthDate = this.convert(data.birthDate);
            if(values.clie_from === "Otro"){
              data.clie_from = values.clie_from_otro;
            }
            
            //Actions
            this.props.newRegister(data);
          }
        }else{
          ERROR_MODAL("Error al realizar la acción", "Alguno de los archivos no ha sido cargado correctamente.");
        }

      }     
    });
  };

  convert = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  handleSliderChange = (e) => {
    this.setState({
      sliderValue: Math.round(e),
    });
  };




  onChange(e) {
    //let { documentId, photo, paymentReport } = this.state;
    let fileType = e.target.files;
    let tipo =  e.target.getAttribute("data-tipo");
    switch(tipo){
      case 'cedula':
      this.setState({
        documentId: fileType[0]
      });
      break;
      case 'certificado':
        this.setState({
          paymentReport: fileType[0]
        });
      break;
      default:
        
      break;
    }
    
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


  showLogin(){
    this.props.showLoginForm();   
  }

  validationDocument = (e) =>{
    
    let data = e.target.value

    if(data.length > 0){
        return registerService.checkDocument(data)
          .then(response => {
            
            if(response.data){   
              setTimeout(function(){
                document.getElementById("identificationId").value = "";  
              }, 500) 
              ERROR_MODAL("Este número de documento ya fue registrado", "");
            }
          }).catch(err => {
            console.log(err);
            /*dispatch({
              type: C.NEW_REGISTER,
              payload: false,
              correct: false,
            });
            ERROR_MODAL('Error al registrar el usuario',  err.data.message);*/
          });
    }
    
  }  

  validationEmail = (e) =>{
    
    const data = e.target.value
    if(data.length > 0){
        return registerService.checkEmail(data)
          .then(response => {
            
            if(response.data){  
              setTimeout(function(){
                document.getElementById("email").value = "";  
              }, 500)          
              ERROR_MODAL("Este correo electrónico ya fue registrado", "");
            }
          }).catch(err => {
            console.log(err);
            /*dispatch({
              type: C.NEW_REGISTER,
              payload: false,
              correct: false,
            });
            ERROR_MODAL('Error al registrar el usuario',  err.data.message);*/
          });
    }
    
  }  

  
  validationPhone = (e) =>{
    
    const data = e.target.value
    if(data.length > 0){
        return registerService.checkPhone(data)
          .then(response => {            
            if(response.data){ 
              setTimeout(function(){
                document.getElementById("phoneNumber").value = "";  
              }, 500)              
              ERROR_MODAL("Este teléfono ya fue registrado", "");
            }
          }).catch(err => {
            console.log(err);
           
          });
    }
    
  }  

  

  loadCycles = (e) =>{
    let companyId = e.split("*")[1];
    if(parseInt(companyId) > 0){
      return registerService.getCycles(companyId)
        .then(response => {
          this.setState({
            ciclos: response.data.cycles,            
          });
          this.props.form.setFieldsValue({
            salary: undefined
          })
          
        }).catch(err => {
          console.log(err);
         
        });
  }
  }

  showVehicleComponent = (e) => {
    this.setState({
      vehicle: e,
    });
  }

  showOtro = (e) => {
    if(e === "Otro"){
      this.setState({
        otro: true,
      });
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    let { registerInfo } = this.props;
    
    let companies = registerInfo.companyRow === undefined ? [] : registerInfo.companyRow;
    //let companyCycles = registerInfo.cycles === undefined ? [] : registerInfo.cycles;
    
    return (
      <div>
        <Row className={"home-main-row"}>
       
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <Card className={"customer-home-card "} id="register">
            <svg id="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	<path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
</svg>
              <Row className={"home-register-row-text"}>
                <span className={"home-first-text"}>Llena estos datos con tus campos personales y nos pondremos en contacto contigo.</span> 
              </Row>
              <Row gutter={24} className={"home-main-second-row z-index-2"} >
              
                <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form className={"form-home"}> 
                    <Row gutter={4}>      
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>Nombres</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('name', { initialValue: '',
                        rules: [
                          { required: true, message: 'Por favor, ingresa tu(s) nombre(s).' }],
                      })(
                          <Input onChange={this.validationLetters} maxLength={21} prefix={<Icon type="user" className={'icon-prefix'} />}
                                placeholder="Nombres"/>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <p className={"form-names"}>Apellidos</p>
                    <FormItem className='home-form-item'>
                      {getFieldDecorator('lastName', { initialValue: '',
                        rules: [
                          { required: true, message: 'Por favor, ingresa tu(s) apellido(s).' }],
                      })(
                          <Input onChange={this.validationLetters} maxLength={21} prefix={<Icon type="user" className={'icon-prefix'} />}
                                placeholder="Apellidos"/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>Tipo de documento</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('documentType', {
                            rules: [{ required: true, message: 'Por favor ingrese tu tipo de cédula' }],
                          })(
                            <Select placeholder="Selecciona tu tipo de documento" allowClear={true} showSearch={true}
                              notFoundContent={"No hay tipos de documento"}>
      
                              {documentTypes.map((type, i) => (
                                <Select.Option key={i} value={type.id}>
                                  {type.name}
                                </Select.Option>))
                              }
                          </Select>
                          )}
                        </FormItem>
                      </Col>      
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>Cédula</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('identificationId', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Por favor ingrese tu número de cédula' }],
                          })(
                              <Input onChange={this.validationNumbers} onBlur={this.validationDocument} maxLength={12}  prefix={<Icon type="idcard" className={'icon-prefix'} />}
                                          placeholder="Número de documento" className={"input-number"}/>
                          )}
                        </FormItem>
                      </Col> 
                    </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Correo Electrónico</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('email', { initialValue: '',
                            rules: [ 
                              {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                              {required: true, message: 'Por favor, ingrese tu correo electrónico.' }],
                          })(
                              <Input maxLength={35} onBlur={this.validationEmail} prefix={<Icon type="mail" className={'icon-prefix'} />}
                                    placeholder="Correo electrónico"/>
                          )}
                        </FormItem>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Confirmar Correo Electrónico</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('emailConfirmation', { initialValue: '',
                            rules: [ 
                              {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                              {required: true, message: 'Por favor, ingrese tu correo electrónico de nuevo.' }],
                          })(
                              <Input maxLength={35} onBlur={this.validationEmail} prefix={<Icon type="mail" className={'icon-prefix'} />}
                                    placeholder="Confirmar correo electrónico"/>
                          )}
                        </FormItem>
                      </Col>                   
                    </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>Número de celular</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('phoneNumber', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Por favor ingrese el celular' }],
                          })(
                          <Input onChange={this.validationNumbers} onBlur={this.validationPhone} maxLength={10} placeholder="Número de celular"
                              className={"input-number"}/>
                              )}
                        </FormItem>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={12}>                     
                        <p className={"form-names"}>Género</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Por favor ingresa tu género' }],
                          })(
                            <Select placeholder="Selecciona tu género" allowClear={true} showSearch={true}
                              notFoundContent={"No hay géneros"}>
                              {genders.map((type, i) => (
                                <Select.Option key={i} value={type.id}>
                                  {type.name}
                                </Select.Option>))
                              }
                          </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={12} xs={12}>                     

                        <p className={"form-names"}>Fecha de Nacimiento</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('birthDate',
                            {rules: [
                              {required: false, message: 'Por favor ingresa una fecha de nacimiento'}
                            ]})(
                              <DatePicker className={"home-register-datepicker"}placeholder={"Fecha de nacimiento"}/>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Dirección</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('clie_address', { initialValue: '',
                            rules: [ 
                              {required: true, message: 'Por favor, ingresa tu dirección.' }],
                          })(
                              <Input maxLength={200} prefix={<Icon type="home" className={'icon-prefix'} />}
                                    placeholder="Dirección"/>
                          )}
                        </FormItem>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>¿Tienes Vehículo?</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('vehicle', {
                            rules: [ 
                              {required: true, message: 'Por favor, selecciona una opción.' }],
                          })(
                            <Select placeholder="Selecciona" onChange={this.showVehicleComponent}>
   
                                <Select.Option value={1}>
                                  Sí
                                </Select.Option>
                                <Select.Option value={0}>
                                  No
                                </Select.Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      {
                        (this.state.vehicle === 1)? (<div><Col lg={12} md={12} sm={24} xs={24}>
                          <p className={"form-names"}>¿Qué tipo de vehículo?</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('vehicle_type', {
                              rules: [ 
                                {required: true, message: 'Por favor, selecciona una opción.' }],
                            })(
                              <Select placeholder="Selecciona">
                                  <Select.Option value={"Moto"}>
                                    Moto
                                  </Select.Option>
                                  <Select.Option value={"Auto familiar"}>
                                    Auto familiar
                                  </Select.Option>
                                  <Select.Option value={"Campero o Camioneta"}>
                                    Campero o Camioneta
                                  </Select.Option>
                                  <Select.Option value={"Carga o Mixto"}>
                                    Carga o Mixto
                                  </Select.Option>
                                  <Select.Option value={"Oficial Especial"}>
                                    Oficial Especial
                                  </Select.Option>
                                  <Select.Option value={"Vehículo 6 o más Pasajeros"}>
                                    Vehículo 6 o más Pasajeros
                                  </Select.Option>
                                  <Select.Option value={"Auto de Negocio o Taxi"}>
                                    Auto de Negocio o Taxi
                                  </Select.Option>
                                  <Select.Option value={"Bus o Buseta (Público"}>
                                    Bus o Buseta (Público)
                                  </Select.Option>
                                  <Select.Option value={"Servicio Público Intermunicipal"}>
                                    Servicio Público Intermunicipal
                                  </Select.Option>
                              </Select>
                            )}
                          </FormItem>
                        </Col><Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>Placa de tu Vehículo</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('license_plate_vehicle', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Por favor ingresa la placa de tu vehículo' }],
                          })(
                          <Input maxLength={6} placeholder="Placa de tu Vehículo" className={""}/>
                              )}
                        </FormItem>
                      </Col></div>):''
                      }
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Empresa</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('company', {
                            rules: [ 
                              {required: true, message: 'Por favor, ingrese tu empresa.' }],
                          })(
                            <Select placeholder="Selecciona tu empresa" allowClear={true} showSearch={true}
                              notFoundContent={"No hay empresas disponibles"} onChange={this.loadCycles}>
                              {companies.map((type, i) => (
                                <Select.Option key={i} value={type.socialReason+"*"+type.idCompany}>
                                  {type.socialReason}
                                </Select.Option>))
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                   
                    
                    
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Período de nómina</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('salary', {
                            initialValue : this.state.selected,
                            rules: [ 
                              {required: true, message: 'Por favor, ingresa tu período de nómina.' }],
                          })(
                            <Select placeholder="Selecciona tu ciclo de pagos" allowClear={true} showSearch={true}
                              notFoundContent={"No hay ciclos de pago disponibles"}>
                              {this.state.ciclos.map((type, i) => (
                                <Select.Option key={type.idCompanySalaries} value={type.idCompanySalaries}>
                                  {"Pago " + type.companyRateName + " - " + type.companyPaymentDates}
                                </Select.Option>))
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                     
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Ciudad de residencia</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('city', {
                            rules: [ 
                              {required: true, message: 'Por favor, ingresa tu ciudad.' }],
                          })(
                            <Select placeholder="Selecciona tu ciudad" allowClear={true} showSearch={true}
                              notFoundContent={"No hay ciudades disponibles"}>
                              {citys.map((type, i) => (
                                <Select.Option key={i} value={type.name}>
                                  {type.name}
                                </Select.Option>))
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={10} sm={24} xs={24}>
                        <p className={"form-names"}>Contraseña</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('password', { initialValue: '',
                            rules: [ 
                              {required: true, message: 'Por favor, ingrese una contraseña válida.' }],
                          })(
                              <Input maxLength={20} type="password"  prefix={<Icon type="lock" className={'icon-prefix'} />}
                                    placeholder="Contraseña"/>
                          )}
                        </FormItem>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Confirmar contraseña</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('confirmPassword', { initialValue: '',
                            rules: [ 
                              {required: true, message: 'Por favor, ingrese una contraseña válida.' },
                              {validator: this.compareToFirstPassword}
                            ],
                          })(
                              <Input maxLength={20} type="password"  prefix={<Icon type="lock" className={'icon-prefix'} />}
                                    placeholder="Confirmar contraseña"/>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    
                    <Row className={"upload-documents"}>
                      <Col lg={12}  md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Cargar cédula</p>
                        <input key={this.state.kBK} type="file" data-tipo="cedula" onChange={this.onChange}
                              accept=".pdf, application/pdf"/>
                      </Col>
                      <Col lg={12}  md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Cargar certificado laboral</p>
                        <input key={this.state.kBK} type="file" data-tipo="certificado" onChange={this.onChange}
                              accept=".pdf, application/pdf"/>
                      </Col>        
                    </Row>

                    <Row gutter={4}>
                      <Col lg={12} md={10} sm={24} xs={24}>
                      <p className={"form-names"}>¿Dónde nos conociste?</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('clie_from', {
                              rules: [ 
                                {required: true, message: 'Por favor, selecciona una opción.' }],
                            })(
                              <Select placeholder="Selecciona" onChange={this.showOtro}>
                                  <Select.Option value={"Por mi empresa"}>
                                    Por mi empresa
                                  </Select.Option>
                                  <Select.Option value={"Redes Sociales"}>
                                    Redes Sociales
                                  </Select.Option>
                                  <Select.Option value={"Recomendación"}>
                                    Recomendación
                                  </Select.Option>
                                  <Select.Option value={"Volantes"}>
                                    Volantes
                                  </Select.Option>
                                  <Select.Option value={"Otro"}>
                                    Otro
                                  </Select.Option>
                              </Select>
                            )}
                          </FormItem>
                      </Col>
                      {(this.state.otro) ? (<Col lg={12} md={12} sm={12} xs={12}>
                        <p className={"form-names"}>¿Dónde?</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('clie_from_otro', {
                            initialValue: '',
                            rules: [{ required: true, message: 'Por favor ingresa en donde nos conociste' }],
                          })(
                          <Input maxLength={200} placeholder="Cuéntanos dónde." className={""}/>
                              )}
                        </FormItem>
                      </Col>):''
                      }
                </Row>   

                    <Row>
                    <FormItem className='home-form-item'>
                      {getFieldDecorator('checkBox1', { initialValue: '',
                        rules: [
                          { required: true, message: 'Por favor, acepta los términos y condiciones.' }],
                        })(
                          <Row>
                            <Col lg={24} md={23} >
                              <Row gutter={2}>
                                <Col lg={2} md={2} sm={2} xs={2} className={"checkbox-terms-firstCol"}>
                                  <Checkbox className={'checkbox-terms-conditions'} onChange={(e) => this.onChangeField(e, 'checkBox1')}/>
                                </Col>
                                <Col lg={22} md={22} sm={22} xs={22}>
                                  <span className={"form-names-terms"}>{""} Acepto los <u onClick={() => this.openTermsandConditions()}>Términos, Condiciones de uso y Autorización de tratamiento de datos.</u></span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                      )}
                    </FormItem>


                  </Row>
                  
                    <Row className={"button-home-row"}>
                      <Button type="primary" htmlType="submit" className={"home-form-button"}
                              onClick={() => this.onSignInClicked()}>
                        <p className={"login-button-text"}>Enviar datos</p>
                       
                      </Button>
                    </Row><br/>
                    <Row className={"button-home-row mt3"}>  
                      <Button type="primary" htmlType="button" className={"home-form-button"}
                              onClick={this.showLogin}>
                        <p className={"login-button-text"}>Ya estoy registrado, Iniciar Sesión</p>
                       
                      </Button>
                    </Row>
                    <Modal
                      title={"Términos y condiciones de uso de la página web - Autorización de la política de tratamiento de datos"}
                      visible={this.state.visibleTermModal}
                      width={600}
                      onCancel={() => this.setState({visibleTermModal: false})}
                      footer={
                        <Button key='submit' type='primary' disabled={this.state.clicked && this.props.newRegisterResponse === null} onClick={() => this.setState({visibleTermModal: false, clicked: true})}>
                          Aceptar
                        </Button>}>
                      <div>
                        <p className={"terms-conditions"}>
                          <br/>
                          AVANZO solicita a los visitantes y usuarios de la página web la lectura de los términos, las condiciones de uso de la página web y la autorización de tratamiento de datos antes de iniciar su
                          navegación o utilizar los servicios ofrecidos a través de este portal web. El acceso y navegación en la página web,
                          así como el registro en la plataforma tecnológica de AVANZO, se encuentra precedido de un “click” en el botón Aceptar,
                          lo cual constituye el conocimiento de la autorización del tratamiento de datos y la aceptación expresa del <b>usuario </b>
                          de estos términos y condiciones. 
                          <br/><br/>
                          En caso de no estar de acuerdo con estas condiciones sugerimos al visitante y usuario que se abstenga de acceder o navegar por la página web.
                          <br/>
                          </p>
                      </div>
                    </Modal>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col> 
        {
          (this.props.newRegisterResponse === true) &&
          <Redirect to={routes.confirm_account}/> 
        }
        </Row>
      </div>
    );
  }

}

NewRegister.propTypes = {
  newRegisterResponse: PropTypes.bool,
  registerInfo: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    newRegisterResponse: state.login.newRegisterResponse,
    registerInfo: state.login.registerInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newRegister: (customerId) => dispatch(newRegister(customerId)),
    getCompanies: ( ) => dispatch(getCompanies( ))
  }
};

let WrappedHome = Form.create()(NewRegister);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHome);