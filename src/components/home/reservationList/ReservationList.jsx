import { Button, Table } from "react-bootstrap"
import "./ReservationList.css"
import { useEffect, useState } from "react"


const ReservationList = () =>{
const [tableReservation, setTableReservation]= useState([])
const [screenSize, setScreenSize] = useState(getScreenSize());



    // per schermo table
    const isFullScreen = screenSize.width > 950 && screenSize.height > 640;
    const isSmallScreen = screenSize.width < 950;

    useEffect(() => {
        function handleResize() {
            setScreenSize(getScreenSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

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


// const getSeatsForReservation = (deskId) => {
//   fetch(`${process.env.REACT_APP_BACKEND}/tableReservation/${deskId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Errore durante il recupero degli ID dei desk per la prenotazione");
//     }
//   })
//   .then((data) => {
//     console.log("Desk IDs for reservation", data);
//     // Gestisci i dati qui, ad esempio aggiornando lo stato del componente
//   })
//     .catch((err) => {
//       console.log("Errore durante il recupero dei posti per la prenotazione", err);
//     });
// };

// // Aggiorna il secondo hook useEffect per chiamare la funzione getSeatsForReservation per ogni prenotazione del tavolo
// useEffect(() => {
//   tableReservation.forEach(getSeatsForReservation);
// }, [tableReservation]);


    return(
    
    <>


{
  isSmallScreen ? (
    // Renderizza la vista per schermi piccoli
    <div className="tableReservation ">
      {tableReservation.map((tableReservationItem, index) => (
        <div key={index} className={isPastDate(tableReservationItem.date) ? 'past-date' : ''}>
          <ul className="table">
            <li className="listWrite">Prenotazione a nome di: {tableReservationItem.user.name} {tableReservationItem.user.surname}</li>
            <li className="listWrite">Numero persone: {tableReservationItem.deskId}</li>
            {/* <td className="tableTwo">{tableReservationItem.desk.map(deskId => <div key={deskId}>{deskId}</div>)}</td>  */}
            <li className="listWrite">Data: {tableReservationItem.date}</li>
            <li className="listWrite">Orario: {tableReservationItem.time}</li>
            <li className="listWrite">Giochi prenotati: {tableReservationItem.game}</li>
            <li className="buttonEliminaRiga">
              <Button className="buttonEliminaRiga" onClick={() => deleteTableReservations(tableReservationItem.id)}>Elimina</Button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  ) : (




//per schermo pieno
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
              <td className="tableTwo">{tableReservationItem.desk}</td>
              <td className="tableTwo">{tableReservationItem.date}</td>
              <td className="tableTwo">{tableReservationItem.time}</td>
              <td className="tableTwo">{tableReservationItem.game}</td>
              <td className="buttonEliminaRiga"><Button className="buttonEliminaRiga" onClick={() => deleteTableReservations(tableReservationItem.id)}>Elimina</Button></td>
            </tr>
        ))}
      </tbody>
    </Table>
    )  }
    </>
    )
    
    }

    export default ReservationList