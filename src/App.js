import React, { Component } from 'react'

import './App.css'

import GuessLetter from './GuessLetter';
import Letter from './Letter';

const KEYBOARD_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const ITEMS_TO_GUESS = ['VOITURE','ELEPHANT','TELEVISION','EVOLUTION', 'MONUMENT']
const MAX_ERRORS = 5

class App extends Component {

  state = {
    itemToGuess: this.chooseItemToGuess(),
    usedLetters: [],
    itemOnScreen: '',
    guesses: 0,
    errors: 0,
    letters: KEYBOARD_LETTERS,
  }

  chooseItemToGuess() {
    const randomIndex = Math.floor(Math.random() * (ITEMS_TO_GUESS.length))
    return ITEMS_TO_GUESS[randomIndex]
  }

  componentWillMount() {
    const { itemToGuess, usedLetters } = this.state
    this.setState({ itemOnScreen: this.computeDisplay(itemToGuess,usedLetters)})
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleLetterKeypress.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleLetterKeypress)
  }

  getFeedbackForKeybardLetter(letter) {
    const { usedLetters } = this.state
    const letterUsed = usedLetters.includes(letter)
  
    return letterUsed ? 'btn-danger disabled' : 'btn-success'
  }

  computeDisplay(word, usedLetters) {
    return word.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
    )
  }

  // Arrow fx for binding
  handleLetterClick = letter => {
    const { itemToGuess, usedLetters, guesses, errors } = this.state
    const localUsedLetters = usedLetters
    let localGuesses = guesses
    let localErrors = errors
    if(!localUsedLetters.includes(letter)) {
      localUsedLetters.push(letter)
      localGuesses++;
    }
    if(!itemToGuess.includes(letter)) {
      localErrors++;
    }
    this.setState(
      () => ({ usedLetters: localUsedLetters, itemOnScreen: this.computeDisplay(itemToGuess, localUsedLetters), guesses: localGuesses, errors: localErrors })
    )
  }

  // Arrow fx for binding
  handleLetterKeypress = event => {
    const { itemToGuess, usedLetters, guesses, errors } = this.state
    const localUsedLetters = usedLetters;
    let localErrors = errors
    const keyPressed = String.fromCharCode(event.keyCode).toUpperCase()
    let localGuesses = guesses;
    if(!itemToGuess.includes(keyPressed) && !localUsedLetters.includes(keyPressed) && keyPressed.match("[A-Z]")) {
      localErrors++;
    }
    if(!localUsedLetters.includes(keyPressed) && keyPressed.match("[A-Z]")) {
      localUsedLetters.push(keyPressed)
      localGuesses++;
    }
    this.setState(
      () => ({ usedLetters: localUsedLetters, itemOnScreen: this.computeDisplay(itemToGuess, localUsedLetters), guesses: localGuesses, errors: localErrors })
    )
  }

  // Arrow fx for binding
  resetGame = () => {
    const newitemToGuess = this.chooseItemToGuess()
    const newitemOnScreen = this.computeDisplay(newitemToGuess,[])
    this.setState(
      () => ({ itemToGuess: newitemToGuess, usedLetters: [], itemOnScreen: newitemOnScreen, guesses: 0, errors: 0 })
    )
  }

  render() {
    const { letters, itemToGuess, itemOnScreen, guesses, errors } = this.state
    const endedGame = (itemOnScreen === itemToGuess) || (errors > MAX_ERRORS);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1>Mot à trouver :</h1>
            <em>{`${MAX_ERRORS} erreurs maximum sont permises`}</em>
          </div>
          <div className="col-md-2">
            <em><span className="btn btn-primary score">{guesses}</span> essai(s)</em><br />
            { errors > 0 && (
              <em><span className="btn btn-danger score">{errors}</span> erreur(s)</em>
              )
            }
          </div>
        </div>
        <div className="row">
          {[...itemOnScreen].map((letter, index) => (
            <GuessLetter
              key={index}
              letter={letter}
            />
          ))}
        </div>
        {endedGame ? (
          <div className="row">
              <div className="col-md-12 text-center">
                <h1>{ itemOnScreen === itemToGuess ? 'GAGNÉ !!!' : 'PERDU !!!'}</h1>
              </div>
              <div className="col-md-12">
                <button className="btn btn-primary center-block" onClick={this.resetGame}>Recommencer</button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <h1>Lettres :</h1>
              </div>
              {letters.map((letter, index) => (
                <Letter
                  key={index}
                  feedback={this.getFeedbackForKeybardLetter(letter)}
                  letter={letter}
                  onClick={this.handleLetterClick}
                />
              ))}
            </div>
          )
        }
      </div>
    )
  }
}

export default App