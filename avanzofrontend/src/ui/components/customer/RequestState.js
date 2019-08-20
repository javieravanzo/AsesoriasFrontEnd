//Libraries
import React, { Component } from 'react';
import { Col, Row, List, Divider} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";
import MiniLoading from '../subcomponents/MiniLoading';

//Actions
import {getAllRequest} from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/request-state.css';
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';

class RequestState extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
    };

    this.props.getAllRequest(parseInt(localStorage.user_id, 10));

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

  render(){

    let tableData = this.props.requestList;
    /*let tableData = [
      {
        key: 1,
        requestState: "En aprobación",
        requestStateId: 3,
        quantity: 150000,
        date: "20-06-19",
        date2: "21-06-19",
        fee: 5,
        accountName: "DaviPlata",
        accountType: "Ahorros",
        accountNumber: 1827381732
      },
      {
        key: 2,
        requestState: "En evaluación",
        requestStateId: 2,
        quantity: 250000,
        date: "21-06-19",
        date2: "22-06-19",
        fee: 2,
        accountName: "Nequi",
        accountType: "Corriente",
        accountNumber: 23472621
      },
      {
        key: 3,
        requestState: "En aprobación",
        requestStateId: 3,
        quantity: 8500,
        date: "23-06-19",
        date2: "24-06-19",
        fee: 4,
        accountName: "DaviPlata",
        accountType: "Corriente",
        accountNumber: 838400023
      },
      {
        key: 4,
        requestState: "Desembolsada",
        requestStateId: 5,
        quantity: 120000,
        date: "25-06-19",
        date2: "26-06-19",
        fee: 8,
        accountName: "Rappi",
        accountType: "Ahorros",
        accountNumber: 83489340001
      },
      {
        key: 5,
        requestState: "Rechazada",
        requestStateId: 4,
        quantity: 275000,
        date: "26-06-19",
        date2: "27-06-19",
        fee: 4,
        accountName: "Nequi",
        accountType: "Ahorros",
        accountNumber: 9349823,
      },
      {
        key: 6,
        requestState: "Solicitada",
        requestStateId: 1,
        quantity: 4870,
        date: "27-06-19",
        date2: "28-06-19",
        fee: 1,
        accountName: "DaviPlata",
        accountType: "Corriente",
        accountNumber: 72383812
      }     
    ];*/
  console.log(tableData);
  if(JSON.stringify(tableData) === '{}'){
    return (
      <MiniLoading visible={true}/> 
    );
  }else{
    return (
      <div className={"request-state-div"}>
        <Row>
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
            <h2 className={'request-terms-title'}>Revisar solicitudes</h2>
          </Col>
        </Row>
        <Divider className={"form-request-divider"}/>
        <Row>
          <List
              dataSource={tableData}
              renderItem={(item, k) => (
                <List.Item className={"request-state-list-item"}>
                    <RequestModal item={item} key={k}/>
                </List.Item>
              )}
            />
        </Row>
      </div>
    );
  }
  };
  
}

RequestState.propTypes = {
  requestList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestList: state.customer.requestList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequest: (customerId) => dispatch(getAllRequest(customerId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestState);
