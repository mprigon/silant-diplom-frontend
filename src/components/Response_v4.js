import React, { useState } from "react";
import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

import "./css/style.css"

function Response_v4() {
    const[serialNumber, setSerialNumber] = useState('');
    // Loaders
    const[detailsLoaders, setDetailsLoaders] = useState([]);
    const[detailLoader, setDetailLoader] = useState([]);
    // choice: информация для отображения в таблице - "Общая инфо", "ТО" или "Рекламации"
    const[header, setHeader] = useState();
    const[res, setRes] = useState();
    // TechService
    const[detailsTSAll, setDetailsTSAll] = useState([]);
    const[detailTS, setDetailTS] = useState([]);
    // Claims
    const[detailsClAll, setDetailsClAll] = useState([]);
    const[detailCl, setDetailCl] = useState([]);


    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    let resultSerNum;
    let isLoggedIn = false;
    isLoggedIn = true ? !!token : false;
    console.log('token in Response: ', token);

    let mistakeHTTPinLoaders;
    
    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log('formJson in Response: ', formJson);

        // const token = localStorage.getItem('token');
        console.log('token in handleSubmit Response: ', token);

        // запрос погрузчиков
        const url = "http://127.0.0.1:8000/api/v1/loaderlist/"

        let response = await fetch(url,
            {
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                         },

            });
        
        // headers: { 'Authorization': `Token ${token}` }

        if (response.ok) {
            let resultJson = await response.json();
            console.log('resultJson in fetch: ', resultJson);
            setDetailsLoaders(resultJson);

            // поиск сведений о погрузчике с серийным номером serialNumber
            resultSerNum = resultJson.find(item => item.serialNumber == serialNumber);
            if (resultSerNum != undefined) {
              console.log('resultSerNum from handleSubmit Response_v4: ', resultSerNum);
              setDetailLoader([resultSerNum]);
            } else {
              alert(`Отсутствует погрузчик с серийным номером ${serialNumber}`);
            }
        } else {
            alert('Ошибка HTTP: ' + response.status);
            mistakeHTTPinLoaders = true;
        }        

        // запрос технического обслуживания
        const urlTS = "http://127.0.0.1:8000/api/v1/techservicelist/"

        let responseTS = await fetch(urlTS,
            {
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                         },

            });

        if (responseTS.ok) {
            let resultJsonTS = await responseTS.json();
            console.log('resultJsonTS in fetch: ', resultJsonTS);
            setDetailsTSAll(resultJsonTS);

            // поиск сведений о ТО погрузчика с серийным номером serialNumber
            let resultTSSerNum = resultJsonTS.filter(item => item.loaderOnTechService == serialNumber);
            if (resultTSSerNum != -1) {
              console.log('resultTSSerNum from handleSubmit Response_v4: ', resultTSSerNum);
              setDetailTS(resultTSSerNum);
            } else {
              alert(`Отсутствует ТО погрузчика с серийным номером {serialNumber}`);
            }
        } else {
            alert('Ошибка HTTP: ' + responseTS.status);
        } 

        // запрос рекламаций
        const urlCl = "http://127.0.0.1:8000/api/v1/claimslist/"

        let responseCl = await fetch(urlCl,
            {
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                         },

            });

        if (responseCl.ok) {
            let resultJsonCl = await responseCl.json();
            console.log('resultJsonCl in fetch: ', resultJsonCl);
            setDetailsClAll(resultJsonCl);

            // поиск сведений о ТО погрузчика с серийным номером serialNumber
            let resultClSerNum = resultJsonCl.filter(item => item.loaderOnClaim == serialNumber);
            if (resultClSerNum != -1) {
              console.log('resultClSerNum from handleSubmit Response_v4: ', resultClSerNum);
              setDetailCl(resultClSerNum);
            } else {
              alert(`Отсутствует рекламация для погрузчика с серийным номером {serialNumber}`);
            }
        } else {
            alert('Ошибка HTTP: ' + responseCl.status);
        } 
      
        // сразу строим таблицу "Общая информация"
        // если так не строить, то таблица появится только после нажатия на кнопку
        // "Общая инфо"
        console.log('mistakeHTTPinLoaders', mistakeHTTPinLoaders);
        if (!mistakeHTTPinLoaders) {
          const resultSerNumArr = [resultSerNum];
          let resCommon = resultSerNumArr.map(function(item) {
            return <tr key={item.id}>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumber}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfLoader}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfEngine}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberEngine}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfTransmission}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberTransmission}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfLeadingAxle}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberLeadingAxle}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfSteerAxle}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberSteerAxle}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.supplyContractNumDate}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateOfShippingFactory}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.recipient}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.deliveryAddress}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.equipment}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.client}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.serviceCompanyLoader}</Link></td>
            </tr>;
          });
          let headerCommon =  <tr>
            <th>Зав. № машины</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Заводской номер двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Заводской номер трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Договор поставки №, дата</th>
            <th>Дата отгрузки с завода</th>
            <th>Грузополучатель (конечный потребитель)</th>
            <th>Адрес поставки (эксплуатации)</th>
            <th>Комплектация (доп. опции)</th>
            <th>Клиент</th>
            <th>Сервисная компания</th>
          </tr>;

          setRes(resCommon);
          setHeader(headerCommon);
        }

    }
    
    // Обработчик кнопки "Общая информация"
    function handleClickCommon(event) {
        event.preventDefault();
        
        let resCommon = detailLoader.map(function(item) {
            return <tr key={item.id}>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumber}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfLoader}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfEngine}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberEngine}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfTransmission}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberTransmission}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfLeadingAxle}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberLeadingAxle}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.modelOfSteerAxle}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{item.serialNumberSteerAxle}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.supplyContractNumDate}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateOfShippingFactory}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.recipient}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.deliveryAddress}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.equipment}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.client}</Link></td>
                <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.serviceCompanyLoader}</Link></td>
            </tr>;
        });
        let headerCommon =  <tr>
            <th>Зав. № машины</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Заводской номер двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Заводской номер трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Договор поставки №, дата</th>
            <th>Дата отгрузки с завода</th>
            <th>Грузополучатель (конечный потребитель)</th>
            <th>Адрес поставки (эксплуатации)</th>
            <th>Комплектация (доп. опции)</th>
            <th>Клиент</th>
            <th>Сервисная компания</th>
          </tr>;
        setRes(resCommon);
        setHeader(headerCommon);
    }
    
    // Обработчик кнопки "ТО"
    function handleClickService(event) {
        event.preventDefault();
        let resTS = detailTS.map(function(item) {
          return <tr key={item.id}>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.typeTechService}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateTechService}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.operatingTimeTech}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.numberWorkOrder}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateWorkOrder}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.loaderOnTechService}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.techServiceCompany}</Link></td>
          </tr>;
      });
      let headerTS =  <tr>
          <th>Вид ТО</th>
          <th>Дата проведения ТО</th>
          <th>Наработка, м/час</th>
          <th>№ заказ-наряда</th>
          <th>Дата заказ-наряда</th>
          <th>Машина</th>
          <th>Сервисная компания</th>
        </tr>;
      setRes(resTS);
      setHeader(headerTS);
    }
    
    // Обработчик кнопки "Рекламации"
    function handleClickClaims(event) {
        event.preventDefault();
        let resCl = detailCl.map(function(item) {
          return <tr key={item.id}>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateFailure}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.operatingTimeClaim}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.unitFailure}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.detailsFailure}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.methodRepair}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.spareParts}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.dateRepair}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.durationDownTime}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.loaderOnClaim}</Link></td>
              <td><Link to="/" className="section-main-panel-table-row-link">{isLoggedIn && item.repairServiceCompany}</Link></td>
          </tr>;
      });
      let headerCl =  <tr>
          <th>Дата отказа</th>
          <th>Наработка, м/час</th>
          <th>Узел отказа</th>
          <th>Описание отказа</th>
          <th>Способ восстановления</th>
          <th>Используемые запасные части</th>
          <th>Дата восстановления</th>
          <th>Время простоя техники</th>
          <th>Машина</th>
          <th>Сервисная компания</th>
        </tr>;
      setRes(resCl);
      setHeader(headerCl);
    }
    
    console.log('serialNumber from Response_v4: ', resultSerNum);
    console.log('detailsClAll from Response_v4:', detailsClAll);
    console.log('detailCl from Response_v4:', detailCl);

    return (
        <React.Fragment>
          <section className="section-main-panel">
            <div className="section-instruction">
                Проверьте комплектацию и технические характеристики техники Силант
            </div>
            <div className='section-form'>
                <form method='post' onSubmit={handleSubmit} className="section-form-content">
                    <label htmlFor='serialNumber' className="section-form-search-input">Заводской номер:</label>
                    <input
                        type='number'
                        name='serialNumber'
                        value={serialNumber}
                        onChange={event => setSerialNumber(event.target.value)}
                        className='form'
                        placeholder='0000'
                        id='serialNumber'
                        required
                    />
                    <input type='submit' value='Поиск' className='section-form-search-btn' />
                </form>
            </div>
            <div className="section-instruction">
              Результат поиска:
            </div>
            <div className="info-block">
              Клиент/Сервисная компания (от кого авторизовались): {user}
            </div>
            <div className="section-header">
              Информация о комплектации и технических характеристиках Вашей техники
            </div>
            <p>Погрузчик с заводским номером {serialNumber}</p>
            <div className="section-table-tab-block">
              <button onClick={handleClickCommon} disabled={!serialNumber} className="section-table-tab-block-btn">общая инфо</button>
              <button onClick={handleClickService} disabled={!serialNumber} className="section-table-tab-block-btn">ТО</button>
              <button onClick={handleClickClaims} disabled={!serialNumber} className="section-table-tab-block-btn">рекламации</button>
            </div>
            
            <div className="section-table-content">
               <Table striped responsive bordered="true">
                 <thead>
                  {header}
                 </thead>
                 <tbody>
                   {res}
                 </tbody>
                </Table>
            </div>

          </section>
        </React.Fragment>        
    );
}

export default Response_v4;
