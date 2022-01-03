import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UBOMain from "./component/UBOMain";
import LoginMain from "./component/LoginMain";
import {Cookies} from "react-cookie"
import 'antd/dist/antd.css';


function App() {
  const cookies = new Cookies();
  const [menuTree, setMenuTree] =  useState([]);

    return (
    <div className="App">
        <LoginMain
            myCookies = {cookies}
            menuTree = {menuTree}
            setMenuTree = {setMenuTree}
        />
        <UBOMain
            myCookies = {cookies}
            menuTree = {menuTree}
            setMenuTree = {setMenuTree}
        />
    </div>
  );
}

export default App;
