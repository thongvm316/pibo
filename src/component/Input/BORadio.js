import React from 'react';
import {
    Col,

    Form,
    Input,
    Typography,
    Radio,
} from "antd";
import PropertyTitle from "../Text/PropertyTitle";


export default function BORadio(props){
    const onChange = () => {

    }

    return (
        <>
            <PropertyTitle text = {props.name}/>
            <Col span={8} align={"left"}>
                <Form.Item style = {{ margin: 5, padding: 0}}>
                    <Radio.Group onChange={onChange} defaultValue={1}>
                        <Radio value={1}>전체</Radio>
                        <Radio value={2}>사용</Radio>
                        <Radio value={3}>사용 안함</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>

        </>
    );
}
