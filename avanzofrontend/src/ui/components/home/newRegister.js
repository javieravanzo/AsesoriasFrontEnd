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
    console.log(fileType[0].size);
    if(fileType[0].size < 3000000){
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
    }else{
      document.getElementById(tipo).value = "";  
      ERROR_MODAL("Error al cargar archivo", "El tamaño del archivo debe ser inferior a 3MB");
      
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
    
    
    /*this.setState({
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
    }*/

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
                        <input key={this.state.kBK} type="file" id="cedula" data-tipo="cedula" onChange={this.onChange}
                              accept="image/png, image/jpeg, application/pdf"/>
                      </Col>
                      <Col lg={12}  md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Cargar certificado laboral</p>
                        <input key={this.state.kBK} type="file" id="certificado" data-tipo="certificado" onChange={this.onChange}
                              accept="image/png, image/jpeg, application/pdf"/>
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
                                  <span className={"form-names-terms mano"}><u onClick={() => this.openTermsandConditions()}>Acepto los Términos, Condiciones de uso y Autorización de tratamiento de datos.</u></span>
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
                      <div className="terms-conditions">
                        <p><strong>T&Eacute;RMINOS Y CONDICIONES DE USO DE LA P&Aacute;GINA WEB DE AVANZO </strong></p>
<p><strong>&nbsp;</strong></p>
<p>VICTORIA INVERSIONES S.A.S. (en adelante, AVANZO) a trav&eacute;s de su portal web www.avanzo.co (en adelante "p&aacute;gina web") brinda la plataforma tecnol&oacute;gica para efectuar solicitudes de cupos de cr&eacute;dito rotativo y desembolsos, los cuales son cancelados a trav&eacute;s de la modalidad de libranza o descuento directo autorizado por el Usuario.&nbsp;</p>
<p>&nbsp;</p>
<p>AVANZO solicita al visitante y Usuario de la p&aacute;gina web la lectura de estos t&eacute;rminos y condiciones antes de iniciar su navegaci&oacute;n o utilizar los servicios ofrecidos a trav&eacute;s de este portal web. El acceso y navegaci&oacute;n en la p&aacute;gina web, as&iacute; como el registro en la plataforma tecnol&oacute;gica de AVANZO, se encuentra precedido de un &ldquo;click&rdquo; en el bot&oacute;n acepto, lo cual constituye el conocimiento y la aceptaci&oacute;n expresa del Usuario de estos t&eacute;rminos y condiciones. En caso de no estar de acuerdo con estas condiciones sugerimos al visitante y Usuario que se abstenga de acceder o navegar por la p&aacute;gina web.&nbsp;</p>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.&nbsp;&nbsp;&nbsp; Definiciones&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>Los t&eacute;rminos que a continuaci&oacute;n se mencionan, se interpretan de acuerdo al siguiente alcance:&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li><strong>Cuenta de Usuario: </strong>Una​ vez el Usuario se registra en la p&aacute;gina web, dispone de una cuenta a trav&eacute;s de la cual accede a los servicios ofrecidos por AVANZO.&nbsp;</li>
</ul>
<p>&nbsp;</p>
<ul>
<li><strong>Cupo de Cr&eacute;dito Rotativo:</strong> Cupo de cr&eacute;dito que una vez aprobado, se mantiene disponible para ser desembolsado y transferido a favor del Usuario hasta completar el cupo total disponible, el cual se ir&aacute; liberando a medida en que se realizan los pagos de los desembolsos solicitados.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li><strong>Empleador o Entidad Pagadora: </strong>Es​ la persona jur&iacute;dica, que tiene a su cargo la obligaci&oacute;n del pago del salario o cualquiera que sea la denominaci&oacute;n de la remuneraci&oacute;n, en raz&oacute;n de la ejecuci&oacute;n de un trabajo o labor.</li>
</ul>
<p><strong>&nbsp;</strong></p>
<ul>
<li><strong>Libranza o Descuento directo:</strong> Es la autorizaci&oacute;n dada por el Usuario a la Entidad Pagadora, para que realice el descuento de su salario u honorarios disponibles, con el objeto de que las sumas descontadas sean giradas a favor de AVANZO como pago de los desembolsos realizados al Usuario.</li>
</ul>
<p><strong>&nbsp;</strong></p>
<ul>
<li><strong>Usuario: </strong>Corresponde​ a la persona natural asalariada o contratada por prestaci&oacute;n de servicios que solicita el cupo de cr&eacute;dito rotativo ofrecido por AVANZO a trav&eacute;s de la p&aacute;gina web, efectuando el pago de los desembolsos que se realicen a su favor a trav&eacute;s del descuento sobre su salario u honorarios, previa autorizaci&oacute;n para el efecto al Empleador o Entidad Pagadora.</li>
</ul>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.&nbsp;&nbsp;&nbsp; Uso de la p&aacute;gina web, sus contenidos y sus servicios&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>Se encuentra prohibido el uso de la p&aacute;gina web con fines il&iacute;citos contra AVANZO o contra terceros que, de cualquier forma, puedan resultar perjudicados o la realizaci&oacute;n de cualquier actividad que impida el normal funcionamiento de la p&aacute;gina web o la prestaci&oacute;n de los servicios ofrecidos a trav&eacute;s de &eacute;sta.&nbsp;</p>
<p>&nbsp;</p>
<p>Los contenidos incluidos en la p&aacute;gina web son de propiedad exclusiva de AVANZO. Est&aacute; prohibida su copia o reproducci&oacute;n total o parcial, su traducci&oacute;n, inclusi&oacute;n, transmisi&oacute;n, almacenamiento o acceso a trav&eacute;s de medios digitales o de cualquier otro sistema sin autorizaci&oacute;n previa y escrita de AVANZO.&nbsp;</p>
<p>&nbsp;</p>
<p>Los enlaces (links) a otras p&aacute;ginas o portales de Internet, son ofrecidos como un servicio al Usuario. No obstante, se aclara que AVANZO no ha estado involucrada en la construcci&oacute;n de dichas p&aacute;ginas de internet y por ende no es responsable de su contenido o del uso o adquisici&oacute;n de los servicios ofrecidos en las mismas.&nbsp;</p>
<p><strong>&nbsp;</strong></p>
<p>Los elementos y cualquier informaci&oacute;n protegida por la propiedad intelectual, son de titularidad exclusiva de AVANZO, en consecuencia, se encuentra prohibida su reproducci&oacute;n o uso a cualquier t&iacute;tulo sin autorizaci&oacute;n previa y escrita de AVANZO.&nbsp;</p>
<p>&nbsp;</p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.&nbsp;&nbsp;&nbsp; Informaci&oacute;n entregada a AVANZO</h2>
<p>&nbsp;</p>
<p>La informaci&oacute;n suministrada por el Usuario a trav&eacute;s de la p&aacute;gina web en cada uno de sus canales de contacto y/o de registro ser&aacute; utilizada exclusivamente para atender las solicitudes de los Usuarios y la prestaci&oacute;n del servicio ofrecido por AVANZO. Particularmente, la informaci&oacute;n personal ser&aacute; tratada conforme a la Pol&iacute;tica de Tratamiento de Datos Personales publicada en el enlace https://avanzo.co/politicas-tratamiento-datos-personales/​ ,​ en la cual se establece la manera en que son tratados los datos personales compartidos por el Usuario y de terceros. As&iacute; mismo, en dicha pol&iacute;tica se informan los derechos a favor de los Titulares de informaci&oacute;n personal, y la forma de ejercerlos ante AVANZO.&nbsp;</p>
<p>&nbsp;</p>
<p>En todo caso, AVANZO de forma previa a cualquier actividad sobre datos personales, solicitar&aacute; autorizaci&oacute;n al Titular, para que este conozca las finalidades particulares del tratamiento por parte de la entidad y sus derechos, lo anterior en cumplimiento de la Ley 1581 de 2012 y sus Decretos reglamentarios.</p>
<p>&nbsp;</p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.&nbsp;&nbsp;&nbsp; Sobre los servicios ofrecidos a trav&eacute;s de la p&aacute;gina web&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>Cualquier persona podr&aacute; acceder a la p&aacute;gina web a trav&eacute;s de un dispositivo electr&oacute;nico con conexi&oacute;n internet. Si un Usuario desea acceder a los servicios ofrecidos por AVANZO, deber&aacute; registrarse en la plataforma y crear una cuenta, autorizando previamente el tratamiento de la informaci&oacute;n personal.&nbsp;</p>
<p>&nbsp;</p>
<h2>3.1. Registro</h2>
<p><strong>&nbsp;</strong></p>
<p>Corresponde al paso inicial para efectuar la solicitud de cupo de cr&eacute;dito rotativo. Al efectuar el registro como Usuario, AVANZO solicitar&aacute; el suministro de determinada informaci&oacute;n para la gesti&oacute;n de los servicios. Por ende, el Usuario se compromete a brindar informaci&oacute;n veraz y completa, as&iacute; como a actualizarla cuando ello sea pertinente.&nbsp;</p>
<p>&nbsp;</p>
<p>Dentro de la informaci&oacute;n solicitada para el registro se encuentran los datos personales del Usuario, los cuales ser&aacute;n tratados conforme a la autorizaci&oacute;n otorgada por su parte y a la Pol&iacute;tica de Tratamiento de Datos Personales de AVANZO.&nbsp;</p>
<p>&nbsp;</p>
<p>Si el Usuario no efect&uacute;a el registro, podr&aacute; navegar por las diferentes secciones de la p&aacute;gina web y explorar su contenido, sin poder acceder a los servicios ofrecidos. <strong>&nbsp;</strong></p>
<p><strong>&nbsp;</strong></p>
<h2>3.2. Usuario y contrase&ntilde;a&nbsp;</h2>
<p>&nbsp;</p>
<p>Cada una de las Cuentas de Usuario registradas en la p&aacute;gina web tendr&aacute; tanto un usuario que constituye la identificaci&oacute;n en el sistema, como una clave o contrase&ntilde;a de acceso a la cuenta, la cual es configurada por el Usuario durante su registro en la p&aacute;gina web. Una vez efectuado el registro, el Usuario se compromete a adoptar las medidas de seguridad necesarias para impedir el acceso a su cuenta por parte de terceros no autorizados. En consecuencia, el Usuario ser&aacute; responsable por la confidencialidad de la informaci&oacute;n contenida en su cuenta, as&iacute; como de las acciones que se puedan realizar a trav&eacute;s de la misma por falta de cuidado o negligencia de su parte en el manejo de su usuario y/o contrase&ntilde;a.&nbsp;</p>
<p>&nbsp;</p>
<p>El Usuario deber&aacute; informar a AVANZO sobre cualquier actividad anormal o uso no autorizado de su cuenta y/o contrase&ntilde;a, correo electr&oacute;nico, n&uacute;mero de identificaci&oacute;n u cualquier otra informaci&oacute;n que lo identifique ante AVANZO, de forma inmediata al conocimiento de los hechos, a trav&eacute;s de los canales de contacto establecidos en el numeral 12 de estos t&eacute;rminos y condiciones. Una vez notificado, AVANZO tomar&aacute; las medidas conducentes para realizar a m&aacute;s tardar dentro de las 24 horas siguientes al aviso, el bloqueo de la Cuenta de Usuario sobre la cual se recibe la notificaci&oacute;n&nbsp;</p>
<p>&nbsp;</p>
<h2>3.3. Ingreso a la Cuenta de Usuario</h2>
<p><strong>&nbsp;</strong></p>
<p>Efectuado el registro en la p&aacute;gina web, el Usuario podr&aacute; iniciar sesi&oacute;n en el bot&oacute;n dispuesto para el efecto en la plataforma. As&iacute; mismo, a trav&eacute;s de la Cuenta de Usuario &eacute;ste podr&aacute; efectuar la solicitud de cupo de cr&eacute;dito rotativo y desembolsos sobre el mismo, as&iacute; como conocer las condiciones particulares y cargos que apliquen a cada uno de los desembolsos. De igual forma, a trav&eacute;s de su cuenta, el Usuario podr&aacute; conocer la informaci&oacute;n vinculada a su perfil, debiendo actualizarla o editarla cuando ello sea necesario para la correcta prestaci&oacute;n de los servicios.&nbsp;</p>
<p>&nbsp;</p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Olvido de contrase&ntilde;a</h2>
<p><strong>&nbsp;</strong></p>
<p>En el evento de no poder acceder a la cuenta por olvido de su contrase&ntilde;a, el Usuario podr&aacute; ir a la secci&oacute;n de &ldquo;Iniciar Sesi&oacute;n&rdquo; y seleccionar la opci&oacute;n de &ldquo;Olvid&eacute; mi contrase&ntilde;a&rdquo;, siguiendo el procedimiento establecido por AVANZO para la asignaci&oacute;n y/o restablecimiento de la nueva contrase&ntilde;a.&nbsp;</p>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.&nbsp;&nbsp;&nbsp; Pautas a tener en cuenta durante la navegaci&oacute;n en la p&aacute;gina web&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>Con el fin de garantizar el buen uso de la p&aacute;gina web, el Usuario se compromete a cumplir las siguientes pautas que instruir&aacute;n su conducta en la plataforma dispuesta por AVANZO:&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>Observar los presentes T&eacute;rminos y Condiciones, la Pol&iacute;tica de Tratamiento de Datos Personales y cualquier otra pol&iacute;tica establecida por AVANZO que se encuentre publicada en la p&aacute;gina web para su conocimiento.</li>
<li>Usar el contenido de la p&aacute;gina web o los servicios ofrecidos en la misma de forma diligente y para fines l&iacute;citos.</li>
<li>Adoptar las medidas de seguridad necesarias para evitar el acceso no autorizado a la Cuenta de Usuario en la p&aacute;gina web.</li>
<li>No usar la p&aacute;gina web como medio para desarrollar actividades ilegales o no autorizadas tanto en Colombia, como en cualquier otro pa&iacute;s.</li>
<li>Abstenerse de enviar correos electr&oacute;nicos no deseados (spam) a otros Usuarios de la p&aacute;gina web, como tambi&eacute;n transmitir virus o cualquier c&oacute;digo de naturaleza destructiva por medio de la misma.</li>
<li>No alterar, bloquear o realizar cualquier acto que impida el correcto funcionamiento de la p&aacute;gina web, tales como y sin limitarse a: ataques inform&aacute;ticos, interceptaci&oacute;n de comunicaciones, usurpaci&oacute;n de identidad o falsedad en documentos.</li>
<li>Presentar las peticiones, quejas o reclamos de forma respetuosa a trav&eacute;s de los canales de contacto establecidos por AVANZO tanto en la Pol&iacute;tica de Tratamiento de Datos Personales como en la p&aacute;gina web y los presentes t&eacute;rminos y condiciones.</li>
</ul>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.&nbsp;&nbsp;&nbsp; Responsabilidad del Usuario</h2>
<p><strong>&nbsp;</strong></p>
<p>El uso de la p&aacute;gina web se realizar&aacute; bajo responsabilidad del Usuario, en consecuencia, este ser&aacute; responsable por:&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>Las operaciones realizadas a trav&eacute;s de la p&aacute;gina web sin requisito distinto a que estas sean efectuadas a trav&eacute;s de las funcionalidades habilitadas en la p&aacute;gina web y empleando la Cuenta de Usuario, la contrase&ntilde;a de acceso y cualquier otra seguridad adicional establecida por AVANZO.</li>
<li>Los actos derivados del acceso no autorizado por terceros, como consecuencia de la falta de cuidado o negligencia del Usuario respecto a la custodia de su Usuario y contrase&ntilde;a de acceso.</li>
<li>Disponer de, al menos, un dispositivo electr&oacute;nico con conexi&oacute;n a internet para acceder a la p&aacute;gina web y poder utilizar los servicios.</li>
</ul>
<p>&nbsp;</p>
<p>El Usuario deber&aacute; mantener indemne a AVANZO por todo concepto o reclamaci&oacute;n judicial o extrajudicial que se llegare a presentar con ocasi&oacute;n al incumplimiento por parte del Usuario de lo establecido en estos t&eacute;rminos y condiciones.&nbsp;</p>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7.&nbsp;&nbsp;&nbsp; Derechos de AVANZO</h2>
<p><strong>&nbsp;</strong></p>
<p>En su calidad de propietario de la p&aacute;gina web, AVANZO se reserva el derecho a ejercer las siguientes facultades:&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>Modificar unilateralmente, en cualquier tiempo y por cualquier causa los presentes t&eacute;rminos y condiciones, as&iacute; como el dise&ntilde;o y funcionalidad de la p&aacute;gina web. En tal caso, AVANZO informar&aacute; de las modificaciones realizadas a los Usuarios, a trav&eacute;s de correo electr&oacute;nico y/o la p&aacute;gina web. Efectuadas las modificaciones, cualquier uso por parte del Usuario representar&aacute; su aceptaci&oacute;n a las mismas.</li>
<li>Denegar el registro en la p&aacute;gina web a cualquier persona, en cualquier momento y por las razones que considere a su sano criterio.</li>
<li>Cerrar Cuentas de Usuarios que, en concepto de AVANZO, puedan no estar haciendo un adecuado uso de la p&aacute;gina web o los servicios ofrecidos a trav&eacute;s de ella.</li>
<li>Decidir sobre el contenido publicado en la p&aacute;gina web y removerlo cuando as&iacute; lo considere pertinente por ser ofensivo o ir en contrav&iacute;a de las normas legales o afectar derechos de terceros.</li>
</ul>
<p><strong>&nbsp;</strong></p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8.&nbsp;&nbsp;&nbsp; Responsabilidad de AVANZO</h2>
<p><strong>&nbsp;</strong></p>
<p>AVANZO realizar&aacute; sus mejores esfuerzos para que la p&aacute;gina web funcione correctamente las veinticuatro (24) horas del d&iacute;a y el Usuario pueda utilizar sus servicios sin interrupci&oacute;n, sin perjuicio de las limitaciones y restricciones establecidas e informadas previamente por AVANZO al Usuario, o de las limitaciones de los dispositivos o conexiones del USUARIO para acceder a la p&aacute;gina web.&nbsp;</p>
<p>&nbsp;</p>
<p>AVANZO podr&aacute; interrumpir o suspender, sin que esto genere una responsabilidad de AVANZO frente al Usuario, los servicios de la p&aacute;gina web por razones t&eacute;cnicas, de seguridad, por problemas que puedan presentarse por cortes en los servicios de conexi&oacute;n a internet, energ&iacute;a, por fuerza mayor o caso fortuito o hecho de un tercero no imputable a AVANZO.&nbsp;</p>
<p>&nbsp;</p>
<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9.&nbsp;&nbsp;&nbsp; Exclusi&oacute;n de garant&iacute;as y responsabilidades&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>AVANZO no otorga garant&iacute;a ni se hace responsable, en ning&uacute;n caso, de los da&ntilde;os y perjuicios de cualquier naturaleza que pudieren resultar de los siguientes hechos:</p>
<p>&nbsp;</p>
<ul>
<li>La falta de disponibilidad, mantenimiento y continuidad del funcionamiento de la p&aacute;gina web por causas no imputables a AVANZO. Cuando ello sea razonablemente posible, AVANZO advertir&aacute; previamente las interrupciones o limitaciones en el funcionamiento de la p&aacute;gina web.</li>
<li>La falta de utilidad, adecuaci&oacute;n o validez de la p&aacute;gina web y/o de sus servicios o contenidos para satisfacer expectativas del usuario.</li>
<li>El uso negligente, il&iacute;cito o fraudulento o contrario a los presentes t&eacute;rminos y condiciones por parte de uno o varios Usuarios.</li>
<li>El incumplimiento por parte de terceros de sus obligaciones o compromisos en relaci&oacute;n con los servicios prestados a trav&eacute;s de la p&aacute;gina web.</li>
</ul>
<p>&nbsp;</p>
<h2>10. Seguridad en internet&nbsp;</h2>
<p><strong>&nbsp;</strong></p>
<p>AVANZO har&aacute; sus mejores esfuerzos para mantener la seguridad y confidencialidad de la p&aacute;gina web, sin embargo AVANZO no controla ni garantiza, y por lo tanto no se hace responsable, por la presencia de c&oacute;digos maliciosos ni de otros elementos en los contenidos de la p&aacute;gina web y que hagan su aparici&oacute;n a pesar del cumplimiento de sus deberes y debida diligencia, de manera que puedan producir alteraciones en el sistema inform&aacute;tico (software y hardware) del Usuario o en los documentos electr&oacute;nicos almacenados en el sistema inform&aacute;tico del Usuario.&nbsp;</p>
<p>&nbsp;</p>
<p>Se entiende por c&oacute;digo malicioso el nombre que se le da a cualquier programa que ingresa a un dispositivo sin el conocimiento y la autorizaci&oacute;n inequ&iacute;voca del responsable del mismo, dentro de los cuales se encuentran, los denominados <em>virus;</em>​<em> troyanos; gusanos; phishing; pharming; rootkits; backdoor (puertas traseras), keyloggers (capturadores de teclado), screen loggers, bootnets, sniffers (husmeadores de tr&aacute;fico de la red)</em>​, entre otros.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>11. Uso de cookies</h2>
<p><strong>&nbsp;</strong></p>
<p>Las cookies son peque&ntilde;os archivos que se almacenan en el dispositivo electr&oacute;nico del Usuario para habilitar algunas funcionalidades de la plataforma tecnol&oacute;gica de AVANZO. Cualquier navegador que visite la p&aacute;gina web podr&aacute; recibir cookies de AVANZO o de terceros, como entidades aliadas o proveedores de servicios.&nbsp;</p>
<p>&nbsp;</p>
<p>AVANZO podr&aacute; utilizar <em>cookies</em>​<em> persistentes</em> para reconocer al Usuario ya existente y facilitar el uso de los servicios sin necesidad de volver a iniciar sesi&oacute;n en la Cuenta de Usuario. As&iacute; mismo, AVANZO podr&aacute; utilizar <em>cookies de sesi&oacute;n</em> para mantener el seguimiento de los movimientos del Usuario en la p&aacute;gina web, con el fin de no solicitar la informaci&oacute;n que el Usuario ha brindado previamente.&nbsp;</p>
<p>&nbsp;</p>
<p>La funcionalidad de cookies deber&aacute; ser autorizada por el Usuario, mediante un &ldquo;click&rdquo; en el bot&oacute;n acepto dispuesto en la p&aacute;gina web, lo cual constituye el conocimiento y la aceptaci&oacute;n expresa del Usuario respecto al uso de cookies.&nbsp;</p>
<p>&nbsp;</p>
<h2>12. Ayuda al Usuario</h2>
<p>&nbsp;</p>
<p>El Usuario podr&aacute; solicitar asistencia o elevar peticiones, quejas o reclamos a trav&eacute;s de los siguientes canales de contacto:&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>Env&iacute;o de correo electr&oacute;nico a <a href="mailto:operaciones@avanzo.co">operaciones@avanzo.co</a> .​</li>
<li>Directamente en las oficinas ubicadas en la direcci&oacute;n ​Cra. 18 #No. 86a - 14, Bogot&aacute;, Cundinamarca 2.6&nbsp;km, las cuales ser&aacute;n recibidas en el siguiente horario: de lunes a viernes de 8am-6pm.</li>
<li>A trav&eacute;s de la l&iacute;nea telef&oacute;nica (1) 4824824</li>
</ul>
<p>&nbsp;</p>
<h2>13. Ley aplicable y jurisdicci&oacute;n</h2>
<p><strong>&nbsp;</strong></p>
<p>Estos t&eacute;rminos y condiciones han sido dispuestos de conformidad con las leyes colombianas. Si cualquier disposici&oacute;n de estos t&eacute;rminos y condiciones pierde validez, por cualquier raz&oacute;n, todas las dem&aacute;s disposiciones conservar&aacute;n su fuerza obligatoria, car&aacute;cter vinculante y mantendr&aacute;n todos sus efectos.&nbsp;</p>
<p>&nbsp;</p>
<p>Cualquier controversia, acci&oacute;n o reclamaci&oacute;n, que surja de la interpretaci&oacute;n o aplicaci&oacute;n de los presentes t&eacute;rminos y condiciones, se someter&aacute; a decisi&oacute;n de los jueces de la Rep&uacute;blica de Colombia.&nbsp;</p>
<p>&nbsp;</p>
<hr />
<p>&nbsp;</p>
<h2 style={{textAlign: "center"}}>AUTORIZACI&Oacute;N TRATAMIENTO DE DATOS - REGISTRO CUENTA DE USUARIO EN P&Aacute;GINA WEB</h2>
<p>&nbsp;</p>
<p>Autorizo expresamente a VICTORIA INVERSIONES S.A.S. como Responsable del tratamiento de la informaci&oacute;n para utilizar mi nombre, tel&eacute;fono de contacto, correo electr&oacute;nico, informaci&oacute;n financiera y dem&aacute;s datos personales compartidos con la compa&ntilde;&iacute;a por medio de este formulario con el fin de: a) Realizar estudios pre-scoring y consultas en Centrales de Riesgos con el fin de validar la posibilidad de otorgar un cupo de cr&eacute;dito rotativo y desembolsos sobre el mismo; b) Realizar gestiones de conocimiento a trav&eacute;s de diferentes medios como p&aacute;ginas p&uacute;blicas de listados de personas involucradas en actividades ilegales, lavado de activos o financiaci&oacute;n del terrorismo as&iacute; como contactando a las posibles referencias aportadas c) Verificaci&oacute;n o actualizaci&oacute;n de informaci&oacute;n a trav&eacute;s de correo f&iacute;sico o electr&oacute;nico, mensajes de texto MMS/SMS y/o telef&oacute;nicamente, o cualquier otro medio de comunicaci&oacute;n o transmisi&oacute;n de datos accesible a la entidad; d) Almacenar mi informaci&oacute;n en sus bases de datos con el fin de gestionar la relaci&oacute;n contractual conmigo como titular de la informaci&oacute;n, incluyendo actividades de desembolsos de los cr&eacute;ditos solicitados, actividades de gesti&oacute;n de recuperaci&oacute;n de cartera, confirmaci&oacute;n y actualizaci&oacute;n de datos ya sea directamente o con terceros; e) Enviarme correspondencia, correos electr&oacute;nicos, mensajes de texto MMS/SMS y cualquier otro tipo de comunicaciones en desarrollo de actividades publicitarias, de mercadeo, ofrecimiento de productos o servicios nuevos y actuales que puedan ser considerados de mi inter&eacute;s; f) Compartir esta informaci&oacute;n con terceros conforme se haga necesario para realizar actividades comprendidas dentro del objeto social de la compa&ntilde;&iacute;a y/o para el ejercicio de actividades relacionadas con estas mismas finalidades; g) Realizar encuestas de satisfacci&oacute;n y percepci&oacute;n sobre los productos y servicios de la compa&ntilde;&iacute;a por cualquier medio; h) Atender mis peticiones, quejas o reclamos, o requerimientos realizados por autoridades en ejercicio de sus funciones; i) Conservar la informaci&oacute;n para fines hist&oacute;ricos y/o estad&iacute;sticos. <br /> <br />Declaro que como Titular de la informaci&oacute;n puedo informarme sobre el tratamiento que se le da a mi informaci&oacute;n personal por medio de la pol&iacute;tica de tratamiento de datos personales publicada en el siguiente link https://avanzo.co/politicas-tratamiento-datos-personales/ . <br /> <br />Conozco que, de acuerdo con la legislaci&oacute;n colombiana vigente en materia de protecci&oacute;n de datos personales, como Titular de la informaci&oacute;n tengo derecho a solicitar, conocer, actualizar, rectificar y/o suprimir mi informaci&oacute;n personal de las bases de datos de la entidad, esto &uacute;ltimo, siempre y cuando no tenga una relaci&oacute;n contractual u obligaci&oacute;n legal vigente con la compa&ntilde;&iacute;a. Igualmente, podr&eacute; solicitar prueba y/o revocar el consentimiento otorgado para el tratamiento de mis datos personales, conocer el uso que se le da a mi informaci&oacute;n y acceder gratuitamente<br />a los datos objeto de tratamiento al menos una vez al mes a traves de una solicitud enviada al correo <a href="mailto:operaciones@avanzo.co">operaciones@avanzo.co</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
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