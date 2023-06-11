import { Teams } from "./Components/Teams";
import { InfoTeams } from "./Components/TeamInformation";
import { useSearch } from "./hooks/useSearch";
import { useTeams } from "./hooks/useTeams";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import debounce from "just-debounce-it";
import { useCallback } from "react";
import { Route, Switch } from "wouter";
import { useIdi } from "./hooks/useIdi";

const App = () => {
  const { players, load } = useIdi();
  const { search, setSearch, error } = useSearch();
  const { teams, loading, getTeams } = useTeams({ search });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getTeams({ search });
    }, 300),
    [getTeams]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    getTeams({ search });
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  return (
    <div>
      <Route path="/">
        <header className="py-3 bg-primary">
          <h1 className="text-center text-light">Soccer Team Information</h1>
        </header>

        <Container>
          <Form className="row g-3 my-4 flex" onSubmit={handleSubmit}>
            <Row className="justify-contend-center align-items-end">
              <Col md={9}>
                <Form.Group>
                  <Form.Label className="fs-3 fw-bold text-light" htmlFor="text">
                    Busca tus equipos favoritos por Nombre o Pais:
                  </Form.Label>
                  <Form.Control
                    className="fs-5"
                    style={{ borderColor: error && "red"}}
                    value={search}
                    onChange={handleChange}
                    id="text"
                    type="text"
                    placeholder="Milan, Real Madrid, PSG, Bayer Munich"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button className="w-100 fs-5" type="submit">
                  Buscar equipos
                </Button>
              </Col>
            </Row>
          </Form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Container>
      </Route>
      <main>
        <Switch>
          <Route path="/teamInformation/:id" exact>
            {load ? (
              <p className="text-center fs-3 fw-bold text-light">Cargando...</p>
            ) : (
              <InfoTeams players={players} />
            )}
          </Route>
          <Route path="/" exact>
            {loading ? (
              <p className="text-center fs-3 fw-bold text-light">Cargando...</p>
            ) : (
              <Teams teams={teams} />
            )}
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
