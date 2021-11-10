import React from 'react';
import {
    Button, Card,
    Col,
    Row,
    Table,
} from "antd";
import {CheckOutlined, LockOutlined, RedoOutlined} from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";
import BORadio from "../component/Input/BOInput";
import BODropdownHalf from "../component/Input/BODropdownHalf";

export default function InterfaceResult(props){
    const { Column, ColumnGroup } = Table;

    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'I/F ID',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: 'I/F ID명',
            dataIndex: 'SAPCode',
            key: 'SAPCode',
        },
        {
            title: '송신 시스템',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '수신 시스템',
            dataIndex: 'mallName',
            key: 'mallName',
        },
        {
            title: '송/수신 여부',
            dataIndex: 'mallProdCode',
            key: 'mallProdCode',
        },
        {
            title: 'I/F 유형',
            dataIndex: 'mallProdName',
            key: 'mallProdName',
        },
        {
            title: '전송주기',
            dataIndex: 'regDate',
            key: 'regDate',
        },
    ];
    return (
    <>
        <Card title="I/F 결과관리"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />}> 초기화 </Button>,
                  <Button icon = {<CheckOutlined />}> 조회 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >

        <Row  style = {{ padding:"10px"}}>
                <BOInput name = "I/F ID"/>
                <BOInput name = "I/F 명"/>
                <BOInput name = "송신 시스템"/>
                <BOInput name = "수신 시스템"/>
                <BODropdownHalf name="송/수신 여부"/>
                <BODropdownHalf name="I/F 유형"/>
            </Row>
        </Card>
        <Row gutter={[0,24]}  style={{marginTop:10, marginBottom:10}}>
            <Col span={1}>
                <Button  textAlign={'left'} >고시품목 등록 </Button>
            </Col>
        </Row>
        <Table columns={columns} size="small" />
    </>
    );
}
