//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Divider, Form, Select, Button, Col, Row, Collapse, Checkbox, Upload, Icon,
         InputNumber, Table, Slider, Statistic, Typography, message, Card, Switch, Popover, Steps} from 'antd';
import CurrencyFormat from "react-currency-format";
import Math from "math";
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import routes from '../../../configuration/routing/Routes';

//Actions
import {getRequestData, getOutlayData, getOultayDatesList, generateDocuments} from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/request-form.css';
import { SUCCESS_MODAL, WARNING_MODAL, allowEmergingWindows } from '../subcomponents/modalMessages';

//Constants
const FormItem = Form.Item;
const { Panel } = Collapse;
const { Step } = Steps;

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
    render: text => <div className={"table-p"}>{"$"+text}</div>,
    sorter: (a, b) =>{ return a.quantity.toString().localeCompare(b.quantity.toString())},
  },
  {
    title: <div className={"table-p"}>Fecha Desembolso</div>,
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
      sliderValue: 300000,
      fee: null,
      loan: null,
      money_wallet: false,
      wallet_type: null,
      wallet_number: null,
      bank_account: false,
      bank_name: null,
      bank_number: null,
      bank_type: null,
      documents_uploaded: false,
    };

    this.props.getRequestData(parseInt(localStorage.user_id, 10));
    this.props.getOutlayData(parseInt(localStorage.user_id, 10));

  };

  onChangeFee = (e) => {
    this.setState({
      fee: e
    });
  };

  sendReportInfo = () => {
    this.props.getOultayDatesList(parseInt(localStorage.user_id, 10), this.state.fee, this.state.sliderValue);
  };

  onConfirmRequest = () => {
    SUCCESS_MODAL("Acción realizada exitosamente", "El préstamo ha sido solicitado correctamente.");
    this.setState({
      loan: true
    });
  };

  onChange = () => {
    this.setState({
      upload: !this.state.upload,
      documents_uploaded: true
    });
  };

  handleSliderChange = (e) => {
    this.setState({
      sliderValue: Math.round(e),
    });
  };

  handleQuantity = (e) => {
    if(e<=300000 && e>=80000){
      this.setState({
        sliderValue: Math.round(e),
      });
    }    
  };

  handleWallet = (e) => {
    this.setState({
      money_wallet: e,
      bank_account: false
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
    this.setState({
      wallet_number: e
    });
  };

  changeBankName = (e) => {
    this.setState({
      bank_name: e
    });
  };

  changeBankNumber = (e) => {
    this.setState({
      bank_number: e
    });
  };

  changeBankType = (e) => {
    this.setState({
      bank_type: e
    });
  };

  defineDocumentsCondition = () => {
    
    let {bank_account, bank_name, bank_number, bank_type, money_wallet, wallet_number, wallet_type} = this.state;
    //console.log(bank_account, bank_name, bank_number, bank_type, money_wallet, wallet_number, wallet_type);

    if (bank_account){
      if(bank_name !== null && bank_number !== null && bank_type !== null && 
         bank_name !== "" && bank_number !== "" && bank_type !== ""){
          return true;
         }
      return false;
    }else if(money_wallet){
      if(wallet_number !== null && wallet_type !== null && 
        wallet_number !== "" && wallet_type !== ""){
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

    console.log("entro");

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


  render(){

    let {fee, loan, sliderValue, bank_account, money_wallet, documents_uploaded} = this.state;
    let feeCondition = fee !== null && this.defineDocumentsCondition();
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
    let tableData = [
      {
        key: 1,
        transaction: "Desembolso No. 1",
        quantity: 105000,
        date: "20-06-19",
      },
      {
        key: 2,
        transaction: "Desembolso No. 2",
        quantity: 105000,
        date: "21-06-19",
      },
      {
        key: 3,
        transaction: "Desembolso No. 3",
        quantity: 105000,
        date: "23-06-19",
      }      
    ];
    const { getFieldDecorator } = this.props.form;
    let { requestDataResponse, outlayDataResponse, outlayDatesList } = this.props;
    let { interestValue, adminValue, maximumAmount, maximumSplit, otherCollectionValue, haveDocumentsLoaded } = requestDataResponse;
    let { bankInfo, bankTypeAccountInfo, walletInfo } = outlayDataResponse;
    //console.log(requestDataResponse, outlayDataResponse, outlayDatesList);  
    

    return (
      <div className={"request-div"}>
          <Row className={"request-row-content"}>
            <Col xxl={19} lg={19} md={19} sm={12} xs={12}>
              <Typography >
                <Typography.Title level={3} className={"request-form-title"}>
                  Solicitar préstamo
                </Typography.Title>       
              </Typography>
            </Col>
            <Col xxl={5} lg={5} md={5} sm={12} xs={12}>
                <div className={"customer-credit-card"}>
                  <Row gutter={2}>
                    <Col span={24}>
                      <Statistic title={<h3>Cupo disponible</h3>} value={187107} prefix={"$"}/>
                    </Col>
                  </Row>    
                </div>
              </Col>
          </Row>
          <Row className={"request-row-content"}>
            <div>  
              <Form>
                <Row>
                  <Col lg={1}>
                    <Button className={"step-one"}>
                      1.
                    </Button>
                  </Col>
                  <Col lg={23}>
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
                      <InputNumber className={"form-input-number"} max={maximumAmount} value={this.state.sliderValue}
                                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                  placeholder={"Monto requerido"} onChange={this.handleQuantity}/>
                    </FormItem>
                    <Row className="icon-wrapper">
                      <Col xxl={5} lg={5} md={8} sm={8} xs={10}>
                        <h3>
                         <span className={"request-title"}>$80.000</span>
                        </h3>
                      </Col>
                      <Col xxl={14} lg={14} md={8} sm={8} xs={10}>
                        <Slider max={300000} min={80000} step={10000}
                                tipFormatter={
                                  function (d) { 
                                    return format(d);
                                  }} 
                                onChange={this.handleSliderChange} style={{width: "90%"}} value={sliderValue} />  
                      </Col>
                      <Col xxl={5} lg={5} md={8} sm={8} xs={10}>
                        <h3>
                         <span className={"request-title"}>$300.000</span>
                        </h3>
                      </Col>
                      
                    </Row>
                    <FieldTitle title={"Número de cuotas"}/>
                    <span className={"text-fees"}>*La cantidad máxima de cuotas depende de los ciclos de pago en tu empresa.</span>
                    <FormItem className={"fees-item"}>
                      {getFieldDecorator('fees',
                        {rules: [
                          {required: false, message: 'Por favor ingresa un número de cuotas'}
                        ]})(
                          <Row>
                            <InputNumber className={"form-input-number"} placeholder={"Número de cuotas"} max={maximumSplit} 
                            onChange={(e) => this.onChangeFee(e)}/>
                          </Row>
                        )
                      }
                    </FormItem>  
                    

                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Card>
                      <Row gutter={8} className={"information-col"}>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
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
                                            value={interestValue} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                          <b>Administración</b>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                          <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={adminValue} thousandSeparator={'.'}
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
                                            value={Math.round(sliderValue+adminValue+interestValue)} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                          <b>Otros cobros</b>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                          <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={otherCollectionValue} thousandSeparator={'.'}
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
                                            value={Math.round(sliderValue+adminValue+interestValue+otherCollectionValue)} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <span className={"text-fees"}>*Al dar click en el botón Solitar préstamo, usted acepta los términos y condiciones descritos aquí.</span>
                    </Card>
                  </Col>
                </Row>
                <Row className={"form-request-rows-text"}>
                <span className={"text-fees"}>
                  De acuerdo con las fechas que tenemos registradas para ti, los desembolsos se realizarán los días 20 - 13 de cada mes. 
                  <Button className={"request-pending-button"} disabled={fee === null} onClick={() => this.sendReportInfo()}>
                    <h3>
                      <span className={"request-pendings"}>Ver informe de desembolsos</span>
                    </h3>
                  </Button>
                </span>
                </Row>
                <br/>
                {
                  JSON.stringify(outlayDatesList) !== '[]'  && 
                  <Row className={"form-request-rows"}>
                    <Collapse>
                      <Panel key="1" header="Informe de descuentos">
                        <div>
                          <div className="upload-text">
                            De acuerdo a las cuotas que suministró, tendrá el siguiente informe de descuento. 
                            <br/>
                            <br/>
                            <Table className={"new-table"} dataSource={outlayDatesList} columns={table} rowKey={'key'} 
                                size={'small'} scroll={{x:'500px'|true}}/>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </Row>
                }
                <br/>
                <Row>
                  <Col lg={1}>
                    <Button className={"step-one"}>
                      2.
                    </Button>
                  </Col>
                  <Col lg={23}>
                    <div>
                      <h3>Información de desembolso</h3>
                      <Divider className={"form-request-divider"}/>
                    </div>
                  </Col>
                </Row>
                <Row gutter={20} className={"form-request-rows"}>
                  <Col xs={12} sm={12} md={8} lg={7}>
                    <Switch onChange={this.handleWallet} disabled={bank_account}/><span className={"type-account"}>{" Billera virtual"}</span>  
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={7}>
                    <Switch onChange={this.handleBankProp} disabled={money_wallet}/><span className={"type-account"}>{" Cuenta bancaria"}</span>  
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={10} className={"form-bank-col"}>
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
                            {rules: [
                              {required: false, message: 'Por favor selecciona una cuenta'}
                            ]})(
                              <Select onChange={this.changeBankName} placeholder={"Cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                {bankInfo.map((bank, i) =>(
                                  <Select.Option value={bank.id} key={i}>
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
                            {rules: [
                              {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                            ]})(
                              <Select placeholder={"Tipo de cuenta"} showSearch={true} onChange={this.changeBankType}>
                                {bankTypeAccountInfo.map((accountType, i) =>(
                                  <Select.Option value={accountType.id} key={i}>
                                    {accountType.bankTypeName}
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
                          {getFieldDecorator('account',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un número de cuenta' }
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"Número de cuenta"} onChange={this.changeBankNumber}/>
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
                          {getFieldDecorator('account_type',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un tipo de billetera'}
                            ]})(
                              <Select placeholder={"Tipo de billetera"} showSearch={true} onChange={this.changeWalletType}>
                                {walletInfo.map((wallet, i) =>(
                                  <Select.Option value={wallet.id} key={i}>
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
                          {getFieldDecorator('account',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un número de celular' }
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"Número de celular"} onChange={this.changeWalletNumber}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                    </Row>
                  }
                   
               
                  <Row>
                  <Col lg={1}>
                    <Button className={"step-one"}>
                      3.
                    </Button>
                  </Col>
                  <Col lg={23}>
                    <div>
                      <h3>Documentos de la solicitud</h3>
                      <Divider className={"form-request-divider"}/>
                    </div>
                  </Col>
                </Row>

                <Row className={"form-request-rows"} gutter={8}>
                <Steps className={"document-steps"}>
                  <Step status="process" title="Descargar documentos" icon={<Icon type="download" />} />
                  <Step status="wait" title="Cargar documentos" icon={<Icon type="upload" />} />
                </Steps>
                  <Col xs={24} sm={12} md={12} lg={13}> 
                    <Card className={"download-card"}>
                      <Row sm={12} md={12} lg={12} style={{textAlign: "center", fontWeight: "bold", fontSize: "15px"}}>
                          Descargar
                      </Row>
                      <br/>
                      <Row gutter={12}>
                        <Col sm={12} md={12} lg={12}>
                          <Button onClick={() => this.openDocument()} style={{width: "90% !important"}} className={!feeCondition ? "documents-disabled-buttons" : "documents-buttons" } disabled={!feeCondition}>
                            <Icon type="file-exclamation"/>Contrato de libranza
                          </Button>
                          <Popover content={"Contrato de libranza"} placement="rightTop" disabled={fee === null ? true : false}>
                            <Icon className='question-button' type='question-circle'/>
                          </Popover>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                          <Button onClick={() => this.onDownloadDocument} style={{width: "90% !important"}} className={!feeCondition ? "documents-disabled-buttons" : "documents-buttons"} disabled={!feeCondition}>
                            <Icon type="file-protect"/>Autorización descuento
                          </Button>
                          <Popover content={"Documentos adicionales que son requeridos para la solicitud"} placement="rightTop">
                            <Icon className='question-button' type='question-circle'/>
                          </Popover>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={11} >
                    <Card>
                      <Row style={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>
                        <Checkbox onChange={this.onChange}  className={"form-checkbox"}> 
                          Cargar documentos 
                        </Checkbox>
                      </Row>
                      <Upload {...props}>
                        <Button className={!feeCondition ? "documents-disabled-buttons" : "documents-buttons"} disabled={!feeCondition}>
                          <Icon type="upload" /> Cargar archivos
                        </Button>
                      </Upload>
                    </Card>
                  </Col>
                </Row>

                
                
                <Row className={"form-request-rows"}>
                  <Col xs={24} sm={12} md={18} lg={19}/>
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"request-confirm-button"} icon="file"  disabled={!documents_uploaded}
                            onClick={() => this.onConfirmRequest()}>
                         Solicitar préstamo
                    </Button> 
                  </Col>
                  
                </Row>
              </Form>
            </div>
            {
              loan && 
              <Redirect to={routes.customer}/>
            }
        </Row>
      </div>
    );
  
  };
  
}

let RequestForm = Form.create()(LoanRequest);

RequestForm.propTypes = {
  requestDataResponse: PropTypes.object,
  outlayDataResponse: PropTypes.object,
  outlayDatesList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestDataResponse: state.customer.requestDataResponse,
    outlayDataResponse: state.customer.outlayDataResponse,
    outlayDatesList: state.customer.outlayDatesList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestData: (customerId) => dispatch(getRequestData(customerId)),
    getOutlayData: (customerId) => dispatch(getOutlayData(customerId)),
    getOultayDatesList: (customerId, split, quantity) => dispatch(getOultayDatesList(customerId, split, quantity)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
