export const searchTeams = async ({ search }) => {
  if (search === "") return;
  const options = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "56d0cebffc5e10bb00e36025d0d56193",
    },
  };

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams?search=${search}`,
      options
    );
    const json = await response.json();
    const teams = json.response;

    return teams?.map((team) => ({
      id: team.team.id,
      name: team.team.name,
      logo: team.team.logo,
      country: team.team.country,
      founded: team.team.founded,
      city: team.venue.city,
      nameStadium: team.venue.name,
    }));
  } catch (e) {
    throw new Error("Error en la busqueda de equipos");
  }
};