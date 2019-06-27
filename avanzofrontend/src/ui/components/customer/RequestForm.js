//Libraries
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Divider, Form, Select, Button, Col, Row, InputNumber, Modal, Table} from 'antd';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import routes from '../../../configuration/routing/Routes';

//Styles
import '../../styles/customer/request-form.css';
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';


//Constants
//import {Roles} from "../../../lib/generalUtils/constants";
const FormItem = Form.Item;

const table = [
  {
    title: <div>Cantidad de desembolsos</div>,
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

  render(){
    
    console.log(this.state.moyen);
    let { isLoading, moyen, report, loan } = this.state;
    let { isLogin } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          <Row>
            <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
              <h2 className={'request-terms-title'}>Solicitar préstamo</h2>
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
                  <h3>Información del desembolso</h3>
                  <Divider className={"form-request-divider"}/>
                </div>
                <Row gutter={20} className={"form-request-rows"}>
                  <Col xs={12} sm={12} md={12} lg={8} >
                    <FieldTitle title={"Medio de desembolso"}/>
                    <FormItem>
                      {getFieldDecorator('moyen',
                        {rules: [
                          {required: false, message: 'Por favor ingresa un medio de desembolso'}
                        ]})(
                          <Select placeholder={"Medio de desembolso"} >
                            <Select.Option value={0}>DaviPlata</Select.Option>
                            <Select.Option value={1}>Nequi</Select.Option>
                            <Select.Option value={2}>Rappi</Select.Option>
                          </Select>
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={16}>
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
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"custom-button"} icon="file"  disabled={!moyen}
                            onClick={() => this.setState({report: true})}>
                         Informe de desembolso
                    </Button> 
                  </Col>
                  <Col xs={0} sm={0} md={12} lg={14}/>
                  <Col xs={24} sm={12} md={6} lg={5}>
                    <Button className={"request-confirm-button"} icon="file"  disabled={!moyen}
                            onClick={() => this.onConfirmRequest()}>
                         Solicitar préstamo
                    </Button> 
                  </Col>
                  
                </Row>
              </Form>
              <Modal 
                title = "Informe de desembolso"
                visible={this.state.report}
                onCancel={()=>{this.setState({report: false})}}
                cancelText={"Cancelar"}
                okText={"De acuerdo"}
                width={600}
                onOk={()=>{this.setState({report: false})}}>
                <div>
                  <div className="upload-text">
                    De acuerdo a las cuotas que suministró, tendrá el siguiente informe de desembolso.
                    <br/>
                    <br/>
                    <Table className={"new-table"} dataSource={tableData} columns={table} rowKey={'key'} 
                         size={'small'} scroll={{x:'500px'|true}}/>
                  </div>
                </div>
              </Modal>
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
