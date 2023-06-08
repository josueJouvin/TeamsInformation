import { Teams } from "./Components/Teams";
import { Info } from "./Components/TeamInformation";
import { useSearch } from "./hooks/useSearch";
import { useTeams } from "./hooks/useTeams";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import debounce from "just-debounce-it";
import { useCallback } from "react";
import { Route, Switch } from "wouter";

const App = () => {
  const { search, setSearch, error } = useSearch();
  const { teams, loading, getTeams } = useTeams({ search: search });

  const debounceGetMovies = useCallback(
    debounce( search => {
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
    <>
    <Route path="/">
      <header className="py-3 bg-primary">
        <h1 className="text-center text-light">Soccer Team Information</h1>
      </header>

      <Container>
        <Form className="row g-3 my-4 flex" onSubmit={handleSubmit}>
          <Row className="justify-contend-center align-items-end">
            <Col md={9}>
              <Form.Group>
                <Form.Label className="fs-4 fw-bold" htmlFor="text">
                  Busca tus equipos favoritos por Nombre o Pais:
                </Form.Label>
                <Form.Control
                  style={{ borderColor: error && "red" }}
                  value={search}
                  onChange={handleChange}
                  id="text"
                  type="text"
                  placeholder="Milan, Real Madrid, PSG, Bayer Munich"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button className="w-100" type="submit">
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
          {loading ? (
            <p className="text-center fs-5 fw-bold">Cargando...</p>
          ) : (
            <Route path="/">
              <Teams teams={teams} />
            </Route>
          )}
          <Route path="/teamInformation/:id" component={Info} />
        </Switch>
      </main>
    </>
  );
};

export default App;
