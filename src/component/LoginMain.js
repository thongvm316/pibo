import React, {useEffect, useState} from 'react';
import {Form, Input,  Modal} from 'antd';
import '../index-342fc69c.css';
import axios from "axios";
import {Cookies} from "react-cookie"


import Checkbox from "antd/es/checkbox/Checkbox";

export default function LoginMain(){
    const [isVisible, setIsVisible] = useState(true)
    const [loginForm] = Form.useForm();

    const cookies = new Cookies()

    useEffect(() => {

    }, []);

    const handleCancel = () => {
        setIsVisible(false);
    };

    const TestSend = (pauth) => {
        const url = "https://i-dev-piboapi.amorepacific.com/pibo/pims/api/v1/031/attributes/10039";

        const pauth2 = cookies.get('pauth')
        axios.defaults.headers.common['Authorization'] = `Bearer ${pauth2}`
        axios({
            method: 'get',
            url: url,
            data: {
            },
            // config: config
        }).then(function (response) {
            console.log(response?.data);
            alert(JSON.stringify(response?.data));
        }).catch(function (error) {
            console.log(error);
            alert(error?.message)
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

    const loginOk = () => {
        const fieldValue = loginForm.getFieldsValue();
        const paramId = fieldValue['id'];
        const paramPassword = fieldValue['password']

        const url = "https://i-dev-piboapi.amorepacific.com/pibo/login";

        axios({
            method: 'post',
            url: url,
            data: {
                id: paramId,
                password: paramPassword,
            },
            config: { withCredentials: true },

        }).then(function (response) {

            alert(response.data?.message);
            console.log(response);

            if ( response.data?.result === 'S'){
                setIsVisible(false);
                cookies.set("pauth", response.headers?.pauth);
                cookies.set("pid", paramId)
                TestSend(response.data?.pauth);
            }else{
                setIsVisible(true);
            }
            return;
        }).catch(function (error) {
            console.log(error);
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
    const onFinishFailed = () => {

    }

    const onFinish = (values: any) => {
    };
    return (
        <div>
            <Modal title="플랫폼 통합 BO 로그인" visible={isVisible} onOk={loginOk} onCancel={handleCancel}>

            <Form
                name="basic"
                form={loginForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style = {{verticalAlign: "middle"}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="id"
                    name="id"
                    rules={[{ required: true, message: 'AP-ON id 를 넣으세요.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '암호를 넣으세요.' }]}

                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

            </Form>
            </Modal>
        </div>
    );
}
