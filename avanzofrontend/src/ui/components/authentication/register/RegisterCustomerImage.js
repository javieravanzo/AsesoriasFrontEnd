//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, Icon, Input, Col, Row, Modal, Select, InputNumber, DatePicker,Card,Upload,message} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import routes from '../../../../configuration/routing/Routes';
import {ERROR_MODAL} from "../../subcomponents/modalMessages";
import {Link} from "react-router-dom";

//Actions

import {SUCCESS_MODAL} from "../../subcomponents/modalMessages";

import {registerImage} from "../../../../store/redux/actions/customer/customerActions";

//Styles
import '../../../styles/authentication/loginCustomer.css';

//Assets
import logo from '../../../assets/authentication/avanzo.jpg';
import signInBackground from '../../../assets/authentication/background.png';
import signInBackground2 from  '../../../assets/authentication/background.png';

//Constants

const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Solo puedes subir archivos JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('La imagen debe pesar menos de 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const { TextArea } = Input;

class RegisterCustomerImage extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      isLoading: false,
      isLogged: false,
      captchaSolved: true,
      email: '',
      password: '',
      meeting: null,
      login: null,
      registerOk: null,
      rol: null,
      isLogin: false,
    };

    this.onSignInClickedImage = this.onSignInClickedImage.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.changeRol = this.changeRol.bind(this);
  };

  changeRol(role){
    localStorage.setItem('role', role);
    this.setState({ role: role});
  };

  onChangeEmail(email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword(password) {
    this.setState({ password: password.target.value })
  };

  sendMessage = (e) => {
  localStorage.setItem('isLogged', true);
  this.setState({
    isLogin: true,
  });
  SUCCESS_MODAL("Acción realizada satisfactoriamente", 
    "Ha ingresado a nuestra plataforma exitosamente.")
  };

  onChange = () => {
    this.setState({
      upload: !this.state.upload,
      documents_uploaded: true
    });
  };

  onSignInClickedImage(){
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar el registro", "Por favor ingrese todos los campos requeridos.");
      }else{
        this.props.registerImage(values);
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

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  state = {
    loading: false,
  };


  render(){

    const { isLogin, role } = this.state;
    const { imageUrl } = this.state;
    let { idDocumentsTypes, registerResponseImage } = this.props;

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`El archivo se cargo exitosamente`);
        } else if (info.file.status === 'error') {
          message.error(`El archivo no se cargo`);
        }
      },
    };
    
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">Cargar foto</div>
      </div>
    );


    
    let { login, registerOk} = this.state;
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
            
            <Row gutter={8}>
              <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem className='bottom-upload'>

                 {getFieldDecorator('picture', { initialValue: '',
                  rules: [ 
                    {required: true, message: 'Por favor, cargue una foto.' }],
                 })(
                  <Upload 
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  >
                 {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%'}} /> : uploadButton}
                  </Upload>
                  
                )}
                </FormItem>
                 
               </Col>
               <Col lg={12} md={12} sm={12} xs={12}>
               <FormItem >
                 {getFieldDecorator('document', { initialValue: '',
                  rules: [ 
                    {required: true, message: 'Por favor, cargue el comprobante' }],
                   })(
                  <Upload {...props} 
                  className="avatar-uploader"
                  >
                  <Button>
                  <Icon type="upload" /> Cargar comprobante
                  </Button>
                  </Upload>
                 )}
                </FormItem>
              </Col>
               </Row>
              




          <Card className="card-form" >
            <Row gutter={8}>
              <Col lg={24} md={24} sm={24} xs={24}>
                <h2  >Firma</h2>
                <FormItem className='home-form-item'>
                  {getFieldDecorator('firm', { initialValue: '',
                  rules: [ 
                    {required: true, message: 'Por favor, digite una firma' }],
                  })(
                  <TextArea rows={4}/>
                  )}
                </FormItem>
              </Col>
            </Row> 
          </Card>
          
          <Card className="card-form" >        
          <h2>Seleccionar rol</h2>
            <FormItem style={{marginTop:-25}}>
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: 'Por favor seleccione un rol' }],
                })(
                    <Select className={"form-select-content"} placeholder="Rol" onChange={(e) => this.changeRol(e)}
                    style={{marginLeft:40}}
                    >
                      <Select.Option value={0}>Usuario</Select.Option>
                      <Select.Option value={1}>Empresa</Select.Option>
                      <Select.Option value={2}>Administrador</Select.Option>
                    </Select>)
                }
            </FormItem>
            <FormItem>
                {getFieldDecorator('emailusu', { initialValue: '',
                  rules: [
                  {type: "email", message: "Ingrese un correo válido, por favor."},
                  {required: true, message: 'Por favor, ingrese su correo electrónico.'}],
                  })(
                  <Input prefix={<Icon type="user" className={"field-icon"} />} placeholder="Email" 
                  onChange={(value) => this.onChangeEmail(value)}/>
                  )}
            </FormItem>
            <FormItem>
                  {getFieldDecorator('passwordusu', {
                  rules: [{ required: true, message: 'Por ingrese su contraseña' }],
                  })(
                  <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"
                  onChange={(value) => this.onChangePassword(value)}/>)
                  }
            </FormItem>

            <div className={'home-buttons-div'}>
            <Row gutter={24}>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"register-col"}>
                <Button className={"register-button"}  onClick={() => this.onSignInClickedImage()}
                        icon="user-add">
                  Registrarse
                </Button>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} xxs={24} className={"login-col"}>


             <Button type="primary" className={"login-button"} onClick={() => this.sendMessage()}
                      icon="login" loading={false}
                      >
                    Iniciar sesión
                </Button>

             
                <Button type="primary" className={"login-button"} onClick={() => this.setState({login: true})}
                      icon="login" loading={false}
                      >
                    Iniciar sesión
                </Button>
              </Col>
            </Row>            
            </div>
          </Card>

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
            (JSON.stringify(registerResponseImage) !== '{}' ? registerResponseImage.status : false) && 
            <Redirect to={routes.confirm_account}/>
          }

          {
          (login) && 
            <Redirect to={routes.login}/>
          }

        {(isLogin && (role===0)) &&
          <Redirect to={routes.customer}/>
        }
        {(isLogin && (role===1)) &&
          <Redirect to={routes.company_request_management}/>
        }
        {(isLogin && (role===2)) &&
          <Redirect to={routes.admin_company_management}/>
        }
        </div> 
    );
  
  };
  
}

RegisterCustomerImage.propTypes = {
  isLogin: PropTypes.bool,
  login: PropTypes.func,
  registerResponseImage: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    registerResponseImage: state.customer.registerResponseImage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerImage: (data) => dispatch(registerImage(data)),
  }
};

let WrappedRegisterCustomerImage = Form.create()(RegisterCustomerImage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterCustomerImage);
