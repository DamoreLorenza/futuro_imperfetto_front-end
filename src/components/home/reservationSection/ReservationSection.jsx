import { useEffect, useState } from "react"
import "./ReservationSection.css"
import 'react-calendar/dist/Calendar.css';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ModalChooserGame from "./ModalChooserGame";


const ReservationSection = () =>{
  //per il gioco selezionato da prenotare
  const [selectedGame, setSelectedGame] = useState("");

  const [seats, setSeats] = useState(1); 
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userData, setUserData] = useState(null);
  const [gameName, setGameName] = useState("")

  const [deskId, setDeskId] = useState(null);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const [desk, setDesk] = useState([])
  const [game, setGame] = useState([])


  const reservationSubmitDesk = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/desk`, {
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
      console.log("desk", data);
      if (data && Array.isArray(data.content)) {
          setDesk(data.content);
          
         console.log("seats",data.content[0].seats) 
      } else {
          setDesk([]); 
      }
  })
    .catch((err) => {
      console.log("errore", err);
    });
};
const handleSeatsChange = (e) => {
  if (e && e.target && e.target.value){
  const selectedSeats = parseInt(e.target.value);
  setSeats(selectedSeats);
  console.log(selectedSeats)

  // Trova l'ID del desk che corrisponde al numero di posti selezionato
  const deskWithSelectedSeats = desk.find(desk => desk.seats === selectedSeats);
  console.log("desk2", deskWithSelectedSeats);
  if (deskWithSelectedSeats) {
    // Memorizza l'ID del desk trovato nello stato
    setDeskId(deskWithSelectedSeats.id);
    console.log("desk id", deskId);
    
  } else {
    // Se non viene trovato nessun desk con il numero di posti selezionato, reimposta lo stato dell'ID del desk a null
    setDeskId(null);
  }
};}

const fetchGameName = () => {
  fetch(`${process.env.REACT_APP_BACKEND}/game`, {
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
  .then((gameData) => {
    console.log("game", gameData);
    if (gameData && Array.isArray(gameData.content)) {
        setGame(gameData.content);
        
       console.log("game name",gameData.content[0].name) 
    } else {
        setGame([]); 
    }
})
.catch((err) => {
  console.log("errore", err);
});
};

const handleGameChange = (e) => {
  setGame(selectedGame);
  console.log(selectedGame)

  // Trova il nome del game che corrisponde al numero di posti selezionato
  const gameWithSelectedName = game.find(game => game.name === selectedGame);
  console.log("game2", gameWithSelectedName);
  if (gameWithSelectedName) {
    // Memorizza il nome del game trovato nello stato
    setGameId(gameWithSelectedName.id);
    console.log("game id", gameId);
    
  } else {
    // Se non viene trovato nessun game con il nome selezionato, reimposta lo stato del nome del gioco a null
    setGameName(null);
  }
// };
}

// function reservationPost() {
//   fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         date: date,
//         time: time,
//
//      userId: userData.id,
//         game: gameId,
//            deskId: deskId,

        
//     }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         setDate("");
//         setTime("");
//         setUserId("");
//          setGameId("");
//         setDeskId("");
//         
//         
//         window.alert("Prenotazione effettuata con successo!");
//       } else {
//         throw new Error("errore nella fetch");
//       }
//     })
//     .catch((err) => console.log("ERRORE!", err));
// }


    // if (!selectedGame || !date || !time || !seats ) {
    //   alert("Si prega di compilare tutti i campi.");
    //   return;
    // }


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
          value={seats}
          //  onChange={(e) => setSeats(parseInt(e.target.value))}
          onChange={(e) => handleSeatsChange(e)}
           />
      </Form.Group>
        </Col>
        </Row> 
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>

        <Form.Group className="mb-3" >
        <Form.Label>Data prenotazione</Form.Label>
       <Form.Control className="inputPrenotazione" size="sm" type="date" placeholder="Data prenotazione" 
        value={date} onChange={(e) => setDate(e.target.value)}
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
          value={time} onChange={(e) => setTime(e.target.value)} 
        />
      </Form.Group>
        
        </Col>
        </Row> 
        {/* <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Alle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Alle ore" />
      </Form.Group>
       
      </Col>
    </Row> */}

    

    <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" >
        <Form.Label>Desideri prenotare un gioco da tavola?</Form.Label>
        <ModalChooserGame onGameSelect={(gameName) => setSelectedGame(gameName)}/>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder=""
         value={selectedGame} onChange={(e) => {setSelectedGame(e.target.value);
         
         handleGameChange()}}
         />
        
      </Form.Group>
      
      </Col>
    </Row>
        </Card.Text>
        <Card.Footer className="">
        Hai prenotato il giorno {date} alle ore {time} per {seats} persone. Il gioco selezionato è: {selectedGame}
        </Card.Footer>
        <Button className="buttonReservation"  
        onClick={() => {
    reservationSubmitDesk();
    handleSeatsChange();
    handleGameChange();
    fetchGameName()
}}>Conferma prenotazione</Button>
      </Card.Body>

    </Card>
    </Col>
        <Col xs={2} md={2} lg={2} xl={1}></Col>
</Row>
</Container>



        </>
    )
}

export default ReservationSection