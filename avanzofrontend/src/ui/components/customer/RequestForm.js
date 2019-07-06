//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Divider, Form, Select, Button, Col, Row, Collapse, Checkbox, Upload, Icon,
         InputNumber, Table, Card, Statistic, Typography, message} from 'antd';

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
      moyen: false,
      report: null,
      loan: null,
      upload: null,
    };

  };

  onChangeMoyen = (e) => {
    this.setState({
      moyen: true
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
      upload: true,
    });
  };

  render(){
    
    let { moyen, loan} = this.state;
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
                <Card className={"customer-credit-card"}>
                  <Row gutter={2}>
                    <Col span={24}>
                      <Statistic title={<h3>Cupo disponible</h3>} value={187107} prefix={"$"}/>
                    </Col>
                  </Row>    
                </Card>
              </Col>
          </Row>
          <Row className={"request-row-content"}>
            <div>  
              <Form>
                <div className={"form-request-rows"}>
                  <h3>Información de la solicitud</h3>
                  <Divider className={"form-request-divider"}/>
                </div>
                <Row gutter={20} className={"form-request-rows"}>
                  <Col xs={12} sm={12} md={12} lg={16} >
                    <FieldTitle title={"Monto requerido"}/>
                    <FormItem>
                      {getFieldDecorator('quantity',
                        {rules: [
                          {required: false, message: 'Por favor ingresa un monto requerido'}
                        ]})(
                          <InputNumber className={"form-input-number"} defaultValue={100000} max={300000}
                                       formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                                       placeholder={"Monto requerido"}/>
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={8}>
                    <FieldTitle title={"Número de cuotas"}/>
                    <FormItem >
                      {getFieldDecorator('fees',
                        {rules: [
                          {required: false, message: 'Por favor ingresa un número de cuotas'}
                        ]})(
                          <InputNumber className={"form-input-number"} placeholder={"Número de cuotas"} 
                          max={12} onChange={(e) => this.onChangeMoyen()}/>
                        )
                      }
                    </FormItem>  
                  </Col>
                </Row>
                <div className={"form-request-rows"}>
                  <h3>Información adicional</h3>
                  <Divider className={"form-request-divider"}/>
                </div>
                <Row gutter={20} className={"form-request-rows"}>
                  <Col xs={12} sm={12} md={7} lg={7} >
                    <FieldTitle title={"Cuenta"}/>
                    <FormItem>
                      {getFieldDecorator('moyen',
                        {rules: [
                          {required: false, message: 'Por favor selecciona una cuenta'}
                        ]})(
                          <Select placeholder={"Cuenta"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                            <Select.Option value={"DaviPlata"}>DaviPlata</Select.Option>
                            <Select.Option value={"Nequi"}>Nequi</Select.Option>
                            <Select.Option value={"Rappi"}>Rappi</Select.Option>
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
                <div className={"form-request-rows"}>
                  <Divider className={"form-request-divider"}/>
                </div>

                <Row className={"form-request-rows"}>
                  <Checkbox onChange={this.onChange} disabled={false} className={"form-checkbox"}> 
                    Agregar documentos 
                  </Checkbox>
                  { 
                    (this.state.upload) &&
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Cargar archivos
                      </Button>
                    </Upload>
                  }
                </Row>

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
                
                <Row className={"form-request-rows"}>
                  <Col xs={24} sm={12} md={18} lg={19}/>
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"request-confirm-button"} icon="file"  disabled={!moyen}
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
