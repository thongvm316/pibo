import React  from 'react';
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Typography
} from "antd";
import { SearchOutlined} from "@ant-design/icons";
import PropertyTitle from "../Text/PropertyTitle";


export default function SearchNInput(props){
    return (
        <>
            <PropertyTitle text = {props.name}/>
            <Col span={8} >
                <Row style = {{ margin: 0, padding: 0}}>
                    <Col span={12}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>
                            <Input size = "small" disabled/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>
                            <Button size = "small" icon = {<SearchOutlined/>} block
                            > {props.name} 검색
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>

        </>
    );
}
