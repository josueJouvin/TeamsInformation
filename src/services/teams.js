export const searchTeams = async ({ search }) => {
  if (search === "") return;
  const options = {
    headers: {
      "x-rapidapi-host": "https://v2.nba.api-sports.io",
      "x-rapidapi-key": "56d0cebffc5e10bb00e36025d0d56193",
    },
  };

  try {
    const response = await fetch(
      `https://v2.nba.api-sports.io/teams?search=${search}`,
      options
    );
    const json = await response.json();
    const teams = json.response;
    return teams?.map((team) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
      country: team.city,
      founded: team.nickname,
    }));
  } catch (e) {
    throw new Error("Error en la busqueda de equipos");
  }
};
