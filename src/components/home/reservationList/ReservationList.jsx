import { Table } from "react-bootstrap"
import "./ReservationList.css"
import { useEffect, useState } from "react"


const ReservationList = () =>{
const [tableReservation, setTableReservation]= useState([])

const getTableReservation = ()=>{

    fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`,{
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    }})
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .then((data) => {
        console.log("data", data);
        if (data && Array.isArray(data.content)) {
            setTableReservation(data.content);
        } else {
            setTableReservation([]); 
        }
    })
      .catch((err) => {
        console.log("errore", err);
      })
    } 


useEffect(()=>{
    getTableReservation()},
[]
)

    return(
    
    <>
    {tableReservation.map((tableReservationItem, index)=>(
    <Table key={index} className="tableReservation" striped bordered hover>
      <thead>
        <tr>
          <th>Tavolo/Numero persone</th>
          <th>Prenotazione a nome di</th>
          <th>Data</th>
          <th>Giochi prenotati</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{tableReservationItem.desk}</td>
          <td>{tableReservationItem.user}</td>
          <td>{tableReservationItem.date}</td>
          <td>{tableReservationItem.game}</td>
        </tr>
      </tbody>
    </Table>
  ))  }
    </>
    )
    
    }

    export default ReservationList