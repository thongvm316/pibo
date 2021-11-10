import React from 'react';
import {
    Col,

    Form,
    Input,

} from "antd";
import PropertyTitle from "../Text/PropertyTitle";


export default function BOInput(props){
    return (
        <>
            <PropertyTitle text = {props.name}/>
            <Col span={8} align={"left"}>
                <Form.Item style = {{ margin: 0, padding: 0}}>
                    <Input size="small" defaultValue={props.value}/>
                </Form.Item>
            </Col>

        </>
    );
}
