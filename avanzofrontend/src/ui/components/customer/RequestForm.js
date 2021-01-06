//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Math from "math";
import PropTypes from 'prop-types';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import { Divider, Form, Select, Button, Col, Row, InputNumber, Table, Slider, Modal, 
         Statistic, Typography, Card, Switch, Spin, Input, Icon, Tooltip} from 'antd';

//import SignaturePad from 'react-signature-canvas';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import routes from '../../../configuration/routing/Routes';
import {bankTypeAccountInfo} from '../../../configuration/constants';

//Actions
import { getRequestData, getOutlayData, getOultayDatesList, createRequest,
         generateCodes, resetValue, checkCodes } from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/request-form.css';
import { SUCCESS_MODAL, WARNING_MODAL, allowEmergingWindows, ERROR_MODAL } from '../subcomponents/modalMessages';

//Assets
import efecty from "../../assets/efecty.PNG";
import davivienda from "../../assets/davivienda.PNG";
import bancolombia from "../../assets/bancolombia.PNG";

const Option  = Select.Option;
//Constants
const FormItem = Form.Item;
//const { Panel } = Collapse;

function format(d) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 1,
  });

  return formatter.format(d);
};

const table = [
  {
    title: <div>Descuento</div>,
    dataIndex: 'name',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.name.localeCompare(b.name)},
  },
  {
    title: <div className={"table-p"}>Cantidad</div>,
    dataIndex: 'quantity',
    width: "100px",
    align: "right",
    render: text => 
      <div className={"table-p"}>
        <CurrencyFormat  displayType={'text'} style={{width: "100%"}} value={Math.round(text)}
                         thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/>
      </div>,
    sorter: (a, b) =>{ return a.quantity.toString().localeCompare(b.quantity.toString())},
  },
  {
    title: <div className={"table-p"}>Fecha Descuento</div>,
    dataIndex: 'date',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text.split("T")[0]}</div>,
    sorter: (a, b) =>{ return a.date.localeCompare(b.date)},
  }
];

class LoanRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      sliderValue: null,
      fee: null,
      loan: null,
      money_wallet: false,
      wallet_type: null,
      wallet_number: null,
      bank_account: true,
      bank_name: null,
      bank_number: null,
      bank_type: null,
      signatureDone: false,
      trimmedDataURL: null, 
      flagState: null,
      workingDocument: null,
      paymentDocument: null,
      confirmed_data: false,
      form_data: null,
      phoneConfirmation: null,
      emailConfirmation: null,
      enterCodes: null,
      emailCode: null,
      phoneCode: null,
      newEmailCode: null,
      newPhoneCode: null,
      defaultState: null,
      oneRequestCreated: null,
      loadConfirmation: null,
      loadCodes: null,
      partialCapacity:  0,
      tempPartial :  0,
      maximumAmount:0,
      request_overdraft:false,
      request_observation:null
    };    

    console.log(this.state.partialCapacity);
    this.props.resetValue();

    this.props.getRequestData(parseInt(localStorage.user_id, 10), this.props.location.state ? this.props.location.state.token : undefined);
    this.props.getOutlayData(parseInt(localStorage.user_id, 10), this.props.location.state ? this.props.location.state.token : undefined);

   

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("Cond", (nextProps.generateCodesResponse === false && nextProps.checkCodesResponse === null));
    if(JSON.stringify(nextProps.requestDataResponse) !== '{}' && nextProps.generateCodesResponse === null){
      //console.log("Entro1");
      if(prevState.sliderValue === null){
        return {
          sliderValue: Math.round(nextProps.requestDataResponse.partialCapacity) < 80000 ? 80000 : Math.round(nextProps.requestDataResponse.partialCapacity),
          bank_name: nextProps.requestDataResponse.accountBank,
          bank_number: nextProps.requestDataResponse.accountNumber,
          bank_type: nextProps.requestDataResponse.accountType,
          partialCapacity:  nextProps.requestDataResponse.partialCapacity,
          tempPartial :  nextProps.requestDataResponse.partialCapacity,
          maximumAmount : nextProps.requestDataResponse.maximumAmount
        };
      }else{
        return{
          flagState: true
        }
      }
    
    }else if(nextProps.generateCodesResponse === true && nextProps.checkCodesResponse === null && nextProps.requestResponse === null){
      //console.log("Entro2");
      return {
        confirmed_data: false,
        enterCodes: true,
        loadConfirmation: false,
        oneRequestCreated: null,
      };
    }else if(nextProps.generateCodesResponse === false && nextProps.checkCodesResponse === null && nextProps.requestResponse === null){
      //console.log("Entro3");
      return {
        loadConfirmation: false,
      };
    }else if(nextProps.checkCodesResponse === true && prevState.oneRequestCreated === null){ 
      //console.log("Entro4"); 
      return {
        flagState: nextProps.createRequest(prevState.form_data, nextProps.location.state ? nextProps.location.state.token : undefined),
        oneRequestCreated: true,
      };
    }else if(nextProps.requestResponse === true){
      return {
        enterCodes: false,
        loadCodes: false,
      };  
    }else if(nextProps.requestResponse === false){
      //console.log("Entro5");
      return {

        loadCodes: false,
        enterCodes: false,
      };
    }else if(nextProps.checkCodesResponse === false){
      //console.log("Entro6");
      return {
        loadCodes: false,
        enterCodes: false,
      };
    }else{
      //console.log("Entro7");
      return {
        defaultState: true
      };
    }
  };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
    this.setState({
      trimmedDataURL: false
    });
  };

  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
      signatureDone: true
    });
  };

  onChangeFee = (e) => {
    /*const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
    if(e.target.value !== ''){
      this.setState({
        fee: e.target.value
      });
    }*/
    //const input = e;
    //e = input.replace(/[^0-9]/g, '');
    if(this.props.requestDataResponse.fixedFee === 1){
      if(e !== this.props.requestDataResponse.maximumSplit){
        WARNING_MODAL("El número de cuotas es fijo para tu empresa, por favor ingresa el número indicado.");
      }else{
        this.setState({
          fee: e
        });
      }
    }else if(e <= this.props.requestDataResponse.maximumSplit){
      if(e !== ''){
        this.setState({
          fee: e
        });
      }
    }else if(e > this.props.requestDataResponse.maximumSplit){
      WARNING_MODAL("Advertencia", "Por favor ingresa un número igual o menor al máximo de cuotas por empresa.");
    }
    
  };

  sendReportInfo = (e, maximumSplit) => {
    if(e <= maximumSplit){
      if( this.state.fee !== null){
        this.props.getOultayDatesList(parseInt(localStorage.user_id, 10), this.state.fee, this.state.sliderValue);
      }
    }else{
      WARNING_MODAL("Advertencia", "Por ingresa un número de cuotas válido");
    }
  };

  handleSliderChange = (e) => {
    this.setState({
      sliderValue: Math.round(e),
    });
    if(this.state.fee !== null){
      this.props.getOultayDatesList(parseInt(localStorage.user_id, 10), this.state.fee, e);
    }
  };

  handleQuantity = (e) => {
    const input = e;
    e = input.replace(/[^0-9]/g, '');
    if(e<=300000 && e>=80000){
      this.setState({
        sliderValue: Math.round(e),
      });
      if(this.state.fee !== null){
        this.props.getOultayDatesList(parseInt(localStorage.user_id, 10), this.state.fee, e);
      } 
    } 
   
  };

  handleQuantityBlur = (e) => {
    console.log("Valor E", e);
  };

  handleWallet = (e) => {
    this.setState({
      money_wallet: e,
      bank_account: !e,
    });
  };

  handleBankProp = (e) => {
    this.setState({
      bank_account: e,
      money_wallet: false,
    });
  };

  changeWalletType = (e) => {
    this.setState({
      wallet_type: e
    });
  };

  changeWalletNumber = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
    this.setState({
      wallet_number: e.target.value
    });
  };

  changeBankName = (e) => {
    this.setState({
      bank_name: e
    });
  };

  changeBankNumber = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
    this.setState({
      bank_number: e.target.value
    });
  };

  changeBankType = (e) => {
    this.setState({
      bank_type: e
    });
  };

  defineDocumentsCondition = () => {
    
    let {bank_account, bank_name, bank_number, bank_type, money_wallet, 
         wallet_type} = this.state;

    if (bank_account){
      if(bank_name !== null && bank_number !== null && bank_type !== null && 
         bank_name !== "" && bank_number !== "" && bank_type !== ""){
          return true;
         }
      return false;
    }else if(money_wallet){
      if( wallet_type !== null && wallet_type !== ""){
         return true;
        }
      return false;
    }

    return false;
  
  };

  generateDocuments = ()=> {
    this.props.generateDocuments(parseInt(localStorage.user_id, 10), this.state.fee, this.state.sliderValue);
  };

  openDocument = () => {

    let route = "https://drive.google.com/open?id=1vlyOU8r-f31ucKc2fvwlcoT570VCtSRi";
      
    if (route !== null) {
      let newWindow = window.open(route, "blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        allowEmergingWindows();

      }
      SUCCESS_MODAL("Acción realizada exitosamente", "El contrato se ha descargado satisfactoriamente");
    } else {
      WARNING_MODAL('Advertencia', 'El archivo no se encuentra disponible en estos momentos');
    }
  
  };

  checkRequest = (interestValue, adminValue) => {
    console.log(this.props.location);
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese datos válidos dentro del formulario.");
      }else if (values.account_numberConfirmation !== values.account_number){
        WARNING_MODAL("Error al realizar la acción", "Los números de cuenta no coinciden.")
      }else{

        if(this.state.request_overdraft === true){
          if(this.state.request_observation == null){
            ERROR_MODAL("Error al realizar la acción", "Por favor seleccione una observación válida para el sobregiro.");
            return false;
          }
        }

        let data = {
          file: this.state.trimmedDataURL,
          quantity: values.quantity,
          split: this.state.fee,
          moyen: values.moyen,
          paymentSupport: this.state.paymentDocument !== null ? this.state.paymentDocument : null,
          workingSupport: this.state.workingDocument !== null ? this.state.workingDocument : null,
          accountType: this.state.money_wallet ? null : values.account_type,
          accountNumber: values.account_number,
          isBank: this.state.money_wallet ? false :  true,
          interest: this.props.outlayDatesList.totalInterest,
          administration: this.props.outlayDatesList.administrationValue,
          iva: this.props.outlayDatesList.ivaValue,
          otherValues: values.moyen === "EFECTY" ? 2000 : 0,
          totalValue: values.moyen !== "EFECTY" ? this.props.outlayDatesList.totalValue : this.props.outlayDatesList.totalValue + 2000,
          idCompany: this.props.requestDataResponse.idCompany,  
          identificationId: this.props.requestDataResponse.identificationId,
          loanData: this.props.outlayDatesList.datesList[0].quantity,
          salary_base: values.salary_base,
          biweekly_salary: values.biweekly_salary,
          general_deduction: values.general_deduction,
          fromapp: this.props.location.state == null ? false: this.props.location.state.fromapp !== null ? true : false,
          request_overdraft : this.state.request_overdraft,
          request_observation : this.state.request_observation,
        };
        console.log(data);
        //console.log("Supports", this.props.location.state);

        this.setState({
          form_data: data,
          confirmed_data: true,
        });
        
        //console.log(data);
        //this.props.createRequest(data, this.props.location.state ? this.props.location.state.token : undefined);
      }     
    });
  };

  onChangeWorking = (e) =>{
    let fileType = e.target.files;

    this.setState({
      workingDocument: fileType[0]
    });

  };

  onChangePaymentSupport  = (e) => {

  let fileType = e.target.files;

    this.setState({
      paymentDocument: fileType[0]
    });

  };

  changeNewEmail = (e) => {

    let email = e.target.value;

    if (email !== null || email !== ""){
      this.setState({
        emailConfirmation: email,
      });
    }else{
      ERROR_MODAL("Error al realizar la acción", "Por favor confirma tu correo electrónico.");
    }
 
  };

  changeEmailCode = (e) => {

    let emailCode = e.target.value;

    //console.log("EnteredEmail", emailCode);

    if (emailCode !== null || emailCode !== ""){
      this.setState({
        newEmailCode: emailCode,
      });
    }else{
      ERROR_MODAL("Error al realizar la acción", "Por favor ingresa el código enviado a tu email.");
    }
  
  };

  changeNewPhone = (e) => {
    
    let phone = e.target.value;

    if (phone !== null || phone !== ""){
      this.setState({
        phoneConfirmation: phone,
      });
    }else{
      ERROR_MODAL("Error al realizar la acción", "Por favor confirma tu número de celular.");
    }
  
  };

  changePhoneCode = (e) => {
    
    let phone = e.target.value;

    //console.log("EnteredPhone", phone);

    if (phone !== null || phone !== ""){
      this.setState({
        newPhoneCode: phone,
      });
    }else{
      ERROR_MODAL("Error al realizar la acción", "Por favor ingresa el código enviado a tu teléfono.");
    }
  
  };

  confirmData = () => {

    this.setState({
      loadConfirmation: true
    });

    let {phoneConfirmation, emailConfirmation} = this.state;

    if(phoneConfirmation !== null && emailConfirmation !== null){

      this.props.generateCodes( emailConfirmation, phoneConfirmation, parseInt(localStorage.user_id, 10));

    }else{

      ERROR_MODAL("Error al realizar la acción", "Los datos ingresados no son válidos.");

    }

  };

  reSendCodes = () => {

    let {phoneConfirmation, emailConfirmation} = this.state;

    this.props.generateCodes( emailConfirmation, phoneConfirmation, parseInt(localStorage.user_id, 10));

  };

  confirmCodes = () => {
    
    let {newPhoneCode, newEmailCode} = this.state;

    this.setState({
      loadCodes: true,
    });

    this.props.checkCodes(parseInt(localStorage.user_id, 10), newPhoneCode, newEmailCode);

    /*this.setState({
      enterCodes: false,
    });*/

    //this.props.createRequest(this.state.form_data, this.props.location.state ? this.props.location.state.token : undefined);

  };

  validationLetters = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^a-zA-Z\s]$/g, '');
  };

  validationNumbers = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
  };

  onChangeField(e, param){
    
    this.setState({
        checkBox1: e.target.checked
      });

  };

  onChangeSwitch = (e) =>{
    if(e === true){
       this.setState({
        partialCapacity: this.state.maximumAmount,
        request_overdraft: true
      });
    }else{
      this.setState({
        partialCapacity: this.state.tempPartial,
        request_overdraft: false, 
        request_observation : ""
      });
    }
  }

  InputObservacion = () => { 
      return (
        <div>
         Observación: <Select defaultValue={null} style={{ width: '100%' }} onChange={this.handleObservacion}>
            <Option value={null}>Elige una opción</Option>
            <Option value={"Ya me fue descontado"}>Ya me fue descontado</Option>
            <Option value={"Me descontaron el doble"}>Me descontaron doble</Option>
            <Option value={"Otro"}>
              Otro
            </Option>
          </Select>
          <br/>
        </div>
      );
  };

  handleObservacion = (e) =>{
    if(e != null){
      this.setState({
        request_observation : e
      });
    }
  }

  render(){
    
   
   
    let signature = false;
    let {fee, sliderValue, bank_account, money_wallet, confirmed_data, enterCodes, emailConfirmation, phoneConfirmation} = this.state;
    let feeCondition = fee !== null && this.defineDocumentsCondition();
    const { getFieldDecorator } = this.props.form;
    let { requestDataResponse, outlayDataResponse, outlayDatesList } = this.props;
    let { interestValue, adminValue, partialCapacity, maximumSplit, workingSupport,
          paymentSupport, phoneNumber, accountNumber, accountType, accountBank, fixedFee } = requestDataResponse;
  
    let { bankInfo, walletInfo } = outlayDataResponse;

    if(JSON.stringify(this.props.requestDataResponse) === '{}' || JSON.stringify(this.props.outlayDataResponse) === '{}'){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                </div>);
    }else{
      return (
        <div className={"request-div"}>
            <Row className={"request-row-content"}>
              <Col xxl={19} lg={19} md={19} sm={12} xs={11}>
                <Typography >
                  <Typography.Title level={3} className={"request-form-title"}>
                    Solicitar préstamo
                  </Typography.Title>       
                </Typography>
              </Col>
              <Col xxl={5} lg={5} md={5} sm={12} xs={13}>
                <div>
                  <Row gutter={2}>
                    <Col span={24}>
                      <Statistic className={"customer-credit-card"} title={<h3>Cupo disponible   <Tooltip title="Puedes solicitar un préstamo dando click en 'sobregiro' que supere el cupo si te han realizado un descuento y aún no aparece actualizado aquí.">
                      <Icon type="question-circle"/>
  </Tooltip></h3>} value={partialCapacity} prefix={"$"}/>
                    </Col>
                  </Row>    
                </div>
              </Col>
            </Row>
            <Row className={"request-row-content"}>
              <div className={"request-initial-step"}>  
                <Form>
                  <Row>
                    <Col lg={1} md={3} sm={5} xs={4}>
                      <Button className={"step-one"}>
                        1.
                      </Button>
                    </Col>
                    <Col lg={23} md={21} sm={19} xs={20}>
                      <div>
                        <h3>Información de la solicitud</h3>
                        <Divider className={"form-request-divider"}/>
                      </div>
                    </Col>
                  </Row>
                  <Row className={"form-request-rows"} gutter={8}>
                    <Col xs={24} sm={24} md={12} lg={12} >
                      <Card>
                      <FieldTitle title={"Monto requerido"}/>
                      <FormItem>
                        {getFieldDecorator('quantity',
                          {initialValue: this.state.sliderValue, 
                          rules: [
                            {required: false, message: 'Por favor ingresa una cantidad de dinero específica'}
                          ]})(
                              <InputNumber step={10000} className={"form-input-number"} max={this.state.partialCapacity < 80000 ? 80000 : this.state.partialCapacity} min={partialCapacity < 80000 ? partialCapacity : 80000}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                    placeholder={"Monto requerido"} onBlur={(e) => this.handleQuantityBlur(e)} onChange={this.handleQuantity} disabled={this.state.quantityBlur} />
                          )
                        }
                      </FormItem>
                      <Row className="icon-wrapper">
                        <Col xxl={5} lg={5} md={8} sm={8} xs={5}>
                          <h3>
                          <span className={"request-title-amount"}>
                            <CurrencyFormat  displayType={'text'} style={{width: "100%"}} value={80000}
                                             thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}/></span>
                          </h3>
                        </Col>
                        <Col xxl={14} lg={14} md={8} sm={8} xs={14}>
                          <FormItem>
                            {getFieldDecorator('quantity',
                              {initialValue: this.state.sliderValue, rules: [
                                {required: false, message: 'Por favor ingresa una cantidad de dinero específica'}
                              ]})(
                                <Slider max={this.state.partialCapacity <= 80000 ? 80000 : this.state.partialCapacity} min={80000} step={10000} className={"slider-amount"}
                                        tipFormatter={
                                          function (d) { 
                                            return format(d); 
                                          }} 
                                        onChange={this.handleSliderChange} style={{width: "90%"}} />
                                )
                              }  
                            </FormItem>
                        </Col>
                        <Col xxl={5} lg={5} md={8} sm={8} xs={5}>
                          <h3>
                          <span className={"request-title-amount"}><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                                value={this.state.partialCapacity < 80000 ? 80000 : this.state.partialCapacity} thousandSeparator={'.'}
                                                decimalSeparator={','} prefix={'$'}/></span>
                          </h3>
                        </Col>
                        
                      </Row>
                      <Row>
                        <Col xxl={14} lg={14} md={8} sm={8} xs={14}>
                           <b>Sobregiro</b> <Switch onChange={this.onChangeSwitch} />
                           <br/>
                           { this.state.request_overdraft ? <this.InputObservacion /> : null }
                           <br/>
                        </Col>
                      </Row>
                      <FieldTitle title={"Número de cuotas"}/>
                      <span className={"text-fees"}>*La cantidad máxima/fijo de cuotas de acuerdo con tu empresa es <span className={"fees-number-text"}>{maximumSplit}</span>.</span>
                      <FormItem className={"fees-item"}>
                        {getFieldDecorator('fees',
                          { 
                            initialValue: this.state.sliderValue,
                            rules: [
                            {required: true, message: 'Por favor ingresa un número de cuotas'}
                          ]})(
                            <Row>
                              <InputNumber className={"form-input-number"} max={maximumSplit} min={fixedFee === 1 ? maximumSplit : 1}
                              onChange={(e) => this.onChangeFee(e)} onBlur={(e) => this.sendReportInfo(e.target.value, maximumSplit)}
                              disabled={sliderValue < 80000 ? true : false} />
                            </Row>
                          )
                        }
                      </FormItem>  
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Card>
                        <Row gutter={8}>
                          <Col xs={12} sm={24} md={12} lg={12} style={{textAlign: "right"}}>
                            <b>Cantidad solicitada</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b style={{color: "#18e000a6"}}>
                              <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                                value={this.state.sliderValue} thousandSeparator={'.'}
                                                decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                          <b>Interés total (28,16% E.A.)</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                          <b>
                            <CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : outlayDatesList.totalInterest} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                            <b>Administración</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b><CurrencyFormat displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : outlayDatesList.administrationValue} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Divider className={"information-divider"}/>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                            <b>Subtotal</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b style={{color: "#cecece"}}><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : outlayDatesList.subTotal} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                            <b>IVA (19%)</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : Math.ceil(outlayDatesList.ivaValue)} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                            <b>Otros cobros</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : 0} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <Row gutter={8}>
                          <Divider className={"information-divider"}/>
                        </Row>
                        <Row gutter={8}>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                            <b style={{fontSize: "15px"}}>Total a pagar</b> 
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b style={{color: "#42a4ff"}}><CurrencyFormat  displayType={'text'} style={{width: "100%", fontSize: "15px"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : outlayDatesList.totalValue} thousandSeparator={'.'}
                                              decimalSeparator={','} prefix={'$'}/></b>
                          </Col>
                        </Row>
                        <span className={"text-fees"}>*Al dar click en el botón Solitar préstamo, usted acepta los términos y condiciones descritos aquí.</span>
                      </Card>
                    </Col>
                  </Row>
                  <br/>
                  {
                    (JSON.stringify(outlayDatesList.datesList) !== '[]' && JSON.stringify(outlayDatesList.datesList) !== undefined)  && 
                    <Row className={"form-request-rows"}>
                      
                        De acuerdo a las cuotas que suministraste, tendrás el siguiente informe de descuentos. 
                        <br/>
                        <br/>
                        <Table className={"dates-table"} dataSource={outlayDatesList.datesList} columns={table} rowKey={'id'} 
                            size={'small'} pagination={false}/>
                      
                    </Row>
                  }
                  <br/>
                  <Row>
                    <Col lg={1} md={3} sm={5} xs={4}>
                      <Button className={"step-one"}>
                        2.
                      </Button>
                    </Col>
                    <Col lg={23} md={21} sm={19} xs={20}>
                      <div>
                        <h3>Información de desembolso</h3>
                        <Divider className={"form-request-divider"}/>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={20} className={"form-request-rows"}>
                    <Row className={"div-banks-images"}>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <img src={efecty} alt="efecty" className="request-efecty-logo" />
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <img src={davivienda} alt="davivienda" className="request-davivienda-logo" />
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={8}>
                        <img src={bancolombia} alt="bancolombia" className="request-bancolombia-logo" />
                      </Col>
                    </Row>
                    <br/>
                    <Row className={"div-banks-images"}>
                      <div className={"div-bank-requires"}>
                        <span className={"bank-requires"}>Recuerda que con estas alianzas, puedes tener tu dinero en menos tiempo (24h hábiles después de la aprobación del crédito).</span>
                      </div> 
                    </Row>
                    <br/>
                    <Row>
                      <Col xs={24} sm={24} md={8} lg={7}>
                        <span className={"type-account"}>{"Banco "}<Switch onChange={this.handleWallet}/>{" Billetera virtual"}</span>  
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={10}/>
                    </Row>
                  </Row>
                  <br/>
                    {
                      bank_account && 
                      <Row gutter={12} className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <FieldTitle title={"Cuenta"}/>
                          <FormItem>
                            {getFieldDecorator('moyen',
                              {initialValue: accountBank, rules: [
                                {required: false, message: 'Por favor selecciona una cuenta'}
                              ]})(
                                <Select onChange={this.changeBankName} disabled={sliderValue < 80000 ? true : false} placeholder={"Cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
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
                        <Col xs={12} sm={12} md={4} lg={4} >
                          <FieldTitle title={"Tipo de cuenta"}/>
                          <FormItem>
                            {getFieldDecorator('account_type',
                              {initialValue: accountType, rules: [
                                {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                              ]})(
                                <Select placeholder={"Tipo de cuenta"} disabled={sliderValue < 80000 ? true : false} showSearch={true} allowClear={true} autoClearSearchValue={true} onChange={this.changeBankType}>
                                  {bankTypeAccountInfo.map((accountType, i) =>(
                                    <Select.Option value={accountType.name} key={i}>
                                      {accountType.name}
                                    </Select.Option>
                                  ))
                                  }
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7}>
                        <FieldTitle title={"Número de cuenta"}/>
                          <FormItem >
                            {getFieldDecorator('account_number',
                              {initialValue: accountNumber, rules: [
                                {required: false, message: 'Por favor ingresa un número de cuenta' }
                              ]})(
                                <Input className={"form-input-number"} placeholder={"Número de cuenta"} 
                                onChange={this.changeBankNumber} disabled={sliderValue < 80000 ? true : false}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7}>
                        <FieldTitle title={"Confirmar número de cuenta"}/>
                          <FormItem >
                            {getFieldDecorator('account_numberConfirmation',
                              {initialValue: accountNumber, rules: [
                                {required: false, message: 'Por favor confirma un número de cuenta' }
                              ]})(
                                <Input className={"form-input-number"} placeholder={"Confirma número de cuenta"} 
                                onChange={this.changeBankNumber} disabled={sliderValue < 80000 ? true : false}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                      </Row>
                    }
                    {
                      money_wallet &&
                      <Row  gutter={12} className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={8} lg={8} >
                          <FieldTitle title={"Billetera virtual"}/>
                          <FormItem>
                            {getFieldDecorator('moyen',
                              {initialValue: null, rules: [
                                {required: false, message: 'Por favor ingresa un tipo de billetera'}
                              ]})(
                                <Select placeholder={"Tipo de billetera"} disabled={sliderValue < 80000 ? true : false} showSearch={true} onChange={this.changeWalletType}>
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
                        <Col xs={24} sm={24} md={8} lg={8}>
                        <FieldTitle title={"Número de celular"}/>
                          <FormItem >
                            {getFieldDecorator('account_number',
                              {initialValue: phoneNumber, rules: [
                                {required: false, message: 'Por favor ingresa un número de celular' }
                              ]})(
                                <Input  className={"form-input-number"} placeholder={"Número de celular"} 
                                onChange={this.changeWalletNumber} disabled={sliderValue < 80000 ? true : false}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                        <FieldTitle title={"Confirmar número de celular"}/>
                          <FormItem >
                            {getFieldDecorator('account_numberConfirmation',
                              {initialValue: phoneNumber, rules: [
                                {required: false, message: 'Por favor confirma tu número de celular' }
                              ]})(
                                <Input  className={"form-input-number"} placeholder={"Confirmar número de celular"} 
                                onChange={this.changeWalletNumber} disabled={sliderValue < 80000 ? true : false}/>
                              )
                            }
                          </FormItem>  
                        </Col>
                      </Row>
                    }

                    { 
                      (bank_account || money_wallet) && 
                      <Row gutter={12} className={"form-request-rows"}>
                        <span className={"available-part"}>Módulo Precupo</span>
                        <br/>
                        <Col xs={12} sm={12} md={8} lg={8}>
                          <FieldTitle title={"Sueldo Base"}/>
                          <FormItem>
                            {getFieldDecorator('salary_base',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un sueldo base'}
                              ]})(
                                <InputNumber className={"form-input-number"} min={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                    placeholder={"Sueldo Base"}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} >
                          <FieldTitle title={"Total Ingresos"}/>
                          <FormItem>
                            {getFieldDecorator('biweekly_salary',
                              {rules: [
                                {required: false, message: 'Por favor ingresa un total ingresos'}
                              ]})(
                                <InputNumber className={"form-input-number"} min={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                    placeholder={"Total Devengado"}/>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8}>
                          <FieldTitle title={"Total Deducciones"}/>
                            <FormItem >
                              {getFieldDecorator('general_deduction',
                                {rules: [
                                  {required: false, message: 'Por favor ingresa tus deducciones por nómina' }
                                ]})(
                                  <InputNumber className={"form-input-number"} min={0}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                    placeholder={"Total Deducciones"}/>
                                )
                              }
                            </FormItem>  
                        </Col>
                      </Row>  
                    
                    }



                    { 
                      ((parseInt(paymentSupport, 10) === 1) || (parseInt(workingSupport, 10) === 1)) &&
                        <Row>
                          <Col lg={1} md={3} sm={5} xs={4}>
                            <Button className={"step-one"}>
                              3.
                            </Button>
                          </Col>
                          <Col lg={23} md={21} sm={19} xs={20}>
                            <div>
                              <h3>Certificados y comprobantes</h3>
                              <Divider className={"form-request-divider"}/>
                            </div>
                          </Col>
                          <Row>
                            <Col xs={24} sm={24} md={12} lg={10} className={"documents-column"}>
                              <FieldTitle title={"Cargar certificado laboral"}/>
                              <input key={this.state.kBK} type="file" onChange={this.onChangeWorking}
                                    accept=".pdf, application/pdf"/>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={10} className={"documents-column2"}>
                              <FieldTitle title={"Cargar comprobante de pago"}/>
                              <input key={this.state.kBK} type="file" multiple="multiple" onChange={this.onChangePaymentSupport}
                                    accept=".pdf, application/pdf"/>
                            </Col>
                          </Row>
                        </Row>
                    }
                 
                  { 
                    (signature === true) &&
                    <Row className={"form-request-rows2"}>
                      <Col lg={1} md={3} sm={5} xs={4}>
                        <Button className={"step-one"}>
                          4.
                        </Button>
                      </Col>
                      <Col lg={23} md={21} sm={19} xs={20}>
                        <div>
                          <h3>Documentos de la solicitud</h3>
                          <Divider className={"form-request-divider"}/>
                        </div>
                      </Col>
                    </Row>
                  }


                                   
                  <Row className={"form-request-rows"}>
                    <Col xs={24} sm={12} md={18} lg={19}/>
                    <Col xs={24} sm={12} md={6} lg={5}>
                      <Button className={"request-confirm-button"} icon="file"  disabled={!feeCondition || sliderValue < 80000}
                              onClick={() => this.checkRequest(interestValue, adminValue)}>
                          Solicitar préstamo
                      </Button> 
                    </Col>
                  </Row>
                </Form>
              </div>
              {
                this.props.requestResponse && 
                <Redirect to={routes.customer}/>
              }
              <Modal 
                 title={"Confirmar datos"}
                 visible={confirmed_data}
                 onCancel={() => this.setState({confirmed_data: false})}
                 footer={
                  <Button key='submit' type='primary' disabled={emailConfirmation === null || phoneConfirmation === null } loading={this.state.loadConfirmation === true} onClick={() => this.confirmData()}>
                    Aceptar
                  </Button>}
                 >
                 <Row className={"form-request-rows2"}>
                  <Col lg={3} md={3} sm={3} xs={4}>
                    <Button className={"step-one"}>
                      4.
                    </Button>
                  </Col>
                  <Col lg={21} md={21} sm={21} xs={20}>
                    <div>
                      <h3>Confirmar correo electrónico y número de celular</h3>
                      <Divider className={"form-request-divider"}/>
                    </div>
                  </Col>
                 </Row>
                 <Form>
                  <Row  gutter={12} className={"form-request-rows"}>
                    <Col xs={24} sm={24} md={14} lg={14} >
                      <FieldTitle title={"Correo Electrónico"}/>
                      <FormItem>
                        {getFieldDecorator('email',
                          {rules: [
                            {required: false, message: 'Por favor confirma tu correo electrónico'}
                          ]})(
                            <Input  className={"form-input-number"} placeholder={"Confirmar correo"} 
                            onChange={this.changeNewEmail}/>
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={10}>
                      <FieldTitle title={"Número de celular"}/>
                        <FormItem >
                        {getFieldDecorator('phone_confirmation',
                          {rules: [
                            {required: false, message: 'Por favor confirma tu número de celular' }
                          ]})(
                            <Input  className={"form-input-number"} placeholder={"Confirmar celular"} 
                            onChange={this.changeNewPhone}/>
                          )
                        }
                      </FormItem>  
                    </Col>
                  </Row>
                 
                </Form>
              </Modal>
              <Modal 
                 title={"Ingresar códigos"}
                 visible={enterCodes}
                 onCancel={() => this.setState({enterCodes: false})}
                 footer={
                  <Button key='submit' type='primary' loading={this.state.loadCodes === true} onClick={() => this.confirmCodes()}>
                    Confirmar códigos
                  </Button>}
                 >
                 <Row className={"form-request-rows2"}>
                  <Col lg={3} md={3} sm={3} xs={4}>
                    <Button className={"step-one"}>
                      5.
                    </Button>
                  </Col>
                  <Col lg={21} md={21} sm={21} xs={20}>
                    <div>
                      <h3>Ingresar códigos de validación</h3>
                      <Divider className={"form-request-divider"}/>
                    </div>
                  </Col>
                 </Row>
                 <Form>
                  <Row  gutter={12} className={"form-request-rows"}>
                    <Col xs={24} sm={24} md={20} lg={20} >
                      <FieldTitle title={"Código Correo"}/>
                      <FormItem>
                        {getFieldDecorator('code1',
                          {rules: [
                            {required: false, message: 'Por favor ingresa el código envíado a tu correo electrónico.'}
                          ]})(
                            <Input  className={"form-input-codes"} placeholder={"Código enviado al correo"} 
                            onChange={this.changeEmailCode}/>
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <FieldTitle title={"Código Celular"}/>
                      <FormItem >
                        {getFieldDecorator('code2',
                          {rules: [
                            {required: false, message: 'Por favor ingresa el código envíado a tu teléfono celular.' }
                          ]})(
                            <Input  className={"form-input-codes"} placeholder={"Código enviado al celular"} 
                            onChange={this.changePhoneCode}/>
                          )
                        }
                      </FormItem>  
                    </Col>
                  </Row>
                </Form>
                 <Row className={"signature-message"}>
                  <Col lg={2} md={2} sm={2} xs={2} />
                  <Col lg={20} md={20} sm={20} xs={20} className={"signature-message-col"}>
                    <span>{""} Al dar clic en <b>Confirmar códigos</b>, estás firmando electrónicamente la solicitud.</span>
                  </Col>
                 </Row>
                 <Row className={"signature-message"}>
                  <Col lg={2} md={2} sm={2} xs={2} />
                  <Col lg={20} md={20} sm={20} xs={20} className={"signature-message-col"}>
                    <span>Si los códigos de validación no te han llegado, por favor haz clic <b><u onClick={() => this.reSendCodes()}>aquí</u></b> para enviarlos de nuevo.</span>
                  </Col>
                 </Row>
              </Modal>
          </Row>
        </div>
      );
    };
  }
}

let RequestForm = Form.create()(LoanRequest);

RequestForm.propTypes = {
  requestDataResponse: PropTypes.object,
  outlayDataResponse: PropTypes.object,
  outlayDatesList: PropTypes.object,
  requestResponse: PropTypes.bool,
  generateCodesResponse: PropTypes.bool,
  generateCodesData: PropTypes.string,
  checkCodesResponse: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    requestDataResponse: state.customer.requestDataResponse,
    outlayDataResponse: state.customer.outlayDataResponse,
    outlayDatesList: state.customer.outlayDatesList,
    requestResponse: state.customer.requestResponse,
    generateCodesResponse: state.customer.generateCodesResponse,
    generateCodesData: state.customer.generateCodesData,
    checkCodesResponse: state.customer.checkCodesResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetValue: () => dispatch(resetValue()),
    getRequestData: (customerId, token) => dispatch(getRequestData(customerId, token)),
    getOutlayData: (customerId, token) => dispatch(getOutlayData(customerId, token)),
    getOultayDatesList: (customerId, split, quantity) => dispatch(getOultayDatesList(customerId, split, quantity)),
    createRequest: (data, token) => dispatch(createRequest(data, token)),
    generateCodes: (email, phonenumber, clientid) => dispatch(generateCodes(email, phonenumber, clientid)),
    checkCodes: (userid, phonecode, emailcode) => dispatch(checkCodes(userid, phonecode, emailcode)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
