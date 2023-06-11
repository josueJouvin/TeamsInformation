import { Container, Row, Col, Card } from "react-bootstrap";

function TeamInformation ({players}) {

  return (
    <Container>
      <Row>
         <h1 className="text-light text-center mt-5">JUGADORES</h1>
      </Row>
      <Row>
        {players.map((player) => (
          <Col md={6} lg={4} key={player.id}>
            <Card className="m-4">
              <Card.Img
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
                varriant="top"
                src={player.photo}
                alt={`Imagen ${player.name}`}
              />
              <Card.Body>
                <Card.Title className="fs-3">
                  <strong>{player.name}</strong>
                </Card.Title>
                <Card.Text className="fs-5">
                  <strong>Posicion:</strong> {player.position}
                </Card.Text>
                <Card.Text className="fs-5">
                  <strong>Numero:</strong> {player.number}
                </Card.Text>
                <Card.Text className="fs-5">
                  <strong>Edad:</strong> {player.age}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function NoPlayers() {
  return <p className="text-center fs-3 fw-bold">No se Encontraron Jugadores</p>;
}

export function InfoTeams({players}){
  const hasInfo = players?.length > 0;
  return hasInfo ? <TeamInformation players={players}/> : <NoPlayers/>
}