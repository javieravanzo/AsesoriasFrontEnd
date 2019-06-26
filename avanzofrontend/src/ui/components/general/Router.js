//Libraries
import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Layout} from "antd";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Components
import Admin from "../admin/index";
import Company from "../company/index";
import Customer from "../customer/index";

//Subcomponents
import routes from "../../../configuration/routing/Routes";

//Styles
//import '../../../../styles/general/layout/router.css';

/* 
 */         

class Router extends Component {
  
  render() {

    return (
        <Layout.Content className={"content"}>
            <Switch>
              <Route path={routes.admin} component={Admin}/>
              <Route path={routes.company} component={Company}/>
              <Route path={routes.customer} component={Customer}/>
              <Route render = {()=><Redirect to={routes.home}/>}/>
          </Switch>
        </Layout.Content>  
    );
  };
}

Router.propTypes = {
  role: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    role: state.login.role
  }
};

export default withRouter(connect(mapStateToProps, {})(Router));