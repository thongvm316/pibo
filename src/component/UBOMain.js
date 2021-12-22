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
    const [menuTree, setMenuTree] =  useState([]);

    const menuClick = (key, name) => {
        setContents(key?.key)
    }

    const makeJson2MenuTree = (menuList, arr)  => {
        if(!arr)
            return;

        if(!menuList)
            return;

        for (const menu of menuList) {
            let obj = {}
            obj.title = menu?.menuNm;
            obj.key = menu?.menuId;
            obj.isLeaf = (menu?.leafYn === "Y");
            obj.children = [];
            if(menu.subMenu){
                makeJson2MenuTree(menu.subMenu, obj.children);
            }
            // alert(JSON.stringify(obj))
            arr.push(obj);
        }
        return arr;
    }

    const getMenuList = () => {
        const url = "https://i-dev-piboapi.amorepacific.com/pibo/api/menu";
        const pauth2 = props.myCookies.get('pauth')
        axios.defaults.headers.common['Authorization'] = `Bearer ${pauth2}`

        axios({
            method: 'get',
            url: url,
            config: { withCredentials: true },

        }).then(function (response) {
            let arr = [];
            setMenuTree(makeJson2MenuTree(response.data?.menuList, arr));
            // console.log(response.data?.menuList);
            console.log(JSON.stringify(menuTree));

        }).catch(function (error) {
            alert(error?.response?.data);
            console.log(error);
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
                console.log(error)
            }
            else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    }


    useEffect(() => {
        getMenuList();
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

    const menuMap = menuTree.map((menu) => createMenu(menu));

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
                    {menuMap}

                    {/*<SubMenu key="sub0" icon={<SyncOutlined />} title="상품가격 조정">*/}
                    {/*    <Menu.Item key="011" onClick={(key) =>{menuClick(key)}}>가격 할인율 조회</Menu.Item>*/}
                    {/*    <Menu.Item key="012" onClick={(key) =>{menuClick(key)}}>가격 할인율계산</Menu.Item>*/}
                    {/*</SubMenu>*/}
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
                    {/*    <Menu.Item key="43" onClick={(key) =>{menuClick(key)}}>메뉴관리</Menu.Item>*/}
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
