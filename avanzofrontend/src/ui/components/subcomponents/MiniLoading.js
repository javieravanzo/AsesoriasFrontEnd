//Libraries
import React, {Component} from 'react';

//Stylesh
import "../../styles/subcomponents/loadings.css"

class MiniLoading extends Component {
  render() {
    return (
        <div className={"mini-loading"}>
          <div className={"spinner"}>
            <div className={"bounce1"}/>
            <div className={"bounce2"}/>
            <div className={"bounce3"}/>
          </div>
        </div>
    );
  }
}

export default MiniLoading;