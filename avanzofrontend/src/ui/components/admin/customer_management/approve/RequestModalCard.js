//Libraries
import React, {Component} from 'react';
import {Col, Row, Tooltip, Icon, Button, Modal, Select, InputNumber, Form} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import { allowEmergingWindows, WARNING_MODAL, ERROR_MODAL} from '../../../subcomponents/modalMessages';
import BaseURL from '../../../../../services/BaseURL';

//Actions
import {approveCustomers, getDateListToCustomer} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';



//Constants
//const Step = Steps.Step;
const FormItem = Form.Item;

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
      cycle: null,
    };

    
    this.props.getDateListToCustomer(this.props.item.idCompany);

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

  seeDocument = (file1, file2, file3) => {

    //console.log("File1", file1, "File2", file2, "File3", file3);

    if (file1 !== null && file3 !== null) {
      let newWindow = window.open(BaseURL +"/"+ file1, "_blank");
      let newWindow2 = window.open(BaseURL +"/"+ file3, "_blank");
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined' || 
          !newWindow2 || newWindow2.closed || typeof newWindow2.closed === 'undefined') {
        allowEmergingWindows();
      }
    } else {
      WARNING_MODAL('Advertencia', 'Alguno de los documentos no está disponible');
    }

  };

  onConfirmRequest = () => {
    //console.log("SC", this.state.cycle);
    if(this.state.cycle === null || this.state.cycle === undefined){
      WARNING_MODAL("Advertencia", "Por favor escoja un ciclo de pagos para el usuario");
      this.setState({approve_modal: false});
    }else{
      this.props.approveCustomers(this.props.item.idNewClient, true, this.state.cycle);
      this.setState({approve_modal: false});
    }
  };

  onRejectRequest = () => {
    this.props.approveCustomers(this.props.item.idNewClient, false, -1);
    this.setState({reject_modal: false});
  };

  validationInputNumbers = (e) => {
    const input = e.toString();
    e = input.replace(/[^0-9]/g, '');
  };

  changeCycle = (e) => {
    //console.log("E", e);
    this.setState({
      cycle: e
    });
  };


  render(){
 
    let item = this.props.item;
    let cycles = this.props.customerDateList !== null ? this.props.customerDateList : [];
    
    //console.log("item", this.props.item);

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
                  <b>No. Celular</b><br/>
                  {item.phoneNumber}
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
                  <InputNumber onChange={(e) => this.validationInputNumbers(e)} min={80000} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} className={"amount-inputs"} defaultValue={item.defaultAmount} placeholder="Monto máximo"/>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8}>
                  <b>Ciclo de pagos</b><br/>
                      <Select className={"payments-select"} placeholder="Selecciona el ciclo de pagos" onChange={this.changeCycle} allowClear={true} showSearch={true}>    
                        {
                        cycles.map((type, i) => (
                          <Select.Option key={i} value={type.idCompanySalaries}>
                            {type.companyRateName + " - " + type.companyPaymentDates}
                          </Select.Option>))
                        }
                      </Select>
                </Col>
                
                <Col xs={12} sm={12} md={8} lg={4} >
                    <b>Cuotas</b><br/>
                    {item.montlyFee}
                </Col>
                <Col xs={12} sm={12} md={7} lg={7}>
                    <b>Correo Electrónico</b><br/>
                    {item.email}
                </Col>
              </Row>
              <Row style={{marginTop: "5px", marginBottom: "15px"}} gutter={4}>
                <Col xs={24} sm={12} md={18} lg={16} className={"document-col"}>
                  <Button className={"request-document-button"} icon="file" onClick={() => this.seeDocument(item.file1, item.file2, item.file3)} >
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
            onCancel={() => this.setState({reject_modal: false})}>
              <div>
                ¿Está seguro de realizar el rechazo del cliente? El usuario será envíado a un estado de rechazado o pendiente de evaluación particular.     
                <br/><br/>
                  <p className={"form-names"}>Razón:</p>
                    <Select placeholder="Selecciona" allowClear={true} showSearch={true}
                      notFoundContent={"No hay razones disponibles"} className={"full-width"}>
                      {this.props.reasons.map((type, i) => (
                        <Select.Option key={type.rere_id} value={type.rere_id}>
                          {type.rere_description}
                        </Select.Option>))
                      }
                    </Select>      
              </div>
          </Modal>
        </div>
    );
  };

}

RequestModalCard.propTypes = {
  customerList: PropTypes.array,
  customerDateList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
    customerDateList: state.admin.customerDateList,
  }
};

const mapDispatchToProps = (dispatch) => {
  
  return {
    approveCustomers: (client, approve, cycleId) => dispatch(approveCustomers(client, approve, cycleId)), 
    getDateListToCustomer: (companyId) => dispatch(getDateListToCustomer(companyId)),    
  }
  
  
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestModalCard);
