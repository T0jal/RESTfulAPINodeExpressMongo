import {registerFormSubmitEvent, registerButtonEvent, decideButton} from './events.js'

////REGISTER EVENTS
//Captures all the data written in the form
const formDOM = document.querySelector('form')
//register the form submit
registerFormSubmitEvent(formDOM)

//Captures the click of the button
const btn = document.querySelector('#get_games_btn')
registerButtonEvent(btn)

//Delete or Edit button
decideButton();