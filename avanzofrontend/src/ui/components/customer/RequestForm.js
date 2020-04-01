//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Math from "math";
import PropTypes from 'prop-types';
import CurrencyFormat from "react-currency-format";
import connect from 'react-redux/es/connect/connect';
import SignaturePad from 'react-signature-canvas';
import { Divider, Form, Select, Button, Col, Row, InputNumber, Table, Slider,
  Statistic, Typography, Card, Switch, Spin, Input} from 'antd';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import routes from '../../../configuration/routing/Routes';

//Actions
import { getRequestData, getOutlayData, getOultayDatesList, createRequest } from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/request-form.css';
import { SUCCESS_MODAL, WARNING_MODAL, allowEmergingWindows, ERROR_MODAL } from '../subcomponents/modalMessages';

//Constants
const FormItem = Form.Item;
//const { Panel } = Collapse;

function format(d) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
    render: text => <div className={"table-p"}>{"$"+Math.round(text)}</div>,
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
    };    

    this.props.getRequestData(parseInt(localStorage.user_id, 10), this.props.location.state ? this.props.location.state.token : undefined);
    this.props.getOutlayData(parseInt(localStorage.user_id, 10), this.props.location.state ? this.props.location.state.token : undefined);

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("PV", prevState.sliderValue, nextProps.requestDataResponse);
    //console.log("RD", JSON.stringify(nextProps.requestDataResponse) !== '{}');
    if(JSON.stringify(nextProps.requestDataResponse) !== '{}'){
      if(prevState.sliderValue === null){
        return {
          sliderValue: Math.round(nextProps.requestDataResponse.partialCapacity) < 80000 ? 80000 : Math.round(nextProps.requestDataResponse.partialCapacity),
          bank_name: nextProps.requestDataResponse.accountBank,
          bank_number: nextProps.requestDataResponse.accountNumber,
          bank_type: nextProps.requestDataResponse.accountType
        };
      }else{
        return{
          flagState: true
        }
      }
    }else{
      return {
        flagState: true
      }
    }
   }

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
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
    if(e.target.value !== ''){
      this.setState({
        fee: e.target.value
      });
    }

    
  };

  sendReportInfo = (maximumSplit) => {
    console.log("E", maximumSplit);
    if( this.state.fee !== null){
      this.props.getOultayDatesList(parseInt(localStorage.user_id, 10), this.state.fee, this.state.sliderValue);
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
         wallet_type, signatureDone} = this.state;

    //console.log("State", bank_account, bank_name, bank_number, bank_type, money_wallet, 
    //wallet_number, wallet_type, signatureDone);

    if (bank_account){
      if(bank_name !== null && bank_number !== null && bank_type !== null && 
         bank_name !== "" && bank_number !== "" && bank_type !== "" && signatureDone !== null){
          return true;
         }
      return false;
    }else if(money_wallet){
      if( wallet_type !== null && signatureDone !== null && wallet_type !== ""){
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
    this.props.form.validateFields((err, values) => {
      if (err){
        this.setState({
          isLoading: false,
        });
        ERROR_MODAL("Error al realizar la acción", "Por favor ingrese datos válidos dentro del formulario.");
      }else{
        let data = {
          file: this.state.trimmedDataURL,
          quantity: values.quantity,
          split: this.state.fee,
          moyen: values.moyen,
          accountType: this.state.money_wallet ? null : values.account_type,
          accountNumber: values.account_number,
          isBank: this.state.money_wallet ? false :  true,
          interest: this.state.sliderValue * interestValue,
          administration: (this.state.fee%2) * adminValue,     
        }
        //console.log(data);
        this.props.createRequest(data, this.props.location.state ? this.props.location.state.token : undefined);
      }     
    });
  };

  validationLetters = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^a-zA-Z\s]$/g, '');
  };

  validationNumbers = (e) => {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, '');
  };

  render(){

    //console.log( this.props.requestDataResponse);
    //console.log( "TK", this.props.location.state.token);

    let {fee, sliderValue, bank_account, money_wallet} = this.state;
    let feeCondition = fee !== null && this.defineDocumentsCondition();
    const { getFieldDecorator } = this.props.form;
    let { requestDataResponse, outlayDataResponse, outlayDatesList } = this.props;
    let { interestValue, adminValue, partialCapacity, maximumSplit, otherCollectionValue, phoneNumber, accountNumber, accountType, accountBank } = requestDataResponse;
    let { bankInfo, bankTypeAccountInfo, walletInfo } = outlayDataResponse;
    let { trimmedDataURL } = this.state;    

    //console.log("ODL", this.state.sliderValue);


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
                      <Statistic className={"customer-credit-card"} title={<h3>Cupo disponible</h3>} value={partialCapacity} prefix={"$"}/>
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
                              <InputNumber step={10000} className={"form-input-number"} max={partialCapacity < 80000 ? 80000 : partialCapacity} min={partialCapacity < 80000 ? partialCapacity : 80000}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                    placeholder={"Monto requerido"} onBlur={(e) => this.handleQuantityBlur(e)} onChange={this.handleQuantity} disabled={this.state.quantityBlur}/>
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
                                <Slider max={partialCapacity <= 80000 ? 80000 : partialCapacity} min={80000} step={10000} className={"slider-amount"}
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
                                                value={partialCapacity < 80000 ? 80000 : partialCapacity} thousandSeparator={'.'}
                                                decimalSeparator={','} prefix={'$'}/></span>
                          </h3>
                        </Col>
                        
                      </Row>
                      <FieldTitle title={"Número de cuotas"}/>
                      <span className={"text-fees"}>*La cantidad máxima de cuotas de acuerdo con tu empresa es <span className={"fees-number-text"}>{maximumSplit}</span>.</span>
                      <FormItem className={"fees-item"}>
                        {getFieldDecorator('fees',
                          {rules: [
                            {required: true, message: 'Por favor ingresa un número de cuotas'}
                          ]})(
                            <Row>
                              <Input className={"form-input-number"} placeholder={"Número de cuotas"} max={maximumSplit}
                              onChange={(e) => this.onChangeFee(e)} onBlur={() => this.sendReportInfo(maximumSplit)}
                              disabled={sliderValue < 80000 ? true : false} />
                            </Row>
                          )
                        }
                      </FormItem>  
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <Card>
                        <Row gutter={8} className={"information-col"}>
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
                          <b>Interés total</b>
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
                            <b>Otros cobros</b>
                          </Col>
                          <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                            <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                              value={JSON.stringify(outlayDatesList) === '{}' ? "-" : outlayDatesList.ivaValue} thousandSeparator={'.'}
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
                      <div className="upload-text">
                        De acuerdo a las cuotas que suministraste, tendrás el siguiente informe de descuentos. 
                        <br/>
                        <br/>
                        <Table className={"new-table"} dataSource={outlayDatesList.datesList} columns={table} rowKey={'id'} 
                            size={'small'} pagination={false}/>
                      </div>
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
                    <Col xs={12} sm={12} md={8} lg={7}>
                    <span className={"type-account"}>{"Banco "}<Switch onChange={this.handleWallet}/>{" Billetera virtual"}</span>  
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={10} className={"form-bank-col"}>
                      {
                        bank_account &&
                        <div >
                          <span className={"bank-requires"}>* El tiempo de desembolso depende de los ciclos ACH</span>
                        </div> 
                      }
                      {
                        (!bank_account && !money_wallet) && 
                        <div >
                          <span>* Escoge un medio para realizar el desembolso</span>
                        </div> 
                      }
                    </Col>
                  </Row>
                  <br/>
                    {
                      bank_account && 
                      <Row gutter={12} className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={7} lg={7} >
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
                        <Col xs={12} sm={12} md={7} lg={7} >
                          <FieldTitle title={"Tipo de cuenta"}/>
                          <FormItem>
                            {getFieldDecorator('account_type',
                              {initialValue: accountType, rules: [
                                {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                              ]})(
                                <Select placeholder={"Tipo de cuenta"} disabled={sliderValue < 80000 ? true : false} showSearch={true} onChange={this.changeBankType}>
                                  {bankTypeAccountInfo.map((accountType, i) =>(
                                    <Select.Option value={accountType.accountTypeName} key={i}>
                                      {accountType.accountTypeName}
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
                      </Row>
                    }
                    {
                      money_wallet &&
                      <Row  gutter={12} className={"form-request-rows"}>
                        <Col xs={12} sm={12} md={7} lg={7} >
                          <FieldTitle title={"Billetera virtual"}/>
                          <FormItem>
                            {getFieldDecorator('moyen',
                              {initialValue: null, rules: [
                                {required: false, message: 'Por favor ingresa un tipo de billetera'}
                              ]})(
                                <Select placeholder={"Tipo de billetera"} disabled={sliderValue < 80000 ? true : false} showSearch={true} onChange={this.changeWalletType}>
                                  {walletInfo.map((wallet, i) =>(
                                    <Select.Option value={wallet.walletName} key={i}>
                                      {wallet.walletName}
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
                      </Row>
                    }
                    
                
                    <Row>
                      <Col lg={1} md={3} sm={5} xs={4}>
                        <Button className={"step-one"}>
                          3.
                        </Button>
                      </Col>
                      <Col lg={23} md={21} sm={19} xs={20}>
                        <div>
                          <h3>Documentos de la solicitud</h3>
                          <Divider className={"form-request-divider"}/>
                        </div>
                      </Col>
                    </Row>

                  <Row className={"form-request-rows"} gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={24}> 
                      <Card className={"download-card"}>
                        <Row style={{textAlign: "center", fontWeight: "bold", fontSize: "15px"}}>
                            Autorización de descuento
                        </Row>
                        <br/>
                        <Row className={"signature-field"}>
                          <SignaturePad canvasProps={{style:{width: '100%', height: '100%'}}}
                            ref={(ref) => { this.sigPad = ref }} />
                        </Row>
                        <Row gutter={6}>
                          <Col xs={4} sm={10} md={12} lg={16}/>
                          <Col xs={10} sm={7} md={6} lg={4}>
                            <Button className={"request-signature-clean-button"} style={{width: '100%', height: '30px'}} onClick={this.clear}>
                              Limpiar firma
                            </Button>
                          </Col>
                          <Col xs={10} sm={7} md={6} lg={4}>
                            <Button className={"request-signature-make-button"} style={{width: '100%', height: '30px'}} onClick={this.trim}>
                              Realizar firma
                            </Button>
                          </Col>
                        </Row>
                        <br/>
                        <br/>
                        {trimmedDataURL
                          ? <img alt="signature" style={{backgroundSize: '200px 50px', width: '200px', backgroundColor: 'white'}}
                            src={trimmedDataURL} />
                          : null}
                      </Card>
                    </Col>
                  </Row>

                  
                  
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
  requestResponse: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    requestDataResponse: state.customer.requestDataResponse,
    outlayDataResponse: state.customer.outlayDataResponse,
    outlayDatesList: state.customer.outlayDatesList,
    requestResponse: state.customer.requestResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestData: (customerId, token) => dispatch(getRequestData(customerId, token)),
    getOutlayData: (customerId, token) => dispatch(getOutlayData(customerId, token)),
    getOultayDatesList: (customerId, split, quantity) => dispatch(getOultayDatesList(customerId, split, quantity)),
    createRequest: (data, token) => dispatch(createRequest(data, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
