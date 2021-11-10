import React from 'react';
import {
    Button, Card,
    Col, Input,
    Row,
    Table,
} from "antd";
import {
    CheckOutlined,
    LockOutlined,
    MinusOutlined,
    PlusOutlined,
    RedoOutlined, ReloadOutlined,
    SaveOutlined,
    SearchOutlined
} from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";
import BORadio from "../component/Input/BORadio";
import BOEmpty from "../component/Input/BOEmpty";
import BODropdownLine from "../component/Input/BODropdownLine";
import BOInputFull from "../component/Input/BOInputFull";
import BODropdownHalf from "../component/Input/BODropdownHalf";

export default function SynonymDic(props){
    const { Column, ColumnGroup } = Table;

    const columns = [
        {
            title: '동의어키워드값',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: '언어코드',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: '동의어 리스트',
            dataIndex: 'SAPCode',
            key: 'SAPCode',
        },
    ];

    const columns2 = [
        {
            title: 'check',
            dataIndex: 'name',
        },
        {
            title: '동의어키워드값',
            dataIndex: 'age',
        },
        {
            title: '언어코드',
            dataIndex: 'address',
        },
    ];
    return (
    <>
        <Row>
            <Col span={14}>
                <Card title = "동의어 사전"
                      actions={[
                          <div/>, <div/>,
                          <Button icon={<PlusOutlined />}>추가</Button>,
                          <Button icon={<MinusOutlined />}>삭제</Button>,
                          <Button icon={<SaveOutlined />}>저장</Button>,
                          <Button icon={<ReloadOutlined />}>초기화</Button>,
                          <div/>, <div/>,
                      ]}
                      size="small"
                >

                <Row>
                        <Col><Button icon={<CheckOutlined />}>사전 유효성 검사</Button></Col>
                        <Col><Button icon={<SaveOutlined />}>CSV 다운로드</Button></Col>
                        <Col><Button icon={<SaveOutlined />}>TXT 다운로드</Button></Col>
                        <Col><Button icon={<SaveOutlined />}>CSV Import </Button></Col>
                        <Col><Input size = "small" style={{margin:"4px"}}/></Col>
                        <Col><Button size="small" style={{margin:"4px"}}>찾아보기</Button></Col>
                    </Row>

                    <Row>
                        <BOInput name = "동의어 검색"/>
                        <Col span={12}>
                            <Button icon={<SearchOutlined/>} size="small" style={{marginTop:"4px"}}> 검색 </Button>
                        </Col>
                    </Row>

                </Card>
                <Table columns={columns} size = "small" style = {{marginTop:15}}/>

            </Col>
            <Col span={10}>
                <Card title = "동의어 변경" size = "small">
                    <Row>
                        <BOInputFull name="동의어키워드값:"/>
                        <BODropdownLine name="언어코드:" />
                    </Row>
                    <Table columns={columns2}  style = {{marginTop:15}}/>
                </Card>
            </Col>
        </Row>
    </>
    );
}
