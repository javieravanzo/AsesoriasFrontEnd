//Libraries
import React, {Component} from 'react';
import {Row, List} from 'antd';

//Components
import RequestModalCard from "./RequestModalCard";

class ApproveCustomer extends Component{

    render(){

        let tableData = [
            {
              key: 1,
              
              name: "Diego Alejandro",
              lastName: "Esparta",
              documentNumber: "108213771",
              documentType: "Cédula"
            },
            {
              key: 3,
              documentNumber: "1967643771",
              name: "Duvan ",
              lastName: "Zapata",
              documentType: "Cédula"
            },
            {
              key: 5,
              name: "Anibal Andrés",
              lastName: "Torrado",
              documentNumber: "12177211",
              documentType: "Cédula"
              
            },
            {
              key: 6,
              name: "Diego Alejandro",
              lastName: "Esparta",
              documentNumber: "108213771",
              documentType: "Cédula"              
            }     
          ];

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

export default ApproveCustomer;