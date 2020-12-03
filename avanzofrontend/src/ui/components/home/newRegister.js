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
import {documentTypes, citys} from "../../../configuration/constants";

//Styles
import '../../styles/home/home.css'
import { ERROR_MODAL, WARNING_MODAL, allowEmergingWindows } from '../subcomponents/modalMessages';

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
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.carousel = React.createRef();

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
          paymentReport: fileType[1]
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

  render() {

    const { getFieldDecorator } = this.props.form;
    let { registerInfo } = this.props;
    let companies = registerInfo.companyRow === undefined ? [] : registerInfo.companyRow;
    let companyCycles = registerInfo.cycles === undefined ? [] : registerInfo.cycles;

    return (
      <div>
        <Row className={"home-main-row"}>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <Card className={"customer-home-card"} id="register">
              <Row className={"home-register-row-text"}>
                <span className={"home-first-text"}>Llena estos datos con tus campos personales y nos pondremos en contacto contigo.</span> 
              </Row>
              <Row gutter={24} className={"home-main-second-row"} >
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
                              <Input onChange={this.validationNumbers} maxLength={12}  prefix={<Icon type="idcard" className={'icon-prefix'} />}
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
                              <Input maxLength={35} prefix={<Icon type="mail" className={'icon-prefix'} />}
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
                              <Input maxLength={35} prefix={<Icon type="mail" className={'icon-prefix'} />}
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
                          <Input onChange={this.validationNumbers} maxLength={10} placeholder="Número de celular"
                              className={"input-number"}/>
                              )}
                        </FormItem>
                      </Col>
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
                    </Row>
                    <Row gutter={4}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Empresa</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('company', {
                            rules: [ 
                              {required: true, message: 'Por favor, ingrese tu empresa.' }],
                          })(
                            <Select placeholder="Selecciona tu empresa" allowClear={true} showSearch={true}
                              notFoundContent={"No hay empresas disponibles"}>
                              {companies.map((type, i) => (
                                <Select.Option key={i} value={type.socialReason+"*"+type.idCompany}>
                                  {type.socialReason}
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
                        <p className={"form-names"}>Cargar cédula y certificado laboral</p>
                        <input key={this.state.kBK} type="file" multiple="multiple" onChange={this.onChange}
                              accept=".pdf, application/pdf"/>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <p className={"form-names"}>Período de nómina</p>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('salary', {
                            rules: [ 
                              {required: true, message: 'Por favor, ingresa tu período de nómina.' }],
                          })(
                            <Select placeholder="Selecciona tu ciclo de pagos" allowClear={true} showSearch={true}
                              notFoundContent={"No hay ciclos de pago disponibles"}>
                              {companyCycles.map((type, i) => (
                                <Select.Option key={type.idCompanySalaries} value={type.idCompanySalaries}>
                                  {"Pago " + type.companyRateName + " - " + type.companyPaymentDates}
                                </Select.Option>))
                              }
                            </Select>
                          )}
                        </FormItem>
                      </Col>
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