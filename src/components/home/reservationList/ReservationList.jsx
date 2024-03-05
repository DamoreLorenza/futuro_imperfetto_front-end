import { Button, Table } from "react-bootstrap"
import "./ReservationList.css"
import { useEffect, useState } from "react"


const ReservationList = () =>{
const [tableReservation, setTableReservation]= useState([])
const [screenSize, setScreenSize] = useState(getScreenSize());

const [reservationId, setReservationId] = useState([])
const [gameId, setGameId] = useState([])
const [deskId, setDeskId] = useState([])


const [gameNames, setGameNames] = useState([]);
const [gameNamesById, setGameNamesById] = useState({});

const [deskSeats, setDeskSeats] = useState([]);
const [deskSeatsById, setDeskSeatsById] = useState({});


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
      if (data && Array.isArray(data.content)) {
        const sortedReservations = data.content.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTableReservation(sortedReservations);
        const reservationIds = data.content.map((reservation) => reservation.id);
        reservationIds.forEach((id) => {
          getTableReservationById(id);
        });
      } else {
        setTableReservation([]);
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};



const getTableReservationById = (id) => {
  fetch(`${process.env.REACT_APP_BACKEND}/tableReservation/${id}/complete`, {
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
        throw new Error("Errore durante il recupero della prenotazione");
      }
    })
    .then((data) => {
      console.log("Dati prenotazione:", data);
      console.log("desk", data.idDesk);
      console.log("game", data.idGame);

      if (Array.isArray(data.content)) {
        const reservationIds = data.content.map((reservation) => {
          if (reservation.idGame) {
            const idGame = Array.isArray(reservation.idGame) ? reservation.idGame[0] : reservation.idGame;
            // getGameName(idGame);
            getGameName(idGame, reservation.id); // Utilizza reservation.id come reservationId
          }
          if (reservation.idDesk) {
            const idDesk = Array.isArray(reservation.idDesk) ? reservation.idDesk[0] : reservation.idDesk;
            getDeskSeats(idDesk, reservation.id);
          }
          return reservation.id;
        });
        reservationIds.forEach(getTableReservationById);
      } else {
        if (data.idGame) {
          const idGame = Array.isArray(data.idGame) ? data.idGame[0] : data.idGame;
          getGameName(idGame, data.id); // Utilizza data.id come reservationId
        }
        if (data.idDesk) {
          const idDesk = Array.isArray(data.idDesk) ? data.idDesk[0] : data.idDesk;
          getDeskSeats(idDesk, data.id);
        }
      }
    })
    .catch((error) => {
      console.error("Errore durante la richiesta:", error);
    });
};

const getDeskSeats = (idDesk, reservationId) => {
  fetch(`${process.env.REACT_APP_BACKEND}/desk/${idDesk}`, {
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
        throw new Error("Error retrieving desk");
      }
    })
    .then((data) => {
      console.log("Data d received:", data);
      console.log("Data d received:", data.seats);
      
      setDeskSeatsById((prevSeats) => ({
        ...prevSeats,
        [reservationId]: data.seats
      }));
      console.log("deskSeatsById:", deskSeatsById);
    })
    .catch((error) => {
      console.error("Error making request:", error);
    });
};

const getGameName = (idGame, reservationId) => {
  fetch(`${process.env.REACT_APP_BACKEND}/game/${idGame}`, {
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
        throw new Error("Error retrieving game");
      }
    })
    .then((data) => {
      console.log("Data received:", data);
      console.log("Data received:", data.name);
      // Aggiungo il nome del gioco all'oggetto gameNamesById utilizzando l'id della prenotazione come chiave
      setGameNamesById((prevNames) => ({
        ...prevNames,
        [reservationId]: data.name
      }));
      console.log("gameNamesById:", gameNamesById);
    })
    .catch((error) => {
      console.error("Error making request:", error);
    });
};


// Function to get name of a game by ID
// const getGameName = (idGame) => {
//   fetch(`${process.env.REACT_APP_BACKEND}/game/${idGame}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("Error retrieving game");
//       }
//     })
//     .then((data) => {
//       console.log("Data received:", data);
//       console.log("Data received:", data.name);
//       // setGameId(data.name);
//       setGameNames((prevNames) => [...prevNames, data.name]);

//     })
//     .catch((error) => {
//       console.error("Error making request:", error);
//     });
// };


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
  getDeskSeats();
  getGameName();

  
}, []);




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
            <li className="listWrite">Numero persone: {deskSeatsById[tableReservationItem.id]}</li>
            {/* <td className="tableTwo">{tableReservationItem.desk.map(deskId => <div key={deskId}>{deskId}</div>)}</td>  */}
            <li className="listWrite">Data: {tableReservationItem.date}</li>
            <li className="listWrite">Orario: {tableReservationItem.time}</li>
            {/* {gameId && <li className="listWrite">Giochi prenotati: {gameId}</li>} */}
            <li className="listWrite">Giochi prenotati: {gameNamesById[tableReservationItem.id]}</li>
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

              <td className="tableTwo">{deskSeatsById[tableReservationItem.id]}</td>

              <td className="tableTwo">{tableReservationItem.date}</td>
              <td className="tableTwo">{tableReservationItem.time}</td>

              <td className="tableTwo">{gameNamesById[tableReservationItem.id]}</td>

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