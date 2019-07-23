//Libraries
import React, { Component } from 'react';
import {Row, List} from 'antd';

//Subcomponents
import RequestModal from "./RequestStateModal";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

class ApproveRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
    };

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
        key: 1,
        requestState: "En aprobación",
        requestStateId: 4,
        name: "Diego Alejandro",
        lastName: "Esparta",
        idNumber: "108213771",
        quantity: 150000,
        date: "20-06-19",
        date2: "21-06-19",
        fee: 5,
        accountName: "DaviPlata",
        accountType: "Ahorros",
        accountNumber: 1827381732
      },
      {
        key: 3,
        requestState: "En aprobación",
        requestStateId: 4,
        idNumber: "1967643771",
        name: "Duvan ",
        lastName: "Zapata",
        quantity: 8500,
        date: "23-06-19",
        date2: "24-06-19",
        fee: 4,
        accountName: "DaviPlata",
        accountType: "Corriente",
        accountNumber: 838400023
      },
      {
        key: 5,
        requestState: "En aprobación",
        requestStateId: 4,
        name: "Anibal Andrés",
        lastName: "Torrado",
        idNumber: "12177211",
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
        requestState: "En aprobación",
        requestStateId: 4,
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

export default ApproveRequest;
