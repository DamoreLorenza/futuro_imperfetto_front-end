import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./CustomOffCanvas.css"
import { useNavigate } from 'react-router-dom';
import { Figure, Image } from 'react-bootstrap';

// chiedi per singolo logo da mettere come background in offcanvas

function CustomOffCanvas() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);
  const [user, setUser] = useState([]);
 
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || '');

  const navigate = useNavigate();

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);




  //funzione per logout
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/");
  }


//ascoltiamo gli eventi nello storage per l'accesso e l'uscita dell'utente dal suo profilo
useEffect(() => {
  const handleStorageChange = () => {
    setIsLoggedIn(localStorage.getItem("authToken") !== null);
    const storedUserRole = localStorage.getItem("userRole") || '';
    setUserRole(storedUserRole);
    console.log("userRole:", storedUserRole); // Verifica il valore di userRole
  };

  // Verifica se c'è un token di autenticazione presente nel localStorage
  if (localStorage.getItem("authToken") !== null) {
    setIsLoggedIn(true); //utente è autenticato
    const storedUserRole = localStorage.getItem("userRole") || '';
    setUserRole(storedUserRole);
  } else {
    setIsLoggedIn(false); //utente non è autenticato
    setUserRole('');
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


const functionGetUser = (event) => {
  if (event) {
    event.preventDefault();
  }

  fetch(`${process.env.REACT_APP_BACKEND}/user`, {
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
        setUser(data.content);
    }})
    .catch((err) => {
      console.log("errore", err);
    });
};

  return (
    <>
      <Button onClick={handleShowOffCanvas} className='menuButton'>
      <i className="bi bi-justify iconaPerMenuCanvas"></i>
      <Image
      className='dadiPerCanvas'
        src='http://res.cloudinary.com/drf1t0gkq/image/upload/v1708045968/paux2tmz8k7itvbvtzw3.png'
      />

      </Button>

      <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} className="offCanvasSection">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='OffcanvasTitle'>BENVENUTI A FUTURO IMPERFETTO 2.0 </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <i class="bi bi-house iconCanvas"> */}
        <Image
       className='figureHome rounded-circle '
       src="http://res.cloudinary.com/drf1t0gkq/image/upload/v1708045941/je6ptzmtbxdeumicedad.png"/>
        <Button className='iconCanvasWrite scrittaHome'
          onClick={() => {
            navigate("/");
          }}>Home</Button>
          {/* </i> */}
        </Offcanvas.Body>
        <Offcanvas.Body>
        {/* <i class="bi bi-stack iconCanvas"> */}
        <Button className='iconCanvasWrite scrittaEvent'
          onClick={() => {
            navigate("/event");
          }}>
                 <Image
       className='figureEvent rounded-circle '
       src="http://res.cloudinary.com/drf1t0gkq/image/upload/v1708050361/h5mem9paokodnpa6emza.png"/>
          Eventi</Button>
          {/* </i> */}
        </Offcanvas.Body>
        <Offcanvas.Body>
        {/* <i class="bi bi-boxes iconCanvas"> */}
        <Image
        className='figureDadi rounded-circle '
       src=" http://res.cloudinary.com/drf1t0gkq/image/upload/v1708045968/paux2tmz8k7itvbvtzw3.png"/>
        <Button className='iconCanvasWrite ms-4 scrittaGiochiDaTavola'
            onClick={() => {
            navigate("/games");
          }}>Giochi da tavola</Button>
          {/* </i> */}
        </Offcanvas.Body>


        <Offcanvas.Body>
        {/* <i class="bi bi-calendar-minus iconCanvas"> */}
        <Button className='iconCanvasWrite scrittaReservation'
           onClick={() => {
            navigate("/reservation");
          }}> 
       <Image
       className='figureReservation rounded '
       src="http://res.cloudinary.com/drf1t0gkq/image/upload/v1708047658/dfpek7js5cgp61okbhya.png"/>
       Prenotazioni</Button>
          
          {/* </i> */}
            {userRole === 'ADMIN' && (
            <Button>Lista prenotazioni</Button>
          )}
        </Offcanvas.Body>

        <Offcanvas.Body>
        

          {/* Pulsante Profilo */}
          {isLoggedIn && (
            <Button className='iconCanvasWrite iphoneSe' onClick={() => navigate("/profile")}>
              {/* <i className="bi bi-person-circle iconCanvas"></i> */}
              
      <Image
className='figureProfile me-2 rounded-circle'
        src="http://res.cloudinary.com/drf1t0gkq/image/upload/v1708047714/hpcrzd1ukdbsj5gagrg1.png"
      />
   
              Profilo
            </Button>
          )}

          {/* Pulsante Logout */}
          {isLoggedIn && (
            <Button className='iconCanvasWrite ' onClick={() => logout()}>
              <i className="bi bi-box-arrow-left iconCanvas iphoneSe"></i>
              Logout
            </Button>
          )}

          {/* Pulsante Login */}
          {!isLoggedIn && (
            <Button className='iconCanvasWrite iphoneSe' onClick={() => navigate("/login")}>
              <i className="bi bi-box-arrow-in-right iconCanvas"></i>
              Login
            </Button>
          )}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomOffCanvas;