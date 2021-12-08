import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UBOMain from "./component/UBOMain";
import LoginMain from "./component/LoginMain";
import {Cookies} from "react-cookie"
import 'antd/dist/antd.css';


function App() {
  const cookies = new Cookies();
  return (
    <div className="App">
        <LoginMain myCookies = {cookies}/>
        <UBOMain myCookies = {cookies}/>
    </div>
  );
}

export default App;
