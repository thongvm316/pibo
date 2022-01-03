import React, {useEffect, useState} from 'react';
import {Col, Layout, Menu, Space,Row} from 'antd';
import '../index-342fc69c.css';
import {
    GiftOutlined,
    MenuOutlined, ReadOutlined, ReconciliationOutlined, SearchOutlined,
    SyncOutlined, UserOutlined,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import BOContents from "./BOContents";
import axios from "axios";
const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;


export default function UBOMain(props){
    const [collapsed, setCollapsed] = useState(false);
    const [contents, setContents] = useState("");
    // const [menuTree, setMenuTree] =  useState([]);

    const menuClick = (key, name) => {
        setContents(key?.key)
    }

    useEffect(() => {
    }, []);


    const sampleMenu = [
            {"title":"PIMS","key":"PIMS","isLeaf":false,
                "children":[
                    {"title":"PIMS01","key":"PIMS01","isLeaf":true, "children":[]},
                    {"title":"PIMS02","key":"PIMS02","isLeaf":true, "children":[]},
                    {"title":"PIMS03","key":"PIMS03","isLeaf":true, "children":[]},
                ]},
            {"title":"BCM","key":"BCM","isLeaf":true,"children":[]},
            {"title":"가격조정","key":"DBPA","isLeaf":true,"children":[]},
            {"title":"관리자 관리","key":"ADNIN","isLeaf":true,"children":[]}
        ];


    const createMenu = (menu) => {
        if(!menu)
            return;
        if(menu.isLeaf) {
            return <Menu.Item key={menu.key} onClick={(key) => menuClick(key)}> {menu.title} </Menu.Item>
        } else {
            return <SubMenu key={menu.key} icon={<ReconciliationOutlined/>} title={menu.title}>
                { menu.children.map((sub) => {
                    return createMenu(sub);
                })}
            </SubMenu>
        }
    }

    const menuMap = props.menuTree.map((menu) => createMenu(menu));

    return (
        <>
        <Layout>
            <Header
                style = {{
                    backgroundColor: "white",
                    textAlign:"left",
                    verticalAlign:"center",
                }}

            >
                    {/*<Col span={1}>*/}
                    {/*    <MenuOutlined style={{ fontSize: '24px', color: '#08c' }}*/}
                    {/*                  onClick={() => { setCollapsed(!collapsed)}} />*/}
                    {/*</Col>*/}
                    <Col  style={{marginTop:"12px"}}>
                    {/*        <MenuOutlined style={{ fontSize: '24px', color: '#08c' }}*/}
                    {/*                      onClick={() => { setCollapsed(!collapsed)}} />*/}
                       <Title level={3} >플랫폼 통합 BackOffice</Title>
                    </Col>
            </Header>
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '200vh',
                    left: 0,
                }}
                trigger={null} collapsible collapsed={collapsed}
            >
                <Menu mode="inline" theme="dark">
                    {menuMap}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        height: '100vh',
                        minHeight: 1024,
                    }}>

                    <BOContents contentsKey = {contents} myCookies = {props.myCookies} />
                </Content>
            </Layout>
        </Layout>
        </Layout>
        </>
    );
}
