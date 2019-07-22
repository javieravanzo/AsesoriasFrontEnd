//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Divider, Form, Select, Button, Col, Row, Collapse, Checkbox, Upload, Icon,
         InputNumber, Table, Slider, Statistic, Typography, message, Card, Switch, Popover} from 'antd';
import CurrencyFormat from "react-currency-format";
import Math from "math";

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import routes from '../../../configuration/routing/Routes';

//Styles
import '../../styles/customer/request-form.css';
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';


//Constants
//import {Roles} from "../../../lib/generalUtils/constants";
const FormItem = Form.Item;
const { Panel } = Collapse;

function format(d) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(d);
};



function xFormat(d){
  var upper = "";
  console.log(d/1000);
  if(d.length>4){
    upper += upper + "."
  }

  return "$ " + d;
};

const table = [
  {
    title: <div>Cantidad de descuentos</div>,
    dataIndex: 'transaction',
    width: "150px",
    align: "center",
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.transaction.localeCompare(b.transaction)},
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
    render: text => <div className={"table-p"}>{text}</div>,
    sorter: (a, b) =>{ return a.date.localeCompare(b.date)},
  }
];

class LoanRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      isLoading: false,
      isLogged: false,
      captchaSolved: true,
      email: null,
      meeting: null,
      fee: false,
      report: null,
      loan: null,
      upload: null,
      sliderValue: 300000,
      wallet: false,
    };

  };

  onChangeFee = (e) => {
    this.setState({
      fee: true
    }); 
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
    this.setState({wallet: e})
  };

  render(){

    let {fee, loan, sliderValue, wallet} = this.state;
    let switchName = !wallet ? "Billetera virtual" : "Entidad bancaria";
    const { getFieldDecorator } = this.props.form;
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

          <Row>
            <Col>
            
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
                      {getFieldDecorator('quantity', {initialValue: 300000,
                        rules: [
                          {required: false, message: 'Por favor ingresa un monto requerido'}
                        ]})(
                          <InputNumber className={"form-input-number"} max={300000} value={sliderValue}
                                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                      placeholder={"Monto requerido"} onChange={this.handleQuantity}/>
                        )
                      }
                    </FormItem>
                    <Row className="icon-wrapper">
                      <Col xxl={5} lg={5} md={8} sm={8} xs={10}>
                        <h3>
                         <span className={"request-title"}>$80.000</span>
                        </h3>
                      </Col>
                      <Col xxl={14} lg={14} md={8} sm={8} xs={10}>
                        <Slider max={300000} min={80000} 
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
                    <FormItem className={"fees-item"}>
                      {getFieldDecorator('fees',
                        {rules: [
                          {required: false, message: 'Por favor ingresa un número de cuotas'}
                        ]})(
                          <Row>
                            <InputNumber className={"form-input-number"} placeholder={"Número de cuotas"} 
                            max={12} onChange={(e) => this.onChangeFee()}/>
                            <span className={"text-fees"}>*La cantidad máxima de cuotas depende de los ciclos de pago en tu empresa.</span>
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
                                            value={Math.round(this.state.sliderValue*0.028)} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                          <b>Administración</b>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                          <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={Math.round(this.state.sliderValue*0.04)} thousandSeparator={'.'}
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
                                            value={Math.round(sliderValue+(sliderValue*0.04)+(sliderValue*0.028))} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "right"}}>
                          <b>Otros cobros</b>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} style={{textAlign: "left"}}>
                          <b><CurrencyFormat  displayType={'text'} style={{width: "100%"}}
                                            value={620} thousandSeparator={'.'}
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
                                            value={Math.round((sliderValue+(sliderValue*0.04)+(sliderValue*0.028)+620))} thousandSeparator={'.'}
                                            decimalSeparator={','} prefix={'$'}/></b>
                        </Col>
                      </Row>
                      <span className={"text-fees"}>*Al dar click en el botón Solitar préstamo, usted acepta los términos y condiciones descritos aquí.</span>
                    </Card>
                  </Col>
                </Row>
                <br/>
                {
                  fee && 
                  <Row className={"form-request-rows"}>
                    <Collapse>
                      <Panel key="1" header="Informe de descuentos">
                        <div>
                          <div className="upload-text">
                            De acuerdo a las cuotas que suministró, tendrá el siguiente informe de descuento.
                            <br/>
                            <br/>
                            <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'} 
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
                      <h3>Información adicional</h3>
                      <Divider className={"form-request-divider"}/>
                    </div>
                  </Col>
                </Row>
                
                <Row gutter={20} className={"form-request-rows"}>
                  <Col xs={12} sm={12} md={8} lg={8}>
                    <Switch onChange={this.handleWallet} disabled={false}/><span className={"type-account"}>{" " + switchName}</span>  
                  </Col>
                  <Col xs={12} sm={12} md={16} lg={16} className={"form-bank-col"}>
                    {
                      wallet &&
                      <div >
                        <span className={"bank-requires"}>* El tiempo de desembolso depende de los ciclos ACH</span>
                      </div> 
                    }
                  </Col>
                </Row>
                <br/>
                  {
                    wallet && 
                    <Row gutter={12} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={7} lg={7} >
                        <FieldTitle title={"Cuenta"}/>
                        <FormItem>
                          {getFieldDecorator('moyen',
                            {rules: [
                              {required: false, message: 'Por favor selecciona una cuenta'}
                            ]})(
                              <Select placeholder={"Cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                                <Select.Option value={"Caja Social"}>Banco Caja Social</Select.Option>
                                <Select.Option value={"Bogotá"}>Banco Bogotá</Select.Option>
                                <Select.Option value={"Colpatria"}>Banco Colpatria</Select.Option>
                                <Select.Option value={"Davivienda"}>Banco Davivienda</Select.Option>
                                <Select.Option value={"BBVA"}>Banco BBVA</Select.Option>
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
                              <Select placeholder={"Tipo de cuenta"} showSearch={true} >
                                <Select.Option value={"Ahorros"}>Ahorros</Select.Option>
                                <Select.Option value={"Corriente"}>Corriente</Select.Option>
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
                              <InputNumber className={"form-input-number"} placeholder={"Número de cuenta"}/>
                            )
                          }
                        </FormItem>  
                      </Col>
                    </Row>
                  }
                  {
                    !wallet &&
                    <Row  gutter={12} className={"form-request-rows"}>
                      <Col xs={12} sm={12} md={7} lg={7} >
                        <FieldTitle title={"Billetera virtual"}/>
                        <FormItem>
                          {getFieldDecorator('account_type',
                            {rules: [
                              {required: false, message: 'Por favor ingresa un tipo de cuenta'}
                            ]})(
                              <Select placeholder={"Tipo de cuenta"} showSearch={true} >
                                <Select.Option value={"Ahorros"}>Nequi</Select.Option>
                                <Select.Option value={"Corriente"}>DaviPlata</Select.Option>
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
                              {required: false, message: 'Por favor ingresa un número de cuenta' }
                            ]})(
                              <InputNumber className={"form-input-number"} placeholder={"Número de cuenta"}/>
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
                  <Col xs={24} sm={12} md={12} lg={13}> 
                    <Card className={"download-card"}>
                      <Row sm={12} md={12} lg={12} style={{textAlign: "center", fontWeight: "bold", fontSize: "15px"}}>
                          Descargar
                      </Row>
                      <br/>
                      <Row gutter={12}>
                        <Col sm={12} md={12} lg={12}>
                          <Button style={{width: "90% !important"}} className={"documents-buttons"}>
                            <Icon type="file-exclamation"/>Contrato de libranza
                          </Button>
                          <Popover content={"Contrato de libranza"} placement="rightTop">
                            <Icon className='question-button' type='question-circle'/>
                          </Popover>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                          <Button style={{width: "90% !important"}} className={"documents-buttons"}>
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
                        <Checkbox onChange={this.onChange} disabled={false} className={"form-checkbox"}> 
                          Cargar documentos 
                        </Checkbox>
                      </Row>
                      <Upload {...props}>
                        <Button className={"documents-buttons"}>
                          <Icon type="upload" /> Cargar archivos
                        </Button>
                      </Upload>
                    </Card>
                  </Col>
                </Row>

                
                
                <Row className={"form-request-rows"}>
                  <Col xs={24} sm={12} md={18} lg={19}/>
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"request-confirm-button"} icon="file"  disabled={!fee}
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

export default RequestForm;
