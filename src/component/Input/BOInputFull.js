import React from 'react';
import {
    Col,

    Form,
    Input,
    Typography,
} from "antd";
import PropertyTitle from "../Text/PropertyTitle";


export default function BOInputFull(props){
    return (
        <>
            <Col span={12}   style={{textAlign: 'center'}} >
                <Typography.Title level={5} style={{margin:10}} size = "small">{props.name} </Typography.Title>
            </Col>

            <Col span={12} align={"left"}>
                <Form.Item style = {{ margin: 5, padding: 0}}>
                    <Input size = "small"/>
                </Form.Item>
            </Col>

        </>
    );
}
