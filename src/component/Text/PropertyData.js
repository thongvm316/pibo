import React from 'react';
import {
    Col,

    Typography,
} from "antd";


export default function PropertyData(props){
    return (
        <>
            <Col span={props.span} textAlign={'left'}  style={{textAlign: 'left'}} >
                <Typography.Title level={5} style={{margin:10}}>{props.text} </Typography.Title>
            </Col>
        </>
    );
}
