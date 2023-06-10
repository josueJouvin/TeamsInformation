import { useEffect, useRef, useState } from "react";
import { informationTeam } from "../services/informationTeam";
import { useRoute } from "wouter";

export function useId() {
    console.log("renderizando")
  const [, params] = useRoute("/teamInformation/:id");
  const id = params? params.id : ""
  const [players, setPlayers] = useState([]);
  const [load, setLoading] = useState(false);
  const previusId = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== previusId.current) {
        try {
          setLoading(true);
          previusId.current = params.id;
          const teamPlayers = await informationTeam({id});
          setPlayers(teamPlayers);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { players, load };
}
