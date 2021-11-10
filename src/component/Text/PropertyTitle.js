import React from 'react';
import {
    Col,

    Form,
    Input,
    Typography,
} from "antd";


export default function PropertyTitle(props){
    return (
        <Col span={4}   style={{textAlign: 'center'}} >
            <Typography.Title level={5} style={{margin:10, fontSize:"revert"}} >{props.text} </Typography.Title>
        </Col>
    );
}
