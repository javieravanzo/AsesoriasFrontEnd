//Libraries
import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Layout} from "antd";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Components - Admin
import AdminCompanyManagement from "../admin/company_management/index";
import AdminCustomerManagement from "../admin/customer_management/index";
import AdminRequestManagement from "../admin/request_management/index";
import AdminGenerateReports from "../admin/generate_reports/index";
import Prueba from "../admin/prueba/index";

//Components - Company
import Company from "../company/request_management/index";
import CompanyGenerateReports from "../company/generate_reports/index";

//Components - Customer
import Customer from "../customer/index";
import Customer_Transactions from "../customer/Transactions";
import Customer_RequestForm from "../customer/RequestForm";
import Customer_ListRequest from "../customer/RequestState";
import EditCustomerForm from "../customer/EditCustomer"
//Subcomponents
import routes from "../../../configuration/routing/Routes";    

class Router extends Component {
  
  render() {

    return (
      <Layout.Content className={"content"}>
          <Switch>
            <Route path={routes.admin_company_management} component={AdminCompanyManagement}/>
            <Route path={routes.admin_customer_management} component={AdminCustomerManagement}/>
            <Route path={routes.admin_request_management} component={AdminRequestManagement}/>
            <Route path={routes.admin_generate_reports} component={AdminGenerateReports}/>
            <Route path={routes.admin_prueba} component={Prueba}/>

            <Route path={routes.company_request_management} component={Company}/>
            <Route path={routes.company_generate_reports} component={CompanyGenerateReports}/>
            <Route path={routes.customer} component={Customer}/>
            <Route path={routes.customer_transactions} component={Customer_Transactions}/>
            <Route path={routes.customer_form_request} component={Customer_RequestForm}/>
            <Route path={routes.customer_review_requests} component={Customer_ListRequest}/>
            <Route path={routes.customer_form_edit} component={EditCustomerForm}/>
            { 
              parseInt(localStorage.role, 10) === 0 &&
              <Route render = {()=><Redirect to={routes.customer}/>}/>
            }
            { 
              parseInt(localStorage.role, 10) === 1 &&
              <Route render = {()=><Redirect to={routes.company_generate_reports}/>}/>
            }
            { 
              parseInt(localStorage.role, 10) === 2 &&
              <Route render = {()=><Redirect to={routes.admin_company_management}/>}/>
            }
        </Switch>
      </Layout.Content>  
    );
  };
}

export default withRouter(Router);