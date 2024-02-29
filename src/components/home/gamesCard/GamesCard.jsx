import { useEffect, useState } from "react";
import "./GamesCard.css"
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import AdminGameCard from "./AdminGameCard";

const GamesCard = ({ searchTerm }) => {
    const [screenSize, setScreenSize] = useState(getScreenSize());
    const [game, setGame] = useState([]);
    const [userRole, setUserRole] = useState(localStorage.getItem(""));

    // per paginazione
    const [currentPage, setCurrentPage] = useState(0);
    const gamesPerPage = 10;
    const orderBy = 'id';

    // per schermo card
    const isFullScreen = screenSize.width > 1200 && screenSize.height > 900;
    const isLargeScreen = screenSize.width > 1200;

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

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setUserRole(role);
        }
    }, []);

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


    const filterAndSortGames = (games) => {
        const matchingExact = [];
        const containingKeywords = [];
    
        games.forEach((game) => {
          if (game.name.toLowerCase() === searchTerm.toLowerCase()) {
            matchingExact.push(game);
          } else if (game.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            containingKeywords.push(game);
          }
        });
    
        return [...matchingExact, ...containingKeywords];
      };
    
      // Filtra e ordina i giochi
      const filteredAndSortedGames = filterAndSortGames(game);
    
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
                console.log("game", game)
            } else {
                setGame([]); 
            }
        })
        .catch((err) => {
            console.log("Errore", err);
        });
    };



    return(

            <>
                      <div>
                        <button className="buttonChangePageLeft rounded-circle bg-danger " onClick={prevPage} disabled={currentPage === 0}><i className="bi bi-arrow-left-circle-fill"></i></button>
                        <button className="buttonChangePageRight rounded-circle bg-danger" onClick={nextPage} disabled={game.length < gamesPerPage }><i className="bi bi-arrow-right-circle-fill"></i></button>
                       </div> 
                       {userRole === "ADMIN" && <AdminGameCard className="insertCardPosition"/>}


                {isFullScreen ? (



                    //per schermo pieno
                    filteredAndSortedGames.map((gameItem, index) => (
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
                    //  per schermi grandi
                    filteredAndSortedGames.map((gameItem, index) => (
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
                    //  per schermi più piccoli
                    filteredAndSortedGames.map((gameItem, index) => (
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