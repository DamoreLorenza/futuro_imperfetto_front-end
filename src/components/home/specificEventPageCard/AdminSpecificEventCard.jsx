import { Button, Form, Modal } from "react-bootstrap";
import "./AdminSpecificEventCard.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminSpecificEventCard = () =>{
    const [name, setName]= useState("");
    const [description, setDescription]= useState("");
    const [date, setDate]= useState("");
    const [avatar, setAvatar]= useState("");
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  
    const navigate= useNavigate();
  
      function createEventCard() {
          fetch(`${process.env.REACT_APP_BACKEND}/event`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              description: description,
              date: date,
              avatar: avatar,
              
            }),
          })
            .then((response) => {
              if (response.ok) {
                setName("");
                setDescription("");
                setDate("");
                setAvatar("");
                
                window.alert("Evento inserito correttamente");
              } else {
                throw new Error("errore nella fetch");
              }
            })
            .catch((err) => console.log("ERRORE!", err));
        }

        
        const handleSubmit = (e) => {
          e.preventDefault(); 
          handleClose(); // Chiudi il modale
          createEventCard(); // Invia i dati del gioco
          navigate("/event"); // Naviga verso la pagina dei giochi
        };


    return(
        <>
<Button className="buttonModale" onClick={handleShow}>
Inserisci un nuovo evento
</Button>
<Modal className="modaleEvent" show={show} onHide={handleClose}>
<Modal.Header closeButton>
</Modal.Header>
<Form className="formInsertEvent" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Nome evento</Form.Label>
        <Form.Control className="formControlInsertEvent" type="text" placeholder="nome" 
      required
      value={name}
      onChange={(e) => {setName(e.target.value); }}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Descrizione</Form.Label>
        <Form.Control className="formControlInsertEvent" as="textarea" rows={3} placeholder="descrizione"
       required
      value={description}
      onChange={(e) => {setDescription(e.target.value); }} />
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>Data</Form.Label>
        <Form.Control className="formControlInsertEvent" type="date"  placeholder="numero giocatori"
       required
      value={date}
      onChange={(e) => {setDate(e.target.value); }} />
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>Immagine</Form.Label>
        <Form.Control className="formControlInsertEvent" type="url" rows={3} placeholder="immagine"
       
      value={avatar}
      onChange={(e) => {setAvatar(e.target.value); }} />
      </Form.Group>

      <Button type="submit" className="btn btn-danger mb-2 mt-2 col-7 round-pillow ">Inserisci evento</Button>
    
    </Form>
</Modal>
        </>
    )
}


export default AdminSpecificEventCard