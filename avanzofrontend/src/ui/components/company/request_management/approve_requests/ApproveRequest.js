//Libraries
import React, { Component } from 'react';
import {Row, List, Spin, Col, Input} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";

//Actions
import {getAllRequest} from "../../../../../store/redux/actions/company/companyActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

class ApproveRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
      idRequest: null,
      idRequestState: null,
      createdAt: null,
      quantity: null,
      identificationId: null,
      requestStateName: null
    };

    this.props.getAllRequest();
    this.setData = this.setData.bind(this);
    this.filterData = this.filterData.bind(this);

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
          identificationId: item.identificationId,
          requestStateName: item.requestStateName,
          lastName: item.lastName,
          name: item.name,
          Company_idCompany: item.Company_idCompany,
          profession: item.profession,
          split: item.split,
          account: item.account,
          accountType: item.accountType,
          accountNumber: item.accountNumber,
          phoneNumber: item.phoneNumber,
          filePath: item.filePath,
          socialReason: item.socialReason,
          totalRemainder: item.totalRemainder,
          totalValue: item.totalValue,
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

  render(){

    let {idRequest, identificationId, requestStateName, quantity, createdAt} = this.state;
    let tableData = this.setData(this.props.requestList.request);
    
    if(JSON.stringify(this.props.requestList) === '{}'){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                Cargando ...
                <br/>
                <br/>
                <Spin size="large" />
              </div>);
    }else{
      return (
        <div className={"approve-request-state-div"}>
          
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
                  locale={{emptyText: "No hay solicitudes para aprobar"}}/>
          </Row>
        </div>
      );
    }
  }; 
}

ApproveRequest.propTypes = {
  requestList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestList: state.company.requestList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequest: () => dispatch(getAllRequest()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRequest);
