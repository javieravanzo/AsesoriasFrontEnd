//Libraries
import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Layout} from "antd";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Components
/*import Home from "../home/index";
import Upload from "../upload/index";
import Album from "../album/index";
import Profile from "../users/index";
import Gallery from "../gallery/index";*/

//Subcomponents
import routes from "../../../configuration/routing/Routes";

//Styles
//import '../../../../styles/general/layout/router.css';

/* <Switch>
            <Route path={routes.home} component={Home}/>
            <Route path={routes.upload} component={Upload}/>
            <Route path={routes.album} component={Album}/>
            <Route path={routes.gallery} component={Gallery}/>
            <Route path={routes.profile} component={Profile}/>
            <Route render = {()=><Redirect to={routes.home}/>}/>
          </Switch>
 */         

class Router extends Component {
  
  render() {

    return (
        <Layout.Content className={"content"}>
            Hola
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