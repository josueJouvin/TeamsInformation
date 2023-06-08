import { searchTeams } from "../services/teams";
import { useCallback, useRef, useState } from "react";

export function useTeams({ search, id }) {
  const [teams, setTeams] = useState([]);
  const [infoTeams, setInfoTeams] = useState([])
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const previusSearch = useRef(search);

  const getTeams = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      if(search){
      previusSearch.current = search;
      const newTeams = await searchTeams({ search });
      setTeams(newTeams);
      }
      if(id){
        console.log(id)
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { teams, loading, getTeams };
}
