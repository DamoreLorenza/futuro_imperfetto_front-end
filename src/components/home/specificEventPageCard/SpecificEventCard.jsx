import { Card, Col, Container, Row } from "react-bootstrap";
import "./SpecificEventCard.css"
import { useEffect, useState } from "react";

const SpecificEventCard = () => {
const [event, setEvent] = useState([]);


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

  useEffect(() => {
    getEvent();
  }, []);

    return (
      <>
      <div className="specific-event-card-container">
{ event.map((eventItem, index) =>(
    <Card key={index} className="snip1578 snip1578One">
  <Card.Img className="imgEventPage" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg" alt="profile-sample6" />
  <Card.Body>
        <Card.Text className="cardEventPageText">
{eventItem.description}
        </Card.Text>
        <Card.Text className="cardEventPageText">
{eventItem.date}
        </Card.Text>
      </Card.Body>
  <figcaption className="figCaptionEventPage">
    <h3>{eventItem.name}</h3>
    <div className="iconEventPage"><a href="#"><i className="ion-social-twitter me-2"></i></a>
      <a href="#"> <i className="ion-social-instagram-outline me-2"></i></a>
      <a href="#"> <i className="bi bi-facebook me-2"></i></a>
    </div>
  </figcaption>
</Card>

))}
</div>
      </>
    );
  };
  
  export default SpecificEventCard;