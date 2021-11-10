import React from 'react';
import {
    Button,
    Col, DatePicker,
    Form,
    Row,
    Typography,
    Dropdown, Menu, message,
} from "antd";
import {UserOutlined} from "@ant-design/icons";
import PropertyText from "../Text/PropertyTitle";


export default function FromTo(props){

    const dateFormat = 'MM/DD/YY';

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
            </Menu.Item>7
        </Menu>
    );
    return (
        <>
            <PropertyText text = {props.name}/>
            <Col span={8}>
                <Row style = {{ margin: 0, padding: 0}}>
                    <Col span={6}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>
                            <DatePicker size ="small" format={dateFormat}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>
                            <DatePicker size ="small" format={dateFormat}/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>

                            <Dropdown.Button  size ="small" onClick={handleButtonClick} overlay={menu} block>
                                hello world
                            </Dropdown.Button>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style = {{ margin: 0, padding: 0}}>
                            <Button size ="small" block>초기화</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>

        </>
    );
}
