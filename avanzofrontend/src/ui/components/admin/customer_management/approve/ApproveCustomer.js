//Libraries
import React, {Component} from 'react';
import {Row, List, Spin, Col, Input} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import RequestModalCard from "./RequestModalCard";

//Actions
import {getAllCustomersToApprove} from "../../../../../store/redux/actions/admin/adminActions";

class ApproveCustomer extends Component{

  constructor(props){
    
    super(props);

    this.state = {
      name: null,
      lastName: null,
      socialReason: null,
      identificationId: null,
      email: null,
    };

    this.props.getAllCustomersToApprove();
    this.setData = this.setData.bind(this);
    this.filterData = this.filterData.bind(this);
  
  };

  setData(linkList){
    
    let rows = [];
    if(linkList){
      for (let i = 0; i < linkList.length; i++) {
      
        let item = linkList[i];
        let row = {
          key: i,
          createdDate: item.createdDate,
          email: item.email,
          fixedNumber: item.fixedNumber,
          idAccount: item.idAccount,
          idNewClient: item.idNewClient,
          idUser: item.idUser,
          identificationId: item.identificationId,
          lastName: item.lastName,
          defaultAmount: item.defaultAmount,
          maximumAmount: item.maximumAmount,
          montlyFee: item.montlyFee,
          phoneNumber: item.phoneNumber,
          name: item.name,
          platformState: item.platformState,
          profession: item.profession,
          socialReason: item.socialReason,
          totalRemainder: item.totalRemainder,

        };

        if(this.filterData(row)) {
          rows.push(row);
        };
      }
    }
    
    return rows;
  };

  filterData(toCompare){
    let {name, identificationId, lastName, socialReason, email} = this.state;

    if(name === null && identificationId === null && lastName === null && socialReason === null && email === null){
      return true;
    }

    if(name !== null && !toCompare.name.toString().toUpperCase().includes(name.toUpperCase())) {
      return false;
    }

    if(identificationId !== null && !toCompare.identificationId.toString().toUpperCase().includes(identificationId.toUpperCase())) {
      return false;
    }
    
    if(lastName !== null && !toCompare.lastName.toString().toUpperCase().includes(lastName.toUpperCase())) {
      return false;
    }
    
    if(socialReason !== null && !toCompare.socialReason.toString().toUpperCase().includes(socialReason.toUpperCase())) {
      return false;
    }

    if(email !== null && !toCompare.email.toString().toUpperCase().includes(email.toUpperCase())) {
      return false;
    }   

    return true;
  };

  render(){
    
    let {name, identificationId, lastName, socialReason, email} = this.state;
    let tableData = this.setData(this.props.customerListToApprove);

    if(tableData === null || JSON.stringify(tableData) === '[]'){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                Cargando ...
                <br/>
                <br/>
                <Spin size="large" />
              </div>);
    }else{
      return(
        <div>
          <Row gutter={8} className={"approve-request-filter"}>
            <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
              <p className="field-title-visible">Nombres </p>
              <Input placeholder={"Nombres"} value={name} onChange={(e) => this.setState({name: e.target.value})}/>
            </Col>
            <Col className="filter"  xs={12} sm={12} md={8} lg={4}>
              <p className="field-title-visible">Apellidos</p>
              <Input placeholder={"Apellidos"} value={lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
              <p className="field-title-visible">No. Identificación</p>
              <Input placeholder={"No. Identificación"} value={identificationId} onChange={(e) => this.setState({identificationId: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={5}>
              <p className="field-title-visible">Empresa</p>
              <Input placeholder={"Empresa"} value={socialReason} onChange={(e) => this.setState({socialReason: e.target.value})}/>
            </Col>

            <Col className="filter"  xs={12} sm={12} md={8} lg={6}>
              <p className="field-title-visible">Email</p>
              <Input placeholder={"Email"} value={email} onChange={(e) => this.setState({email: e.target.value})}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <List
              dataSource={tableData}
              renderItem={(item, k) => (
                <List.Item className={"request-state-list-item"}>
                    <RequestModalCard item={item} key={k}/>
                </List.Item>
              )}
              locale={{emptyText: "No hay clientes para aprobar."}}
              />
          </Row>
        </div>
      );
    }
  }

}

ApproveCustomer.propTypes = {
  customerListToApprove: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerListToApprove: state.admin.customerListToApprove,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomersToApprove: ( ) => dispatch(getAllCustomersToApprove( )),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveCustomer);