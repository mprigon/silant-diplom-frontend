import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useLocation, Link } from "react-router-dom";

import LoadersAll_v2 from "./LoadersAll_v2";

import Table from "react-bootstrap/Table";

function PersonalAccount() {

    const token = localStorage.getItem('token');
    let isLoggedIn = false;
    isLoggedIn = true ? !!token : false;

    const location = useLocation();
    const { state } = location;
    console.log("state from PersonalAccount", state.from);
    const details = state.from;
    console.log("details PersonalAccount", details);

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
        <p>Личный кабинет</p>
        <div>
            {res}
        </div>
        <p>Таблица с сортировкой столбцов - можно кликнуть в заголовке столбца</p>
        <div className="section-table-content">
            <LoadersAll_v2 detailsloaders={details} />
        </div>

        <Link to="/">Вернуться на главную страницу</Link>
    </div>
    </div>
        
    <Footer />
    </React.Fragment>
    );
}

export default PersonalAccount;
