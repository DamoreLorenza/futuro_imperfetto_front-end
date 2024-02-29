import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./SpecificEventCard.css"
import { useEffect, useState } from "react";
import AdminSpecificEventCard from "./AdminSpecificEventCard";

const SpecificEventCard = () => {
const [event, setEvent] = useState([]);
const [userRole, setUserRole] = useState(localStorage.getItem(""));


useEffect(() => {
  const role = localStorage.getItem("userRole");
  if (role) {
      setUserRole(role);
  }
}, []);

  const getEvent = (event) => {
    if (event) {
      event.preventDefault();
    }
  
    fetch(`${process.env.REACT_APP_BACKEND}/event`, {
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
            setEvent(data.content);
        } else {
            setEvent([]); 
        }
    })
      .catch((err) => {
        console.log("errore", err);
      });
  };


  const deleteCard = (eventId) => {
    fetch(`${process.env.REACT_APP_BACKEND}/event/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.ok) {
        // Rimuovi l'evento dalla lista dopo che è stato eliminato con successo
        setEvent(prevEvents => prevEvents.filter(event => event.id !== eventId));
        console.log("Evento eliminato con successo");
      } else {
        throw new Error("Errore durante l'eliminazione dell'evento");
      }
    })
    .catch((err) => {
      console.log("Errore durante la richiesta di eliminazione:", err);
    });
  };

  useEffect(() => {
    getEvent();
  }, []);

    return (

      <>
      {userRole === "ADMIN" && <AdminSpecificEventCard className="buttonModale"/>}

      <Container className="specific-event-card-container d-flex flex-wrap">

{ event.map((eventItem, index) =>(

  <Row key={index} className="d-flex flex-wrap"> 


  <Col xs={12} md={10} lg={5} xl={5} className="d-flex flex-wrap">
    <Card key={index} className="snip1578 snip1578One">
  <Card.Img className="imgEventPage" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg" alt="profile-sample6" />
  <Card.Body>
        <Card.Text className="cardEventPageText">
{eventItem.description}
        </Card.Text>
        <Card.Text className="cardEventPageText">
        {new Date(eventItem.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })}
        </Card.Text>

     {userRole === "ADMIN" &&  

<Button className="buttonDelete" onClick={ () => deleteCard(eventItem.id)}>Elimina</Button>
}   
    
      </Card.Body>
  <figcaption className="figCaptionEventPage">
    <h3>{eventItem.name}</h3>
    <div className="iconEventPage">
      <a href="https://www.instagram.com/futuroimperfetto/"> <i className="ion-social-instagram-outline ms-3 me-5 xxIcon"></i></a>
      <a href="https://www.facebook.com/futuroimperfetto2.0"> <i className="bi bi-facebook me-2 xxIcon"></i></a>
    </div>
  </figcaption>
</Card>
</Col>




</Row>


))}


</Container>
      </>
    );
  };
  
  export default SpecificEventCard;