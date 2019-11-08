//Libraries
import React, {Component} from 'react';
import {Row, List} from 'antd';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

//Components
import RequestModalCard from "./RequestModalCard";

//Actions
import {getAllCustomers} from "../../../../../store/redux/actions/admin/adminActions";

class ApproveCustomer extends Component{

  constructor(props){
    
    super(props);

    this.props.getAllCustomers();
  
  }

    render(){
        
        let tableData = this.props.customerList;

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
                        />
                </Row>
            </div>
        );
    };

}

ApproveCustomer.propTypes = {
  customerList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    customerList: state.admin.customerList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: ( ) => dispatch(getAllCustomers( )),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveCustomer);