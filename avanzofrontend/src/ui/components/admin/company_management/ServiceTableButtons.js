//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber, Select} from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Actions
//import {deleteServices, updateServices} from "../../../../../store/redux/actions/admin/parameterization/parameterizationActions";

//Styles

class TableButtons extends Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      service: null,
      time: null,
      visible: false,
      loading: false,
    };

    this.inputServiceName = this.inputServiceName.bind(this);
    this.inputServiceTime = this.inputServiceTime.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    
  };

  inputServiceName(e){
    this.setState({
      service: e.target.value,
    });    
  };

  inputServiceTime(e){
    this.setState({
      time: e,
    });    
  };

  handleEdit(item){
    let data = {
      serviceId: item.serviceId,
      name: this.state.service===null ? item.name : this.state.service,
      meetingRangeInMinutes: this.state.time===null ? item.meetingRangeInMinutes : this.state.time,
    };
    this.props.updateServices(data);
    this.setState({
      visible: false
    });
  };

  handleDelete(item){
    let data = {
      serviceId: item.serviceId,
      name: item.name,
      meetingRangeInMinutes: item.meetingRangeInMinutes
    };
    this.props.deleteServices(data);
  };

  render() {

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
                <Input defaultValue={this.props.item.address} placeholder={"Dirección"} onChange={(e) => this.inputServiceName(e, 'economyActivity')}/>
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
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.defaultAmount} placeholder={"Dirección"} onChange={(e) => this.inputServiceName(e, 'economyActivity')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Cantidad de cuotas máxima:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.maximumSplit} placeholder={"Dirección"} onChange={(e) => this.inputServiceName(e, 'economyActivity')}/>
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
    //updateServices: (data) => dispatch(updateServices(data)),
    //deleteServices: (data) => dispatch(deleteServices(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);