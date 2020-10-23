//Libraries
import React, { Component } from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber,
         Input, DatePicker, Modal, Upload, message, Icon, Switch, Spin} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../../../subcomponents/FieldTitle';
import { SUCCESS_MODAL, ERROR_MODAL } from '../../../subcomponents/modalMessages';
import { allowEmergingWindows, WARNING_MODAL } from '../../../subcomponents/modalMessages';
import {bankTypeAccountInfo} from '../../../../../configuration/constants';

//Actions
import {getCompanies} from "../../../../../store/redux/actions/general/loginActions";
import {createCustomer} from "../../../../../store/redux/actions/admin/adminActions";
import {getDateListToCustomer} from "../../../../../store/redux/actions/admin/adminActions";


import { getOutlayData } from "../../../../../store/redux/actions/customer/customerActions";

//Styles
import '../../../../styles/admin/create-company.css';
import BaseURL from '../../../../../services/BaseURL';

//Constants
const FormItem = Form.Item;
const { Panel } = Collapse;

class CustomerManagement extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      isLoading: false,
      captchaSolved: true,
      email: null,
      meeting: null,
      moyen: false,
      report: null,
      loan: null,
      upload: null,
      particular_modal: null,
      bank_account: true,
      money_wallet: false      
    };

    this.props.getCompanies();
    this.props.getOutlayData(parseInt(localStorage.user_id, 10), undefined);


  };

  onConfirmRequest = () => {
    this.props.form.validateFields((err, values) => {
      if (err){
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese datos válidos dentro del formulario.");
      }else{  
        if(values.phoneNumber.toString()[0] !== "3" || values.phoneNumber.toString().length !== 10 ){
          ERROR_MODAL("Error al realizar la acción", "Por favor ingresa un número de teléfono válido.");
        }else if (values.fixedNumber.toString().length !== 7) {
          ERROR_MODAL("Error al realizar la acción", "Por favor ingresa un número de teléfono fijo válido.");
        }else{  
          values.birthDate = values.birthDate !== undefined ? new Date(values.birthDate._d) : null;
          values.customer_initDate = values.customer_initDate !== undefined ? new Date(values.customer_initDate._d) : null;
          values.expeditionDate = values.expeditionDate !== undefined ? new Date(values.expeditionDate._d) : null;

          this.props.createCustomer(values);
        }
      }
    });
  };

  handleWallet = (e) => {
    this.setState({
      money_wallet: e,
      bank_account: !e,
    });
  };

  onLoadFile = () => {
    this.setState({
      particular_modal: false,
    });
    //SUCCESS_MODAL("Acción realizada exitosamente", "El cliente ha sido creado correctamente.");
  };

  onChangeFile = () => {

  }

  validationNumbers = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
  };

  onChangeNames = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^a-zA-Z\s]$/g, '');
  };

  seeDocument = () => {

    let file = "https://drive.google.com/open?id=1P8dg2A08Sb7iZIGLKRsE4xFa_pG1CeTP";

    if (file !== null ) {
      let newWindow = window.open(file, "_blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        allowEmergingWindows();
      }
    } else {
      WARNING_MODAL('Advertencia', 'El reporte no está disponible');
    }

  };

  changeCompany = (e) => {

    //console.log("E", e);

    if(e !== null && e !== undefined){
      this.props.getDateListToCustomer(e);
    }
    
  };

  render(){

    let { registerInfo, outlayDataResponse } = this.props;
    let {getFieldDecorator} = this.props.form;
    let { bankInfo, walletInfo } = outlayDataResponse;
    let {bank_account, money_wallet} = this.state;
    let cycles = this.props.customerDateList !== null ? this.props.customerDateList : [];
    const props = {
      name: 'file',
      action: BaseURL + '/Customer/MultipleCreate',
      headers: {
        authorization: 'Bearer '+ localStorage.access_token,
        
      },
      onChange(info) {
        /*if (info.file.status !== 'uploading') {
          //console.log(info.file, info.fileList);
        }]*/
        if (info.file.status === 'done') {
          /*this.setState({
            particular_modal: false
          });*/
          SUCCESS_MODAL("Acción realizada exitosamente", "Los clientes han sido creados exitosamente.");
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    
    };

    if(JSON.stringify(this.props.outlayDataResponse) === '{}'){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                </div>);
    }else{
      return (
        <div className={"company-div"}>
            <Row gutter={8}>
              <Col xs={24} sm={24} md={8} lg={14}/>
              <Col xs={24} sm={12} md={8} lg={5}>
                <Button icon="download" 
                        onClick={() => this.seeDocument()}>
                        Descargar formato
                </Button> 
              </Col>
              <Col xs={24} sm={12} md={8} lg={5}>
                <Button className={"create-customer-button"} icon="file-excel" 
                        onClick={() => this.setState({particular_modal: true})}>
                        Crear múltiples clientes
                </Button> 
              </Col>
              <Modal 
                title="Crear clientes"
                visible={this.state.particular_modal}
                okText={"Cerrar"}
                cancelText={"Cancelar"}
                width={450}
                onOk={() => this.onLoadFile()}
                onCancel={() => this.setState({particular_modal: false})}>
                  <div>
                    <div>
                      Suba el archivo de Excel con los campos correspondientes para crear clientes.
                      <i> Recuerde que el archivo debe tener unas condiciones y especificaciones obligatorias.</i>
                      <b> Cuando agregue el archivo, será cargado instatáneamente.</b>
                    </div>
                      
                    <br/>           
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Seleccionar y cargar archivo Excel
                      </Button>
                    </Upload>
                    <br/>
                  
                  </div>

              </Modal>
            </Row>
            <Row className={"request-row-content"}>
              <div>  
                <Form>
                  <Collapse defaultActiveKey={['1']} bordered={false}>
                    <Panel header="Información personal" key="1">
                      <Row gutter={20} className={"form-request-rows"} >
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Nombres completos"}/>
                          <FormItem>
                            {getFieldDecorator('name',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un nombre'}
                              ]})(
                                <Input onChange={(e) => this.onChangeNames(e)} className={"form-input-number"} placeholder={"Nombres completos"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Apellidos completos"}/>
                          <FormItem>
                            {getFieldDecorator('lastName',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un apellido'}
                              ]})(
                                <Input  onChange={(e) => this.onChangeNames(e)} className={"form-input-number"} placeholder={"Apellidos completos"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Tipo de Identificación"}/>
                          <FormItem>
                            {getFieldDecorator('documentType',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un tipo de identificación'}
                              ]})(
                                <Select placeholder={"Tipo de documento"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                  <Select.Option value={1}>Cédula</Select.Option>
                                  <Select.Option value={2}>Pasaporte</Select.Option>
                                  <Select.Option value={3}>Cédula de extranjería</Select.Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"No. de Identificación"}/>
                          <FormItem>
                            {getFieldDecorator('identificationId',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un número de identificación'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} maxLength={12} prefix={<Icon type="idcard" className={'icon-prefix'} />}
                                              placeholder="Número de documento" className={"input-number"}/>
                              )
                            }
                          </FormItem>
                        </Col> 
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Teléfono fijo"}/>
                          <FormItem>
                            {getFieldDecorator('fixedNumber',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un teléfono fijo'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"Teléfono fijo"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Teléfono celular"}/>
                          <FormItem>
                            {getFieldDecorator('phoneNumber',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un teléfono celular'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"Teléfono celular"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Correo electrónico"}/>
                          <FormItem>
                            {getFieldDecorator('email',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un correo electrónico'}
                              ]})(
                                <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Género"}/>
                          <FormItem>
                            {getFieldDecorator('genus',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un correo electrónico'}
                              ]})(
                                <Select placeholder={"Género"} showSearch={true}>
                                  <Select.Option value={"Masculino"}>Masculino</Select.Option>
                                  <Select.Option value={"Femenino"}>Femenino</Select.Option>
                                  <Select.Option value={"Otro"}>Otro</Select.Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Fecha de nacimiento"}/>
                          <FormItem>
                            {getFieldDecorator('birthDate',
                              {rules: [
                                {required: false, message: 'Por favor ingresa una fecha de nacimiento'}
                              ]})(
                                <DatePicker placeholder={"Fecha de nacimiento"}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={7} >
                          <FieldTitle title={"Fecha de expedición del documento"}/>
                          <FormItem>
                            {getFieldDecorator('expeditionDate',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un correo electrónico'}
                              ]})(
                                <DatePicker placeholder={"Fecha de expedición"} className={"date-picker-expedition"}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Cantidad máxima de préstamo"}/>
                          <FormItem>
                            {getFieldDecorator('maximumAmount',
                              {rules: [
                                {required: true, message: 'Por favor ingresa una cantidad de préstamo'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} placeholder={"Cantidad de prestámo"} style={{width: "100% !important"}}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={5}>
                          <FieldTitle title={"Empresa"}/>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('idCompany', {
                              rules: [ 
                                {required: true, message: 'Por favor, ingrese su empresa.' }],
                            })(
                              <Select placeholder="Selecciona tu empresa" allowClear={true} showSearch={true} onChange={this.changeCompany}
                                notFoundContent={"No hay empresas disponibles"}>
                                {(registerInfo.companyRow).map((type, i) => (
                                  <Select.Option key={i} value={type.idCompany}>
                                    {type.socialReason}
                                  </Select.Option>))
                                }
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Máximo número de cuotas"}/>
                          <FormItem>
                            {getFieldDecorator('split',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un número de cuotas'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} placeholder={"Número de cuotas"} style={{width: "100% !important"}}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        
                        <Col lg={6} md={8} sm={12} xs={12}>
                          <FieldTitle title={"Ciclo de pagos"}/>
                          <FormItem className='home-form-item'>
                            {getFieldDecorator('companyPayment', {
                              rules: [ 
                                {required: true, message: 'Por favor, ingrese su ciclo de pagos.' }],
                            })(
                              <Select placeholder="Selecciona tu ciclo de pagos" allowClear={true} showSearch={true}>
                                {
                                  cycles.map((type, i) => (
                                    <Select.Option key={i} value={type.idCompanySalaries}>
                                      {type.companyRateName + " - " + type.companyPaymentDates}
                                    </Select.Option>))
                                }
                              </Select>
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>  
                    <Panel header="Información bancaria" key="2">
                      <Row className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={8} lg={7}>
                          <span className={"type-account"}>{"Banco "}<Switch onChange={this.handleWallet}/>{" Billetera virtual"}</span>  
                        </Col>
                      </Row>
                      <br/>
                    {
                      bank_account && 
                        <Row gutter={12} className={"form-request-rows"}>
                          <Col xs={12} sm={12} md={7} lg={7} >
                            <FieldTitle title={"Cuenta"}/>
                            <FormItem>
                              {getFieldDecorator('accountBank',
                                {
                                  rules: [
                                  {required: false, message: 'Por favor selecciona una cuenta'}
                                ]})(
                                  <Select onChange={this.changeBankName}  placeholder={"Cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                    {bankInfo.map((bank, i) =>(
                                      <Select.Option value={bank.bankName} key={i}>
                                        {bank.bankName}
                                      </Select.Option>
                                    ))
                                    }
                                  </Select>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col xs={12} sm={12} md={7} lg={7} >
                            <FieldTitle title={"Tipo de cuenta"}/>
                            <FormItem>
                              {getFieldDecorator('accountType',
                                { rules: [
                                  {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                                ]})(
                                  <Select placeholder={"Tipo de cuenta"}  showSearch={true} onChange={this.changeBankType}>
                                    {bankTypeAccountInfo.map((accountType, i) =>(
                                      <Select.Option value={accountType.id} key={i}>
                                        {accountType.name}
                                      </Select.Option>
                                    ))
                                    }
                                  </Select>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col xs={24} sm={24} md={10} lg={10}>
                          <FieldTitle title={"Número de cuenta"}/>
                            <FormItem >
                              {getFieldDecorator('accountNumber',
                                { rules: [
                                  {required: false, message: 'Por favor ingresa un número de cuenta' }
                                ]})(
                                  <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"Número de cuenta"} 
                                  />
                                )
                              }
                            </FormItem>  
                          </Col>
                        </Row>
                      }
                      {
                        money_wallet &&
                        <Row  gutter={12} className={"form-request-rows"}>
                          <Col xs={12} sm={12} md={7} lg={7} >
                            <FieldTitle title={"Billetera virtual"}/>
                            <FormItem>
                              {getFieldDecorator('accountBank',
                                { rules: [
                                  {required: false, message: 'Por favor ingresa un tipo de billetera'}
                                ]})(
                                  <Select placeholder={"Tipo de billetera"} showSearch={true} onChange={this.changeWalletType}>
                                    {walletInfo.map((wallet, i) =>(
                                      <Select.Option value={wallet.bankName} key={i}>
                                        {wallet.bankName}
                                      </Select.Option>
                                    ))
                                    }
                                  </Select>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col xs={24} sm={24} md={10} lg={10}>
                          <FieldTitle title={"Número de celular"}/>
                            <FormItem >
                              {getFieldDecorator('accountNumber',
                                { rules: [
                                  {required: false, message: 'Por favor ingresa un número de celular' }
                                ]})(
                                  <InputNumber className={"form-input-number"} placeholder={"Número de celular"} 
                                  onChange={this.changeWalletNumber} />
                                )
                              }
                            </FormItem>  
                          </Col>
                        </Row>
                      }
                      <Row gutter={20} className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Tipo Contrato"}/>
                          <FormItem>
                            {getFieldDecorator('contractType',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un tipo de contrato'}
                              ]})(
                                <Select placeholder={"Tipo de contrato"} showSearch={true}>
                                  <Select.Option value={"Término definido"}>Término definido</Select.Option>
                                  <Select.Option value={"Término indefinido"}>Término indefinido</Select.Option>
                                  <Select.Option value={"Otro"}>Otro</Select.Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Salario"}/>
                          <FormItem>
                            {getFieldDecorator('salary',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un salario'}
                              ]})(
                                <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"Salario"} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6} >
                          <FieldTitle title={"Fecha ingreso"}/>
                          <FormItem>
                            {getFieldDecorator('entryDate',
                              {rules: [
                                {required: false, message: 'Por favor ingresa una fecha'}
                              ]})(
                                <DatePicker className={"form-input-number"} placeholder={"Fecha ingreso"} />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={6}>
                          <FieldTitle title={"Cargo"}/>
                          <FormItem >
                            {getFieldDecorator('profession',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un cargo' }
                              ]})(
                                <Input className={"form-input-number"} placeholder={"Cargo"}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                      </Row>    
                    </Panel>
                  </Collapse>
                  <Col xs={24} sm={12} md={18} lg={20}/>
                  <Col xs={24} sm={12} md={6} lg={4}>
                    <Button className={"request-confirm-button"} icon="plus-circle" 
                            onClick={() => this.onConfirmRequest()}>
                          Crear cliente
                    </Button> 
                  </Col>
                </Form>
              </div>
          </Row>
        </div>
      );
    } 
    
  };
  
};

CustomerManagement.propTypes = {
  registerInfo: PropTypes.object,
  outlayDataResponse: PropTypes.object,
  createCustomerResponse: PropTypes.bool,
  customerDateList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    registerInfo: state.login.registerInfo,
    outlayDataResponse: state.customer.outlayDataResponse,
    createCustomerResponse: state.admin.createCustomerResponse,
    customerDateList: state.admin.customerDateList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: ( ) => dispatch(getCompanies( )),
    createCustomer: (data) => dispatch(createCustomer(data)),
    getOutlayData: (customerId, token) => dispatch(getOutlayData(customerId, token)),
    getDateListToCustomer: (companyId) => dispatch(getDateListToCustomer(companyId)),
  }
};

let CustomerManagementForm = Form.create()(CustomerManagement);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManagementForm);

