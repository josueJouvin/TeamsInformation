import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect,  useState } from "react";
import { informationTeam } from "../services/informationTeam";
import { useRoute } from "wouter";

export const TeamInformation = ({players,previusId,setPlayers}) => {
  const [, params] = useRoute('/teamInformation/:id');
  const { id } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== previusId.current && players.length === 0) {
        try {
          setLoading(true);
          console.log(id);
          const teamPlayers = await informationTeam({ id });
          previusId.current = id;
          setPlayers(teamPlayers);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }else{
        setLoading(false)
      }
    };
    fetchData()
  }, []);

  if (loading) {
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
}
