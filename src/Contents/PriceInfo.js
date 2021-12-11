import React, {useEffect, useState} from 'react';
import {
    Button, Card,
    Row, Table, Form, Input, InputNumber, Col, Typography, Calendar
} from "antd";

import moment from 'moment';
import { DatePicker, Space } from 'antd';
import axios from "axios";
import { Pagination } from 'antd';
import FileSaver from 'file-saver';

const { Title, Text, Link } = Typography;


export default function PriceInfo(props){
    const [productForm] = Form.useForm();
    const [searchResult, setSearchResult] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const ordDTOColumns = [
        {
            title: '거래처코드',
            dataIndex: 'prtnId',
            key: 'prtnId',
        },
        {
            title: '거래처명',
            dataIndex: 'prtnNm',
            key: 'prtnNm',
        },
        {
            title: '결제일자',
            dataIndex: 'stlmDttm',
            key: 'stlmDttm',
        },
        {
            title: '주문번호',
            dataIndex: 'dbpaB2cMallOrdNo',
            key: 'dbpaB2cMallOrdNo',
        },
        {
            title: '상품번호',
            dataIndex: 'dbpaB2cMallPrdNo',
            key: 'dbpaB2cMallPrdNo',
        },
        {
            title: '상품명',
            dataIndex: 'dispPrdNm',
            key: 'dispPrdNm',
        },

        {
            title: '옵션명',
            dataIndex: 'prdOptnNm',
            key: 'prdOptnNm',
        },
        {
            title: '주문수량',
            dataIndex: 'ordPrdQty',
            key: 'ordPrdQty',
        },
        {
            title: '옵션가격',
            dataIndex: 'optnPrdAmt',
            key: 'optnPrdAmt',
        },
        {
            title: '총할인액',
            dataIndex: 'ttOrdPrdDcAmt',
            key: 'ttOrdPrdDcAmt',
        },
        {
            title: '상품별할인금액',
            dataIndex: 'prdTtDcAmt',
            key: 'prdTtDcAmt',
        },
        {
            title: '쿠폰등 할인금액',
            dataIndex: 'cpnAplyDcAmt',
            key: 'cpnAplyDcAmt',
        },
        {
            title: '주문별 총주문금액',
            dataIndex: 'ordPrdAmt',
            key: 'ordPrdAmt',
        },
        {
            title: '배송비',
            dataIndex: 'dlcsAmt',
            key: 'dlcsAmt',
        },
        {
            title: '실구매금액',
            dataIndex: 'realPurAmt',
            key: 'realPurAmt',
        },

        {
            title: '자재코드',
            dataIndex: 'prdCd',
            key: 'prdCd',
        },
        {
            title: '자재명',
            dataIndex: 'prdNm',
            key: 'prdNm',
        },
        {
            title: '소비자가',
            dataIndex: 'cnsmAmt',
            key: 'cnsmAmt',
        },
        {
            title: '비중',
            dataIndex: 'purPrdPrt',
            key: 'purPrdPrt',
        },
        {
            title: '1EA 당 환산',
            dataIndex: 'prdUtprConvAmt',
            key: 'prdUtprConvAmt',
        },
        {
            title: '할인율',
            dataIndex: 'dcRt',
            key: 'dcRt',
        },

    ];

    const resultOrdItemDTOColumns = [
        {
            title: '거래처 코드',
            dataIndex: 'prtnId',
            key: 'prtnId',
        },
        {
            title: '주문번호',
            dataIndex: 'dbpaB2cMallOrdNo',
            key: 'dbpaB2cMallOrdNo',
        },
        {
            title: '상품번호',
            dataIndex: 'dbpaB2cMallPrdNo',
            key: 'dbpaB2cMallPrdNo',
        },
        {
            title: '자재코드',
            dataIndex: 'prdCd',
            key: 'prdCd',
        },
        {
            title: '자재명',
            dataIndex: 'prdNm',
            key: 'prdNm',
        },
        {
            title: '수량',
            dataIndex: 'prdQty',
            key: 'prdQty',
        },
        {
            title: '상품 소비자가',
            dataIndex: 'cnsmAmt',
            key: 'cnsmAmt',
        },
        {
            title: '상품 비중',
            dataIndex: 'purPrdPrt',
            key: 'purPrdPrt',
        },
        {
            title: '환산가',
            dataIndex: 'prdUtprConvAmt',
            key: 'prdUtprConvAmt',
        },
        {
            title: '할인율',
            dataIndex: 'dcRt',
            key: 'dcRt',
        },
        ]
    ;

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

    const addSearchResult = (record) => {
        // alert(JSON.stringify(record))
        let r = JSON.parse(JSON.stringify(searchResult))
        alert(JSON.stringify(record))
        alert(JSON.stringify(r))
        r.push(record)
        setSearchResult(r)

    }
    const addEachResult = (currentValue, index) => {

        let result = currentValue;
        const ordItemList = currentValue?.ordItemList;
        if (!result) return;
        delete result?.ordItemList;

        let refSearchResult = new Array();
        ordItemList.forEach((value, index, array)=>{
            const record = Object.assign(currentValue, value)
            refSearchResult.push(JSON.parse(JSON.stringify(record)))
        });

        setSearchResult(Object.assign(searchResult, refSearchResult));
    }

    const makeSearchResult = (result) => {
        if (!result?.ordPriceList)
            return;
        let refSearchResult = new Array();

        setCurrent(result?.offset);
        setTotal(result?.total);
        setPageSize(result?.limit);

        result?.ordPriceList.forEach((value, index, array)=>{
            const ordItemList = value?.ordItemList;
            delete value?.ordItemList;
            let isFirst = true;

            ordItemList.forEach((value2, index2, array2)=>{
                if (isFirst){
                    isFirst = false;
                    const record = Object.assign(value, value2)
                    refSearchResult.push(JSON.parse(JSON.stringify(record)))
                } else {
                    let record = Object.assign({}, value2)
                    refSearchResult.push(JSON.parse(JSON.stringify(record)))
                }
            });
        });
        setSearchResult(refSearchResult)
    }

    const sampleDownloadClick = () => {
        const url = 'https://i-dev-piboapi.amorepacific.com/pibo/dbpa/download/ord-price-result?date=2020110';

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            console.log(response?.data)
            const blob = new Blob([response?.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'result2020110.xlsx');
        }).catch(function (error) {
            console.log(error);
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

    const sampleSearchClick = (page) => {
        let offset = 1;
        if ( typeof(page) === "number"){
            offset = page;
        }
        const url = "https://i-dev-piboapi.amorepacific.com/pibo/dbpa/ord-price-result?date=2021-12-06&offset=" + String(offset);

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            makeSearchResult(response?.data)
        }).catch(function (error) {
            console.log(error);
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

    const onRangePickerChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        setFromDate(dateStrings[0]);
        setToDate(dateStrings[1]);
    }

    const onSearchClick = () => {
        if (!fromDate){
            alert("no from date");
            return;
        }
        if (!toDate){
            alert("no to date");
            return;
        }

        const url = `https://i-dev-piboapi.amorepacific.com/pibo/dbpa/ord-price-result/history?startDate=${fromDate}&endDate=${toDate}`;

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            alert(JSON.stringify(response?.data));
        }).catch(function (error) {
            console.log(error);
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
                <RangePicker onChange={onRangePickerChange}/>
            <Button> 초기화 </Button><Button onClick={onSearchClick}> 조   회 </Button>
            </Space>
            <br/>
            <Table columns={taskColumns} dataSource={sampleData} size="small"/>
            <Button onClick={sampleSearchClick}>샘플 조회</Button> <Button onClick={sampleDownloadClick}>샘플 다운로드</Button>
            {/*<Button onClick={alert("hello")}>샘플 조회</Button> <Button>샘플 다운로드</Button>*/}
            <Table columns={ordDTOColumns}
                   dataSource={searchResult}
                   pagination={{
                       pageSize: 1000,
                       hideOnSinglePage: true
                   }}

                   size="small"  scroll={{ x: 2800 }}/>

           <Pagination
                       current={current}
                       total={total}
                       pageSize={pageSize}
                       showSizeChanger = {false}
                       showTotal={total => `Total ${total} items`}
                       onChange={(page, pageSize) => {
                           sampleSearchClick(page);
                       }}
                       />

        </Card>


    </>
    );
}
