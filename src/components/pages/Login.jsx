
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./css/Login.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState('password');
  const navigate= useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? 'password' : 'text');
  };



  return (
    <>
    <Container className="containerPageLogin">
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
                  <Form.Label htmlFor="exampleInputPassword1" className="formLabelLogin">Password</Form.Label>
                  <Form.Control type={passwordInputType} className="formControlLogin" id="exampleInputPassword1"/>
                  <div id="emailHelp" className="form-text">Hai dimenticato la tua password?</div>
                </div>
                <div className="mb-5 form-check">
                  <i className={showPassword ? "bi bi-eye-slash fw-bold me-2 border border-black border-2 rounded iconaPassword" : "bi bi-eye fw-bold me-2 me-2 border border-black border-2 rounded iconaPassword"} onClick={togglePasswordVisibility}></i>
                  <Form.Label className="form-check-label fs-6 " htmlFor="exampleCheck1">Show Password</Form.Label>
                </div>
  
  <Button type="submit" className="btn btn-secondary col-6 round-pillow buttonAccedi"
             onClick={() => {
            navigate("/");
          }}
  >Accedi</Button>
 <div id="emailHelp" className="form-text formTextForButton"> Non sei ancora iscritto? <Button className="buttonSendRegisterPage"            onClick={() => {
            navigate("/registration");
          }}>Registrati qui.</Button> </div>
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