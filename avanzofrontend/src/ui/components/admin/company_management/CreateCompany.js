//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Select, Button, Col, Row, Collapse, InputNumber, Input, Tooltip, Icon, Table} from 'antd';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../../subcomponents/FieldTitle';
import routes from '../../../../configuration/routing/Routes';

//Styles
import '../../../styles/admin/create-company.css';
import { SUCCESS_MODAL, ERROR_MODAL, WARNING_MODAL } from '../../subcomponents/modalMessages';

//Actions
import {createCompany, resetValue}  from "../../../../store/redux/actions/admin/adminActions";

//Constants
//import {Roles} from "../../../lib/generalUtils/constants";
const FormItem = Form.Item;
const { Panel } = Collapse;

const columns = [
  {
    title: 'Tipo de ciclo',
    dataIndex: 'companyRate',
  },
  {
    title: 'Fecha de reporte',
    dataIndex: 'companyReportDate',
  },
  {
    title: 'Fecha de pago 1',
    dataIndex: 'companyFirstDate',
  },
  {
    title: 'Fecha de pago 2',
    dataIndex: 'companySecondDate',
  },
];

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
      salariesArray: [0],
      companyRateName: null,
      companyPaymentNumber: null,
      companyRate: null,
      companyReportDate: null,
      companyFirstDate: null,
      companySecondDate: null,
      companySalaries: [],
      burstingKey: 1,
      clearSelect: false,
      burstingFormKey: 0
    };

    this.props.resetValue();

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.companyResponse === true){
      if(prevState.burstingFormKey === 0){
        return {
          burstingFormKey: 1,
        };
      }
    }
  };
  
  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "La empresa ha sido creada correctamente.");
  };

  handleSalaryRate = () => {
    this.props.form.validateFields((err, values) => {
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
        if(values.password !== values.confirmPassword){
          WARNING_MODAL("Las contraseñas no coinciden");
        }else if(values.phoneNumber.toString()[0] !== "3" || values.phoneNumber.toString().length !== 10 ){
          ERROR_MODAL("Error al realizar la acción", "Por favor ingresa un número de teléfono válido.");
        }else{
          let newSalary = [{
            companyRate: values.companyRate,
            companyReportDate: values.companyReportDate,
            companyFirstDate: values.companyFirstDate,
            companySecondDate: values.companySecondDate,
          }];
          let data = {
            address: values.address,
            approveHumanResources: values.approveHumanResources,
            companySalaries: this.state.companySalaries.length === 0 ? newSalary : this.state.companySalaries,
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
      }
    });
  };

  addNewSalary = () => {
    let {companyRate, companyReportDate, companyFirstDate, companySecondDate} = this.state;

    let datesArray = this.state.companySalaries;

    let newSalary = {
      companyRate: companyRate,
      companyReportDate: companyReportDate,
      companyFirstDate: companyFirstDate,
      companySecondDate: companySecondDate,
    };

    if(companyRate === null && companyReportDate=== null && companyFirstDate === null){
      WARNING_MODAL("Advertencia", "Los campos de ciclos de pagos no son válidos.")
    }else{
      this.setState({
        companySalaries: datesArray,
        burstingKey: this.state.burstingKey+1,
        clearSelect: !this.state.clearSelect,
        companyRate: null,
        companyReportDate: null,
        companyFirstDate: null,
        companySecondDate: null,
      });
      datesArray.push(newSalary);
    }
    
  };

  changeRatesValues = (e, param) => {
    this.setState({
      [param]: e
    });
  };

  changeSalariesValues = (e, param) => {
    let setter = e.target.value;
    e.target.value = setter.replace(/[^0-9,]/g, '');
    let setterValue = e.target.value.split(',');
    if(setterValue.length < 5){
      this.setState({
        [param]: e.target.value
      });
    }else{
      WARNING_MODAL("Advertencia", "Ingresa máximo cuatro días para los reportes.");
    }
  };

  /*checkCharacters = (rule, value, callback) => {
    const form = this.props.form;
    let input = e;
    e = input.replace(/[^0-9]/g, '');
  };*/

  changeDateValues = (e, param) => {
    let setter = e.target.value;
    e.target.value = setter.replace(/[^0-9,]/g, '');
    let {companyRate} = this.state;
    //setter = e.target.value.replace(/ /g, "");
    let setterValue = setter.replace(/[^0-9,]/g, '').split(',');

    if(companyRate === "Mensual"){
      if(setterValue.length === 1){
        this.setState({
          companyFirstDate: setterValue[0]
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo un día para el tipo de recurrencia mensual");
      }    
    }else if(companyRate === "Quincenal"){
      if(setterValue.length < 3){
        this.setState({
          companyFirstDate: setterValue[0],
          companySecondDate: setterValue[1]
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo dos días para el tipo de recurrencia quincenal");
      }
    }else{
      WARNING_MODAL("Advertencia", "Primero, ingrese un tipo de ciclo para esta empresa");
    }
    
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Las dos contraseñas no coinciden');
    } else {
      callback();
    }
  };

  validationNumbersFee = (e) => {
    console.log()
    const input = e.toString();
    e = input.replace(/[^0-9]/g, '');
  };

  validationNumbers = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
  };

  validationNITNumbers = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9 /-]/g, '');
  };

  validationNumbersNumber = (e) => {
    if(e !== null){
      const input = e.toString();
      e = input.replace(/[^0-9]/g, '');
    }
    
  };


  render(){
    
    let {getFieldDecorator} = this.props.form;
    let {companySalaries, burstingFormKey, clearSelect} = this.state;
    console.log("CS", clearSelect);
    
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
                              <Input key={burstingFormKey} className={"form-input-number"} placeholder={"Razón social"} />
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
                              <Input onChange={(e) => this.validationNITNumbers(e)} key={burstingFormKey} className={"form-input-number"} placeholder={"NIT"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo Electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('email',
                            {rules: [
                              {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
                              {required: true, message: 'Por favor ingresa un correo electrónico'}
                            ]})(
                              <Input key={burstingFormKey} className={"form-input-number"} placeholder={"Correo electrónico"} />
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
                              <Input key={burstingFormKey} className={"form-input-number"} placeholder={"Actividad económica"}/>
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
                              <Input key={burstingFormKey} className={"form-input-number"} placeholder={"Dirección"} />
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
                              <Input key={burstingFormKey} type="password"  className={"form-input-number"} placeholder={"Contraseña por defecto"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Confirmar contraseña"}/>
                        <FormItem>
                          {getFieldDecorator('confirmPassword',
                            {rules: [
                              {required: true, message: 'Por favor confirma la contraseña ingresada'},
                              {validator: this.compareToFirstPassword}
                            ]})(
                              <Input key={burstingFormKey} type="password" className={"form-input-number"} placeholder={"Confirmar contraseña"} />
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
                                <InputNumber min={80000} onChange={(e) => this.validationNumbersNumber(e)}  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                className={"form-input-number"} placeholder={"Máxima cantidad a prestar"}/>
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
                              <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} 
                              placeholder={"No. máximo de cuotas"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                    </Row>
                    <Row className={"form-request-rows"}>
                      {
                        this.state.companySalaries.length>0 && 
                        <Table columns={columns} dataSource={companySalaries} size="small" bordered={false} locale={{emptyText: 'No hay registros'}}/>
                      }
                      <Row gutter={8} key={this.state.burstingKey}>
                        <Col xs={12} sm={12} md={8} lg={8} key={this.state.burstingKey}>
                          <FieldTitle title={"Ciclo de pagos"}/>
                          <FormItem >
                            {getFieldDecorator('companyRate',
                              {rules: [
                                {required: true, message: 'Por favor ingresa un tipo de pago'}
                              ]})(
                                <Select key={this.state.burstingKey} placeholder={"Tipo de salario"} showSearch={true} onSelect={(e) => this.changeRatesValues(e, 'companyRate')} onChange={this.handleSalaryRate} allowClear={true} >
                                  <Select.Option value={"Quincenal"}>Quincenal</Select.Option>
                                  <Select.Option value={"Mensual"}>Mensual</Select.Option>
                                </Select>
                              )
                            }
                          </FormItem>  
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                          <FieldTitle title={"Fechas de salario"}/>
                          <FormItem >
                            {getFieldDecorator('companyFirstDate',
                              {rules: [
                                {required: true, message: 'Por favor ingresa las fechas de salario separadas por comas.'}
                              ]})(
                                <Input max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"Fechas de salario"} onChange={(e) => this.changeDateValues(e, 'companyFirstDate')}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                        
                        <Col xs={12} sm={12} md={8} lg={8}>
                          <FieldTitle title={"Fecha de reportes"}/>
                          <FormItem >
                            {getFieldDecorator('companyReportDate',
                              {rules: [
                                {required: true, message: 'Por favor ingresa las fechas de reporte separadas por comas.'},
                                
                              ]})(
                                <Input max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"(3, 13, 14, ... ) "} onChange={(e) => this.changeSalariesValues(e, 'companyReportDate')}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                      </Row>
                      <Tooltip title="Agregar nuevo ciclo de pagos">
                        
                          <Icon type={"plus-circle"} className={"request-form-add"} onClick={() => this.addNewSalary()}/> 
                      </Tooltip>
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
                        <FieldTitle title={"No. Identificación"}/>
                        <FormItem>
                          {getFieldDecorator('memberId',
                            {rules: [
                              {required: true, message: 'Por favor ingresa un número de identificación'}
                            ]})(
                              <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"No. de Identificación"} />
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
                              <InputNumber maxLength={10} minLength={10} className={"form-input-number"} placeholder={"Teléfono celular"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('memberEmail',
                            {rules: [
                              {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
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
                              <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} placeholder={"No. de Identificación"} />
                            )
                          }
                        </FormItem>
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Teléfono celular"}/>
                        <FormItem>
                          {getFieldDecorator('representantPhone',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un teléfono celular'}
                            ]})(
                              <InputNumber maxLength={10} minLength={10} className={"form-input-number"} placeholder={"Teléfono celular"} />
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
                      <Col xs={12} sm={12} md={8} lg={6} >
                        <FieldTitle title={"Correo electrónico"}/>
                        <FormItem>
                          {getFieldDecorator('representantEmail',
                            {rules: [
                              {type: 'email', message: 'Por favor, ingrese un correo electrónico válido.'},
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
          this.props.companyResponse === true && 
            <Redirect to={routes.admin_customer_management}/>
        }
      </div>
    );
  
  };
  
}

let CreateCompanyForm = Form.create()(CreateCompany);

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (data) => dispatch(createCompany(data)),
    resetValue: () => dispatch(resetValue()),
  }
};


const mapStateToProps = (state) => {
  return {
    companyResponse: state.admin.companyResponse,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyForm);
