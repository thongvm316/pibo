import React from 'react';
import {
    Button, Card,
    Col,
    Divider,
    Form, Input,
    Row,
    Space,
    Table,
    Typography
} from "antd";
import {CheckOutlined, LockOutlined, RedoOutlined} from "@ant-design/icons";
import SearchNInput from "../component/Input/SearchNInput";
import FromTo from "../component/Input/FromTo";
import BODropdownHalf from "../component/Input/BODropdownHalf";
import BOInput from "../component/Input/BOInput";
import BODropdownLine from "../component/Input/BODropdownLine";
import BOEmpty from "../component/Input/BOEmpty";
import BOViewHalfLine from "../component/Input/BOViewHalfLine";
import BODropdownNInputHalf from "../component/Input/BODropdownNInputHalf";



export default function MallInfo(props){
    const { Column, ColumnGroup } = Table;

    const columns = [
        {
            title: '번호',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: '상품명',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: 'SAP코드',
            dataIndex: 'SAPCode',
            key: 'SAPCode',
        },
        {
            title: '브랜드',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '몰명',
            dataIndex: 'mallName',
            key: 'mallName',
        },
        {
            title: '몰상품코드',
            dataIndex: 'mallProdCode',
            key: 'mallProdCode',
        },
        {
            title: '몰상품명',
            dataIndex: 'mallProdName',
            key: 'mallProdName',
        },
        {
            title: '등록일시',
            dataIndex: 'regDate',
            key: 'regDate',
        },
    ];
    return (
    <>
        <Card title="몰 상품정보 관리"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />}> 초기화 </Button>,
                  <Button icon = {<CheckOutlined />}> 조회 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >
            <Row  style = {{ padding:"10px"}}>
                <BODropdownHalf name ="Mall 명"></BODropdownHalf>
                <BOInput name = "상품명"/>
                <BODropdownNInputHalf name = "상품코드"/>
            </Row>
        </Card>
        <Table columns={columns} size = "small"/>
    </>
    );
}
