import React from 'react';
import {
    Form,
    Typography,
    Dropdown, Menu, message, Col,
} from "antd";
import {UserOutlined, DownOutlined} from "@ant-design/icons";
import PropertyTitle from "../Text/PropertyTitle";

export default function BODropdownHalf(props){

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
            <PropertyTitle text = {props.name}/>
            <Col span={8} style={ColFormStyle} align={"left"} >
                <Form.Item style = {{ margin: 0, padding: 0}}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => handleMenuClick(e)}>
                            hello world  <DownOutlined />
                        </a>
                    </Dropdown>
                    {/*<Dropdown.Button onClick={handleButtonClick} overlay={menu} size ="small" >*/}
                    {/*    hello world*/}
                    {/*</Dropdown.Button>*/}
                    {/*<Dropdown overlay={menu}>*/}
                    {/*    <div>*/}
                    {/*        hello world*/}
                    {/*    </div>*/}
                    {/*</Dropdown>*/}
                </Form.Item>
            </Col>

        </>
    );
}
