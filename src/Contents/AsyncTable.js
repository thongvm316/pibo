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


export default function AsyncTable(props){
    return (
        <>

                <Pagination
                    // style = {{visibility: "hidden"}}
                    current={props.asyncCurrent}
                    total={props.asyncTotal}
                    pageSize={props.asyncPageSize}
                    showSizeChanger = {false}
                    showTotal={ (total)  =>{
                        if ( props.fromDate || props.toDate) {
                            return `[${props.fromDate} ~ ${props.toDate}] Total ${props.asyncTotal} items`;
                        }
                        if( props.date)
                            return `[${props.date}] Total ${props.asyncTotal} items`;
                    }}
                    onChange={props.asyncOnChange}
                /><br/>

                <Table columns={props.asyncColumns}
                       dataSource={props.asyncDataSource}
                       pagination={props.asyncPagination}
                       size="small"
                       scroll={props.asyncScroll}/>

        </>
    );
}
