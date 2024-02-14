import { Card, Col, Container, Row } from "react-bootstrap";
import OffCanvas from "../commonComponent/offCanvas/OffCanvas";
import "./css/Event.css"

const Event = () => {
    return (
      <>
        <Container className="container">
          <Row className="mt-5">
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas">
            <OffCanvas/>
          </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card class="card">
  <Card.Img
    class="card__background"
    src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/421853837_18376012153077002_655260676932997274_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8MvzfIrUTWMAX-QC6qK&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfBR0SAg12_Mm8vNvE-p-Wrx_G5dw4XYdMf9elZTufcIHQ&oe=65D0D627"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h2 class="card__title">Colombia</h2>
      <p class="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>
    </div>
    <button class="card__button">Read more</button>
  </div>
</Card>


            </Col>
            <Col xs={1} md={2} lg={1} xl={2}>
            </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card class="card">
  <Card.Img
    class="card__background"
    src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/421853837_18376012153077002_655260676932997274_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8MvzfIrUTWMAX-QC6qK&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfBR0SAg12_Mm8vNvE-p-Wrx_G5dw4XYdMf9elZTufcIHQ&oe=65D0D627"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h2 class="card__title">Colombia</h2>
      <p class="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>
    </div>
    <button class="card__button">Read more</button>
  </div>
</Card>

            </Col>
          </Row>

{/* seconda row */}

<Row className="mb-5">
          <Col xs={1} md={2} lg={1} xl={2} >
        
          </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card class="card">
  <Card.Img
    class="card__background"
    src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/421853837_18376012153077002_655260676932997274_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8MvzfIrUTWMAX-QC6qK&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfBR0SAg12_Mm8vNvE-p-Wrx_G5dw4XYdMf9elZTufcIHQ&oe=65D0D627"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h2 class="card__title">Colombia</h2>
      <p class="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>
    </div>
    <button class="card__button">Read more</button>
  </div>
</Card>


            </Col>
            <Col xs={1} md={2} lg={1} xl={2}>
            </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card class="card">
  <Card.Img
    class="card__background"
    src="https://scontent.fmxp6-1.fna.fbcdn.net/v/t39.30808-6/421853837_18376012153077002_655260676932997274_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=8MvzfIrUTWMAX-QC6qK&_nc_ht=scontent.fmxp6-1.fna&oh=00_AfBR0SAg12_Mm8vNvE-p-Wrx_G5dw4XYdMf9elZTufcIHQ&oe=65D0D627"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
    width="1920"
    height="2193"
  />
  <div class="card__content | flow">
    <div class="card__content--container | flow">
      <h2 class="card__title">Colombia</h2>
      <p class="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>
    </div>
    <button class="card__button">Read more</button>
  </div>
</Card>

            </Col>
          </Row>


        </Container>
      </>
    );
  };
  
  export default Event;