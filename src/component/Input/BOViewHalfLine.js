import React from 'react';
import {
    Form,
    Typography,
    Dropdown, Menu, message, Col,
} from "antd";
import {UserOutlined} from "@ant-design/icons";
import PropertyTitle from "../Text/PropertyTitle";
import PropertyData from "../Text/PropertyData";

export default function BOViewHalfLine(props){

    return (
        <>
            <PropertyTitle text = {props.name}/>
            <PropertyData text = "0" span = "8"/>
       </>
    );
}
