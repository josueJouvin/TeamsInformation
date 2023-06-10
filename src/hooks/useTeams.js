import { informationTeam } from "../services/informationTeam";
import { searchTeams } from "../services/teams";
import { useCallback, useRef, useState } from "react";

export function useTeams({ search, previusId, setPlayers }) {
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);

  const getTeams = useCallback(async ({ search, id }) => {

    try {
      setLoading(true);
      setError(null);
      if (search && search !== previusSearch.current) {
        previusSearch.current = search;
        const newTeams = await searchTeams({ search });
        setTeams(newTeams);
      }
      
      if ( id !== previusId.current) {
        previusId.current = id
        const teamPlayers = await informationTeam({ id });
        setPlayers(teamPlayers);
      }

    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { teams, loading, getTeams};
}
