//Libraries
import React, { Component } from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber,
         Input, DatePicker, Modal, Upload, message, Icon} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../../../subcomponents/FieldTitle';
import { SUCCESS_MODAL, ERROR_MODAL } from '../../../subcomponents/modalMessages';

//Actions
import {getCompanies} from "../../../../../store/redux/actions/general/loginActions";
import {createCustomer} from "../../../../../store/redux/actions/admin/adminActions";

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
      particular_modal: null
    };

    this.props.getCompanies();

  };

  onConfirmRequest = () => {
    this.props.form.validateFields((err, values) => {
      if (err){
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese datos válidos dentro del formulario.");
      }else{  
        values.birthDate = values.birthDate !== undefined ? new Date(values.birthDate._d) : null;
        values.customer_initDate = values.customer_initDate !== undefined ? new Date(values.customer_initDate._d) : null;
        values.expeditionDate = values.expeditionDate !== undefined ? new Date(values.expeditionDate._d) : null;
        //console.log("Values", values);
        this.props.createCustomer(values);
      }
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

  render(){

    let { companyList } = this.props;
    let {getFieldDecorator} = this.props.form;
    //let {particular_modal, multiple_modal} = this.state;
    const props = {
      name: 'file',
      action: BaseURL + 'Customer/MultipleCreate',
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

    return (
      <div className={"company-div"}>
          <Row gutter={8}>
            <Col xs={24} sm={24} md={8} lg={19}/>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Button className={"request-confirm-button"} icon="file-excel" 
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
                              <Input className={"form-input-number"} placeholder={"Nombres completos"} />
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
                              <Input className={"form-input-number"} placeholder={"Apellidos completos"} />
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
                                <Select.Option value={"Cédula"}>Cédula</Select.Option>
                                <Select.Option value={"Pasaporte"}>Pasaporte</Select.Option>
                                <Select.Option value={"Otro"}>Otro</Select.Option>
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
                              <Input className={"form-input-number"} placeholder={"No. de Identificación"} />
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
                              <Input className={"form-input-number"} placeholder={"Teléfono fijo"} />
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
                              <Input className={"form-input-number"} placeholder={"Teléfono celular"} />
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
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <DatePicker placeholder={"Fecha de nacimiento"}/>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Fecha de expedición"}/>
                        <FormItem>
                          {getFieldDecorator('expeditionDate',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <DatePicker placeholder={"Fecha de expedición"} style={{width: "100% !important"}}/>
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
                              <Input placeholder={"Cantidad de prestámo"} style={{width: "100% !important"}}/>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Máximo número de cuotas"}/>
                        <FormItem>
                          {getFieldDecorator('split',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un número de cuotas'}
                            ]})(
                              <Input placeholder={"Número de cuotas"} style={{width: "100% !important"}}/>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col lg={6} md={8} sm={12} xs={12}>
                        <FieldTitle title={"Empresa"}/>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('idCompany', {
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
                      <Col lg={6} md={8} sm={12} xs={12}>
                        <FieldTitle title={"Ciclo de pagos"}/>
                        <FormItem className='home-form-item'>
                          {getFieldDecorator('companyPayment', {
                            rules: [ 
                              {required: true, message: 'Por favor, ingrese su ciclo de pagos.' }],
                          })(
                            <Select placeholder="Selecciona tu ciclo de pagos" allowClear={true} showSearch={true}>
                              
                                <Select.Option key={1} value={1}>
                                  {"Ciclo de pagos 1"}
                                </Select.Option>
                                <Select.Option key={2} value={2}>
                                  {"Ciclo de pagos 2"}
                                </Select.Option>
                              
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>  
                  <Panel header="Información bancaria" key="2">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Banco"}/>
                        <FormItem >
                          {getFieldDecorator('accountBank',
                            {rules: [
                              {required: false, message: 'Por favor ingrese el banco'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Banco"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Tipo de cuenta"}/>
                        <FormItem>
                          {getFieldDecorator('accountType',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                            ]})(
                              <Select placeholder={"Tipo de cuenta"} showSearch={true}>
                                <Select.Option value={"Ahorros"}>Ahorros</Select.Option>
                                <Select.Option value={"Corriente"}>Corriente</Select.Option>
                                <Select.Option value={"Otro"}>Otro</Select.Option>
                              </Select>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={12}>
                        <FieldTitle title={"Número de cuenta"}/>
                        <FormItem >
                          {getFieldDecorator('accountNumber',
                            {rules: [
                              {required: false, message: 'Por favor ingrese el número de cuenta'}
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"Número de cuenta"}/>
                            )
                          }
                        </FormItem>  
                      </Col>     
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
                              <InputNumber className={"form-input-number"} placeholder={"Salario"} />
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
  
  };
  
};

CustomerManagement.propTypes = {
  companyList: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    companyList: state.login.companyList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: ( ) => dispatch(getCompanies( )),
    createCustomer: (data) => dispatch(createCustomer(data))
  }
};

let CustomerManagementForm = Form.create()(CustomerManagement);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManagementForm);
