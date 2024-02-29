import { useEffect, useState } from "react"
import "./ReservationSection.css"
import 'react-calendar/dist/Calendar.css';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ModalChooserGame from "./ModalChooserGame";


const ReservationForm = () =>{
  //per il gioco selezionato da prenotare
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");

  const [seat, setSeat] = useState(1); 
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userData, setUserData] = useState(null);
//   const [gameName, setGameName] = useState("")

  const [idUser, setIdUser] = useState(null);
  const [idDesk, setIdDesk] = useState(null);
  const [idGame, setIdGame] = useState(null);

  const [desk, setDesk] = useState([])
  const [game, setGame] = useState([]) 

//   const handleSeatsChange = (e) => {
//     const selectedSeats = parseInt(e.target.value);
//     setSelectedSeats(selectedSeats);
//   };

const formattedTime = `${time}:00`;

  const handleGameChange = (e) => {
    setSelectedGame(e.target.value);
  };

  useEffect(() => {
    const gameWithSelectedName = game.find(game => game.name === selectedGame);
    if (gameWithSelectedName) {
      setIdGame(gameWithSelectedName.id);
      console.log("gameSelected", gameWithSelectedName)
      console.log("gameId", gameWithSelectedName.id)
      console.log("gameId2", idGame)
    }
  }, [selectedGame, game]);

  
  useEffect(() => {
    const deskWithSelectedSeats = desk.find(desk => desk.seats === selectedSeats);
    if (deskWithSelectedSeats) {
      setIdDesk(deskWithSelectedSeats.id);
      console.log("deskSelected", deskWithSelectedSeats)
      console.log("deskId", deskWithSelectedSeats.id)
      console.log("deskId2", idDesk)
      console.log("time", time)
      console.log("date", date)
      console.log("user", idUser)
    }
  }, [selectedSeats, desk]);



  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
      setIdUser(storedUserData.id); // Imposta direttamente userId con l'ID dell'utente
      console.log("userSelected", storedUserData)
      console.log("userId", storedUserData.id)
      console.log("userId2", idUser)
    }
  }, []);



//   const reservationSubmitDesk = () => {
//     fetch(`${process.env.REACT_APP_BACKEND}/desk`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("errore");
//       }
//     })
//     .then((data) => {
//       console.log("desk", data);
//       if (data && Array.isArray(data.content)) {
//           setDesk(data.content);
//           console.log("desk", desk)
         
//       } else {
//           setDesk([]); 
//       }
//   })
//     .catch((err) => {
//       console.log("errore", err);
//     });
// };



// const fetchGameName = () => {
//   fetch(`${process.env.REACT_APP_BACKEND}/game`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       "Content-Type": "application/json",
//     },
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     } else {
//       throw new Error("errore");
//     }
//   })
//   .then((gameData) => {
//     console.log("game", gameData);
//     if (gameData && Array.isArray(gameData.content)) {
//         setGame(gameData.content);
//         console.log("game", game)
    
//     } else {
//         setGame([]); 
//     }
// })
// .catch((err) => {
//   console.log("errore", err);
// });
// };



// function reservationPost() {
  
//   fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`, {
//     method: "POST",
//     headers: {
//      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//      "Content-Type": "application/json",
//      },
//     body: JSON.stringify({
//         date: date,
//         time: time,

//         userId: userId,
//         gameId: gameId,
//         deskId: deskId,

        
//     }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         setDate("");
//         setTime("");
//         setUserId("");
//          setGameId("");
//         setDeskId("");
        
        
//         window.alert("Prenotazione effettuata con successo!");
//       } else {
//         throw new Error("errore nella fetch");
//       }
//     })
//     .catch((err) => {
//         console.error("Errore durante la richiesta POST:", err);
//         // Controlla se ci sono dettagli aggiuntivi forniti dal backend
//         if (err.response && err.response.data && err.response.data.message) {
//           console.error("Messaggio di errore dal backend:", err.response.data.message);
//         }
//       });
// }
  
// const handleReservation = () => {
//     reservationSubmitDesk()
//       .then(fetchGameName)
//       .then(reservationPost)
//       .catch((err) => {
//         console.error("Errore nella gestione della prenotazione:", err);
//       });
//   };

const reservationSubmitDesk = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/desk`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("desk", data);
        if (data && Array.isArray(data.content)) {
          setDesk(data.content);
          console.log("desk", desk);
        } else {
          setDesk([]);
        }
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      console.log("errore", error);
      throw error;
    }
  };

  const fetchGameName = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/game`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const gameData = await res.json();
        console.log("game", gameData);
        if (gameData && Array.isArray(gameData.content)) {
          setGame(gameData.content);
          console.log("game", game);
        } else {
          setGame([]);
        }
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      console.log("errore", error);
      throw error;
    }
  };

  const reservationPost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/tableReservation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: date,
            time: formattedTime,
            idUser: idUser,
            idGame: idGame,
            idDesk: idDesk,
          }),
        }
      );
      if (response.ok) {
        setDate("");
        setTime("");
        setIdUser("");
        setIdGame("");
        setIdDesk("");
        window.alert("Prenotazione effettuata con successo!");
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (err) {
      console.error("Errore durante la richiesta POST:", err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error(
          "Messaggio di errore dal backend:",
          err.response.data.message
        );
      }
    }
  };

  const handleReservation = async () => {
    try {
      await reservationSubmitDesk();
      await fetchGameName();
      await reservationPost();
    } catch (err) {
        console.error("Errore durante la richiesta POST:", err);
        window.alert("Si è verificato un errore durante la prenotazione: " + err.message);
      }
  };
    return(
        <>
        <Container className="container d-flex justify-content-center">
        <Row className="d-flex justify-content-center align-items-center">
        <Col xs={1} md={2} lg={2} xl={1}></Col>
        <Col xs={8} md={8} lg={8} xl={10}>
    <Card className="text-center prenotazioneCard">
      <Card.Header>Prenota Online</Card.Header>
      <Card.Body>
        <Card.Title>
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Nome utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="Nome" 
        value={userData ? userData.name : ""}
        onChange={() => {}}
        />
      </Form.Group>
        </Col>
        </Row>   
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Cognome utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="Cognome"
         value={userData ? userData.surname : ""}
         onChange={() => {}}
         />
      </Form.Group>
        </Col>
        </Row> 

        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Email utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="email" placeholder="email" 
        value={userData ? userData.email : ""}
        onChange={() => {}}
        />
      </Form.Group>
        </Col>
        </Row> 

        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Numero persone</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="number" placeholder="Numero persone" max={10} min={1} 
        //   value={seats}
        //   onChange={(e) => {setSelectedSeats(parseInt(e.target.value));
        //   handleSeatsChange()
        //   }}
        inputmode="numeric"
        value={selectedSeats}
        onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
           />
      </Form.Group>
        </Col>
        </Row> 
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>

        <Form.Group className="mb-3" >
        <Form.Label>Data prenotazione</Form.Label>
       <Form.Control className="inputPrenotazione" size="sm" type="date" placeholder="Data prenotazione" 
        value={date}  
        // dateFormat="yyyy-MM-dd"
        // onChange={handleDateChange}
        onChange={(e) => setDate(e.target.value)}
       /> 
      </Form.Group>
      
 
      </Col>
    </Row>
</Card.Title>
        <Card.Text className="cardTextTime">
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Dalle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Dalle ore" 
          value={formattedTime} onChange={(e) => setTime(e.target.value)} 
        />
      </Form.Group>
        
        </Col>
        </Row> 

    

    <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Desideri prenotare un gioco da tavola?</Form.Label>
        <ModalChooserGame onGameSelect={(gameName) => setSelectedGame(gameName)}/>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder=""
        //  value={selectedGame} 
        //  onChange={(e) => {setSelectedGame(parseInt(e.target.value));
        //  handleGameChange()
        //  }}
        value={selectedGame}
  onChange={handleGameChange}
         />
        
      </Form.Group>
      
      </Col>
    </Row>
        </Card.Text>
        <Card.Footer className="">
        Hai prenotato il giorno {date} alle ore {time} per {selectedSeats} persone. Il gioco selezionato è: {selectedGame}
        </Card.Footer>
        <Button className="buttonReservation"  
//         onClick={() => {
//      handleSeatsChange();      
//      reservationSubmitDesk();
   
//      handleGameChange();
//      fetchGameName();

//     // reservationPost();
// }}
onClick= 
{handleReservation}
  
>Conferma prenotazione</Button>
      </Card.Body>

    </Card>
    </Col>
        <Col xs={2} md={2} lg={2} xl={1}></Col>
</Row>
</Container>



        </>
    )
}

export default ReservationForm