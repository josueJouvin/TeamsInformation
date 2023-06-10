import { searchTeams } from "../services/teams";
import { useCallback, useRef, useState } from "react";

export function useTeams({ search }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);

  const getTeams = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newTeams = await searchTeams({ search });
      setTeams(newTeams);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { teams, loading, getTeams };
}