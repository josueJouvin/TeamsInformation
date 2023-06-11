import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "wouter";

function ListTeams({ teams}) {

  return (
    <>
      <Container>
        <Row>
          {teams.map((team) => (
            <Col md={6} lg={4} key={team.id}>
              <Card className="m-4 border border-3 border-primary">
                <Card.Img
                  style={{ aspectRatio: "1/1", objectFit: "cover",borderBottom: "1px solid black", padding: "10px" }}
                  varriant="top"
                  src={team.logo}
                  alt={`Imagen ${team.name}`}
                />
                <Card.Body>
                  <Card.Title className="fs-3">
                    <strong>{team.name}</strong>
                  </Card.Title>
                  <Card.Text className="fs-5">
                    <strong>Pais:</strong> {team.country}
                  </Card.Text>
                  <Card.Text className="fs-5">
                    <strong>Fundacion:</strong>{" "}
                    {team.founded ? team.founded : "Sin Información"}
                  </Card.Text>
                  <Card.Text className="fs-5">
                    <strong>Ciudad:</strong>{" "}
                    {team.city ? team.city : "Sin Información"}
                  </Card.Text>
                  <Card.Text className="fs-5">
                    <strong>Estadio:</strong>{" "}
                    {team.nameStadium ? team.nameStadium : "Sin Información"}
                  </Card.Text>
                  <Link
                    to={`/teamInformation/${team.id}`}
                    className="w-100 mt-2 btn fs-5 fw-bold btn-warning"
                  >
                    Mas Información
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

function NoTeams() {
  return <p className="text-center fs-3 fw-bold">No se encontraron equipos</p>;
}

export function Teams({teams}) {
  const hasTeams = teams?.length > 0;
  return hasTeams ? <ListTeams teams={teams} /> : <NoTeams />;
}
