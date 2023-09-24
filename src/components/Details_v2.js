import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useLocation, Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

function Details_v2() {

    const token = localStorage.getItem('token');
    let isLoggedIn = false;
    isLoggedIn = true ? !!token : false;

    const location = useLocation();
    const { state } = location;
    console.log("state from Details_v2", state.from);
    const details = state.from;
    console.log("details Details_v2", details);

    let res = details.map(function(item) {
        return <p key={item.id}>
            <span>Заводской номер погрузчика: {item.serialNumber}</span>
            <span>Модель погрузчика: {item.modelOfLoader}</span>
        </p>
    })

    return(
    <React.Fragment>
    <Header />
    <div className="container">
    <div className="section-main-panel">
        <p>Дополнительная информация</p>
        <div>
            {res}
        </div>
        <Link to="/">Вернуться на главную страницу</Link>
    </div>
    </div>
        
    <Footer />
    </React.Fragment>
    );
}

export default Details_v2;
