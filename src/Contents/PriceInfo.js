import React, {useEffect} from 'react';
import {
    Button, Card,
    Row, Table, Form, Input, InputNumber, Col, Typography, Calendar
} from "antd";
import {CheckOutlined,RedoOutlined } from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";

import moment from 'moment';
import BOInputFull from "../component/Input/BOInputFull";
import PropertyTitle from "../component/Text/PropertyTitle";
import { DatePicker, Space } from 'antd';
import FromTo from "../component/Input/FromTo";
const { Title, Text, Link } = Typography;

export default function ProductInfo(props){
    const [productForm] = Form.useForm();

    const taskColumns = [
        {
            title: '닐짜',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '진행 상태',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '결과',
            dataIndex: 'result',
            key: 'result',
            render: () => <Button>엑셀 다운로드 </Button>,
        },
    ];

    const sampleData = [
        {
            key: '1',
            date: '2021/11/21',
            status: '완료',
            result: 'result_2021-11-21.xls',
        },
        {
            key: '2',
            date: '2021/11/22',
            status: '업로드 완료',
            result: 'result_2021-11-22.xls',
        },
        {
            key: '3',
            date: '2021/11/23',
            status: '계산 중',
            result: 'result_2021-11-23.xls',
        },
    ]


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

    const { RangePicker } = DatePicker;

    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const customFormat = value => `custom format: ${value.format(dateFormat)}`;

    const customWeekStartEndFormat = value =>
        `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
            .endOf('week')
            .format(weekFormat)}`;

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
    <>

        <Card title="가격 할인율 이력 조회" type = "inner"
              actions={[
                  <div/>, <div/>, <div/>,
                  <Button icon = {<CheckOutlined />} onClick={() => {}}> 엑셀 다운로드 </Button>,
                  <div/>, <div/>, <div/>,
              ]}
        >

            <Space direction={"horizontal"}>
                <RangePicker />
            <Button> 조   회 </Button>
            </Space>
            <Table columns={taskColumns} dataSource={sampleData} size="small"/>
            <br/>
        </Card>


    </>
    );
}
