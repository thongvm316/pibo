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
import AsyncTable from "./AsyncTable";
import {
    DBPA_ORD_PRICE_RESULT_URL,
    DOWNLOAD_ORD_PRICE_FILE_URL,
    ORD_PRICE_RESULT_HISTORY_URL,
    ORD_PRICE_RESULT_URL
} from "../config";


const { Title, Text, Link } = Typography;


export default function PriceInfo(props){
    const [productForm] = Form.useForm();
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultDate, setSearchResultDate] = useState("");

    const [searchTotal, setSearchTotal] = useState(0);
    const [searchCurrent, setSearchCurrent] = useState(1);
    const [searchPageSize, setSearchPageSize] = useState(20);

    const [historyTotal, setHistoryTotal] = useState(0);
    const [historyCurrent, setHistoryCurrent] = useState(1);
    const [historyPageSize, setHistoryPageSize] = useState(20);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [historyResult, setHistoryResult] = useState([]);


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
            dataIndex: 'stlmDttmStr',
            key: 'stlmDttmStr',
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
            dataIndex: 'optnPrdAmtStr',
            key: 'optnPrdAmtStr',
        },
        {
            title: '총할인액',
            dataIndex: 'ttOrdPrdDcAmtStr',
            key: 'ttOrdPrdDcAmtStr',
        },
        {
            title: '상품별할인금액',
            dataIndex: 'prdTtDcAmtStr',
            key: 'prdTtDcAmtStr',
        },
        {
            title: '쿠폰등 할인금액',
            dataIndex: 'cpnAplyDcAmtStr',
            key: 'cpnAplyDcAmtStr'
        },
        {
            title: '주문별 총주문금액',
            dataIndex: 'ordPrdAmtStr',
            key: 'ordPrdAmtStr',
        },
        {
            title: '배송비',
            dataIndex: 'dlcsAmtStr',
            key: 'dlcsAmtStr',
        },
        {
            title: '실구매금액',
            dataIndex: 'realPurAmtStr',
            key: 'realPurAmtStr',
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
            dataIndex: 'cnsmAmtStr',
            key: 'cnsmAmtStr',
        },
        {
            title: '비중',
            dataIndex: 'purPrdPrtStr',
            key: 'purPrdPrtStr',
        },
        {
            title: '1EA 당 환산',
            dataIndex: 'prdUtprConvAmtStr',
            key: 'prdUtprConvAmtStr',
        },
        {
            title: '할인율',
            dataIndex: 'dcRtStr',
            key: 'dcRtStr',
        },

    ];

    const searchClick = (enabled, date, page) => {
        let offset = 1;
        if ( typeof(page) === "number"){
            offset = page;
        }
        console.log(enabled, date)
        if (!enabled)
            return;
        const url = process.env.REACT_APP_SERVER_HOST
            + DBPA_ORD_PRICE_RESULT_URL
            + `?date=${String(date)}&offset=${String(offset)}`;

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            makeSearchResult(response?.data, date)
        }).catch(function (error) {
            console.log(error);
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
            title: 'Action',
            dataIndex: 'downloadFlg',
            key: 'downloadFlg',
            render: (text,record) => <>
                {/*{alert(text)}*/}
                <Button disabled={!text}
                        onClick = {() => searchClick(text, record.date, 1)}
                > 조회 </Button>
                <Button disabled={!text} onClick={() => excelDownloadClick(record.date)}>엑셀 다운로드 </Button>
            </>,
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


    const getToday = () => {
        const d = new Date();
        return  d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
    }
    const registerProduct = () => {
        const fieldValue = productForm.getFieldsValue();

        // alert(fieldValue?.form_date);

    }

    const onSaveClick = () => {
        const fieldValue = productForm.getFieldsValue();
        // alert('abao')
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
        // alert(JSON.stringify(record))
        // alert(JSON.stringify(r))
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

    const makeSearchResult = (result, date) => {
        if (!result?.ordPriceList)
            return;
        let refSearchResult = new Array();

        // alert(JSON.stringify(result));
        setSearchCurrent(result?.offset);
        setSearchTotal(result?.total);
        setSearchPageSize(result?.limit);

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
        setSearchResultDate(date);
        setSearchResult(refSearchResult);
    }

    const excelDownloadClick = (date) => {
        const url = process.env.REACT_APP_SERVER_HOST
            + DOWNLOAD_ORD_PRICE_FILE_URL
            + "?date=" + date;

        axios.defaults.headers.common['Authorization'] = `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
        }).then(function (response) {
            console.log(response?.data)
            const blob = new Blob([response?.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            FileSaver.saveAs(blob, `result_${date}.xlsx`);
        }).catch(function (error) {
            console.log(error);
            // alert(JSON.stringify(error.response?.data))
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

    const makeHistoryTable = (data) =>{
        // alert(JSON.stringify(data.history))
        // alert(data?.total); // 24
        // alert(data?.limit); // 20
        // alert(data?.offset); // 1

        setHistoryCurrent(data?.offset);
        setHistoryTotal(data?.total);
        setHistoryPageSize(data?.limit);

        setFromDate(data?.startDate);
        setToDate(data?.endDate);
        setHistoryResult(JSON.parse(JSON.stringify(data.history)));
    }
    const onHistorySearchClick = (page) => {
        if (!fromDate){
            alert("시작 날짜를 넣아주세요.");
            return;
        }
        if (!toDate){
            alert("종료 날짜를 넣아주세요.");
            return;
        }
        const url = process.env.REACT_APP_SERVER_HOST
            + ORD_PRICE_RESULT_HISTORY_URL
            + `?startDate=${fromDate}&endDate=${toDate}&offset=${page}`;

        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;
        axios({
            method: 'get',
            url: url,
        }).then(function (response) {
            makeHistoryTable(response?.data);
        }).catch(function (error) {
            console.log(error);
            // alert(JSON.stringify(error.response?.data))
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
            <Button onClick={() => onHistorySearchClick(1) }> 조   회 </Button>

            </Space>
            <br/><br/>

            <AsyncTable
                asyncCurrent={historyCurrent}
                asyncTotal={historyTotal}
                asyncPageSize={historyPageSize}
                asyncOnChange={(page, pageSize) => {
                    onHistorySearchClick(page);
                }}


                asyncColumns={taskColumns}
                asyncDataSource = {historyResult}
                fromDate = {fromDate}
                toDate = {toDate}
                asyncPagination = {{
                    pageSize: 1000,
                    hideOnSinglePage: true
                }}
            />
            <br/><br/>

            {/*<Button onClick={sampleSearchClick}>샘플 조회</Button> <Button onClick={sampleDownloadClick}>샘플 다운로드</Button>*/}

            <AsyncTable
                asyncCurrent={searchCurrent}
                asyncTotal={searchTotal}
                asyncPageSize={searchPageSize}
                asyncOnChange={(page, pageSize) => {
                    searchClick(true, searchResultDate, page);
                }}

                asyncColumns={ordDTOColumns}
                asyncDataSource = {searchResult}
                date = {searchResultDate}
                asyncPagination = {{
                    pageSize: 1000,
                    hideOnSinglePage: true
                }}
                asyncScroll={{ x: 2800 }}
        />

        </Card>


    </>
    );
}
