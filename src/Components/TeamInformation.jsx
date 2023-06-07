import { Container, Row, Col, Card } from "react-bootstrap";
import teamInfo from "../mocks/teamInfo.json"
const TeamInformation = () => {
  return (
    <Container>
      <Row>
      {teamInfo.response[0].players.map((player) => (
          <Col md={6} lg={4} key={player.id}>
            <Card className="m-4">
              <Card.Img
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
                varriant="top"
                src={player.photo}
                alt={`Imagen ${player.name}`}
              />
              <Card.Body>
                <Card.Title>
                  <strong>{player.name}</strong>
                </Card.Title>
                <Card.Text>
                  <strong>Posicion:</strong> {player.position}
                </Card.Text>
                <Card.Text>
                  <strong>Numero:</strong> {player.number}
                </Card.Text>
                <Card.Text>
                  <strong>Edad:</strong> {player.age}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export function Info() {
  return <TeamInformation />;
}
