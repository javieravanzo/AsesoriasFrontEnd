//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Select, Button, Col, Row, Collapse, InputNumber, Input} from 'antd';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../../subcomponents/FieldTitle';
import routes from '../../../../configuration/routing/Routes';

//Styles
import '../../../styles/admin/create-company.css';
import { SUCCESS_MODAL, ERROR_MODAL } from '../../subcomponents/modalMessages';

//Actions
import {createCompany}  from "../../../../store/redux/actions/admin/adminActions";

//Constants
//import {Roles} from "../../../lib/generalUtils/constants";
const FormItem = Form.Item;
const { Panel } = Collapse;

class CreateCompany extends Component {

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
      salary_rate: null,
    };

  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La empresa ha sido creada correctamente.");
  };

  handleSalaryRate = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values.companyRate);
      if(values.companyRate === "Mensual"){
        this.setState({
          salary_rate: false,
        });
      }else{
        this.setState({
          salary_rate: true,
        });
      }
    });
  };

  createCompany = () => {
    this.props.form.validateFields((err, values) => {
      if (err){
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese datos válidos dentro del formulario.");
      }else{
        let data = {
          address: values.address,
          approveHumanResources: values.approveHumanResources,
          companyFirstDate: values.companyFirstDate,
          companyRate: values.companyRate,
          companySecondDate: values.companySecondDate,
          defaultAmount: values.defaultAmount,
          economyActivity: values.economyActivity,
          email: values.email,
          maximumSplit: values.maximumSplit,
          nit: values.nit,
          socialReason: values.socialReason,
          password: values.password,
          companyMembers: [
            {
              memberName: values.memberName + "-" + values.memberLastName,
              memberId: values.memberId,
              profession: values.profession,
              phoneNumber: values.phoneNumber,
              memberEmail: values.memberEmail,
            },
            {
              memberName: values.representantName + "-" + values.representantLastName,
              memberId: values.representantId,
              profession: values.representantProfession,
              phoneNumber: values.representantPhone,
              memberEmail: values.representantEmail,
            }
          ],               
        };
        this.props.createCompany(data);
      }
    });
  };

  render(){
    
    let {getFieldDecorator} = this.props.form;
    //let {salary_rate} = this.state;

    return (
      <div className={"company-div"}>
          <Row className={"request-row-content"}>
            <div>  
              <Form>
                <Collapse defaultActiveKey={['1']} bordered={false}>
                  <Panel header="Información general" key="1">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Razón social"}/>
                        <FormItem>
                          {getFieldDecorator('socialReason',
                            {rules: [
                              {required: true, message: 'Por favor ingresa una razón social'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Razón social"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      
                      <Col xs={12} sm={12} md={8} lg={6}>
                        <FieldTitle title={"NIT"}/>
                        <FormItem >
                          {getFieldDecorator('nit',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un NIT válido' }
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"NIT"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo Electrónico"}/>
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
                        <FieldTitle title={"Contraseña por defecto"}/>
                        <FormItem>
                          {getFieldDecorator('password',
                            {rules: [
                              {required: true, message: 'Por favor ingresa una contraseña por defecto'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Contraseña por defecto"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={6}>
                        <FieldTitle title={"Actividad económica"}/>
                        <FormItem >
                          {getFieldDecorator('economyActivity',
                            {rules: [
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
                          {getFieldDecorator('address',
                            {rules: [
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
                          <FieldTitle title={"¿Aprueba Recursos Humanos?"}/>
                          <FormItem >
                            {getFieldDecorator('approveHumanResources',
                              {rules: [
                                {required: true, message: 'Por favor ingresa si se aprueba desde recursos humanos'}
                              ]})(
                                <Select placeholder={"¿Aprueba Recursos Humanos?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                <Select.Option value={"Sí"}>Sí</Select.Option>
                                <Select.Option value={"No"}>No</Select.Option>
                              </Select>
                              )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                          <FieldTitle title={"Máxima cantidad a prestar"}/>
                          <FormItem >
                            {getFieldDecorator('defaultAmount',
                              {rules: [
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
                          {getFieldDecorator('maximumSplit',
                            {rules: [
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
                          {getFieldDecorator('companyRate',
                            {rules: [
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
                        <FieldTitle title={"Fecha de salario 1"}/>
                        <FormItem >
                          {getFieldDecorator('companyFirstDate',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un tipo de pago'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Fecha de salario 1"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                        <FieldTitle title={"Fecha de salario 2"}/>
                        <FormItem >
                          {getFieldDecorator('companySecondDate',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un tipo de pago'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Fecha de salario 2"} />
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
                          {getFieldDecorator('memberName',
                            {rules: [
                              {required: true, message: 'Por favor ingrese el nombre del encargado'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Nombres"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Apellidos"}/>
                        <FormItem >
                          {getFieldDecorator('memberLastName',
                            {rules: [
                              {required: true, message: 'Por favor ingrese el apellido del encargado'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Apellidos"}/>
                            )
                          }
                        </FormItem>  
                      </Col>     
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"No. de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('memberId',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"No. de Identificación"} />
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
                          {getFieldDecorator('memberEmail',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6}>
                        <FieldTitle title={"Cargo"}/>
                        <FormItem >
                          {getFieldDecorator('profession',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un cargo' }
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Cargo"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                    </Row>
                  
                  </Panel>
                  <Panel header="Información del representante legal" key="3">
                    <Row gutter={20} className={"form-request-rows"} >

                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Nombres"}/>
                        <FormItem>
                          {getFieldDecorator('representantName',
                            {rules: [
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
                          {getFieldDecorator('representantLastName',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un apellido'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Apellidos"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"No. de identificación"}/>
                        <FormItem>
                          {getFieldDecorator('representantId',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"No. de Identificación"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Cargo"}/>
                        <FormItem>
                          {getFieldDecorator('representantProfession',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un cargo para el representante'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Cargo"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8} >
                        <FieldTitle title={"Teléfono celular"}/>
                        <FormItem>
                          {getFieldDecorator('representantPhone',
                            {rules: [
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
                          {getFieldDecorator('representantEmail',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input className={"form-input-number"} placeholder={"Correo electrónico"} />
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
                          onClick={() => this.createCompany()}>
                        Crear empresa
                  </Button> 
                </Col>
              </Form>
            </div>
        </Row>
        {
          this.props.companyResponse && 
            <Redirect to={routes.admin_company_management}/>
        }
      </div>
    );
  
  };
  
}

let CreateCompanyForm = Form.create()(CreateCompany);

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (data) => dispatch(createCompany(data)),
  }
};


const mapStateToProps = (state) => {
  return {
    companyResponse: state.admin.companyResponse,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyForm);
