import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./css/Registration.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () =>{
  //per layout funzionalità
    const [passwordInputType, setPasswordInputType] = useState('password');
    const navigate= useNavigate();
  //fine layout
  //per registrazione
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("USER");
  
  function registrationUser() {
    fetch(`${process.env.REACT_APP_BACKEND}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        name: name,
        surname: surname,
        role: role,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setUsername("");
          setEmail("");
          setPassword("");
          setName("");
          setSurname("");
          setRole("");
          window.alert("Registrazione Effettuata con successo!");
        } else {
          throw new Error("errore nella fetch");
        }
      })
      .catch((err) => console.log("ERRORE!", err));
  }


  
return(
    <>

<Container className="containerPageLogin">
      <Row className='labelOne mt-5'>
      <Col xs={2} md={4} lg={4} xl={4} >

      </Col>
        <Col xs={6} md={4} lg={4} xl={4}>
        <div>
        <Form id="register-form">

        <div className="mb-3 mt-5">
    <Form.Label  className="formLabelLogin mt-5">Nome</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin"  aria-describedby="emailHelp"
      required
      value={name}
      onChange={(e) => {setName(e.target.value); }}
    />
  </div>

  <div className="mb-3 ">
    <Form.Label  className="formLabelLogin ">Cognome</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin"  aria-describedby="emailHelp"
     required
     value={surname}
     onChange={(e) => { setSurname(e.target.value);}}
    />
  </div>

  <div className="mb-3 ">
    <Form.Label  className="formLabelLogin ">Username</Form.Label>
    <Form.Control type="text" className="formControlLoginFirst formControlLogin"  aria-describedby="emailHelp"
       required
       value={username}
       onChange={(e) => {setUsername(e.target.value);}}
    />
  </div>

  <div className="mb-3 mt-5">
    <Form.Label for="exampleInputEmail1" className="formLabelLogin">Email</Form.Label>
    <Form.Control type="email" className="formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"
    required
    value={email}
    onChange={(e) => { setEmail(e.target.value);}}
    />
  </div>

  <div className="mb-3">
     <Form.Label htmlFor="exampleInputPassword1" className="formLabelLogin">Password</Form.Label>
     <Form.Control type={passwordInputType} className="formControlLogin" id="exampleInputPassword1"
     required
     value={password}
     onChange={(e) => {setPassword(e.target.value);}}
     />
   </div>

  <div className="mb-3">
       <Form.Label  className="formLabelLogin">Conferma la tua password</Form.Label>
       <Form.Control type={passwordInputType} className="formControlLogin" 
        required
        onChange={(e) => {setConfirmPassword(e.target.value);}}
       />
   </div>

  
  <Button type="submit" className="btn btn-secondary mb-5 col-6 round-pillow buttonAccedi"
             onClick={() => {
              if (password !== confirmPassword) {
            alert("Le password non corrispondono!");
            return; 
        }
              registrationUser();
            navigate("/login");
          }}
  >Registrati</Button>
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