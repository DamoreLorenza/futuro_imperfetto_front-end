import { Card, Col, Container, Row } from "react-bootstrap";
import "./SpecificEventCard.css"

const SpecificEventCard = () => {
    return (
      <>

    <Card className="snip1578 snip1578One">
  <Card.Img className="imgEventPage" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg" alt="profile-sample6" />
  <Card.Body>
        <Card.Text className="cardEventPageText">
description
        </Card.Text>
        <Card.Text className="cardEventPageText">
date and starting
        </Card.Text>
      </Card.Body>
  <figcaption className="figCaptionEventPage">
    <h3>Artista</h3>
    <div className="iconEventPage"><a href="#"><i className="ion-social-twitter me-2"></i></a>
      <a href="#"> <i className="ion-social-instagram-outline me-2"></i></a>
      <a href="#"> <i className="bi bi-facebook me-2"></i></a>
    </div>
  </figcaption>
</Card>


<Card className="snip1578 ">
  <Card.Img className="imgEventPage" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg" alt="profile-sample6" />
  <Card.Body>
        <Card.Text className="cardEventPageText">
description
        </Card.Text>
        <Card.Text className="cardEventPageText">
date and starting
        </Card.Text>
      </Card.Body>
  <figcaption className="figCaptionEventPage">
    <h3>Artista</h3>
    <div className="iconEventPage"><a href="#"><i className="ion-social-twitter me-2"></i></a>
      <a href="#"> <i className="ion-social-instagram-outline me-2"></i></a>
      <a href="#"> <i className="bi bi-facebook me-2"></i></a>
    </div>
  </figcaption>
</Card>

      </>
    );
  };
  
  export default SpecificEventCard;