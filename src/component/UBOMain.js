import React, {useState} from 'react';
import {Col, Layout, Menu, Space,Row} from 'antd';
import '../index-342fc69c.css';
import {
    GiftOutlined,
    MenuOutlined, ReadOutlined, ReconciliationOutlined, SearchOutlined,
    SyncOutlined, UserOutlined,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import BOContents from "./BOContents";
const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;


export default function UBOMain(props){
    const [collapsed, setCollapsed] = useState(false);
    const [contents, setContents] = useState("");

    const menuClick = (key, name) => {
        setContents(key?.key)
    }

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
                    height: '100vh',
                    left: 0,
                }}
                trigger={null} collapsible collapsed={collapsed}
            >
                <Menu mode="inline" theme="dark">
                    <SubMenu key="sub0" icon={<SyncOutlined />} title="상품가격 조정">
                        <Menu.Item key="011" onClick={(key) =>{menuClick(key)}}>가격 할인율 조회</Menu.Item>
                        <Menu.Item key="012" onClick={(key) =>{menuClick(key)}}>가격 할인율계산</Menu.Item>

                    </SubMenu>
                    {/*<SubMenu key="sub1" icon={<GiftOutlined />} title="상품">*/}
                    {/*    <SubMenu key="sub11" icon={<GiftOutlined />} title="상품정보">*/}
                    {/*        <Menu.Item key="111" onClick={(key) =>{menuClick(key)}}>상품정보</Menu.Item>*/}
                    {/*        <Menu.Item key="112" onClick={(key) =>{menuClick(key)}}>일괄업데이트</Menu.Item>*/}
                    {/*        <Menu.Item key="113" onClick={(key) =>{menuClick(key)}}>Mall정보</Menu.Item>*/}
                    {/*        <Menu.Item key="114" onClick={(key) =>{menuClick(key)}}>I/F결과</Menu.Item>*/}
                    {/*    </SubMenu>*/}
                    {/*    <SubMenu key="sub12" icon={<GiftOutlined />} title="상품속성">*/}
                    {/*        <Menu.Item key="121" onClick={(key) =>{menuClick(key)}}>속성정보</Menu.Item>*/}
                    {/*        <Menu.Item key="122" onClick={(key) =>{menuClick(key)}}>고시정보</Menu.Item>*/}
                    {/*    </SubMenu>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" icon={<SearchOutlined />} title="검색">*/}
                    {/*    <SubMenu key="sub21" icon={<ReadOutlined />} title="사전관리" >*/}
                    {/*        <Menu.Item key="211" onClick={(key) =>{menuClick(key)}}>동의어사전</Menu.Item>*/}
                    {/*        <Menu.Item key="212" onClick={(key) =>{menuClick(key)}}>사용자사전</Menu.Item>*/}
                    {/*        <Menu.Item key="213" onClick={(key) =>{menuClick(key)}}>동기화정보</Menu.Item>*/}
                    {/*    </SubMenu>*/}
                    {/*    <Menu.Item key="22" onClick={(key) =>{menuClick(key)}}>검색테스트 도구</Menu.Item>*/}
                    {/*    <Menu.Item key="23" onClick={(key) =>{menuClick(key)}}>자동완성 관리자 도구</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub3" icon={<ReconciliationOutlined />} title="BCM">*/}
                    {/*    <Menu.Item key="31" onClick={(key) =>{menuClick(key)}}>BCM1</Menu.Item>*/}
                    {/*    <Menu.Item key="32" onClick={(key) =>{menuClick(key)}}>BCM2</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub4" icon={<UserOutlined />} title="관리자">*/}
                    {/*    <Menu.Item key="41" onClick={(key) =>{menuClick(key)}}>관리자</Menu.Item>*/}
                    {/*    <Menu.Item key="42" onClick={(key) =>{menuClick(key)}}>계정잠금해제</Menu.Item>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        height: '100vh',
                        minHeight: 280,
                    }}>

                    <BOContents contentsKey = {contents} myCookies = {props.myCookies} />
                </Content>
            </Layout>
        </Layout>
        </Layout>
        </>
    );
}
