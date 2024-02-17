import { useState } from "react";
import "./AdminGameCard.css"
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminGameCard = () =>{
  const [name, setName]= useState("");
  const [description, setDescription]= useState("");
  const [players, setPlayers]= useState("");
  const [reservation, setReservation]= useState("UNBOOKED");
  const [avatar, setAvatar]= useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate= useNavigate();

    function createGameCard() {
        fetch(`${process.env.REACT_APP_BACKEND}/game`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
            players: players,
            reservation: reservation,
            avatar: avatar,
            
          }),
        })
          .then((response) => {
            if (response.ok) {
              setName("");
              setDescription("");
              setPlayers("");
              setReservation("");
              setAvatar("");
              
              window.alert("Gioco inserito correttamente");
            } else {
              throw new Error("errore nella fetch");
            }
          })
          .catch((err) => console.log("ERRORE!", err));
      }



return(
    <>
<Button variant="primary" onClick={handleShow}>
Launch demo modal
</Button>
<Modal className="modaleGame" show={show} onHide={handleClose}>
<Modal.Header closeButton>
</Modal.Header>
<Form className="formInsertGame">
      <Form.Group className="mb-3" >
        <Form.Label>Nome gioco</Form.Label>
        <Form.Control className="formControlInsertGame" type="text" placeholder="nome" 
      required
      value={name}
      onChange={(e) => {setName(e.target.value); }}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Descrizione</Form.Label>
        <Form.Control className="formControlInsertGame" as="textarea" rows={3} placeholder="descrizione"
       required
      value={description}
      onChange={(e) => {setDescription(e.target.value); }} />
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>Giocatori</Form.Label>
        <Form.Control className="formControlInsertGame" type="number"  placeholder="numero giocatori"
       required
      value={players}
      onChange={(e) => {setPlayers(e.target.value); }} />
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>Immagine</Form.Label>
        <Form.Control className="formControlInsertGame" type="url" rows={3} placeholder="immagine"
       required
      value={avatar}
      onChange={(e) => {setAvatar(e.target.value); }} />
      </Form.Group>

      <Button type="submit" className="btn btn-danger mb-2 mt-2 col-6 round-pillow "
             onClick={() => {
              handleClose();
              createGameCard();
            navigate("/game");
          }}
  >Inserisci gioco</Button>
    
    </Form>
</Modal>
    </>
)


}

export default AdminGameCard


