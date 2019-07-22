//Libraries
import React, { Component } from 'react';
import {Divider, Layout} from "antd";
import {withRouter} from 'react-router-dom';

//Components
import MainMenu from "../components/general/MainMenu";
import Login from "../components/authentication/index";
import Information from "../components/general/Information";

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
    console.log(this.props);
    if(!signedIn){
      return( <Login pathname={this.props.location.pathname}/> );
    }else{
      return(
          <div>
            
            <MainMenu viewPortWidth={this.state.viewportWidth}/>
            <Information/>
            <Layout className={'back-home'}>
              <Router/>
            </Layout>
            <Layout >
              <Footer className={'back-home2'}>
                <br/>
                <Divider className={"layout-divider"}/>
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
