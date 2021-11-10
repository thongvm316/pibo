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


export default function ProductInfo(props){
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

    const data = [
        {
            key: '1',
            date: '2021/10/01',
            market: '쿠팡',
            skuId: 11111111,
            viId: 22222222,
            name: '미장센 헬로크림 6WB 웜브라운',
            price: 2497,
            adjustedPrice: 0,
        },
    ]

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
            title: 'SKU ID',
            dataIndex: 'skuId',
            key: 'skuId',
        },
        {
            title: 'VI ID',
            dataIndex: 'viId',
            key: 'viId',
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
            title: '조정된 가격',
            dataIndex: 'adjustedPrice',
            key: 'adjustedPrice',
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

    const onSaveClick = () => {
        const fieldValue = productForm.getFieldsValue();
        alert('abao')
        console.log(fieldValue)
    }

    return (
    <>
        <Card title="상품 가격 정보" type = "inner"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon={<RedoOutlined />}> 초기화 </Button>,
                  // <Button icon = {<CheckOutlined />} onClick={() => {registerProduct()}}> 등록 </Button>,
                  <Button icon = {<CheckOutlined />} onClick={() => {alert('저장')}}> 가격조정 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
              size="small"
        >
            <Form
                {...layout}
                form={productForm}
                onFinish={onFinish}
            >
                <Form.Item  label = "마켓 이름" name = "form_market"><Input/></Form.Item>
                <Form.Item  label = "SKU ID" name = "form_sku_id"><Input/></Form.Item>
                <Form.Item  label = "VI ID" name = "form_vi_id"><Input/></Form.Item>
                <Form.Item  label = "상품명" name = "form_prod"><Input/></Form.Item>
                <Form.Item  label = "가격" name = "form_price"><Input/></Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type = "default"> 초기화 </Button>
                    <Button type="primary" htmlType="submit" onClick={onSaveClick}>
                        저장
                    </Button>
                </Form.Item>
            </Form>
            <Table columns={columns} data={data} size="small"/>
        </Card>


    </>
    );
}
