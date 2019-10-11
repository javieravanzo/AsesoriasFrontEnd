//Libraries
import React, { Component } from 'react';
import { Row, List} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";
//import MiniLoading from '../../../subcomponents/MiniLoading';

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

    let tableData = [
      {
        key: 82,
        requestState: "En aprobación",
        idNumber: "108213771",
        name: "Juan Camilo",
        lastName: "Hernandez",
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
        key: 123,
        requestState: "En aprobación",
        requestStateId: 3,
        name: "Anibal Andrés",
        lastName: "Torrado",
        idNumber: "12177211",
        quantity: 8500,
        date: "23-06-19",
        date2: "24-06-19",
        fee: 4,
        accountName: "DaviPlata",
        accountType: "Corriente",
        accountNumber: 838400023
      },
      {
        key: 432,
        requestState: "En aprobación",
        idNumber: "1967643771",
        name: "Duvan ",
        lastName: "Zapata",
        requestStateId: 3,
        quantity: 275000,
        date: "26-06-19",
        date2: "27-06-19",
        fee: 4,
        accountName: "Nequi",
        accountType: "Ahorros",
        accountNumber: 9349823,
      },
      {
        key: 8,
        requestState: "En aprobación",
        requestStateId: 3,
        name: "Diego Alejandro",
        lastName: "Esparta",
        idNumber: "108213771",
        quantity: 4870,
        date: "27-06-19",
        date2: "28-06-19",
        fee: 1,
        accountName: "DaviPlata",
        accountType: "Corriente",
        accountNumber: 72383812
      }     
    ];
    
    return (
      <div className={"approve-request-state-div"}>
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
  
  };
  
}

ApproveRequest.propTypes = {
  requestList: PropTypes.array,
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

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRequest);

