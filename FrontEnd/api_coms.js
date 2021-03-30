const base_url = "http://localhost:3000/games/"
const headersConfig = { "Content-Type": "application/json" }


export async function getGames(){

    try {
        const response = await fetch(base_url)
        const data = await response.json()

        return data
    }   catch (error) {
        console.error(error)
    }
}


export async function getGamesbyID(id){

    try {
        const response = await fetch(base_url + id)
        const data = await response.json()

        return data
    }   catch (error) {
        console.error(error)
    }
}


export async function saveGame(game){
   try{
       const res = await fetch(base_url, {
           //Tipo de pedido
            method: 'POST',
           //Cabeçalhos
           headers: headersConfig,
           //Dados
           body: JSON.stringify(game)
       })

       const data = await res.json()
       console.log(data)
   } catch (error)
   {
       console.log(error)
   }
}


export async function deleteGame(id){
  const res = await fetch(base_url + id,{
          //Tipo de pedido
          method: 'DELETE'
      })
      return await res.json();
}


export async function updateGame(game){
    try {
      const res = await fetch(base_url + game.id, {
        method: 'PUT',
        headers: headersConfig,
        body: JSON.stringify(game)
      })
  
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }