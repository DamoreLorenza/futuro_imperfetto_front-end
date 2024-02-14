import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./CustomOffCanvas.css"
import { useNavigate } from 'react-router-dom';

// chiedi per singolo logo da mettere come background in offcanvas

function CustomOffCanvas() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const navigate = useNavigate();

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);



  const handleLoginLogout = () => {
    // Se l'utente è autenticato, esegui il logout, altrimenti esegui il login
    if (isLoggedIn) {
      // Esegui azioni di logout, ad esempio azzerare lo stato di autenticazione, ecc.
      setIsLoggedIn(false);
      // Naviga verso la pagina di login o homepage dopo il logout
      navigate("/"); // Sostituisci con il percorso effettivo della pagina di login
    } else {
      // Esegui azioni di login, ad esempio impostare lo stato di autenticazione, ecc.
      setIsLoggedIn(true);
      // Naviga verso la pagina del profilo utente dopo il login
      navigate("/login"); // Sostituisci con il percorso effettivo della pagina del profilo utente
    }
  };


  return (
    <>
      <Button onClick={handleShowOffCanvas} className='menuButton'>
      <i class="bi bi-justify"></i>
      </Button>

      <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} className="offCanvasSection">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='OffcanvasTitle'>BENVENUTI A FUTURO IMPERFETTO 2.0</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <i class="bi bi-house iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/");
          }}>Home</Button>
          </i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-stack iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/event");
          }}>Eventi</Button>
          </i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-boxes iconCanvas"><Button className='iconCanvasWrite'
            onClick={() => {
            navigate("/games");
          }}>Giochi da tavola</Button></i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-calendar-minus iconCanvas"><Button className='iconCanvasWrite'
           onClick={() => {
            navigate("/reservation");
          }}>Prenotazioni</Button></i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-box-arrow-in-right iconCanvas"><Button className='iconCanvasWrite mt-2 ' onClick={handleLoginLogout}>{isLoggedIn ? 'Logout' : 'Login'}</Button></i>
        {isLoggedIn && <Button className="iconCanvasWrite" 
           onClick={() => {
            navigate("/profile");
          }}>Profilo</Button>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomOffCanvas;