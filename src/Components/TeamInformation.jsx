import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useTeams } from "../hooks/useTeams";

export const TeamInformation = ({ previusId, players, setPlayers}) => {
  const [, params] = useRoute("/teamInformation/:id");
  const { id } = params;
  const { getTeams, loading} = useTeams({previusId,setPlayers});
  
  useEffect(() => {
    getTeams({ id });
    previusId.current = id
  },[]);


  if (loading) {
    console.log(loading)
    return <div>Cargando...</div>;
  }

  if (!id) {
    return <div>Error: no se encontró el equipo</div>;
  }
  return (
    <Container>
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
