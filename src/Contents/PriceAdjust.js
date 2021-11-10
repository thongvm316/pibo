import React, {useEffect} from 'react';
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



export default function ProductAdjust(props){
    const [productForm] = Form.useForm();

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
            title: '날짜',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '마켓 이름',
            dataIndex: 'market',
            key: 'market',
        },
        {
            title: '상품 번호',
            dataIndex: 'productNo',
            key: 'productNo',
        },
        {
            title: '브랜드 이름',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '상품명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '상품가격',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '할인정보',
            dataIndex: 'bcast',
            key: 'bcast',
        },
    ];

    const getToday = () => {
        const d = new Date();
        return  d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
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
        <div className="site-card-wrapper">
            <Row gutter={32}>
                <Col span={8}>
                    <Card title="네이버 upload" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="쿠팡 upload" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row gutter={32}>
                <Col span={8}>
                    <Card title="네이버 upload" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="쿠팡 upload" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Card>
                </Col>
            </Row>

        </div>
        <br/>
        <Card title="상품 가격 조정" type = "inner"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />}> 초기화 </Button>,
                  <Button icon = {<CheckOutlined />} onClick={() => {registerProduct()}}> 등록 </Button>,
                  <Button icon = {<CheckOutlined />} onClick={() => {alert('저장')}}> 저장 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >
            <Form
                {...layout}
                form={productForm}
                onFinish={onFinish}
            >

                <Form.Item  size = "large" label = "날짜" name = "form_date"><Input/></Form.Item>
                <Form.Item  label = "마켓 이름" name = "form_market"><Input/></Form.Item>
                <Form.Item  label = "상품 번호" name = "form_prod_no"><Input/></Form.Item>
                <Form.Item  label = "브랜드 이름" name = "form_brand"><Input/></Form.Item>
                <Form.Item  label = "상품명" name = "form_prod"><Input/></Form.Item>
                <Form.Item  label = "가격" name = "form_price"><Input/></Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type = "default"> 초기화 </Button>
                    <Button type="primary" htmlType="submit">
                        제출
                    </Button>
                </Form.Item>
            </Form>
            <Table columns={columns} size="small"/>
        </Card>


    </>
    );
}
