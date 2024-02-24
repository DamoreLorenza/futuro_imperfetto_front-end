import { Table } from "react-bootstrap"
import "./ReservationList.css"
import { useEffect, useState } from "react"


const ReservationList = () =>{
const [tableReservation, setTableReservation]= useState([])

const getTableReservations = () => {
  fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      console.log("data", data); // Controlla cosa viene restituito qui
      if (data && Array.isArray(data.content)) {
        setTableReservation(data.content);
        console.log("prenotazione", tableReservation)
      } else {
        setTableReservation([]);
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

useEffect(() => {
  getTableReservations();
}, []);


    return(
    
    <>
    <Table className="tableReservation" >
      <thead>
        <tr>
          <th className="table">Prenotazione a nome di</th>
          <th className="table">Numero persone</th>
          <th className="table">Data</th>
          <th className="table">Orario</th>
          <th className="table">Giochi prenotati</th>
        </tr>
      </thead>
      <tbody>
        {tableReservation.map((tableReservationItem, index) => (
          <tr key={index}>
            <td className="tableTwo">{tableReservationItem.user.name} {tableReservationItem.user.surname}</td>
            <td className="tableTwo"> {tableReservationItem.desk.seats}</td>
            <td className="tableTwo">{tableReservationItem.date}</td>
            <td className="tableTwo">{tableReservationItem.time}</td>
            <td className="tableTwo">{tableReservationItem.game.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>

    </>
    )
    
    }

    export default ReservationList