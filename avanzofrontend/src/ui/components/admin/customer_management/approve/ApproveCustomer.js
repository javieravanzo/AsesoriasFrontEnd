//Libraries
import React, {Component} from 'react';
import {Row, List, Spin} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import RequestModalCard from "./RequestModalCard";

//Actions
import {getAllCustomersToApprove} from "../../../../../store/redux/actions/admin/adminActions";

class ApproveCustomer extends Component{

  constructor(props){
    
    super(props);

    this.props.getAllCustomersToApprove();
  
  }

    render(){
        
      let tableData = this.props.customerListToApprove;

      if(tableData === null){
        return (<div style={{marginTop: '50px', color: "#1c77ff", fontSize:"20px", textAlign: "center"}}>
                  Cargando ...
                  <br/>
                  <br/>
                  <Spin size="large" />
                </div>);
      }else{
        return(
          <div>
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