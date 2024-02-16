import { useEffect, useState } from "react";
import "./GamesCard.css"
import { Card, Image } from "react-bootstrap";

const GamesCard = () => {
    const [screenSize, setScreenSize] = useState(getScreenSize());
    const [game, setGame]= useState([]);
 

    const isFullScreen = screenSize.width > 1000 && screenSize.height > 900;
    const isLargeScreen = screenSize.width > 1000;

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

    
    const getGame = (event) => {
        if (event) {
          event.preventDefault();
        }
      
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
          .then((data) => {
            console.log("data", data);
            if (data && Array.isArray(data.content)) {
                setGame(data.content);
            } else {
                setGame([]); // Imposta game come un array vuoto se i dati non sono nel formato previsto
            }
        })
          .catch((err) => {
            console.log("errore", err);
          });
      };

      useEffect(() => {
        getGame();
      }, []);
    


    return(

            <>
                {isFullScreen ? (
                    // Renderizza questa card per schermo pieno
                    game.map((gameItem, index) => (
                        <div key={index} className="fullScreenCard ">
                            <div className="wrapGames animateGames popGames">
                                <div className="overlayGames">
                                    <div className="overlayGames-content animateGames slideGames-left delayGames-2">
                                        <h1 className="animateGames slideGames-left popGames delayGames-4 h1Games">{gameItem.name}</h1>
                                        <p className="animateGames slideGames-left popGames delayGames-5" style={{ color: 'white', marginBottom: '2.5rem' }}> <em>Massimo giocatori:{gameItem.players}</em></p>
                                    </div>
                                    <div className="imageGames-content animateGames slideGames delayGames-5"><Image className="insetGames rounded" src={gameItem.avatar} alt="game avatar" /></div>
                                    <div className="dotsGames animateGames">
                                        <div className="dotGames animateGames slideGames-up delayGames-6"></div>
                                        <div className="dotGames animateGames slideGames-up delayGames-7"></div>
                                        <div className="dotGames animateGames slideGames-up delayGames-8"></div>
                                    </div>
                                </div>
                                <div className="textGames">
                                    <p className="pGames"><Image className="insetGames" src={gameItem.avatar} alt="game avatar" />{gameItem.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : isLargeScreen ? (
                    // Renderizza questa card per schermi grandi
                    game.map((gameItem, index) => (
                        <div key={index} className="wrapGames animateGames popGames">
                            <div className="overlayGames">
                                <div className="overlayGames-content animateGames slideGames-left delayGames-2">
                                    <h1 className="animateGames slideGames-left popGames delayGames-4 h1Games">{gameItem.name}</h1>
                                    <p className="animateGames slideGames-left popGames delayGames-5" style={{ color: 'white', marginBottom: '2.5rem' }}> <em>Massimo giocatori:{gameItem.players}</em></p>
                                </div>
                                <div className="imageGames-content animateGames slideGames delayGames-5"><Image className="insetGames rounded" src={gameItem.avatar} alt="game avatar" /></div>
                                <div className="dotsGames animateGames">
                                    <div className="dotGames animateGames slideGames-up delayGames-6"></div>
                                    <div className="dotGames animateGames slideGames-up delayGames-7"></div>
                                    <div className="dotGames animateGames slideGames-up delayGames-8"></div>
                                </div>
                            </div>
                            <div className="textGames">
                                <p className="pGames"><img className="insetGames" src={gameItem.avatar} alt="" />{gameItem.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    // Renderizza questa card per schermi più piccoli
                    game.map((gameItem, index) => (
                        <div key={index} className="wrapGamesSmall">
                            <Card className="game1578 game1578One">
                                <Card.Img className="imgGamePage" src={gameItem.avatar} alt="profile-sample6" />
                                <Card.Body>
                                    <Card.Text className="cardGamePageText">{gameItem.description}</Card.Text>
                                    <Card.Text className="cardGamePageText">{gameItem.date}</Card.Text>
                                </Card.Body>
                                <figcaption className="figCaptionGamePage">
                                    <h3>{gameItem.name}</h3>
                                    <div className="iconGamePage">
                                        <a href="#">
                                            <i className="ion-social-twitter me-2"></i>
                                        </a>
                                    </div>
                                </figcaption>
                            </Card>
                        </div>
                    ))
                )}
            </>
    )
}


export default GamesCard;