import { searchTeams } from "../services/teams";
import { useCallback, useRef, useState } from "react";

export function useTeams({ search}) {
  const [teams, setTeams] = useState([]);
  const [infoTeams, setInfoTeams] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);
  const previusId = useRef("")
  const getTeams = useCallback(async ({ search, idI}) => {
    
    try {
      console.log("en el try")
      setLoading(true);
      setError(null);
      if (idI !== previusId.current) {
        previusId.current = idI
        console.log("aqui",idI,previusId);
        // Realiza las acciones necesarias cuando se pasa id
      }
      if (search !== previusSearch.current) {
        previusSearch.current = search;
        const newTeams = await searchTeams({ search });
        setTeams(newTeams);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { teams, loading, getTeams };
}
