//Libraries
import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Layout} from "antd";

//Components - Admin
import AdminCompanyManagement from "../admin/company_management/index";
import AdminCustomerManagement from "../admin/customer_management/index";
import AdminRequestManagement from "../admin/request_management/index";
import AdminGenerateReports from "../admin/generate_reports/index";

//Components - Company
import Company from "../company/request_management/index";
import CompanyGenerateReports from "../company/generate_reports/index";

//Components - Customer
import Customer from "../customer/index";
import Customer_Transactions from "../customer/Transactions";
import Customer_RequestForm from "../customer/RequestForm";
import Customer_ListRequest from "../customer/RequestState";

//Subcomponents
import routes from "../../../configuration/routing/Routes";    

class Router extends Component {
  
  render() {

    return (
      <Layout.Content className={"content"}>
        { 
          (parseInt(localStorage.role_id, 10) === 2 || parseInt(localStorage.role_id, 10) === 1) &&
          <Switch>
            <Route path={routes.admin_company_management} component={AdminCompanyManagement}/>
            <Route path={routes.admin_customer_management} component={AdminCustomerManagement}/>
            <Route path={routes.admin_request_management} component={AdminRequestManagement}/>
            <Route path={routes.admin_generate_reports} component={AdminGenerateReports}/>
            <Route render = {()=><Redirect to={routes.admin_company_management}/>}/>
          </Switch>
        }
        { 
          parseInt(localStorage.role_id, 10) === 3 &&
          <Switch>
            <Route path={routes.company_request_management} component={Company}/>
            <Route path={routes.company_generate_reports} component={CompanyGenerateReports}/>
            <Route render = {()=><Redirect to={routes.company_request_management}/>}/>
          </Switch>
        }
        { 
          parseInt(localStorage.role_id, 10) === 4 &&
          <Switch>
            <Route path={routes.customer} component={Customer}/>
            <Route path={routes.customer_transactions} component={Customer_Transactions}/>
            <Route path={routes.customer_form_request} component={Customer_RequestForm}/>
            <Route path={routes.customer_review_requests} component={Customer_ListRequest}/>
            <Route render = {()=><Redirect to={routes.customer}/>}/>
          </Switch>
        }
        </Layout.Content>  
    );
  };
}

export default withRouter(Router);