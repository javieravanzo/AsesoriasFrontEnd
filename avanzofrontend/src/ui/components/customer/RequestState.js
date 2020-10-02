//Libraries
import React, { Component } from 'react';
import { Col, Row, List, Spin, Tabs, Icon} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Subcomponents
import RequestModal from "./RequestStateModal";
//import MiniLoading from '../subcomponents/MiniLoading';

//Actions
import {getAllRequest, getAllOutlayedRequest, 
        getAllRequestsWasRejected, getOutlayData} from "../../../store/redux/actions/customer/customerActions";

//Styles
import '../../styles/customer/request-state.css';
import { SUCCESS_MODAL } from '../subcomponents/modalMessages';

//Constants
const { TabPane } = Tabs;

class RequestState extends Component {

  constructor (props) {

    super(props);
    
    this.state = {
      visible: null,
    };

    this.props.getAllRequest(parseInt(localStorage.user_id, 10));
    this.props.getAllOutlayedRequest(parseInt(localStorage.user_id, 10));
    this.props.getAllRequestsWasRejected(parseInt(localStorage.user_id, 10));
    this.props.getOutlayData(parseInt(localStorage.user_id, 10), undefined);

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
  let tableOutlayedData = this.props.outlayedRequestList.request;
  let tableRejectData = this.props.rejectedRequestList.request;
  let company = this.props.rejectedRequestList.company;
  //console.log("TableData", tableData);

  if(JSON.stringify(tableData) === '{}' || JSON.stringify(tableData) === undefined ||
     JSON.stringify(tableOutlayedData) === '{}' || JSON.stringify(tableOutlayedData) === undefined){
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
        <Row >
          <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="unordered-list" />Solicitudes pendientes</span>} key="1">
              <List
                locale={{ emptyText: 'No hay solicitudes pendientes.' }}
                dataSource={tableData}
                renderItem={(item, k) => (
                  <List.Item className={"request-state-list-item"}>
                      <RequestModal item={item} key={k} company={company}/>
                  </List.Item>
                )}/>
            </TabPane>
            <TabPane tab={<span> <Icon type="plus-circle" />Solicitudes finalizadas</span>} key="2">
              <List
                  locale={{ emptyText: 'No hay solicitudes finalizadas.' }}
                  dataSource={tableOutlayedData}
                  renderItem={(item, k) => (
                    <List.Item className={"request-state-list-item"}>
                        <RequestModal item={item} key={k} company={company}/>
                    </List.Item>
                  )}/>
            </TabPane>
            <TabPane tab={<span> <Icon type="close-circle" />Solicitudes negadas</span>} key="3">
              <List
                  locale={{ emptyText: 'No hay solicitudes rechazadas.' }}
                  dataSource={tableRejectData}
                  renderItem={(item, k) => (
                    <List.Item className={"request-state-list-item"}>
                        <RequestModal item={item} key={k} company={company} outlayDataResponse={this.props.outlayDataResponse}/>
                    </List.Item>
                  )}/>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
          
      </div>
    );
  }
  };
  
}

RequestState.propTypes = {
  requestList: PropTypes.object,
  outlayedRequestList: PropTypes.object,
  rejectedRequestList: PropTypes.object,
  outlayDataResponse: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestList: state.customer.requestList,
    outlayedRequestList: state.customer.outlayedRequestList,
    rejectedRequestList: state.customer.rejectedRequestList,
    outlayDataResponse: state.customer.outlayDataResponse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequest: (customerId) => dispatch(getAllRequest(customerId)),
    getAllOutlayedRequest: (customerId) => dispatch(getAllOutlayedRequest(customerId)),
    getAllRequestsWasRejected: (customerId) => dispatch(getAllRequestsWasRejected(customerId)),
    getOutlayData: (customerId, token) => dispatch(getOutlayData(customerId, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestState);
