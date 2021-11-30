import React, {useEffect, useState} from 'react';
import {
    Button, Card,
    Row, Table, Form, Input, InputNumber, Col, Typography
} from "antd";
import {CheckOutlined,RedoOutlined } from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";

import moment from 'moment';
import BOInputFull from "../component/Input/BOInputFull";
import PropertyTitle from "../component/Text/PropertyTitle";
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title, Text, Link } = Typography;


export default function ProductAdjust(props){
    const [productForm] = Form.useForm();
    const [stateText, setStateText] = useState("Ready")

    useEffect(() => {
        productForm.setFieldsValue({
            form_date: getToday(),
            form_market: '',
            form_prod_no:'',
            form_brand:'',
            form_prod:'',
            form_price:0,
    });

    }, []);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        console.log(values);
        const fieldValue = productForm.getFieldsValue();
        console.log(fieldValue)
    };

    const columns = [
        {
            title: '자재코드',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '제품명',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: '수량',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '소비자가',
            dataIndex: 'custPrice',
            key: 'custPrice',
        },
        {
            title: '비중(%)',
            dataIndex: 'partOf',
            key: 'partOf',
        },
        {
            title: '1EA 당 환산가',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: '할인율(%)',
            dataIndex: 'discountRate',
            key: 'discountRate',
        },
    ];

    const getToday = () => {
        const d = new Date();
        return  d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
    }
    const submitFile = () => {
        alert("업로드 완료.")
    }

    const registerProduct = () => {
        const fieldValue = productForm.getFieldsValue();

        alert("hlello")
        // alert(fieldValue?.form_date);

    }
    const props2 = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
    <>
        <Card title="상품 가격 조정" type = "inner"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />} onClick={() => {submitFile()}}> 제출 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >
            <Form
                {...layout}
                form={productForm}
                onFinish={onFinish}
            >
                <Row gutter={32}>
                    <Col span = {4} offset={2}>
                        <Text level={3}>네이버 상품정보 : </Text>
                    </Col>
                    <Col span = {6}>
                        <input type="file" name="file" onChange={null}/>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span = {4} offset={2}>
                        <Text level={3}>쿠팡 상품정보 : </Text>
                    </Col>
                    <Col span = {6}>
                        <input type="file" name="file" onChange={null}/>
                    </Col>
                </Row>
                <br/>
            </Form>
            <br/>
            <br/>

        </Card>



    </>
    );
}
