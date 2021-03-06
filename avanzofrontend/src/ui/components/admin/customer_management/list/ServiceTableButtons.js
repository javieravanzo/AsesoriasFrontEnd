//Libraries
import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip, Modal, Input, InputNumber} from 'antd';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Actions
import {activateCustomer, updateCustomer} from "../../../../../store/redux/actions/admin/adminActions";

//Services
import customerService from '../../../../../services/customer/customerServices';

//Styles
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

class TableButtons extends Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {
      name: null,
      lastName: null,
      identificationId: null, 
      profession: null,
      socialReason: null, 
      montlyFee: null,
      maximumAmount: null, 
      email: null,
      phoneNumber: null,
      loading: false,
      delete: null,
    };

    this.changeStateUser = this.changeStateUser.bind(this);
    this.inputServiceName = this.inputServiceName.bind(this);
    this.inputServiceTime = this.inputServiceTime.bind(this);
    this.inputService = this.inputService.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    
  };

  inputServiceName(e, service){
    this.setState({
      [service]: e.target.value,
    });    
  };

  inputService(e, service){
    this.setState({
      [service]: e,
    });
  };

  inputServiceTime(e){
    let item = e;
    this.props.activateCustomer(item.idClient, parseInt(item.platformState, 10) === 1 ? false : true);    
  };

  changeStateUser(e){
    
    if(e !== undefined){
      let userId = e.idUser;
      let accion = false;
      if(e.userState == 0){
        accion = true;
        e.userState = true;
      }else{
        accion = false;
        e.userState = false;
      }
      return customerService.disableUser(userId, accion)
      .then(response => {
       if(response.status === 200){   
        SUCCESS_MODAL(response.data.message);
        this.props.handler(e);
       }
      }).catch(err => {
        console.log(err);
       
      });
    }
  
  }; 

  handleEdit(item){
    let data = {
      name: this.state.name===null ? item.name : this.state.name,
      lastName: this.state.lastName===null ? item.lastName : this.state.lastName,
      identificationId: this.state.identificationId===null ? item.identificationId : this.state.identificationId,
      profession: this.state.profession===null ? item.profession : this.state.profession,
      montlyFee: this.state.montlyFee===null ? item.montlyFee : this.state.montlyFee,
      maximumAmount: this.state.maximumAmount===null ? item.maximumAmount : this.state.maximumAmount, 
      email: this.state.email===null ? item.email : this.state.email,
      phoneNumber: this.state.phoneNumber===null ? item.phoneNumber : this.state.phoneNumber,
      idClient: item.idClient,
      idUser: item.idUser,
      idAccount: item.idAccount,
    };
    this.props.updateCustomer(data);
    this.setState({
      visible: false
    });
  };

  render() {

    return (
      <div>
        <Row gutter={12}>
          <Col span={6}  className={"delete-col"}>
            <Tooltip title={"Editar cliente"}>
              <Icon className={"icon-button delete-icon"} onClick={() => this.setState({visible: true})}
                type={"edit"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>
          
          <Col span={6}  className={"delete-col"}>
            <Tooltip title={"Activar/Desactivar cliente"}>
              <Icon className={"icon-button delete-icon"} onClick={() => this.inputServiceTime(this.props.item)}
                type={"poweroff"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>
          <Col span={6}  className={"delete-col"}>
            <Tooltip title={"Activar/Desactivar usuario"}>
              <Icon className={(this.props.item.userState === 1)?"icon-button delete-icon color-red":"color-green icon-button delete-icon"} onClick={() => this.changeStateUser(this.props.item)}
                type={(this.props.item.userState === 1)?"close-circle":"check-circle"} style={{ fontSize: '16px'}}/>
            </Tooltip>
          </Col>           
        </Row>
        <Modal
            title={"Editar cliente"}
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
                Nombres:
                <br/>
                <Input defaultValue={this.props.item.name} placeholder={"Nombres"} onChange={(e) => this.inputServiceName(e, 'name')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Apellidos:
                <br/>
                <Input defaultValue={this.props.item.lastName} placeholder={"Apellidos"} onChange={(e) => this.inputServiceName(e, 'lastName')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                No. Identificación:
                <br/>
                <InputNumber disabled={parseInt(localStorage.role_id, 10) === 2} className={"company-edit-nit"} defaultValue={this.props.item.identificationId} onChange={(e) => this.inputService(e, 'identificationId')} placeholder={"No. Identificación"}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Correo electrónico:
                <br/>
                <Input defaultValue={this.props.item.email} placeholder={"Correo electrónico"} onChange={(e) => this.inputServiceName(e, 'email')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Profesión:
                <br/>
                <Input defaultValue={this.props.item.profession} placeholder={"Profesión"} onChange={(e) => this.inputServiceName(e, 'profession')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Teléfono celular:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.phoneNumber} placeholder={"Número celular"} onChange={(e) => this.inputService(e, 'phoneNumber')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Máxima cantidad a prestar:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.maximumAmount} placeholder={"Máximo préstamo"} onChange={(e) => this.inputService(e, 'maximumAmount')}/>
              </Col>
              <Col xxl={12} lg={8} md={12} sm={12} xs={12}>
                Cantidad de cuotas máxima:
                <br/>
                <InputNumber className={"company-edit-nit"} defaultValue={this.props.item.montlyFee} placeholder={"Cantidad de cuotas"} onChange={(e) => this.inputService(e, 'montlyFee')}/>
              </Col>
              
            </Row>
        </Modal>
        {/*<Modal
          title={"Activar/ cliente"}
          visible={this.state.delete}
          okText={"Aceptar"}
          cancelText={"Cancelar"}
          width={500}
          onOk={() => this.deleteUser(this.props.item)}
          onCancel={() => this.setState({delete: false})}>
          <p>
            ¿Está seguro de eliminar el cliente? Este proceso será irreversible.
          </p>
        </Modal>*/}
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
    activateCustomer: (clientId, status) => dispatch(activateCustomer(clientId, status)),
    updateCustomer: (data) => dispatch(updateCustomer(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);