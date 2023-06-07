
export const informationTeam = async({id}) =>{
    const options = {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "56d0cebffc5e10bb00e36025d0d56193"
        },
    }
    
    try{
        const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${id}`,options)
        const json = await response.json()
        const players = json.response[0].players
        console.log("renderizado")
        return players.map(player => ({
          id: player.id,
          name: player.name,
          age: player.age,
          number: player.number,
          position: player.position,
          photo: player.photo,
        }))
    }catch(e){
        throw new Error("Error en la extracion de info")
    }
}