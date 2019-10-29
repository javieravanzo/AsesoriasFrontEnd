//Libraries
import React, { Component } from 'react';
import {Row, List} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";

//Actions
import {getAllRequestToApprove} from "../../../../../store/redux/actions/admin/adminActions";

//Styles
import '../../../../styles/admin/request_management/request-state.css';
import { SUCCESS_MODAL } from '../../../subcomponents/modalMessages';

class ApproveRequest extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
    };

    this.props.getAllRequestToApprove();

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

    let tableData = this.props.requestResponse;
    
    if(tableData){
      return null;
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
              />
          </Row>
        </div>
      );
    }
  }; 
}

ApproveRequest.propTypes = {
  requestResponse: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestResponse: state.admin.requestResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequestToApprove: () => dispatch(getAllRequestToApprove()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveRequest);
