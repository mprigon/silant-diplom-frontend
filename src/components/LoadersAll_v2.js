import React, { useMemo, useState } from "react";

import Table from "react-bootstrap/Table";

import "./css/style.css"

import  { testLoaderList } from "./datadb/dataLoaderList.js";

import arrow_up from "./img/arrow_up.png";
import arrow_down from "./img/arrow_down.png";

    
const useSortableData = (items, config = null) => {
  const[sortConfig, setSortConfig] = useState(config);
  console.log('items: ', items);
  console.log('sortConfig: ', sortConfig);

  const sortedItems = useMemo(() => {      
    let sortableItems = [...items];
    console.log('sortableItems: ', sortableItems);

    if (sortConfig !== null) {
      sortableItems.sort((a,b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 :
            1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 :
            -1;
        }
        return 0;
      });
    }
    return sortableItems;
    // useMemo завершение    
  }, [items, sortConfig]);
    
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
      ) {
      direction = 'descending';
    }
    setSortConfig({key, direction});
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  function LoadersAll_v2(props) {
    console.log('props.detailsloaders: ', props.detailsloaders);
    const {items, requestSort, sortConfig } = useSortableData(props.detailsloaders);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined
    };
  
    return (
        <React.Fragment>
          <Table striped responsive bordered="true">
            <thead>
              <tr>
                <th>
                  {sortConfig != null && sortConfig.direction == 'ascending' && <img src={ arrow_up } />}
                  {sortConfig != null && sortConfig.direction == 'descending' && <img src={ arrow_down } />}
                  <button type="button" onClick={() =>
                    requestSort('serialNumber')} className="table-header-sorting-button">
                      Зав. № машины
                  </button>
                </th>
                <th>
                  <button type="button" className="sorted-table-arrow-up table-header-sorting-button" onClick={() =>
                    requestSort('modelOfLoader')}>
                      Модель техники
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('modelOfEngine')} className="table-header-sorting-button">
                      Модель двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('serialNumberEngine')} className="table-header-sorting-button">
                      Заводской номер двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('modelOfTransmission')} className="table-header-sorting-button">
                      Модель трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('serialNumberTransmission')} className="table-header-sorting-button">
                      Заводской номер трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('modelOfLeadingAxle')} className="table-header-sorting-button">
                      Модель ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('serialNumberLeadingAxle')} className="table-header-sorting-button">
                      Зав. № ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('modelOfSteerAxle')} className="table-header-sorting-button">
                      Модель управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('serialNumberSteerAxle')} className="table-header-sorting-button">
                      Зав. № управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('supplyContractNumDate')} className="table-header-sorting-button">
                      Договор поставки №, дата
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('dateOfShippingFactory')} className="table-header-sorting-button">
                      Дата отгрузки с завода
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('recipient')} className="table-header-sorting-button">
                      Грузополучатель (конечный потребитель)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('deliveryAddress')} className="table-header-sorting-button">
                      Адрес поставки (эксплуатации)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('equipment')} className="table-header-sorting-button">
                      Комплектация (доп. опции)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('client')} className="table-header-sorting-button">
                      Клиент
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('serviceCompanyLoader')} className="table-header-sorting-button">
                      Сервисная компания
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.serialNumber}</td>
                        <td>{item.modelOfLoader}</td>
                        <td>{item.modelOfEngine}</td>
                        <td>{item.serialNumberEngine}</td>
                        <td>{item.modelOfTransmission}</td>
                        <td>{item.serialNumberTransmission}</td>
                        <td>{item.modelOfLeadingAxle}</td>
                        <td>{item.serialNumberLeadingAxle}</td>
                        <td>{item.modelOfSteerAxle}</td>
                        <td>{item.serialNumberSteerAxle}</td>
                        <td>{item.supplyContractNumDate}</td>
                        <td>{item.dateOfShippingFactory}</td>
                        <td>{item.recipient}</td>
                        <td>{item.deliveryAddress}</td>
                        <td>{item.equipment}</td>
                        <td>{item.client}</td>
                        <td>{item.serviceCompanyLoader}</td>
                    </tr>
                ))}
            </tbody>
          </Table>

        </React.Fragment>
    )
}

export default LoadersAll_v2;
