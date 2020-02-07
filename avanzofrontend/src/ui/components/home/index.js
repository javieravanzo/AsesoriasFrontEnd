//Libraries
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Card, Row, Col, Layout, Menu, Form, Input, Icon, Button, Select, Checkbox, Modal} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../configuration/routing/Routes';

//Actions
import {newRegister, getCompanies} from "../../../store/redux/actions/general/loginActions";

//Assets
import icon from "../../assets/authentication/avanzoMenu.jpg";
import home from "../../assets/home2.PNG";

//Styles
import '../../styles/home/home.css'
import { ERROR_MODAL, WARNING_MODAL } from '../subcomponents/modalMessages';

//Functions
/*function format(d) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(d);
};*/

//Constants
const { Header } = Layout;
const FormItem = Form.Item;
//const { Dragger } = Upload;

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
    };
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.carousel = React.createRef();

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
    e.target.value = input.replace(/[^a-zA-Z\s]$/g, '');
  };

  validationNumbers = (e) => {
    const input = e.target.value
    e.target.value = input.replace(/[^0-9]/g, '')
  };

  render() {

    /*const marks = {0: { style: { color: '#000', }, label: <p className={"left-marker"}>$80.000</p>},
                   100: { style: { color: '#1c77ff', }, label: <p className={"right-marker"}>$300.000</p>}};*/
    const { getFieldDecorator } = this.props.form;
    let { companyList } = this.props;

    return (
      <div >
        <Layout>
          <Header className={"header-menu1"} >         
            <Menu
              mode="horizontal"
              className={"menu-home-style"}>
                <Menu.Item>
                  <img src={icon} alt="menulogo" className="menu-logo" />
                </Menu.Item>
                <Menu.Item className={"login-menu-item"}>
                  <Button type="primary" htmlType="submit" className="home-login-button" 
                            onClick={() => this.setState({login: true})}>Iniciar sesión</Button>
                </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Row className={"home-main-row"}>
              <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
                <Card className={"customer-home-card"}>
                  <span className={"home-first-text"}>Llena estos datos con tus campos personales y nos pondremos en contacto contigo.</span> 
                  <Row className={"home-second-row"}>
                    <Col xxl={12} lg={12} md={12} sm={24} xs={24}>
                      <img src={home} alt="homes" className="home-img" />
                      <br/>
                    </Col>
                    <Col xxl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form className={"form-home"}> 
                      <Row gutter={4}>      
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p className={"form-names"}>Nombres</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('name', { initialValue: '',
                              rules: [
                                { required: true, message: 'Por favor, ingrese su(s) nombre(s).' }],
                            })(
                                <Input onChange={this.validationLetters} maxLength={21} className={"input-box"} prefix={<Icon type="user" className={'icon-prefix'} />}
                                      placeholder="Nombres"/>
                            )}
                          </FormItem>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p className={"form-names"}>Apellidos</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('lastName', { initialValue: '',
                              rules: [
                                { required: true, message: 'Por favor, ingrese su(s) apellido(s).' }],
                            })(
                                <Input onChange={this.validationLetters} maxLength={21} prefix={<Icon type="user" className={'icon-prefix'} />}
                                      placeholder="Apellidos"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={4}>      
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <p className={"form-names"}>Cédula</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('identificationId', {
                              initialValue: '',
                              rules: [{ required: true, message: 'Por favor ingrese su número de cédula' }],
                            })(
                                <Input onChange={this.validationNumbers} maxLength={12}  prefix={<Icon type="idcard" className={'icon-prefix'} />}
                                            placeholder="Número de documento" className={"input-number"}/>
                            )}
                          </FormItem>
                        </Col>
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
                      </Row>
                      <Row gutter={4}>
                        <Col lg={24} md={12} sm={24} xs={24}>
                          <p className={"form-names"}>Correo Electrónico</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('email', { initialValue: '',
                              rules: [ 
                                {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                                {required: true, message: 'Por favor, ingrese su correo electrónico.' }],
                            })(
                                <Input maxLength={35} prefix={<Icon type="mail" className={'icon-prefix'} />}
                                      placeholder="Correo electrónico"/>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={4}>
                        <Col lg={24} md={12} sm={24} xs={24}>
                          <p className={"form-names"}>Empresa</p>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('company', {
                              rules: [ 
                                {required: true, message: 'Por favor, ingrese su empresa.' }],
                            })(
                              <Select placeholder="Selecciona tu empresa" allowClear={true} showSearch={true}
                                notFoundContent={"No hay empresas disponibles"}>
                                {companyList.map((type, i) => (
                                  <Select.Option key={i} value={type.idCompany}>
                                    {type.socialReason}
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
                      
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <p className={"form-names"}>Cargar cédula, foto y comprobante de pago</p>
                          <input key={this.state.kBK} type="file" multiple="multiple" onChange={this.onChange}
                                accept=".pdf, application/pdf"/>
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
                                      <p onClick={() => this.setState({visibleTermModal: true})} className={"form-names-terms"}>{""} Acepto los <u>Términos, Condiciones y Políticas de uso de tratamientos de datos.</u></p>
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
                        title={"Términos, Condiciones y Políticas de tratamiento de datos"}
                        visible={this.state.visibleTermModal}
                        onCancel={() => this.setState({visibleTermModal: false})}
                        footer={
                          <Button key='submit' type='primary' disabled={this.state.clicked && this.props.newRegisterResponse === null} loading={this.state.clicked } onClick={() => this.setState({visibleTermModal: false, clicked: true})}>
                            Aceptar
                          </Button>}>
                        <div>
                          <p>Términos y condiciones...</p>
                        </div>
                      </Modal>
                    </Form>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Layout>
        </Layout>
        
        {
          (this.props.newRegisterResponse === true) &&
          <Redirect to={routes.confirm_account}/> 
        }

        
        {
          (this.state.login === true) &&
          <Redirect to={routes.login}/> 
        }
      </div>
    );
  }
}

Home.propTypes = {
  newRegisterResponse: PropTypes.bool,
  companyList: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    newRegisterResponse: state.login.newRegisterResponse,
    companyList: state.login.companyList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newRegister: (customerId) => dispatch(newRegister(customerId)),
    getCompanies: ( ) => dispatch(getCompanies( ))
  }
};

let WrappedHome = Form.create()(Home);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHome);
