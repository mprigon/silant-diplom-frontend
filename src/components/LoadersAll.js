import React, { useState } from "react";

import Table from "react-bootstrap/Table";


function LoadersAll(props) {
    const[sortedField, setSortedField] = useState(null);
    const { detailsloaders } = props;

    let sortedDetailsLoaders = [...detailsloaders]
    console.log('sorted from LoadersAll before sort', sortedDetailsLoaders);
    
    if (sortedField !== null) {
      sortedDetailsLoaders.sort((a,b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
      });
    }
    
    console.log('sorted from LoadersAll after sort', sortedDetailsLoaders);

    return (
        <React.Fragment>
          <Table striped responsive bordered="true">
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serialNumber')}>
                      Зав. № машины
                  </button>
                </th>
                <th>
                <button type="button" onClick={() =>
                    setSortedField('modelOfLoader')}>
                      Модель техники
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('modelOfEngine')}>
                      Модель двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serialNumberEngine')}>
                      Заводской номер двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('modelOfTransmission')}>
                      Модель трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serialNumberTransmission')}>
                      Заводской номер трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('modelOfLeadingAxle')}>
                      Модель ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serialNumberLeadingAxle')}>
                      Зав. № ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('modelOfSteerAxle')}>
                      Модель управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serialNumberSteerAxle')}>
                      Зав. № управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('supplyContractNumDate')}>
                      Договор поставки №, дата
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('dateOfShippingFactory')}>
                      Дата отгрузки с завода
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('recipient')}>
                      Грузополучатель (конечный потребитель)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('deliveryAddress')}>
                      Адрес поставки (эксплуатации)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('equipment')}>
                      Комплектация (доп. опции)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('client')}>
                      Клиент
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    setSortedField('serviceCompanyLoader')}>
                      Сервисная компания
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
                {sortedDetailsLoaders.map(item => (
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

export default LoadersAll;
