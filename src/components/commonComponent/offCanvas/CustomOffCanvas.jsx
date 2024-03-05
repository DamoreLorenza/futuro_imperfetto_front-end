import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./CustomOffCanvas.css"
import { useNavigate } from 'react-router-dom';

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
    console.log("userRole:", storedUserRole); // Verifico il valore di userRole
  };

  // Verifico se c'è un token di autenticazione presente nel localStorage
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
      <i class="bi bi-justify"></i>
      </Button>

      <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} className="offCanvasSection">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='OffcanvasTitle'>BENVENUTI A FUTURO IMPERFETTO 2.0 </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <i className="bi bi-house iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/");
          }}>Home</Button>
          </i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i className="bi bi-stack iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/event");
          }}>Eventi</Button>
          </i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i className="bi bi-boxes iconCanvas"><Button className='iconCanvasWrite'
            onClick={() => {
            navigate("/games");
          }}>Giochi da tavola</Button></i>
        </Offcanvas.Body>


        <Offcanvas.Body>
        <i className="bi bi-calendar-minus iconCanvas"><Button className='iconCanvasWrite'
           onClick={() => {
            navigate("/reservation");
          }}>Prenotazioni </Button></i>
          
          {userRole === 'ADMIN' && (
            <Button
              onClick={() => {
            navigate("/reservationListPage");}}
             className='buttonListaPrenotazioni'>| Lista prenotazioni</Button>
          )}

        </Offcanvas.Body>

        <Offcanvas.Body className='mb-5'>
        

          {/* Pulsante Profilo */}
          {isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => navigate("/profile")}>
              <i className="bi bi-person-circle iconCanvas"></i>
              Profilo
            </Button>
          )}

          {/* Pulsante Logout */}
          {isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => logout()}>
              <i className="bi bi-box-arrow-left iconCanvas"></i>
              Logout
            </Button>
          )}

          {/* Pulsante Login */}
          {!isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => navigate("/login")}>
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