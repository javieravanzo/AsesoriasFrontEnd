//Libraries
import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom';
import { Form, Select, Button, Col, Row, Collapse, InputNumber, Input, Tooltip, Table} from 'antd';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../../subcomponents/FieldTitle';
//import routes from '../../../../configuration/routing/Routes';

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
    dataIndex: 'companyReportDates',
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
      burstingFormKey: 0,
      defaultPaymentRate: null,
      defaultReportDate: null,
      defaultSalaryDate: null,
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
        ERROR_MODAL("Error al realizar la acción", " Ingresa datos válidos dentro del formulario.");
      }else{
        if(values.password !== values.confirmPassword){
          WARNING_MODAL("Las contraseñas no coinciden");
        }else if(values.phoneNumber.toString()[0] !== "3" || values.phoneNumber.toString().length !== 10 ){
          ERROR_MODAL("Error al realizar la acción", " ingresa un número de teléfono válido.");
        }else{
          let newSalary = [{
            companyRate: values.companyRate,
            companyReportDates: values.companyReportDate,
            companyFirstDate: values.companyFirstDate,
            companySecondDate: values.companySecondDate,
          }];
          let data = {
            address: values.address,
            approveHumanResources: values.approveHumanResources,
            paymentSupport: values.paymentSupport,
            workingSupport: values.workingSupport,
            companySalaries: this.state.companySalaries.length === 0 ? newSalary : this.state.companySalaries,
            defaultAmount: values.defaultAmount,
            economyActivity: values.economyActivity,
            email: values.email,
            maximumSplit: values.maximumSplit,
            nit: values.nit,
            socialReason: values.socialReason,
            password: values.password,
            databaseExchange: values.databaseExchange,
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
    
    let {companyRate, companyReportDate, companyFirstDate, companySecondDate, defaultPaymentRate,
         defaultSalaryDate } = this.state;

    let datesArray = this.state.companySalaries;

    if(defaultPaymentRate === null){
      WARNING_MODAL("Advertencia", 'Ingresa un tipo de ciclo de pagos');
    }else if(defaultSalaryDate === null){
      WARNING_MODAL("Advertencia", 'Ingresa las fechas de salario separadas por comas');
    }else if(defaultSalaryDate === null){
      WARNING_MODAL("Advertencia", 'Ingresa las fechas de reporte separadas por comas');
    }

    let newSalary = {
      companyRate: companyRate,
      companyReportDates: companyReportDate,
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
        defaultPaymentRate: null,
        defaultReportDate: null,
        defaultSalaryDate: null,
      });
      datesArray.push(newSalary);
    }
    
  };

  changeRatesValues = (e, param) => {
    this.setState({
      [param]: e,
      defaultPaymentRate: e,
    });
  };

  changeSalariesValues = (e, param) => {
    let setter = e.target.value;
    e.target.value = setter.replace(/[^0-9,]/g, '');
    let setterValue = e.target.value.split(',');
    if(setterValue.length < 5){
      this.setState({
        [param]: e.target.value,
        defaultReportDate: e.target.value
      });
    }else{
      WARNING_MODAL("Advertencia", "Ingresa máximo cuatro días para los reportes.");
    }
  };

  changeDateValues = (e, param) => {
    let setter = e.target.value;
    e.target.value = setter.replace(/[^0-9,]/g, '');
    let {companyRate} = this.state;
    //setter = e.target.value.replace(/ /g, "");
    let setterValue = setter.replace(/[^0-9,]/g, '').split(',');

    if(companyRate === "Mensual"){
      if(setterValue.length === 1){
        this.setState({
          companyFirstDate: setterValue[0],
          defaultSalaryDate: setterValue[0],
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo un día para el tipo de recurrencia mensual");
      }    
    }else if(companyRate === "Quincenal"){
      if(setterValue.length < 3){
        this.setState({
          companyFirstDate: setterValue[0],
          companySecondDate: setterValue[1],
          defaultSalaryDate: setterValue[1] !== undefined ? setterValue[0]+","+setterValue[1] : setterValue[0],
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo dos días para el tipo de recurrencia quincenal");
      }
    }else{
      WARNING_MODAL("Advertencia", "Primero, Ingresa un tipo de ciclo para esta empresa");
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

  cleanValues = () => {
    this.setState({
      defaultPaymentRate: null,
      defaultReportDate: null,
      defaultSalaryDate: null,
    })
  };


  render(){
    
    let {getFieldDecorator} = this.props.form;
    let {companySalaries, burstingFormKey, defaultPaymentRate, defaultReportDate, defaultSalaryDate} = this.state;
  
    //console.log("UP", this.state.burstingKey);
    
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
                              {required: true, message: 'Ingresa una razón social'}
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
                              {required: true, message: 'Ingresa un NIT válido' }
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
                              {type: 'email', message: 'Ingresa un correo electrónico válido.'},
                              {required: true, message: 'Ingresa un correo electrónico'}
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
                              {required: true, message: 'Ingresa una actividad económica'}
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
                              {required: true, message: 'Ingresa una dirección'}
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
                              {required: true, message: 'Ingresa una contraseña por defecto'}
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
                              {required: true, message: 'Confirma la contraseña ingresada'},
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
                                {required: true, message: 'Ingresa si se aprueba desde recursos humanos'}
                              ]})(
                                <Select placeholder={"¿Aprueba Recursos Humanos?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                  <Select.Option value={true}>Sí</Select.Option>
                                  <Select.Option value={false}>No</Select.Option>
                                </Select>
                              )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                          <FieldTitle title={"¿Comprobante de pago?"}/>
                          <FormItem >
                            {getFieldDecorator('paymentSupport',
                              {rules: [
                                {required: true, message: 'Ingresa si es necesario adjuntar el comprobante de pago'}
                              ]})(
                                <Select placeholder={"¿Comprobante de pago?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                  <Select.Option value={true}>Sí</Select.Option>
                                  <Select.Option value={false}>No</Select.Option>
                                </Select>
                              )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={5} lg={8}>
                          <FieldTitle title={"¿Certificado laboral?"}/>
                          <FormItem >
                            {getFieldDecorator('workingSupport',
                              {rules: [
                                {required: true, message: 'Ingresa si se es necesario adjuntar el certificado laboral'}
                              ]})(
                                <Select placeholder={"¿Certificado laboral?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                  <Select.Option value={true}>Sí</Select.Option>
                                  <Select.Option value={false}>No</Select.Option>
                                </Select>
                              )
                          }
                        </FormItem>  
                      </Col>
                    
                    
                    </Row>
                    <Row gutter={12} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={8} lg={8}>
                          <FieldTitle title={"Máxima cantidad a prestar"}/>
                          <FormItem >
                            {getFieldDecorator('defaultAmount',
                              {rules: [
                                {required: true, message: 'Ingresa una monto particular'}
                              ]})(
                                <InputNumber min={80000} onChange={(e) => this.validationNumbersNumber(e)}  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                className={"form-input-number"} placeholder={"Máxima cantidad a prestar"}/>
                              )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8}>
                        <FieldTitle title={"Cantidad de cuotas máxima"}/>
                        <FormItem >
                          {getFieldDecorator('maximumSplit',
                            {rules: [
                              {required: true, message: 'Ingresa un máximo de cuotas'}
                            ]})(
                              <Input onChange={(e) => this.validationNumbers(e)} className={"form-input-number"} 
                              placeholder={"No. máximo de cuotas"} />
                            )
                          }
                        </FormItem>  
                      </Col>
                      <Col xs={12} sm={12} md={8} lg={8}>
                        <FieldTitle title={"Cruce de base de datos"}/>
                        <FormItem >
                          {getFieldDecorator('databaseExchange',
                            {rules: [
                              {required: true, message: 'Ingresa el cruce de base de datos.'}
                            ]})(
                              <Select placeholder={"¿Cruce de base de datos?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                  <Select.Option value={true}>Sí</Select.Option>
                                  <Select.Option value={false}>No</Select.Option>
                              </Select>
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
                        <Col xs={12} sm={12} md={6} lg={6} key={this.state.burstingKey}>
                          <FieldTitle title={"Ciclo de pagos"}/>
                            <Select value={defaultPaymentRate === null ? undefined : defaultPaymentRate} key={this.state.burstingKey} placeholder={"Tipo de salario"} showSearch={true} onSelect={(e) => this.changeRatesValues(e, 'companyRate')} onChange={this.handleSalaryRate} allowClear={true} >
                              <Select.Option value={"Quincenal"}>Quincenal</Select.Option>
                              <Select.Option value={"Mensual"}>Mensual</Select.Option>
                            </Select>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <FieldTitle title={"Fechas de salario"}/>
                            <Input value={defaultSalaryDate} max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"Fechas de salario"} onChange={(e) => this.changeDateValues(e, 'companyFirstDate')}/>
                        </Col>
                        
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <FieldTitle title={"Fecha de reportes"}/>
                            <Input value={defaultReportDate} max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"(3, 13, 14, ... ) "} onChange={(e) => this.changeSalariesValues(e, 'companyReportDate')}/>
                        </Col>
                        <Col xs={12} sm={8} md={3} lg={3}>
                          <FieldTitle title={" "}/>
                          <Button onClick={() => this.cleanValues()}>Limpiar</Button>
                        </Col>
                        <Col>
                          <FieldTitle title={" "}/>
                          <Tooltip title="Agregar nuevo ciclo de pagos">
                            <Button className={"request-form-add"} onClick={() => this.addNewSalary()}>Agregar</Button> 
                          </Tooltip>
                        </Col>
                      </Row>
                    </Row>
                  </Panel>
                  <Panel header="Información de la persona encargada" key="4">
                    <Row gutter={20} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <FieldTitle title={"Nombres"}/>
                        <FormItem >
                          {getFieldDecorator('memberName',
                            {rules: [
                              {required: true, message: 'Ingresa el nombre del encargado.'}
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
                              {required: true, message: 'Ingresa el apellido del encargado'}
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
                              {required: true, message: 'Ingresa un número de identificación'}
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
                              {required: true, message: 'Ingresa un teléfono celular'}
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
                              {type: 'email', message: 'Ingresa un correo electrónico válido.'},
                              {required: true, message: 'Ingresa un correo electrónico'}
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
                              {required: true, message: 'Ingresa un cargo' }
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
                              {required: false, message: ' ingresa un nombre'}
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
                              {required: false, message: ' ingresa un apellido'}
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
                              {required: false, message: ' ingresa un número de identificación'}
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
                              {required: false, message: ' ingresa un teléfono celular'}
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
                              {required: false, message: ' ingresa un cargo para el representante'}
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
                              {type: 'email', message: 'Ingresa un correo electrónico válido.'},
                              {required: false, message: 'Ingresa un correo electrónico'}
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
