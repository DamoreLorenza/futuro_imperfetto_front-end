import { useEffect, useState } from "react";
import "./GamesCard.css"
import { Card } from "react-bootstrap";

const GamesCard = () => {
    const [screenSize, setScreenSize] = useState(getScreenSize());

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

    const isFullScreen = screenSize.width > 1000 && screenSize.height > 900;
    const isLargeScreen = screenSize.width > 1000;
    return(
        <>


            {isFullScreen ? (
                // Renderizza questa card per schermo pieno
                <div className="fullScreenCard ">
                <div className="wrapGames animateGames popGames">
		<div className="overlayGames">
			<div className="overlayGames-content animateGames slideGames-left delayGames-2">
				<h1 className="animateGames slideGames-left popGames delayGames-4 h1Games">Nome gioco</h1>
				<p className="animateGames slideGames-left popGames delayGames-5" style={{ color: 'white', marginBottom: '2.5rem' }}>Giocatori: <em>numero giocatori</em></p>
			</div>
			<div className="imageGames-content animateGames slideGames delayGames-5"></div>
					<div className="dotsGames animateGames">
						<div className="dotGames animateGames slideGames-up delayGames-6"></div>
						<div className="dotGames animateGames slideGames-up delayGames-7"></div>
						<div className="dotGames animateGames slideGames-up delayGames-8"></div>
					</div>
		</div>
			<div className="textGames">
				<p className="pGames"><img className="insetGames" src="https://assets.codepen.io/4787486/oak_1.jpg" alt="" />Trees are woody perennial plants that are a member of the kingdom <em>Plantae</em>. All species of trees are grouped by their genus, family, and order. This helps make identifying and studying trees easier.</p>
				<p className="pGames">Apart from providing oxygen for the planet and beauty when they bloom or turn color, trees are very useful. Certain species of hardwood and softwood trees are excellent for timber, making furniture, and paper.</p>
				<p className="pGames">When managed properly, trees are a good source of renewable energy and construction material.</p>
			</div>
	</div>
                </div>
            ) : isLargeScreen ? (
                // Renderizza questa card per schermi grandi
             
                <div className="wrapGames animateGames popGames">
		<div className="overlayGames">
			<div className="overlayGames-content animateGames slideGames-left delayGames-2">
				<h1 className="animateGames slideGames-left popGames delayGames-4 h1Games">Nome gioco</h1>
				<p className="animateGames slideGames-left popGames delayGames-5" style={{ color: 'white', marginBottom: '2.5rem' }}>Giocatori: <em>numero giocatori</em></p>
			</div>
			<div className="imageGames-content animateGames slideGames delayGames-5"></div>
					<div className="dotsGames animateGames">
						<div className="dotGames animateGames slideGames-up delayGames-6"></div>
						<div className="dotGames animateGames slideGames-up delayGames-7"></div>
						<div className="dotGames animateGames slideGames-up delayGames-8"></div>
					</div>
		</div>
			<div className="textGames">
				<p className="pGames"><img className="insetGames" src="https://assets.codepen.io/4787486/oak_1.jpg" alt="" />Trees are woody perennial plants that are a member of the kingdom <em>Plantae</em>. All species of trees are grouped by their genus, family, and order. This helps make identifying and studying trees easier.</p>
				<p className="pGames">Apart from providing oxygen for the planet and beauty when they bloom or turn color, trees are very useful. Certain species of hardwood and softwood trees are excellent for timber, making furniture, and paper.</p>
				<p className="pGames">When managed properly, trees are a good source of renewable energy and construction material.</p>
			</div>
	</div>
              
            ) : (
                // Renderizza questa card per schermi più piccoli
                <div className="wrapGamesSmall">
                
                <Card className="game1578 game1578One">
  <Card.Img className="imgGamePage" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg" alt="profile-sample6" />
  <Card.Body>
        <Card.Text className="cardGamePageText">
description
        </Card.Text>
        <Card.Text className="cardGamePageText">
date and starting
        </Card.Text>
      </Card.Body>
  <figcaption className="figCaptionGamePage">
    <h3>Nome gioco</h3>
    <div className="iconGamePage"><a href="#">
    <i className="ion-social-twitter me-2"></i></a>

    </div>
  </figcaption>
</Card>
                </div>
                
            )}





        </>
    )
}


export default GamesCard;