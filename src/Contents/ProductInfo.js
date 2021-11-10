import React from 'react';
import {
    Button, Card,
    Col,
    Divider,
    Form,
    Row,
    Space,
    Table,
    Typography
} from "antd";
import {CheckOutlined,RedoOutlined } from "@ant-design/icons";
import SearchNInput from "../component/Input/SearchNInput";
import FromTo from "../component/Input/FromTo";
import BODropdownHalf from "../component/Input/BODropdownHalf";
import BOInput from "../component/Input/BOInput";



export default function ProductInfo(props){

    const columns = [
        {
            title: '번호',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: '상품명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SAP 코드',
            dataIndex: 'sap',
            key: 'sap',
        },
        {
            title: '브랜드',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '분류',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: '고시품목',
            dataIndex: 'bcast',
            key: 'bcast',
        },
        {
            title: '수정자',
            dataIndex: 'modifier',
            key: 'modifier',
        },
        {
            title: '수정일',
            dataIndex: 'mod_date',
            key: 'mod_date',
        },
        {
            title: '등록일시',
            dataIndex: 'create_date',
            key: 'create_date',
        },
    ];
    return (
    <>
        <Card title="상품 정보 관리" type = "inner"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />}> 초기화 </Button>,
                  <Button icon = {<CheckOutlined />}> 조회 </Button>,
                  <Button icon = {<CheckOutlined />}> 조회 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >
            <Row gutter={[0,0]} size = "small" >
                <SearchNInput name = "브랜드" style={{ display: "flex"}}/>
                <FromTo name = "등록일자"/>
                <SearchNInput name = "분류"/>
                <FromTo name = "수정일자"/>
                <BODropdownHalf name = "속성그룹"/>
                <BOInput name = "수정자"/>
                <BODropdownHalf name = "고시품목"/>
                <BOInput name = "SAP코드"/>
                <BOInput name = "상품명"/>
            </Row>
        </Card>
        <Row gutter={[0,24]}  style={{marginTop:10, marginBottom:10}}>
            <Col span={1}>
                <Button  textAlign={'left'} >상품 일괄 다운로드 </Button>
            </Col>
        </Row>
        <Table columns={columns} size="small"/>
    </>
    );
}
