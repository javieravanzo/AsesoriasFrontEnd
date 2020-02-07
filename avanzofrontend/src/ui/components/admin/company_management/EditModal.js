//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber, Select, Table } from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Actions
import {updateCompany, getCompanyWithSalary} from "../../../../store/redux/actions/admin/adminActions";

//Columns
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
  {
    title: 'Acciones',
    dataIndex: 'actions'
  }
];

//Styles
class SalariesTable extends Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      nit: null,
      address: null, 
      socialReason: null, 
      economyActivity: null,
      maximumSplit: null,
      defaultAmount: null, 
      approveHumanResources: null,
      email: null,
      loading: false,
      companySalaries: [], 
      visible: null
    };

    this.props.getCompanyWithSalary(this.props.item.idCompany);
    
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.visible !== prevState.visible){
      if(prevState.visible === null){
        return {
          visible: nextProps.visible,
        };
      }
      return{
        loading: true
      }
    }
    if(nextProps.companySalaryResponse.length > 0){
        return {
          companySalaries: nextProps.companySalaryResponse,
        };
    }
  };

  
  inputServiceNumber(e, service){
    this.setState({
      [service]: e,
    });
  };

  inputServiceName(e, service){
    this.setState({
      [service]: e.target.value,
    });    
  };

  inputServiceTime(e){
    this.setState({
      time: e,
    });    
  };

  handleEdit(item){
    let data = {
      nit: this.state.nit===null ? item.nit : this.state.nit,
      address: this.state.address===null ? item.address : this.state.address,
      socialReason: this.state.socialReason===null ? item.socialReason : this.state.socialReason,
      economyActivity: this.state.economyActivity===null ? item.economyActivity : this.state.servieconomyActivity,
      maximumSplit: this.state.maximumSplit===null ? item.maximumSplit : this.state.maximumSplit,
      defaultAmount: this.state.defaultAmount===null ? item.defaultAmount : this.state.defaultAmount, 
      approveHumanResources: this.state.approveHumanResources===null ? item.approveHumanResources : this.state.approveHumanResources,
      email: this.state.email===null ? item.email : this.state.email,
      companySalaries: this.state.companySalaries.length>0 ? this.state.companySalaries : this.props.companySalaryResponse,
      idCompany: item.idCompany,
      idUser: item.idUser
    };
    this.props.updateCompany(data);
    this.setState({
      visible: false
    });
  };

  removeRow(id){
    let array = this.state.companySalaries;
    for(let i in array){
      if(array[i].idCompanySalaries === id){
        array.pop(i);
      }
    };
    console.log("A",array);
    this.setState({
      companySalaries: array
    });
  }

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          companyFirstDate: item.companyFirstDate,
          companyPaymentNumber: item.companyPaymentNumber,
          companyRate: item.companyRate,
          companyRateName: item.companyRateName,
          companyReportDate: item.companyReportDate,
          companySecondDate: item.companySecondDate,
          idCompanySalaries: item.idCompanySalaries,  
          actions:  <Row gutter={16}>
                      <Col span={3}/>
                      <Col span={3}>
                        <Tooltip title={"Eliminar ciclo"}>
                          <Icon className={{style: {color:"#ff0000"}}} onClick={() => this.removeRow(item.idCompanySalaries)}
                            type={"close-circle"} style={{ fontSize: '16px'}}/>
                        </Tooltip>
                      </Col>
                    </Row>
        };
        rows.push(row); 
      }
    }
    return rows;
  };

  render() {

    console.log("Visible", this.props.visible);
    console.log("State", this.state.visible);
    //console.log("Props", this.props.companySalaryResponse);
    let tableData = this.setData(this.state.companySalaries);

    return (
      <div>
        <Modal
            title={"Editar empresa"}
            visible={this.state.visible === null || (!this.state.visible && !this.props.visible) ? this.props.visible : this.state.visible}
            okText={"Guardar"}
            cancelText={"Cancelar"}
            width={700}
            onOk={() => this.handleEdit(this.props.item)}
            onCancel={() => this.setState({visible: false})}
            keyboard={!this.state.loading}
            closable={!this.state.loading}>
            <Row gutter={12}>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Razón social:
                <br/>
                <Input defaultValue={this.props.item.socialReason} placeholder={"Razón social"} onChange={(e) => this.inputServiceName(e, 'socialReason')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                NIT:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.nit} onChange={(e) => this.inputServiceNumber(e, 'nit')} placeholder={"NIT"}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Correo electrónico:
                <br/>
                <Input defaultValue={this.props.item.email} placeholder={"Correo electrónico"} onChange={(e) => this.inputServiceName(e, 'email')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Actividad económica:
                <br/>
                <Input defaultValue={this.props.item.economyActivity} placeholder={"Actividad económica"} onChange={(e) => this.inputServiceName(e, 'economyActivity')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Dirección Empresa:
                <br/>
                <Input defaultValue={this.props.item.address} placeholder={"Dirección"} onChange={(e) => this.inputServiceName(e, 'address')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                ¿Aprueba RR.HH.?
                <br/>
                <Select className={"company-edit-nit"} defaultValue={this.props.item.approveHumanResources ? "Sí" : "No"} placeholder={"¿Aprueba Recursos Humanos?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                  <Select.Option value={"Sí"}>Sí</Select.Option>
                  <Select.Option value={"No"}>No</Select.Option>
                </Select>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Máxima cantidad a prestar:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.defaultAmount} placeholder={"Máximo préstamo"} onChange={(e) => this.inputServiceNumber(e, 'defaultAmount')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Cantidad de cuotas máxima:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.maximumSplit} placeholder={"Cantidad de cuotas"} onChange={(e) => this.inputServiceNumber(e, 'maximumSplit')}/>
              </Col>
            </Row>
            <br/>
            
            <br/>
            <Row>
              {
                this.props.companySalaryResponse && 
                <Table columns={columns} dataSource={tableData} key={'idCompanySalaries'} size="small" bordered={false} locale={{emptyText: 'No hay registros'}}/>
              }
            </Row>
        </Modal>
      </div>
    );
  };
};

SalariesTable.propTypes = {
  companySalaryResponse: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    companySalaryResponse: state.admin.companySalaryResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompany: (data) => dispatch(updateCompany(data)),
    getCompanyWithSalary: (data) => dispatch(getCompanyWithSalary(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SalariesTable);
