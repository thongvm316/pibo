import React, {useEffect} from 'react';
import {
    Button, Card,
    Row, Table, Form, Input, InputNumber, Col, Typography, Calendar
} from "antd";
import {CheckOutlined,RedoOutlined } from "@ant-design/icons";
import BOInput from "../component/Input/BOInput";
import {Cookies} from "react-cookie";

import moment from 'moment';
import BOInputFull from "../component/Input/BOInputFull";
import PropertyTitle from "../component/Text/PropertyTitle";
import { DatePicker, Space } from 'antd';
import FromTo from "../component/Input/FromTo";
import axios from "axios";
const { Title, Text, Link } = Typography;


export default function PriceInfo(props){
    const [productForm] = Form.useForm();


    const resultOrdItemDTOColumns = [
        {
            title: '거래처 코드',
            dataIndex: 'prtnCd',
            key: 'prtnCd',
        },
        {
            title: '주문번호',
            dataIndex: 'ordNo',
            key: 'ordNo',
        },
        {
            title: '상품번호',
            dataIndex: 'prdCd',
            key: 'prdCd',
        },
        {
            title: '자재코드',
            dataIndex: 'prdItemCd',
            key: 'prdItemCd',
        },
        {
            title: '자재명',
            dataIndex: 'prdItemNm',
            key: 'prdItemNm',
        },
        {
            title: '수량',
            dataIndex: 'prdItemQty',
            key: 'prdItemQty',
        },
        {
            title: '상품 소비자가',
            dataIndex: 'prdItemPrice',
            key: 'prdItemPrice',
        },
        {
            title: '상품 비중',
            dataIndex: 'prdItemRatio',
            key: 'prdItemRatio',
        },
        {
            title: '환산가',
            dataIndex: 'convPrice',
            key: 'convPrice',
        },
        {
            title: '할인율',
            dataIndex: 'dcRate',
            key: 'dcRate',
        },
        ]
    ;


    const resultOrdDTOColumns = [
        {
            title: '거래처 코드',
            dataIndex: 'prtnCd',
            key: 'prtnCd',
        },
        {
            title: '거래처명',
            dataIndex: 'prtnNm',
            key: 'prtnNm',
        },
        {
            title: '결제일자',
            dataIndex: 'payDt',
            key: 'payDt',
        },
        {
            title: '주문번호',
            dataIndex: 'ordNo',
            key: 'ordNo',
        },
        {
            title: '상품명',
            dataIndex: 'prdNm',
            key: 'prdNm',
        },
        {
            title: '옵션명',
            dataIndex: 'optNm',
            key: 'optNm',
        },
        {
            title: '주문 수량',
            dataIndex: 'ordQty',
            key: 'ordQty',
        },
        {
            title: '옵션 가격',
            dataIndex: 'optPrice',
            key: 'optPrice',
        },
        {
            title: '총 할인 금액',
            dataIndex: 'totalDcAmt',
            key: 'totalDcAmt',
        },
        {
            title: '상품별 할인액',
            dataIndex: 'prdDcAmt',
            key: 'prdDcAmt',
        },
        {
            title: '쿠폰 등 할인액',
            dataIndex: 'cpnDcAmt',
            key: 'cpnDcAmt',
        },
        {
            title: '상품별 총 주문 금액',
            dataIndex: 'totalOrdAmt',
            key: 'totalOrdAmt',
        },
        {
            title: '배송비',
            dataIndex: 'deliveryAmt',
            key: 'deliveryAmt',
        },
        {
            title: '실 구매금액',
            dataIndex: 'realOrdAmt',
            key: 'realOrdAmt',
        },
    ];

    const sampleResultData = [
        {
        },

    ];

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
            title: '조회',
            dataIndex: 'search',
            key: 'search',
            render: () => <Button> 조회 </Button>,
        },
        {
            title: '다운로드',
            dataIndex: 'download',
            key: 'download',
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

    const sampleSearchClick = () => {
        const url = "https://i-dev-piboapi.amorepacific.com/pibo/dbpa/ord-price-result";

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;

        axios({
            method: 'get',
            url: url,
            data: {
                "date" : 2020110,
                "limit" : 20 ,
                "offset": 1
            },
        }).then(function (response) {
            console.log(response?.data);
            alert(JSON.stringify(response?.data));
        }).catch(function (error) {
            console.log(error);
            alert(error?.message);
            alert(JSON.stringify(error.response?.data))
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
                console.log(error)
            } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
        });

    }
    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
    <>

        <Card title="가격 할인율 이력 조회" type = "inner"
              // actions={[
              //     <div/>, <div/>, <div/>,
              //     <Button icon = {<CheckOutlined />} onClick={() => {}}> 엑셀 다운로드 </Button>,
              //     <div/>, <div/>, <div/>,
              // ]}
        >

            <Space direction={"horizontal"}>
                <RangePicker />
            <Button> 초기화 </Button><Button> 조   회 </Button>
            </Space>
            <br/>
            <Table columns={taskColumns} dataSource={sampleData} size="small"/>
            <Button onClick={sampleSearchClick}>샘플 조회</Button> <Button>샘플 다운로드</Button>
            <Table columns={resultOrdItemDTOColumns} dataSource={sampleResultData} size="small"/>

        </Card>


    </>
    );
}
