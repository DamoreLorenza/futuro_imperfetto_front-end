import { Button, Card, Modal } from "react-bootstrap"
import "./ModalChooserGame.css"
import { useEffect, useState } from "react";



const ModalChooserGame = ({ onGameSelect }) => {
    const [show, setShow] = useState(false);
    const [game, setGame] = useState([]);

    const [gameName, setGameName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


//per selezionare il gioco che si vuole prenotare
const handleGameSelection = (gameName) => {
    handleClose();
    setGameName(gameName); // Imposta il nome del gioco selezionato nello stato locale
};



        // per paginazione
        const [currentPage, setCurrentPage] = useState(0);
        const gamesPerPage = 4;
        const orderBy = 'id';
    

            // per paginazione
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); 
    };
  
    useEffect(() => {
        fetchGames(currentPage);
    }, [currentPage]); // Aggiorna i giochi quando la pagina corrente cambia


    const fetchGames = (page) => {
        fetch(`${process.env.REACT_APP_BACKEND}/game?page=${page}&size=${gamesPerPage}&orderBy=${orderBy}`, {
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
              throw new Error("Errore nella richiesta");
            }
        })
        .then((data) => {
            if (data && Array.isArray(data.content)) {
                setGame(data.content);
            } else {
                setGame([]); 
            }
        })
        .catch((err) => {
            console.log("Errore nella richiesta:", err);
        });
    };

    return(
        <>
      <Button className="showListButton"  onClick={handleShow}>
        Mostrami la lista
      </Button>

      <Modal  className="modalChooser" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scegli 1 gioco</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <button className="buttonChangePageModalLeft rounded-circle bg-danger" onClick={prevPage} disabled={currentPage === 0}><i className="bi bi-arrow-left-circle-fill"></i></button>
             <button className="buttonChangePageModalRight rounded-circle bg-danger" onClick={nextPage} disabled={game.length < gamesPerPage }><i className="bi bi-arrow-right-circle-fill"></i></button>
        </div> 
        </Modal.Body>

        <Modal.Body>
       {game.map((gameItem, index) => (
<div key={gameItem.id} className="bigButton">
<Card key={index} className="cardModalChooser">
      <Card.Img className="cardModalImgChooser" variant="top" src={gameItem.avatar} />
      <Card.Body >
        <Card.Title className="cardModalTitleChooser">{gameItem.name}</Card.Title>
        <Button className="cardModalButtonChooser" variant="primary"
                      onClick={() => {
                      onGameSelect(gameItem.name);
                      handleClose();
                    }}>Prenota</Button>
      </Card.Body>

      
    </Card>


</div>

  )) }

        </Modal.Body>

      </Modal>

        </>
    )


}

export default ModalChooserGame