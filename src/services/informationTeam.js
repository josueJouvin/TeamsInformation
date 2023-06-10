
export const informationTeam = async({id}) =>{
  const options = {
        headers: {
          "x-rapidapi-key": "56d0cebffc5e10bb00e36025d0d56193"
        },
    }
    try{
      
        const response = await fetch(`https://v1.american-football.api-sports.io/players?season=2022&team=${id}`,options)
        const json = await response.json()
        const players = json.response
        return players.map(player => ({
          id: player.id,
          name: player.name,
          age: player.age,
          number: player.number,
          position: player.position,
          photo: player.image,
        }))
    
    }catch(e){
        throw new Error("Error en la extracion de info")
    }
}