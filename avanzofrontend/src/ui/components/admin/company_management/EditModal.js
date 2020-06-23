//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber, Select, Table, Spin, Checkbox} from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Subcomponents
import FieldTitle from '../../subcomponents/FieldTitle';

//Styles
import '../../../styles/admin/company_management/edit-company-modal.css';

//Actions
import {updateCompany, getCompanyWithSalary, updateCompanySalaries} from "../../../../store/redux/actions/admin/adminActions";
import { WARNING_MODAL } from '../../subcomponents/modalMessages';

//Columns
const columns = [
  {
    title: 'Tipo de ciclo',
    dataIndex: 'companyRateName',
  },
  {
    title: 'Fechas de pago',
    dataIndex: 'companyFirstDate',
  },
  {
    title: 'Fechas de reporte',
    dataIndex: 'companyReportDate',
  },
  {
    title: 'Acciones',
    dataIndex: 'actions'
  }
];

//Styles
class EditCompanyModal extends Component {
  
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
      visible: null,
      visiblePays: false,
      idDefaultSalary: null,
      defaultPaymentRate: null,
      defaultReportDate: null,
      defaultSalaryDate: null,
      changeSplit: false,
      changeAmount: false,
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

  changeSplit(e){
    this.setState({
      changeSplit: e.target.checked
    });
  };

  changeAmount(e){
    this.setState({
      changeAmount: e.target.checked
    });
  };
  
  inputServiceNumber(e, service){
    this.setState({
      [service]: e,
    });
  };

  inputServiceSplit(e, service){
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
      economyActivity: this.state.economyActivity===null ? item.economyActivity : this.state.economyActivity,
      maximumSplit: this.state.maximumSplit===null ? item.maximumSplit : this.state.maximumSplit,
      defaultAmount: this.state.defaultAmount===null ? item.defaultAmount : this.state.defaultAmount, 
      approveHumanResources: this.state.approveHumanResources===null ? item.approveHumanResources : this.state.approveHumanResources,
      email: this.state.email===null ? item.email : this.state.email,
      companySalaries: this.state.companySalaries.length>0 ? this.state.companySalaries : this.props.companySalaryResponse,
      idCompany: item.idCompany,
      idUser: item.idUser,
      changeSplit: this.state.changeSplit,
      changeAmount: this.state.changeAmount,
    };
    this.props.updateCompany(data);
    this.setState({
      visible: false
    });
  };

  handleEditCylce(item){

    let {idDefaultSalary, defaultPaymentRate, defaultReportDate, defaultSalaryDate} = this.state;

    let data = {
      companyPaymentDates: defaultSalaryDate,
      companyPaymentNumber: defaultPaymentRate === "Quincenal" ? 2 : 1,
      companyRate: defaultPaymentRate === "Quincenal" ? 15 : 30,
      companyRateName: defaultPaymentRate,
      companyReportDates: defaultReportDate,
      idCompanySalaries: idDefaultSalary,
    };

    this.props.updateCompanySalaries(data);

    this.setState({
      visiblePays: false
    });
    this.props.getCompanyWithSalary(this.props.item.idCompany);
  };

  removeRow(id){
    let array = this.state.companySalaries;
    for(let i in array){
      if(array[i].idCompanySalaries === id){
        array.pop(i);
      }
    };
    this.setState({
      companySalaries: array
    });
  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          companyFirstDate: item.companyPaymentDates,
          companyPaymentNumber: item.companyPaymentNumber,
          companyRate: item.companyRate,
          companyRateName: item.companyRateName,
          companyReportDate: item.companyReportDates,
          idCompanySalaries: item.idCompanySalaries,  
          actions:  <Row gutter={16}>
                      <Col span={3}>
                        <Tooltip title={"Editar ciclo"}>
                          <Icon className={{style: {color:"#ff0000"}}} onClick={() => this.searchInfo(item.idCompanySalaries)}
                            type={"edit"} style={{ fontSize: '16px'}}/>
                        </Tooltip>
                      </Col>
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

  searchInfo = (id) => {

    let array = this.state.companySalaries;

    let rate;

    let reportDate;

    let salaryDate;

    let idDefault;

    for(let i = 0; i<array.length; i++){

      //console.log("A", array[i]);

      if(array[i].idCompanySalaries === id){
        idDefault = array[i].idCompanySalaries;
        rate = array[i].companyRateName;
        reportDate = array[i].companyReportDates;
        salaryDate = array[i].companyPaymentDates;
        break;
      }

    }

    this.setState({
      visiblePays: !this.state.visiblePays,
      defaultPaymentRate: rate,
      defaultReportDate: reportDate,
      defaultSalaryDate: salaryDate,
      idDefaultSalary: idDefault
    });

  };

  changeRatesValues = (e, param) => {
    this.setState({
      defaultPaymentRate: e,
    });
  };

  changeReportDate = (e, param) => {
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

  changeSalariesDate = (e, param) => {
    let setter = e.target.value;
    e.target.value = setter.replace(/[^0-9,]/g, '');
    let {defaultPaymentRate} = this.state;
    //setter = e.target.value.replace(/ /g, "");
    let setterValue = setter.replace(/[^0-9,]/g, '').split(',');

    if(defaultPaymentRate === "Mensual"){
      if(setterValue.length === 1){
        this.setState({
          defaultSalaryDate: setterValue[0],
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo un día para el tipo de recurrencia mensual");
      }    
    }else if(defaultPaymentRate === "Quincenal"){
      if(setterValue.length < 3){
        this.setState({
          defaultSalaryDate: setterValue[1] !== undefined ? setterValue[0]+","+setterValue[1] : setterValue[0],
        });
      }else{
        WARNING_MODAL("Advertencia", "Ingresa solo dos días para el tipo de recurrencia quincenal");
      }
    }else{
      WARNING_MODAL("Advertencia", "Primero, Ingresa un tipo de ciclo para esta empresa");
    }
  };

  render() {

    let tableData = this.setData(this.state.companySalaries);

    let {defaultPaymentRate, defaultReportDate, defaultSalaryDate} = this.state;
    //console.log("TableD", tableData);

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
                <Input className={"company-edit-nit"} defaultValue={this.props.item.nit} onChange={(e) => this.inputServiceName(e, 'nit')} placeholder={"NIT"}/>
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
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.maximumSplit} placeholder={"Cantidad de cuotas"} onChange={(e) => this.inputServiceSplit(e, 'maximumSplit')}/>
              </Col>
            </Row>
            <br/>
            <Row gutter={6}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Checkbox onChange={(e) => this.changeSplit(e)}>{" Cambiar cuotas a los clientes asociados"}</Checkbox>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Checkbox onChange={(e) =>this.changeAmount(e)}>{" Cambiar monto a los clientes asociados"}</Checkbox>
              </Col>
            </Row>
            <br/>
            <Row>
              { 
                tableData.length === 0 && 
                <div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                 </div>
              }
              {
                (this.props.companySalaryResponse && tableData.length !== 0) && 
                <Table columns={columns} dataSource={tableData} key={'idCompanySalaries'} size="small" bordered={false} locale={{emptyText: 'No hay registros'}}/>
              }
            </Row>
        </Modal>
        <Modal
          title={"Editar ciclo de pago"}
          visible={this.state.visiblePays}
          width={800}
          okText={"Guardar"}
          onOk={() => this.handleEditCylce(this.props.item)}
          onCancel={() => this.setState({visiblePays: false})}
          cancelText={"Cancelar"}>
          
          <Row gutter={8} key={this.state.burstingKey}>
            <Col xs={12} sm={12} md={6} lg={8} key={this.state.burstingKey}>
              <FieldTitle title={"Ciclo de pagos"}/>
                <Select className={"salary-rate"} value={defaultPaymentRate === null ? undefined : defaultPaymentRate} key={this.state.burstingKey} placeholder={"Tipo de salario"} showSearch={true} onSelect={(e) => this.changeRatesValues(e, 'companyRate')} onChange={this.handleSalaryRate} allowClear={true} >
                  <Select.Option value={"Quincenal"}>Quincenal</Select.Option>
                  <Select.Option value={"Mensual"}>Mensual</Select.Option>
                </Select>
            </Col>
            <Col xs={12} sm={12} md={6} lg={8}>
              <FieldTitle title={"Fechas de salario"}/>
                <Input value={defaultSalaryDate} max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"Fechas de pago"} onChange={(e) => this.changeSalariesDate(e, 'companyFirstDate')}/>
            </Col>
            
            <Col xs={12} sm={12} md={6} lg={8}>
              <FieldTitle title={"Fecha de reportes"}/>
                <Input value={defaultReportDate} max={31} min={1} key={this.state.burstingKey} className={"form-input-number"} placeholder={"(3, 13, 14, ... ) "} onChange={(e) => this.changeReportDate(e, 'companyReportDate')}/>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  };
};

EditCompanyModal.propTypes = {
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
    updateCompanySalaries: (data) => dispatch(updateCompanySalaries(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyModal);
