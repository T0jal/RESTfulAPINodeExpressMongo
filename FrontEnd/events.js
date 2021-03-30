import Game from './model/game.js'
import {getGames, getGamesbyID, saveGame, deleteGame, updateGame} from './api_coms.js'


// GET All Games
export function registerButtonEvent(btn){
    btn.addEventListener('click', async ()=>{
        showGames()
    });
}

async function  showGames() {
    const games = await getGames();

    const games_list = document.querySelector('#data-list')

    games_list.innerHTML = ''

    games.forEach(game => {
        games_list.innerHTML += `<tr> ${drawGamesList(game)} </tr>`
    })
}

function drawGamesList(game) {
    return `<td> ${game.title} </td> 
            <td> ${game.price / 100} </td> 
            <td> ${game.description} </td>
            <td> ${game.type} </td> 
            <td> ${game.rating} </td>
            <td>
                <button id="${game._id}" class="update btn btn-primary" type="submit">Edit</button>
                <button id="${game._id}" class="delete btn btn-danger" type="submit">Delete</button>
            </td>`
}

/////////

//INSERT One Game
export function registerFormSubmitEvent(formDOM){

    formDOM.addEventListener('submit', async (e)=>{
        e.preventDefault()
    
        //Assemble a Game object
        const game = new Game (formDOM.title.value,
                               formDOM.price.value,
                               formDOM.description.value,
                               formDOM.type.value,
                               formDOM.rating.value)
    
        //Send object
        const result = await saveGame(game)
    
        //Clean form
        formDOM.title.value         = ''
        formDOM.price.value         = ''
        formDOM.description.value   = ''
        formDOM.type.value          = ''
        formDOM.rating.value        = ''
            
        showGames()
    })
}

/////////////////

//DELETE One Game OR UPDATE One Game
export function decideButton(){
    const games_list = document.querySelector('#data-list')

    document.addEventListener('click', (event)=>{
        let element = event.target;
        if(element.className == "delete btn btn-danger" && element.id != "")
        {
            deleteGame(element.id);
            console.log(`${element.id} has been destroyed.`);
            showGames();
        }
        else if(element.className == "update btn btn-primary" && element.id != "")
        {
            fillFormAndSaveNewGame(element.id);
            console.log(`${element.id} has been updated.`);
        }
    })
}

//Fills the form with the data from the selected object and adds a save button. 
//The save button, after clicked, sends the new object to be saved.
//The save button is removed.
async function fillFormAndSaveNewGame(id){
    const game = await getGamesbyID(id)
    console.log(game);

    const formDOM = document.querySelector('form')
    
    formDOM.innerHTML += `<button id="${game._id}" name="saveBtn" class="save btn btn-warning" type="reset">Save</button>`

    formDOM.title.value         = game.title
    formDOM.price.value         = game.price
    formDOM.description.value   = game.description
    formDOM.type.value          = game.type
    formDOM.rating.value        = game.rating

    formDOM.addEventListener('reset', async (event) => {
        
        const newGame = new Game (
            formDOM.title.value,
            formDOM.price.value,
            formDOM.description.value,
            formDOM.type.value,
            formDOM.rating.value,
            id)
        
        console.log(newGame)
        await updateGame(newGame)
        
        const el = document.getElementById(id)
        el.remove()

        showGames()
    })
}