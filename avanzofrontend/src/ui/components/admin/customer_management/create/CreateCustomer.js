//Libraries
import React, { Component } from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber,
         Input, DatePicker, Modal, Upload, message, Icon} from 'antd';

//Subcomponents
import FieldTitle from '../../../subcomponents/FieldTitle';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

//Styles
import '../../../../styles/admin/create-company.css';

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

  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "El cliente ha sido creado correctamente.");
  };

  onLoadFile = () => {
    this.setState({
      particular_modal: false,
    });
    SUCCESS_MODAL("Acción realizada exitosamente", "El cliente ha sido creado correctamente.");
  };

  render(){
    
    let {getFieldDecorator} = this.props.form;
    //let {particular_modal, multiple_modal} = this.state;
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
          message.success(`${info.file.name} file uploaded successfully`);
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
              okText={"Subir archivo"}
              cancelText={"Cancelar"}
              width={450}
              onOk={() => this.onLoadFile()}
              onCancel={() => this.setState({particular_modal: false})}>
                <div>
                  <div>
                    Suba el archivo de Excel con los campos correspondientes para crear clientes.
                    <i> Recuerde que el archivo debe tener unas condiciones y especificaciones obligatorias.</i>
                  </div>
                    
                  <br/>           
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Seleccionar Excel
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
                          {getFieldDecorator('customer_name',
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
                          {getFieldDecorator('customer_lastname',
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
                          {getFieldDecorator('customer_identificationtype',
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
                          {getFieldDecorator('customer_identification',
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
                          {getFieldDecorator('customer_phone',
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
                          {getFieldDecorator('customer_cellphone',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un teléfono celular'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Teléfono celular"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('customer_email',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Género"}/>
                        <FormItem>
                          {getFieldDecorator('customer_genus',
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
                          {getFieldDecorator('born_date',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <DatePicker placeholder={"Fecha de nacimiento"}/>
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8} >
                        <FieldTitle title={"Fecha de expedición"}/>
                        <FormItem>
                          {getFieldDecorator('expedition_data',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <DatePicker placeholder={"Fecha de expedición"} style={{width: "100% !important"}}/>
                            )
                          }
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>  
                  <Panel header="Información bancaria" key="2">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Banco"}/>
                        <FormItem >
                          {getFieldDecorator('customer_bank',
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
                          {getFieldDecorator('customer_accoutType',
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
                          {getFieldDecorator('customer_accountNumber',
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
                          {getFieldDecorator('customer_contract',
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
                          {getFieldDecorator('customer_salary',
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
                          {getFieldDecorator('customer_initDate',
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
                          {getFieldDecorator('customer_profession',
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
  
}

let CustomerManagementForm = Form.create()(CustomerManagement);

export default CustomerManagementForm;
