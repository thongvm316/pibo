import React, {useEffect, useState} from 'react';
import {
    Button, Card,
    Row, Form, Col, Typography, DatePicker
} from "antd";
import {RedoOutlined } from "@ant-design/icons";
import {  message } from 'antd';
import axios from "axios";
import {DBPA_UPLOAD_ORD_DATA, DBPA_UPLOAD_PRD_DATA} from "../config";
import moment from "moment";

const {  Text } = Typography;


export default function ProductAdjust(props){
    const [productForm] = Form.useForm();
    const [bmsForm] = Form.useForm();
    const [stateText, setStateText] = useState("Ready")
    const [uploadDisable, setuploadDisable] = useState(false)
    const [naverFile, setNaverFile] = useState(null)
    const [kakaoFile, setKakaoFile] = useState(null)

    const [bmsUploadDisable, setbmsUploadDisable] = useState(false)
    const [bmsFile, setBmsFile] = useState(null)
    const [bmsDate, setBmsDate] = useState("")

    const dateFormat = 'YYYY-MM-DD';


    useEffect(() => {
        productForm.setFieldsValue({
            form_date: getToday(),
            form_market: '',
            form_prod_no:'',
            form_brand:'',
            form_prod:'',
            form_price:0,
    });
        setBmsDate(getToday());
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

    const bmsInit = () => {
        setbmsUploadDisable(false)
        setBmsFile(null);
    }

    const init = () => {
        setuploadDisable(false)
        setNaverFile(null);
        setKakaoFile(null);
    }

    const bmsSubmitFile = () => {
        setbmsUploadDisable(true)
        const formData = new FormData();
        // formData.append()
        console.log(bmsFile);
        formData.append("bmsPrdFile", bmsFile);
        formData.append("ordDate", bmsDate);

        const url = process.env.REACT_APP_SERVER_HOST
            + DBPA_UPLOAD_PRD_DATA;

        const authStr =  `Bearer ${props.myCookies.get('pauth')}`;
        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;

        axios({
            method: "post",
            url: url,
            data: formData,
        }).then(function (response) {
            alert(response.data?.message);
            console.log(response);

            if ( response.data?.result === 'S'){
            }else{
            }
            return;
        }).catch(function (error) {
            console.log(error);
            alert(error)
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
                console.log(error)
            }
            else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }


    const submitFile = () => {
        setuploadDisable(true)

        const formData = new FormData();
        // formData.append()
        console.log(naverFile);
        console.log(kakaoFile);
        formData.append("kakaoOrdFile", kakaoFile);
        formData.append("naverOrdFile", naverFile);

        const url = process.env.REACT_APP_SERVER_HOST
            + DBPA_UPLOAD_ORD_DATA;

        const authStr =  `Bearer ${props.myCookies.get('pauth')}`;
        axios.defaults.headers.common['Authorization'] =  `Bearer ${props.myCookies.get('pauth')}`;

        axios({
            method: "post",
            url: url,
            data: formData,
        }).then(function (response) {

            alert(response.data?.message);
            console.log(response);

            if ( response.data?.result === 'S'){
            }else{
            }
            return;
        }).catch(function (error) {
            console.log(error);
            alert(error)
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
                console.log(error)
            }
            else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    const registerProduct = () => {
        const fieldValue = productForm.getFieldsValue();
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

    function getToDay(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() +1;
        const day = date.getDate();
        const dateStr = year +
            ( (month > 9)? "":"0") + month.toString()+
            ( (day > 9)? "": "0") + day.toString();
        return dateStr;
    }


    const handleBmsFileInput = (e) =>{
        setBmsFile(e.target.files[0])
    }

    const handleNaverFileInput = (e) =>{
        setNaverFile(e.target.files[0])
    }
    const handleKakaoFileInput = (e) =>{
        setKakaoFile(e.target.files[0]);
    }

    const onBmsDateChange = (dates, dateString) => {
        setBmsDate(dateString);
        alert(dateString);
    }


    return (
    <>
        <Card title="BMS 데이터 업로드" type = "inner"
              actions={[
                  <Button icon={<RedoOutlined />} onClick={() => {bmsInit()}} > 초기화 </Button>,
                  <Button icon={<RedoOutlined />} onClick={() => {bmsSubmitFile()}} disabled={bmsUploadDisable}> 업로드 </Button>,
              ]}
              size="small"
                style={{ width: 684, marginTop: 16 }}
        >
            <Form
                {...layout}
                form={bmsForm}
            >
                <Row gutter={32}>
                    <Col span = {6} offset={2}>
                        <Text level={3}> 날짜 : </Text>
                    </Col>
                    <Col span = {6}>
                        <DatePicker defaultValue={moment(getToday(), dateFormat)} format={dateFormat}
                        onChange = {onBmsDateChange}/>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span = {6} offset={2}>
                        <Text level={3}>BMS 정보 : </Text>
                    </Col>
                    <Col span = {6}>
                        <Form.Item name="bmsFile">
                            <input type="file"
                                   name="bmsFile"
                                   accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
                                   onChange={e => handleBmsFileInput(e)}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>

        <Card title="상품 가격 업로드" type = "inner"
              actions={[
                  <Button icon={<RedoOutlined />} onClick={() => {init()}} > 초기화 </Button>,
                  <Button icon={<RedoOutlined />} onClick={() => {submitFile()}} disabled={uploadDisable}> 업로드 </Button>,
              ]}
              size="small"
              style={{ width: 684, marginTop: 16 }}
        >
            <Form
                {...layout}
                form={productForm}
                // onFinish={onFinish}
            >
                <Row gutter={32}>
                    <Col span = {6} offset={2}>
                        <Text level={3}>네이버 상품정보 : </Text>
                    </Col>
                    <Col span = {6}>
                        <Form.Item name="navFile">
                            <input type="file"
                                   name="naverFile"
                                   accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
                                   onChange={e => handleNaverFileInput(e)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span = {6} offset={2}>
                        <Text level={3}>카카오 상품정보 : </Text>
                    </Col>
                    <Col span = {6}>
                        <Form.Item name="kakaoFile">
                            <input type="file" name="kakaoFile"  onChange={e => handleKakaoFileInput(e)}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>


    </>
    );
}
