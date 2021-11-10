import React from 'react';
import {
    Form,
    Typography,
    Dropdown, Menu, message, Col,
} from "antd";
import {UserOutlined} from "@ant-design/icons";

export default function BODropdownLine(props){

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    const ColFormStyle = {
        border:'none',
    };

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
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Col span={12}   style={{textAlign: 'center'}} size = "small">
                <Typography.Title  level={5}>{props.name}</Typography.Title>
            </Col>
            <Col span={12} style={ColFormStyle} align={"left"}>
                <Form.Item style = {{ margin: 5, padding: 0}}>
                    <Dropdown.Button onClick={handleButtonClick} overlay={menu} size = "small">
                        hello
                    </Dropdown.Button>
                </Form.Item>
            </Col>

        </>
    );
}
