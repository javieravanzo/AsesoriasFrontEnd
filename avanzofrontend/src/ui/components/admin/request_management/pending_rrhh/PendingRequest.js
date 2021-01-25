//Libraries
import React, { Component } from 'react';
import {Row, List, Spin, Col, Input, Modal, Button, Select} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestDetailModal";
import BaseURL from '../../../../../services/BaseURL';

//Actions
import {getCompanies} from "../../../../../store/redux/actions/general/loginActions";
import {getAllPendingRHRequest, generalPendingByRRHH, 
        particularPendingByRRHH} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL, WARNING_MODAL, allowEmergingWindows } from '../../../subcomponents/modalMessages';

//Functions
function seeDocument(file, BaseURL){

  let newFile = BaseURL + file;
  

  if (file !== null && file !== "") {
    let newWindow = window.open(newFile, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      allowEmergingWindows();
    }
  } else {
    WARNING_MODAL('Advertencia', 'El reporte no está disponible');
  }

  return true;

};

class PendingRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
      idRequest: null,
      idRequestState: null,
      createdAt: null,
      quantity: null,
      identificationId: null,
      requestStateName: null,
      particular_modal: null,
      general_modal: null,
      general_id: null,
      particular_id: null, 
      reportData: null,
      particularData: null,
    };

    this.props.getCompanies();
    this.props.getAllPendingRHRequest();
    this.setData = this.setData.bind(this);
    this.filterData = this.filterData.bind(this);

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.generateGeneralByRRHH !== null){
      return {
        reportData: seeDocument(nextProps.generateGeneralByRRHH.data, BaseURL),
        general_modal: null,
        general_id: null,
      };
    }else if(nextProps.generateParticularByRRHH !== null){
      return {
        particularData: seeDocument(nextProps.generateParticularByRRHH.data, BaseURL),
        particular_modal: null,
        particular_id: null,
      };
    }else{
      return {
        nextState: true,
      }
    }
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

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          idRequest: item.idRequest,
          idRequestState: item.idRequestState,
          createdAt: item.createdAt,
          quantity: item.quantity,
          accumulatedQuantity: item.accumulatedQuantity, 
          interestValue: item.interestValue,
          administrationValue: item.administrationValue,
          totalRemainder: item.totalRemainder,
          identificationId: item.identificationId,
          requestStateName: item.requestStateName,
          lastName: item.lastName,
          name: item.name,
          Company_idCompany: item.Company_idCompany,
          socialReason: item.socialReason,
          profession: item.profession,
          split: item.split,
          account: item.account,
          accountType: item.accountType,
          accountNumber: item.accountNumber,
          phoneNumber: item.phoneNumber,
          filePath: item.filePath,
          sendRRHHEmail: item.sendRRHHEmail,
        };

        if(this.filterData(row)) {
          rows.push(row);
        };
      }
    }
    
    return rows;
  };

  filterData(toCompare){
    let {idRequest, identificationId, requestStateName, quantity, createdAt} = this.state;

    if(idRequest === null && identificationId === null && quantity === null && requestStateName === null && createdAt === null){
      return true;
    }

    if(idRequest !== null && !toCompare.idRequest.toString().toUpperCase().includes(idRequest.toUpperCase())) {
      return false;
    }

    if(identificationId !== null && !toCompare.identificationId.toString().toUpperCase().includes(identificationId.toUpperCase())) {
      return false;
    }
    
    if(requestStateName !== null && !toCompare.requestStateName.toString().toUpperCase().includes(requestStateName.toUpperCase())) {
      return false;
    }
    
    if(quantity !== null && !toCompare.quantity.toString().toUpperCase().includes(quantity.toUpperCase())) {
      return false;
    }

    if(createdAt !== null && !toCompare.createdAt.toString().toUpperCase().includes(createdAt.toUpperCase())) {
      return false;
    }   

    return true;
  };

  changeCompanyId = (idCompany) => {

    this.setState({
      general_id: idCompany
    });
  };

  changeCompanyParticularId = (idCompany) => {

    this.setState({
      particular_id: idCompany
    });
  };

  generateGeneralReport = () => {
    this.props.generalPendingByRRHH(this.state.general_id);
  };

  generateParticularReport = () => {
    this.props.particularPendingByRRHH(this.state.particular_id)
  };


  render(){

    let {idRequest, identificationId, requestStateName, quantity, createdAt} = this.state;
    let tableData = this.setData(this.props.pendingRHRequest);
    let { registerInfo, pendingRHRequest } = this.props;
    
    if( pendingRHRequest === null || tableData === undefined || JSON.stringify(registerInfo) === '{}'){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                Cargando ...
                <br/>
                <br/>
                <Spin size="large" />
              </div>);
    }else{
      return (
        <div className={"approve-request-state-div"}>
          <Row gutter={2}>
            <Col xs={24} sm={24} md={8} lg={12}/>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Button icon="download" 
                      onClick={() => this.setState({particular_modal: true})}>
                      Descargar Pendientes - IGS 
              </Button> 
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Button className={"create-customer-button"} icon="file-excel" 
                      onClick={() => this.setState({general_modal: true})}>
                      Descargar Pendientes RR.HH.
              </Button> 
            </Col>
            <Modal 
              title="Descargar pendientes RR.HH."
              visible={this.state.general_modal}
              okText={"Descargar"}
              cancelText={"Cancelar"}
              width={450}
              onOk={() => this.generateGeneralReport()}
              onCancel={() => this.setState({general_modal: false})}>
                <div>
                  <div>
                    Por favor seleccione la empresa que tiene un formato diferente (IGS):
                    <br/>
                    <Select className={"select-report-rrhh"} onChange={(e) => this.changeCompanyId(e)} 
                            placeholder="Selecciona la empresa (IGS)" allowClear={true}
                            showSearch={true} notFoundContent={"No hay empresas disponibles"}>
                        {registerInfo.companyRow.map((type, i) => (
                          <Select.Option key={i} value={type.idCompany}>
                            {type.socialReason}
                          </Select.Option>))
                        }
                    </Select>
                  </div>
                  <br/>                           
                </div>
            </Modal>
            <Modal 
              title="Descargar pendientes RR.HH. en IGS"
              visible={this.state.particular_modal}
              okText={"Descargar"}
              cancelText={"Cancelar"}
              width={450}
              onOk={() => this.generateParticularReport()}
              onCancel={() => this.setState({particular_modal: false})}>
                <div>
                  <div>
                    Por favor seleccione la empresa (IGS):
                    <br/>
                    <Select className={"select-report-rrhh"} onChange={(e) => this.changeCompanyParticularId(e)} 
                            placeholder="Selecciona la empresa (IGS)" allowClear={true}
                            showSearch={true} notFoundContent={"No hay empresas disponibles"}>
                        {registerInfo.companyRow.map((type, i) => (
                          <Select.Option key={i} value={type.idCompany}>
                            {type.socialReason}
                          </Select.Option>))
                        }
                    </Select>
                  </div>
                  <br/>                           
                </div>
            </Modal>
            <br/>
          </Row>
          <br/>
          <Row gutter={8} className={"approve-request-filter"}>
            <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
              <p className="field-title-visible">Número solicitud </p>
              <Input placeholder={"Número solicitud"} value={idRequest} onChange={(e) => this.setState({idRequest: e.target.value})}/>
            </Col>
            <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
              <p className="field-title-visible">No. Cédula</p>
              <Input placeholder={"No. de cédula"} value={identificationId} onChange={(e) => this.setState({identificationId: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
              <p className="field-title-visible">Estado</p>
              <Input placeholder={"Estado"} value={requestStateName} onChange={(e) => this.setState({requestStateName: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
              <p className="field-title-visible">Cantidad</p>
              <Input placeholder={"Cantidad"} value={quantity} onChange={(e) => this.setState({quantity: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
              <p className="field-title-visible">Fecha Solicitud</p>
              <Input placeholder={"Fecha Solicitud"} value={createdAt} onChange={(e) => this.setState({createdAt: e.target.value})}/>
            </Col>
          </Row>
          <br/>
          <Row>
          <List dataSource={tableData}
                renderItem={(item, k) => (
                  <List.Item className={"request-state-list-item"}>
                      <RequestModal item={item} key={k}/>
                  </List.Item>
                )}
                locale={{emptyText: "No hay solicitudes para aprobar por el área de recursos humanos"}}/>
        </Row>
      </div>
      );
    }
  }; 
}

PendingRequest.propTypes = {
  pendingRHRequest: PropTypes.array,
  registerInfo: PropTypes.object,
  generateGeneralByRRHH: PropTypes.object,
  generateParticularByRRHH: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    pendingRHRequest: state.admin.pendingRHRequest,
    generateGeneralByRRHH: state.admin.generateGeneralByRRHH,
    registerInfo: state.login.registerInfo,
    generateParticularByRRHH: state.admin.generateParticularByRRHH
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPendingRHRequest: () => dispatch(getAllPendingRHRequest()),
    getCompanies: ( ) => dispatch(getCompanies( )),
    generalPendingByRRHH: (data) => dispatch(generalPendingByRRHH(data)),
    particularPendingByRRHH: (data) => dispatch(particularPendingByRRHH(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequest);
