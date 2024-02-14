import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./EventCard.css"

const EventCard = () => {
    return (
      <>    
      
      <Card className="figure bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg cardEvent try" src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/425298357_18378073003077002_6669410608499316182_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=2cZiEcm2y70AX8qZQBB&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfAOvNFs0_3ORz8p8LCQzN9mRHRENaHbmZFGZdRFxJpgkw&oe=65D1CBD0" alt="Card image" />
      <figcaption>The Day</figcaption>
      </Card>





      <Card className="bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg cardEvent try" src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/421853837_18376012153077002_655260676932997274_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8MvzfIrUTWMAX-QC6qK&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfBR0SAg12_Mm8vNvE-p-Wrx_G5dw4XYdMf9elZTufcIHQ&oe=65D0D627" alt="Card image" />
    </Card>


    

    <Card className="bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg cardEvent try" src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/420094851_18375567517077002_7946907792022002703_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=QqkDGotL57gAX-oBmi5&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfAyzwxwnZasuxzuW95hZUSsf4LyH_me5UDfTfk73TgZBQ&oe=65D0AF36" alt="Card image" />
    </Card>


    <Card className="bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg cardEvent try" src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/419227807_18374777812077002_3377863137726136255_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=eLn1bjDWQQEAX9EaGk2&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfCGNphPJDZCQRlRKslrQG05yC-JVXcpHPAd4chPtbVMXw&oe=65D0618C" alt="Card image" />
    </Card>



            <Card className="cardEvent text-center mt-5 mb-5 border border-black border-4">
              <Card.Header className="bg-black text-white fs-3">02/04/2024 </Card.Header>    
      <Card.Img className="cardImg" variant="top" src="http://placekitten.com/600/500" />
      <Card.Body className="bg-black text-white">
        <Card.Title className="fs-2">Les Bambous</Card.Title>
        <Card.Text>
          Ingresso e comunicazione riservato ai soci Arci.
        </Card.Text>
      </Card.Body>
      <Card.Footer className=" bg-black text-white">Starting from 21:00</Card.Footer>
    </Card>


    <Card className="bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg" src="http://placekitten.com/600/500" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Les Bambous</Card.Title>
        <Card.Text>
        Ingresso e comunicazione riservato ai soci Arci.
        </Card.Text>
        <Card.Text>02/04/2024 Starting from 21:00</Card.Text>
      </Card.ImgOverlay>
    </Card>

    <Card className="bg-dark text-white mt-5 mb-5">
      <Card.Img className="cardImg cardEvent try" src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/425500694_892668422867117_7902978179129151265_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=iKtEdjaiMzsAX-9PyJU&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfDvL0bkS4_q5TFF-QngnT04vi3XcrV2rtV7duP31ds48Q&oe=65D0581A" alt="Card image" />
    </Card>



      </>
    );
  };
  

  export default EventCard;