
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./css/Login.css"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Login() {
  //per layout
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState('password');
  const navigate= useNavigate();
//fine layout
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [user, setUser] = useState("");


//per layout
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? 'password' : 'text');
  };
//fine layout

function loginUser() {
  fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        setEmail("");
        setPassword("");
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      console.log("dataUno", data)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
    })

    .catch((err) =>{
      alert("Il tuo account non esiste. Si prega di registrarsi.");
      navigate("/registration");
      console.log("ERRORE!", err)} );
}


// const getUser = (event) => {
//   if (event) {
//     event.preventDefault();
//   }

//   fetch(`${process.env.REACT_APP_BACKEND}/user`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("errore");
//       }
//     })
//     .then((data) => {
//       console.log("data", data.content[1].role);
//       // if (data && Array.isArray(data.content)) {
//       //     setUser(data.content);
//       //     console.log("user", data)
//       //     console.log("user", data.content[0].id)
//       //     console.log("user", data.content[0].email)
//       if(email == data.content[0].email){console.log("siii")}
     
//       else {
//           // setUser([]); 
//           console.log("nooo");
//       }
//    })
//     .catch((err) => {
//       console.log("errore", err);
//     });
// };

// useEffect(() => {
//   getUser();
// }, []);


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
    <Form.Control type="email" className="formControlLogin" id="exampleInputEmail1" aria-describedby="emailHelp"
      required
      value={email}
      onChange={(e) => {setEmail(e.target.value);}}
    />
    <div id="emailHelp" className="form-text">Hai dimenticato la tua email?</div>
  </div>

  <div className="mb-3">
     <Form.Label htmlFor="exampleInputPassword1" className="formLabelLogin">Password</Form.Label>
     <Form.Control type={passwordInputType} className="formControlLogin" id="exampleInputPassword1"
        required
        value={password}
        onChange={(e) => {setPassword(e.target.value);}}
                  />
                  <div id="emailHelp" className="form-text">Hai dimenticato la tua password?</div>
                </div>

                <div className="mb-5 form-check">
                  <i className={showPassword ? "bi bi-eye-slash fw-bold me-2 border border-black border-2 rounded iconaPassword" : "bi bi-eye fw-bold me-2 me-2 border border-black border-2 rounded iconaPassword"} onClick={togglePasswordVisibility}></i>
                  <Form.Label className="form-check-label fs-6 " htmlFor="exampleCheck1">Show Password</Form.Label>
                </div>
  
  <Button type="submit" className="btn btn-secondary col-6 round-pillow buttonAccedi"
             onClick={() => {
              loginUser();
               navigate("/");
            }}
  >Accedi</Button>


 <div id="emailHelp" className="form-text formTextForButton"> Non sei ancora iscritto? <Button className="buttonSendRegisterPage" 
            onClick={() => {
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