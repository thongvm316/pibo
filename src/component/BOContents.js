import React from 'react';
import ProductInfo from "../Contents/ProductInfo";
import BatchUpdate from "../Contents/BatchUpdate";
import MallInfo from "../Contents/MallInfo";
import InterfaceResult from "../Contents/InterfaceResult";
import AttributeInfo from "../Contents/AttributeInfo";
import NoticeInfo from "../Contents/NoticeInfo";
import SynonymDic from "../Contents/SynonymDic";
import PriceInfo from "../Contents/PriceInfo";
import PriceAdjust from "../Contents/PriceAdjust";

export default function BOContents(props){
    const Keys = [
        { contentsKey : "011", func: (<PriceInfo  myCookies = {props.myCookies}/>)},
        { contentsKey : "012", func: (<PriceAdjust myCookies = {props.myCookies}/>)},
        { contentsKey : "111", func: (<ProductInfo/>)},
        { contentsKey : "112",  func: (<BatchUpdate/>)},
        { contentsKey : "113",  func: (<MallInfo/>)},
        { contentsKey : "114",  func: (<InterfaceResult/>)},
        { contentsKey : "121",  func: (<AttributeInfo/>)},
        { contentsKey : "122",  func: (<NoticeInfo/>)},
        { contentsKey : "211",  func: (<SynonymDic/>)},
    ];
    const writeContents = () =>{
        for (const content of Keys) {
            if (content.contentsKey === props.contentsKey){
                return content.func;
            }
        }
    }

    return (
            <>
                {writeContents()}
            </>
        );
}
