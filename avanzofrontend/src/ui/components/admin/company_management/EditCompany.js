//Libraries
import React, { Component } from 'react';
import { Form, Select, Button, Col, Row, Collapse, InputNumber, Input} from 'antd';

//Subcomponents
import FieldTitle from '../../subcomponents/FieldTitle';

//Styles
import '../../../styles/admin/create-company.css';
import { SUCCESS_MODAL } from '../../subcomponents/modalMessages';


//Constants
//import {Roles} from "../../../lib/generalUtils/constants";
const FormItem = Form.Item;
const { Panel } = Collapse;

class EditCompany extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      isLoading: false,
      isLogged: false,
      captchaSolved: true,
      email: null,
      meeting: null,
      moyen: false,
      report: null,
      loan: null,
      upload: null,
      salary_rate: null,
    };

  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La empresa ha sido editada correctamente.");
  };

  handleSalaryRate = () => {
    this.setState({
      salary_rate: true,
    });
  };

  render(){
    
    let {getFieldDecorator} = this.props.form;
    let {salary_rate} = this.state;

    const generalinf = {
      business: "Banco de bogota",
      nit:"111222333",
      activity:"Financiero",
      adress:"Calle Falsa 1234"
    };

    const creditinf= {
      loan: "$300.000",
      quotamax:"12",
      payment:"Mensual",
      date:"01-01-2019",
      date2:"02-02-2019"
    };

    const legalrep= {
      names: "Andres",
      surnames:"Molina",
      idtype:"Cedula",
      idnumber:"11161211110",
      phone:"8888888",
      mobile:"3117418594",
      mail:"yyy@hotmail.com"
    };

    const person= {
      names: "Catalina ",
      surnames:"Reyes",
      idtype:"Cedula",
      idnumber:"2226122220",
      phone:"9999999",
      mobile:"3126669874",
      mail:"zzz@gmail.com",
      area:"Bancaria",     
      position:"Cajero"     
    };

    return (
      <div className={"company-div"}>
          <Row className={"request-row-content"}>
            <div>  
              <Form>
                <Collapse defaultActiveKey={['1']} bordered={false}>
                  <Panel header="Información general para editar" key="1">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Razón social"}/>
                        <FormItem>
                          {getFieldDecorator('socialstatus',{
                            initialValue: [generalinf.business],
                            rules: [
                              {required: true, message: 'Por favor ingresa una razón social'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Razón social"} onLoad={this.fedit} />
                              
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6}>
                        <FieldTitle title={"NIT"}/>
                        <FormItem >
                          {getFieldDecorator('nit',{
                            initialValue: [generalinf.nit],
                            rules: [
                              {required: true, message: 'Por favor ingresa un NIT válido' }
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"NIT"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={6}>
                        <FieldTitle title={"Actividad económica"}/>
                        <FormItem >
                          {getFieldDecorator('activity',{
                            initialValue: [generalinf.activity],
                            rules: [
                              {required: true, message: 'Por favor ingresa una actividad económica'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Actividad económica"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={6}>
                        <FieldTitle title={"Dirección empresa"}/>
                        <FormItem >
                          {getFieldDecorator('address',{
                            initialValue: [generalinf.adress],
                            rules: [
                              {required: true, message: 'Por favor ingresa una dirección'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Dirección"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header="Información de créditos" key="2">
                    <Row gutter={8} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={5} lg={8}>
                          <FieldTitle title={"Máxima cantidad a prestar"}/>
                          <FormItem >
                            {getFieldDecorator('mount',
                              {
                              initialValue: [creditinf.loan],
                              rules: [
                                {required: true, message: 'Por favor ingresa una monto particular'}
                              ]})(
                                <Input className={"form-input-number"} placeholder={"Máxima cantidad a prestar"}/>
                              )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                        <FieldTitle title={"Cantidad de cuotas máxima"}/>
                        <FormItem >
                          {getFieldDecorator('address',
                          {
                            initialValue: [creditinf.quotamax],
                            rules: [
                              {required: true, message: 'Por favor ingresa un máximo de cuotas'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"No. máximo de cuotas"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                        <FieldTitle title={"Pago de salario"}/>
                        <FormItem >
                          {getFieldDecorator('salaries',
                            {initialValue: [creditinf.payment],rules: [
                              {required: true, message: 'Por favor ingresa un tipo de pago'}
                            ]})(
                              <Select placeholder={"Tipo de salario"} showSearch={true} onChange={this.handleSalaryRate} allowClear={true} autoClearSearchValue={true}>
                                <Select.Option value={"Quincenal"}>Quincenal</Select.Option>
                                <Select.Option value={"Mensual"}>Mensual</Select.Option>
                              </Select>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                        <FieldTitle title={"Fecha de salario"}/>
                        <FormItem >
                          {getFieldDecorator('salaryDate1',
                            {initialValue: [creditinf.date],rules: [
                              {required: true, message: 'Por favor ingresa un tipo de pago'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Fecha de salario 1"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                      {
                      
                        <Col xs={12} sm={12} md={5} lg={8}>
                        <FieldTitle title={"Fecha de salario 2"}/>
                        <FormItem >
                          {getFieldDecorator('salaryDate2',
                            {initialValue: [creditinf.date2],rules: [
                              {required: true, message: 'Por favor ingresa un tipo de pago'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Fecha de salario 2"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                      }
                    </Row>
                  </Panel>
                  <Panel header="Información del representante legal" key="3">
                    <Row gutter={20} className={"form-request-rows"} >

                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Nombres"}/>
                        <FormItem>
                          {getFieldDecorator('representant_name',
                            {initialValue: [legalrep.names],rules: [
                              {required: false, message: 'Por favor ingresa un nombre'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Nombres"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Apellidos"}/>
                        <FormItem>
                          {getFieldDecorator('representant_lastname',
                            {initialValue: [legalrep.surnames],rules: [
                              {required: false, message: 'Por favor ingresa un apellido'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Apellidos"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Tipo de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('representant_identificationtype',
                            {initialValue: [legalrep.idtype],rules: [
                              {required: false, message: 'Por favor ingresa un tipo de identificación'}
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
                        <FieldTitle title={"No. de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('representant_identification',
                            {initialValue: [legalrep.idnumber],rules: [
                              {required: false, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"No. de Identificación"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      
                      <Col xs={12} sm={12} md={8} lg={8} >
                        <FieldTitle title={"Teléfono fijo"}/>
                        <FormItem>
                          {getFieldDecorator('representant_phone',
                            {initialValue: [legalrep.phone],rules: [
                              {required: false, message: 'Por favor ingresa un teléfono fijo'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Teléfono fijo"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8} >
                        <FieldTitle title={"Teléfono celular"}/>
                        <FormItem>
                          {getFieldDecorator('representant_cellphone',
                            {initialValue: [legalrep.mobile],rules: [
                              {required: false, message: 'Por favor ingresa un teléfono celular'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Teléfono celular"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('representant_email',
                            {initialValue: [legalrep.mail],rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
                            )
                          }
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>  
                  <Panel header="Información de la persona encargada" key="4">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Nombres"}/>
                        <FormItem >
                          {getFieldDecorator('manager_name',
                            {initialValue: [person.names],rules: [
                              {required: false, message: 'Por favor ingrese el nombre del encargado'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Nombres"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Apellidos"}/>
                        <FormItem >
                          {getFieldDecorator('manager_lastname',
                            {initialValue: [person.surnames],rules: [
                              {required: false, message: 'Por favor ingrese el apellido del encargado'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Apellidos"}/>
                            )
                          }
                        </FormItem>  
                      </Col>     
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Tipo de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('representant_identificationtype2',
                            {initialValue: [person.idtype],rules: [
                              {required: false, message: 'Por favor ingresa un tipo de identificación'}
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
                        <FieldTitle title={"No. de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('manager_identification',
                            {initialValue: [person.idnumber],rules: [
                              {required: false, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"No. de Identificación"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Teléfono fijo"}/>
                        <FormItem>
                          {getFieldDecorator('manager_phone',
                            {initialValue: [person.phone],rules: [
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
                          {getFieldDecorator('manager_cellphone',
                            {initialValue: [person.mobile],rules: [
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
                          {getFieldDecorator('manager_email',
                            {initialValue: [person.mail],rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Área"}/>
                        <FormItem>
                          {getFieldDecorator('area',
                            {initialValue: [person.area],rules: [
                              {required: false, message: 'Por favor ingresa un área'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Área"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6}>
                        <FieldTitle title={"Cargo"}/>
                        <FormItem >
                          {getFieldDecorator('profession',
                            {initialValue: [person.position],rules: [
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
                <Col xs={24} sm={12} md={18} lg={19}/>
                <Col xs={24} sm={12} md={6} lg={5}>
                  <Button className={"request-confirm-button"} icon="plus-circle" 
                          onClick={() => this.onConfirmRequest()}>
                        Editar empresa
                  </Button> 
                </Col>
              </Form>
            </div>
        </Row>
      </div>
    );
  
  };
  
}

let EditCompanyForm = Form.create()(EditCompany);

export default EditCompanyForm;
