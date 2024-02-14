import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./css/Registration.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState('password');
    const navigate= useNavigate();
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      setPasswordInputType(showPassword ? 'password' : 'text');
    };
  
return(
    <>

<Container className="containerPageLogin">
      <Row className='labelOne mt-5'>
      <Col xs={2} md={4} lg={4} xl={4} >

      </Col>
        <Col xs={6} md={4} lg={4} xl={4}>
        <div>
        <Form>
        <div className="mb-3 mt-5">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin mt-5">Nome</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 ">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin ">Cognome</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 ">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin ">Username</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-5">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin">Email</Form.Label>
    <Form.Control type="email" className="formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
                  <Form.Label htmlFor="exampleInputPassword1" className="formLabelLogin">Password</Form.Label>
                  <Form.Control type={passwordInputType} className="formControlLogin" id="exampleInputPassword1"/>
                </div>

                <div className="mb-3">
                  <Form.Label htmlFor="exampleInputPassword1" className="formLabelLogin">Conferma la tua password</Form.Label>
                  <Form.Control type={passwordInputType} className="formControlLogin" id="exampleInputPassword1"/>
                </div>

  
  <Button type="submit" className="btn btn-secondary mb-5 col-6 round-pillow buttonAccedi"
             onClick={() => {
            navigate("/");
          }}
  >Accedi</Button>
</Form>  
          </div>
        </Col>
        <Col xs={4} md={4} lg={4} xl={4}>

        </Col>
      </Row>
    </Container>

    </>
)


}

export default Registration