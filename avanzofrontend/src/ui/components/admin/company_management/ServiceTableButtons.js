//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber, Select} from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Actions
import {updateCompany} from "../../../../store/redux/actions/admin/adminActions";

//Styles

class TableButtons extends Component {
  
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
    };

    this.inputServiceName = this.inputServiceName.bind(this);
    this.inputServiceTime = this.inputServiceTime.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    
  };

  inputServiceName(e, service){
    //console.log(e);
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
      economyActivity: this.state.economyActivity===null ? item.economyActivity : this.state.servieconomyActivitye,
      maximumSplit: this.state.maximumSplit===null ? item.maximumSplit : this.state.maximumSplit,
      defaultAmount: this.state.defaultAmount===null ? item.defaultAmount : this.state.defaultAmount, 
      approveHumanResources: this.state.approveHumanResources===null ? item.approveHumanResources : this.state.approveHumanResources,
      email: this.state.email===null ? item.email : this.state.email,
      idCompany: item.idCompany,
      idUser: item.idUser
    };
    this.props.updateCompany(data);
    this.setState({
      visible: false
    });
  };

  render() {

    //console.log("Props", this.props.item);

    return (
      <div>
        <Row gutter={16}>
          <Col span={3}/>
          <Col span={3}  className={"delete-col"}>
            <Tooltip title={"Editar empresa"}>
              <Icon className={"icon-button delete-icon"} onClick={() => this.setState({visible: true})}
                type={"edit"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>         
        </Row>
        <Modal
            title={"Editar servicio"}
            visible={this.state.visible}
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
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.nit} onChange={(e) => this.inputServiceName(e, 'nit')} placeholder={"NIT"}/>
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
                <Select className={"company-edit-nit"} placeholder={"¿Aprueba Recursos Humanos?"} showSearch={true} allowClear={true} autoClearSearchValue={true}>
                  <Select.Option value={"Sí"}>Sí</Select.Option>
                  <Select.Option value={"No"}>No</Select.Option>
                </Select>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Máxima cantidad a prestar:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.defaultAmount} placeholder={"Máximo préstamo"} onChange={(e) => this.inputServiceName(e, 'defaultAmount')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Cantidad de cuotas máxima:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.maximumSplit} placeholder={"Cantidad de cuotas"} onChange={(e) => this.inputServiceName(e, 'maximumSplit')}/>
              </Col>
              
            </Row>
        </Modal>
      </div>
    );
  };
}

TableButtons.propTypes = {
  updateServices: PropTypes.func,
  deleteServices: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompany: (data) => dispatch(updateCompany(data)),
    //deleteServices: (data) => dispatch(deleteServices(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);