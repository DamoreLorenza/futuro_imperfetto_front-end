
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./css/Login.css"

function Login() {
  return (
    <>
    <Container className="container">
      <Row className='labelOne mt-5'>
      <Col xs={2} md={4} lg={4} xl={4} >

      </Col>
        <Col xs={6} md={4} lg={4} xl={4}>
        <div>
        <Form>
  <div className="mb-3 mt-5">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin mt-5">Email</Form.Label>
    <Form.Control type="email" className="formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Hai dimenticato la tua email?</div>
  </div>
  <div className="mb-3">
    <Form.Label for="exampleInputPassword1" className="formLabelLogin">Password</Form.Label>
    <Form.Control type="password" className="formControlLogin" id="exampleInputPassword1"/>
    <div id="emailHelp" className="form-text">Hai dimenticato la tua password?</div>
  </div>
  <div className="mb-3 form-check">
    <Form.Control type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <Form.Label className="form-check-label" for="exampleCheck1">Show Password</Form.Label>
  </div>
  <div id="emailHelp" className="form-text">
  <Button type="submit" className="btn btn-secondary col-6 round-pillow">Accedi</Button>
  Non sei ancora iscritto? Registrati qui.</div>
</Form>  
          </div>
        </Col>
        <Col xs={4} md={4} lg={4} xl={4}></Col>
      </Row>
    </Container>
  </>

  );
}

export default Login;