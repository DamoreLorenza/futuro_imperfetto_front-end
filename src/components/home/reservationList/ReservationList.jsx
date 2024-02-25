import { Button, Table } from "react-bootstrap"
import "./ReservationList.css"
import { useEffect, useState } from "react"


const ReservationList = () =>{
const [tableReservation, setTableReservation]= useState([])

  // Funzione per verificare se una data è passata
  const isPastDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today;
  };


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
      console.log("data", data);
      if (data && Array.isArray(data.content)) {
        // Ordina le prenotazioni per data in ordine crescente
        const sortedReservations = data.content.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTableReservation(sortedReservations);
        console.log("prenotazione", sortedReservations);
      } else {
        setTableReservation([]);
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};



const deleteTableReservations = (tableReservationId) => {
  fetch(`${process.env.REACT_APP_BACKEND}/tableReservation/${tableReservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.ok) {
      // Rimuovo la prenotazione eliminata dall'elenco
      const updatedReservations = tableReservation.filter(tableReservation => tableReservation.id !== tableReservationId);
      setTableReservation(updatedReservations);
      console.log("Prenotazione eliminata con successo");
    } else {
      throw new Error("Errore durante l'eliminazione della prenotazione");
    }
  })
  .catch((err) => {
    console.log("Errore durante l'eliminazione della prenotazione", err);
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
          <th className="buttonEliminaRiga"></th>
        </tr>
      </thead>
      <tbody>
        {tableReservation.map((tableReservationItem, index) => (
          <tr key={index} className={isPastDate(tableReservationItem.date) ? 'past-date' : ''}>
              <td className="tableTwo">{tableReservationItem.user.name} {tableReservationItem.user.surname}</td>
              <td className="tableTwo"> {tableReservationItem.desk.seats}</td>
              <td className="tableTwo">{tableReservationItem.date}</td>
              <td className="tableTwo">{tableReservationItem.time}</td>
              <td className="tableTwo">{tableReservationItem.game.name}</td>
              <td className="buttonEliminaRiga"><Button className="buttonEliminaRiga" onClick={() => deleteTableReservations(tableReservationItem.id)}>Elimina</Button></td>
            </tr>
        ))}
      </tbody>
    </Table>

    </>
    )
    
    }

    export default ReservationList