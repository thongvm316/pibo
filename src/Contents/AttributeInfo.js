import React from 'react';
import {
    Button, Card,
    Col,
    Row,
    Table,
} from "antd";
import {CheckOutlined, LockOutlined, RedoOutlined} from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";
import BORadio from "../component/Input/BORadio";

export default function AttributeInfo(props){
    const { Column, ColumnGroup } = Table;

    const columns = [
        {
            title: '번호',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: '고시품목ID',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: '고시품목명',
            dataIndex: 'SAPCode',
            key: 'SAPCode',
        },
        {
            title: '정렬순위',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '사용여부',
            dataIndex: 'mallName',
            key: 'mallName',
        },
        {
            title: '고시항목ID',
            dataIndex: 'mallProdCode',
            key: 'mallProdCode',
        },
        {
            title: '고시항목',
            dataIndex: 'mallProdName',
            key: 'mallProdName',
        },
        {
            title: '정렬순위',
            dataIndex: 'regDate',
            key: 'regDate',
        },
        {
            title: '사용여부',
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
                <BOInput name = "속성그룹명"/>
                <BOInput name = "속성항목명"/>
                <BOInput name = "속성그룹ID"/>
                <BOInput name = "속성항목ID"/>
                <BORadio name = "속성그룹 사용여부" contents={["전체", "사용", "사용 안함"]}/>
                <BORadio name = "속성항목 사용여부" contents={["전체", "사용", "사용 안함"]}/>
                <BORadio name = "속성그룹 변경여부" contents={["전체", "가능", "불가능"]}/>
            </Row>
        </Card>
        <Row gutter={[0,24]}  style={{marginTop:10, marginBottom:10}}>
            <Col span={1}>
                <Button  textAlign={'left'}> 속성등록 </Button>
            </Col>
        </Row>
        <Table columns={columns} size = "small"/>
    </>
    );
}
