//Libraries
import React, { Component } from 'react';
import {Divider, Layout} from "antd";
import {withRouter} from 'react-router-dom';

//Components
import MainMenu from "../components/general/MainMenu";
import Login from "../components/authentication/index";

//Subcomponents
import Router from "../components/general/Router";

//Styles
import '../styles/App.css';
import 'antd/dist/antd.css';

const { Footer } = Layout;

class App extends Component {

  constructor(props){
    
    super(props);
    
    this.state = {
      viewportWidth: 0
    };

    this.isSignedIn = this.isSignedIn.bind(this);

  };

  componentWillUpdate(){
    this.isSignedIn();
  }

  isSignedIn(){
    if (localStorage.isLogged !== undefined && localStorage.isLogged !== null &&
        localStorage.isLogged !== 'null' && localStorage.isLogged){
      return true;
    } else {
      localStorage.clear();
      return false;
    }
  };

  render(){

    let signedIn = this.isSignedIn();
    console.log(signedIn);
    if(!signedIn){
      return( <Login/> );
    }else{
      return(
          <div>
            <MainMenu viewPortWidth={this.state.viewportWidth}/> );
            <Layout className={'back-home'}>
              <Router/>
            </Layout>
            <Layout >
              <Footer className={'back-home2'}>
                <br/>
                <Divider className={"divider"}/>
                <div className={"footer-div"}>
                  Avanzo © 2019 
                </div>
              </Footer>
            </Layout>
          </div>)
    }
  };

}

export default withRouter(App);
