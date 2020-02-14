//Libraries
import React, { Component } from 'react';
import {Row, List, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";

//Actions
import {getAllRequestToOutLay} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

class MakeOutlayProcess extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
    };

    this.props.getAllRequestToOutLay(localStorage.user_id);

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

    let tableData = this.props.requestOutLayResponse;

    if(tableData === null){
      return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                Cargando ...
                <br/>
                <br/>
                <Spin size="large" />
              </div>);
    }else{
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
                locale={{emptyText: "No hay solicitudes para desembolsar"}}
              />
          </Row>
        </div>
      );
    }
  };
  
}

MakeOutlayProcess.propTypes = {
  requestOutLayResponse: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    requestOutLayResponse: state.admin.requestOutLayResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequestToOutLay: (user_id) => dispatch(getAllRequestToOutLay(user_id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeOutlayProcess);

