import React, {useEffect, useState} from 'react';
import {
    Card, Tree, Typography
} from "antd";
import {DownOutlined} from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Link } = Typography;
export default function PriceInfo(props){
    const [menuTree, setMenuTree] = useState([]);

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
            arr.push(obj);
        }
    }

    const getMenu = () => {
        const url = "https://i-dev-piboapi.amorepacific.com/pibo/api/menu";
        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
            config: { withCredentials: true },

        }).then(function (response) {
            let tree = [];
            // alert(JSON.stringify(response.data?.menuList));
            makeJson2MenuTree(response.data?.menuList, tree);
            alert(JSON.stringify(tree));
            setMenuTree(tree)
        }).catch(function (error) {
            // alert(error?.response?.data);
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
        getMenu();
        // setMenuTree([
        //     {"title":"PIMS","key":"PIMS","isLeaf":true,"children":[]},
        //     {"title":"BCM","key":"BCM","isLeaf":true,"children":[]},
        //     {"title":"가격조정","key":"DBPA","isLeaf":true,"children":[]},
        //     {"title":"관리자 관리","key":"ADNIN","isLeaf":true,"children":[]}
        // ]);
    }, []);

    const onRightClick = ({event, node}) => {
        alert(JSON.stringify(node));
    }

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
        alert(JSON.stringify(React.Key));
    };
    const onCheck = (checkedKeys: React.Key[], info: any) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
    <>
        <Card title="메뉴 관리" type = "inner"
              // actions={[
              //     <div/>, <div/>, <div/>,
              //     <Button icon = {<CheckOutlined />} onClick={() => {}}> 엑셀 다운로드 </Button>,
              //     <div/>, <div/>, <div/>,
              // ]}
        >
            <Tree
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onRightClick={onRightClick}
                onSelect={onSelect}
                treeData={menuTree}
            />

        </Card>


    </>
    );
}
