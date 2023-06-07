import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "wouter";
function ListTeams({ teams }) {

  const handleClick = (id) =>{
    console.log(id)
  }
  return (
    <>
      <Container>
        <Row>
          {teams.map((team) => (
            <Col md={6} lg={4} key={team.id}>
              <Card className="m-4">
                <Card.Img
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  varriant="top"
                  src={team.logo}
                  alt={`Imagen ${team.name}`}
                />
                <Card.Body>
                  <Card.Title>
                    <strong>{team.name}</strong>
                  </Card.Title>
                  <Card.Text>
                    <strong>Pais:</strong> {team.country}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fundacion:</strong>{" "}
                    {team.founded ? team.founded : "Sin Información"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Ciudad:</strong>{" "}
                    {team.city ? team.city : "Sin Información"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Estadio:</strong>{" "}
                    {team.nameStadium ? team.nameStadium : "Sin Información"}
                  </Card.Text>
                  <Link
                    to={`/teamInformation/${team.id}`}
                    className="w-100 mt-2"
                    onClick={()=> handleClick(team.id)}
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

export function Teams({ teams }) {
  const hasTeams = teams?.length > 0;
  return hasTeams ? <ListTeams teams={teams} /> : <NoTeams />;
}
