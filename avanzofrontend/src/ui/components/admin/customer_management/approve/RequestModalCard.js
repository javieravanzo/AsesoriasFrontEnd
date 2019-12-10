//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Button, Modal, Select, Input} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
//import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

//Actions
import {approveCustomers} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';

//Constants
//const Step = Steps.Step;

class RequestModalCard extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visible: null,
      approve_modal: null,
      card_style_requested: "requested",
      card_style_analysis: "analysis",
      card_style_approved: "approved",
      card_style_rejected: "rejected",
      reject_modal: null,
    };
   
  };

  defineBadgeName = (id) => {
    if(id === 1){
      return "Solicitada";
    }else if(id === 2){
      return "Evaluada";
    }else if(id === 4){
      return "Aprobada RR.HH.";
    }else if(id === 3){
      return "Aprobada Admon.";
    }else if(id === 5){
      return "Desembolsada";
    }else if(id=== 6){
      return "Rechazada"
    }else if(id=== 7){
      return "Finalizada"
    }else if(id=== 8){
      return "Devolución bancaria"
    }
  };

  defineButtonClass = (id) => {
    if(id === 1){
      return "#c1c1c1";
    }else if(id === 2){
      return "yellow";
    }else if(id === 3){
      return "#ffa962";
    }else if(id === 4){
      return "#62ffb5";
    }else if(id === 5){
      return "#6cff55";
    }else{
      return "white";
    }
  };

  onConfirmRequest = () => {
    this.props.approveCustomers(this.props.item.idClient, true);
    this.setState({approve_modal: false});
  };

  onRejectRequest = () => {
    this.props.approveCustomers(this.props.item.idClient, false);
    this.setState({reject_modal: false});
  };

  render(){

    let item = this.props.item;
    //let {approve_modal} = this.state;

    return (
          <div key={item.key} className={"request-state-item-requested"}>
            <Row>
              <Col xs={24} sm={12} md={2} lg={2}>
                  <Tooltip title="Detallar solicitud">
                    <Icon type={"plus-circle"} className={"request-item-icon"} onClick={() => this.setState({visible: !this.state.visible})}/> 
                  </Tooltip>
                </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col">
                <b>Nombres</b> <br/> {item.name} 
              </Col>
              <Col xs={12} sm={12} md={8} lg={5} className="request-item-initial-col" >
                <b>Apellidos</b> <br/>  {item.lastName}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                <b>Empresa</b><br/> {item.socialReason}
              </Col>
              <Col xs={12} sm={12} md={7} lg={5}  className="request-item-initial-col">
                  <b>Número Documento</b> <br/> {item.identificationId}
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Aprobar usuario">
                  <Icon type={"check-circle"} className={"request-item-icon-approve"} onClick={() => this.setState({approve_modal: true})}/> 
                </Tooltip>
              </Col>
              <Col xs={24} sm={12} md={2} lg={1}>
                <Tooltip title="Rechazar usuario">
                  <Icon type={"close-circle"} className={"request-item-icon-reject"} onClick={() => this.setState({reject_modal: true})}/> 
                </Tooltip>
              </Col> 
            </Row>
          
          {
            this.state.visible && 
            <div>
              
              <Row style={{marginTop: "15px", marginBottom: "15px"}}>
                <Col xs={24} sm={12} md={8} lg={6} >
                  <b>Información adicional</b>
                </Col>  
              </Row>
              <Row>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Nombres</b><br/>
                  {item.name} 
                </Col>
                <Col xs={12} sm={12} md={8} lg={4} >
                  <b>Apellidos</b><br/>
                  {item.lastName}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4}>
                  <b>Empresa</b><br/>
                  {item.socialReason}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                  <b>Cargo</b><br/>
                  {item.profession === null ? "-" : item.profession}
                </Col>
                <Col xs={12} sm={12} md={7} lg={6}>
                  <b>Dirección</b><br/>
                  {item.address}
                </Col>
              </Row>
              <br/>
              <Row>
                <Col xs={12} sm={12} md={8} lg={5} >
                  <b>Monto</b><br/>
                  <Input className={"amount-inputs"} defaultValue={item.defaultAmount} placeholder="Monto máximo"/>
                </Col>
                <Col xs={12} sm={12} md={8} lg={6}>
                  <b>Ciclo de pagos</b><br/>
                  <Select className={"payments-select"} placeholder="Selecciona el ciclo de pagos" allowClear={true} showSearch={true}>    
                    <Select.Option key={1} value={1}>
                      {"Ciclo de pagos 1"}
                    </Select.Option>
                    <Select.Option key={2} value={2}>
                      {"Ciclo de pagos 2"}
                    </Select.Option>
                  </Select>
                </Col>
                
                <Col xs={12} sm={12} md={8} lg={4} >
                    <b>Cuotas</b><br/>
                    {item.maximumSplit}
                </Col>
                <Col xs={12} sm={12} md={7} lg={4}>
                    <b>Cuenta</b><br/>
                    {item.accountBank === null ? "-" : item.accountBank}
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}>
                    <b>Número de cuenta</b><br/>
                    {item.accountNumber === null ? "-" : item.accountNumber}
                </Col>
              </Row>
              <Row style={{marginTop: "5px", marginBottom: "15px"}} gutter={4}>
                <Col xs={24} sm={12} md={18} lg={16} className={"document-col"}>
                  <Button className={"request-document-button"} icon="file" >
                        Ver documento
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={4}>
                  <Button className={"request-confirm-button"} icon="check-circle" 
                          onClick={() => this.setState({approve_modal: true})}>
                        Aprobar
                  </Button> 
                </Col>
                <Col xs={24} sm={12} md={6} lg={4}>
                  <Button className={"request-reject-button"} icon="close-circle" 
                          onClick={() => this.setState({reject_modal: true})}>
                        Rechazar
                  </Button> 
                </Col>
                
              </Row>
            </div>
          }
          <Modal 
            title="Aprobar usuario"
            visible={this.state.approve_modal}
            okText={"Aprobar"}
            cancelText={"Cancelar"}
            width={450}
            onOk={() => this.onConfirmRequest()}
            onCancel={() => this.setState({approve_modal: false})}>
              <div>
                ¿Está seguro de realizar la aprobación del cliente? Esta acción será irreversible.                  
              </div>
          </Modal>
          <Modal 
            title="Rechazar usuario"
            visible={this.state.reject_modal}
            okText={"Rechazar"}
            cancelText={"Cancelar"}
            width={450}
            onOk={() => this.onRejectRequest()}
            onCancel={() => this.setState({approve_modal: false})}>
              <div>
                ¿Está seguro de realizar el rechazo del cliente?. El usuario será envíado a un estado de rechazado o pendiente de evaluación particular.               
              </div>
          </Modal>
        </div>
    );
  };

}

RequestModalCard.propTypes = {
  customerList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveCustomers: (client, approve) => dispatch(approveCustomers(client, approve)), 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestModalCard);
