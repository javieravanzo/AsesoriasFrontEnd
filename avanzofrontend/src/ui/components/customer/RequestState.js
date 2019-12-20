//Libraries
import React, { Component } from 'react';
import { Col, Row, List, Divider, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";
//import MiniLoading from '../subcomponents/MiniLoading';

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

  let tableData = this.props.requestList.request;


  if(JSON.stringify(tableData) === '{}'){
    return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
              Cargando ...
              <br/>
              <br/>
              <Spin size="large" />
            </div>);
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
              locale={{ emptyText: 'No hay solicitudes pendientes' }}
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
