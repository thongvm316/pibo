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



export default function BatchUpdate(props){
    const { Column, ColumnGroup } = Table;

    const columns = [
        {
            title: '번호',
            dataIndex: 'no',
            key: 'no',
            column: [
                {
                    title: '번호',
                    dataIndex: 'no',
                    key: 'no',
                },
                {
                    title: '번호',
                    dataIndex: 'no',
                    key: 'no',
                }
                ]
        },
        {
            title: '등록일',
            dataIndex: 'regDate',
            key: 'regDate',
        },
        {
            title: '작업상태',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '시작일시',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: '종료일시',
            dataIndex: 'endDate',
            key: 'endDate',
        },
    ];
    return (
    <>
        <Card title="상품 정보 일괄 등록" size="small">
            <Card title = "최근 업로드 작업" size="small">
                <Table columns={columns} size="small"/>
            </Card>
            <Row  style = {{ padding:"10px"}} size="small">
                <BODropdownHalf name ="고시품목 선택"></BODropdownHalf>
                <BOEmpty/>
                <BODropdownHalf name ="파일 선택"></BODropdownHalf>
                <Col span={9}>
                    <Row>
                        <Col span={12}>
                            <Button icon = {<LockOutlined />} block>검증</Button>
                        </Col>
                        <Col span={12}>
                            <Button icon = {<LockOutlined />} block>양식 다운로드</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={3}/>
                <BOViewHalfLine name = "총 건수"/>
                <BOViewHalfLine name = "불가건수"/>
            </Row>

            <Table  scroll={{ x: 1500 }} size = "small">
                <ColumnGroup title="처리결과">
                    <Column title="처리가능여부" dataIndex="firstName" key="firstName" />
                    <Column title="오류내용" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
                <Column title="SAP 코드" dataIndex="age" key="age" />
                <ColumnGroup title="상품 고시 정보">
                    <Column title="용량" dataIndex="firstName" key="firstName" />
                    <Column title="제품주요사용처" dataIndex="lastName" key="lastName" />
                    <Column title="사용기한" dataIndex="firstName" key="firstName" />
                    <Column title="사용방법" dataIndex="lastName" key="lastName" />
                    <Column title="제조사 및 제조.." dataIndex="firstName" key="firstName" />
                    <Column title="제조국" dataIndex="lastName" key="lastName" />
                    <Column title="전성분" dataIndex="firstName" key="firstName" />
                    <Column title="기능성 화장.." dataIndex="lastName" key="lastName" />
                    <Column title="사용할때 주.." dataIndex="firstName" key="firstName" />
                    <Column title="품질 보증기준" dataIndex="lastName" key="lastName" />
                    <Column title="소비자 상담" dataIndex="firstName" key="firstName" />
                    <Column title="오류내용" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
            </Table>
        </Card>
    </>
    );
}
