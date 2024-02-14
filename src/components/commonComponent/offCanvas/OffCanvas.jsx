import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./OffCanvas.css"

// vedi cambio colore al click del simbolo menu
// chiedi per singolo logo da mettere come background in offcanvas

function OffCanvas() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

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
        <i class="bi bi-stack iconCanvas"><Button className='iconCanvasWrite'>Eventi</Button></i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-boxes iconCanvas"><Button className='iconCanvasWrite'>Giochi da tavola</Button></i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-calendar-minus iconCanvas"><Button className='iconCanvasWrite'>Prenotazioni</Button></i>
        </Offcanvas.Body>
        <Offcanvas.Body>
        <i class="bi bi-box-arrow-in-right iconCanvas"><Button className='iconCanvasWrite mt-2 '>Login</Button></i>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;