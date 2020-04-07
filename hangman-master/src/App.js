import React, {useState} from 'react';
import './App.css';
import LetterButton from './LetterButton'
import Blank from "./Blank"
import './Background.scss';
import {newCategory, newSecret, themes} from "./randomWords.js"
import Background from "./Background"
import {pictures, win} from "./Images.js"
import Winner from './Winner.js'
import Category from "./Category.js"
import Fireworks from "./Fireworks.js"



function App() {
  
  const [theme, setTheme] = useState(newCategory(themes))
  const [secret, setSecret] = useState(newSecret(themes[theme]))
  const [clear, setClear] = useState(false)

  let letters = secret.map(
    (letter) => ({letter: letter, show: false}))
  const [lettersObjects, setLetterObjects] = useState(letters)
  const [count, setCount] = useState(0)

  let fireworks = null
  let win = null
  if(lettersObjects.every((letra)=> letra.show)){
    fireworks = <Fireworks />
    win = <Winner />
  }

  const row1Letters = ["A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map(
    (letter) => <LetterButton letter={letter} checkLetter={() => checkLetter(letter)}clear={clear} count={count}/>)

  const row2Letters = ["N","O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "W", "Z"].map(
    (letter) => <LetterButton letter={letter} checkLetter={() => checkLetter(letter)} clear={clear} count={count}/>)


  const blanks = lettersObjects.map(
    (ob, i) => <Blank key={i} secret={ob.letter} showMe={ob.show} />)
    console.log(secret)




  function newGame() {
    let categoryCambio = newCategory(themes)
    setTheme(categoryCambio)
    let secretCambio = newSecret(themes[categoryCambio])
    setSecret(secretCambio)

    let letters = secretCambio.map(
      (letter) => ({letter: letter, show: false})
    )
    setLetterObjects(letters)
    setCount(0)
    setClear(true)
    console.log(secret);
  }

  function increment() {
    if(count < 8){
      setCount( count + 1)
      setClear(false)
    }else if (count == 8){
      newGame()
    }
  }
  function checkLetter(letter){
    let letra = letter.toLowerCase()
    let letras = lettersObjects.slice()
      if (secret.includes(letra)){
        setLetterObjects(letras.map(
            function(ob) {
              if (letra == ob.letter) {
                  return {letter: letra, show: true}
                    
              }else {
                return ob
              }
            }
          )
        )
      } else{
        increment()
      }
      
  }
    
 
  
    
  return (
    <div className="App">
      
      <Background />
      {win}
      <img className="hang" src={pictures[count]}/>
      <p></p>
      {fireworks}
      {row1Letters}
      <p></p>
      {row2Letters}
        <button onClick={()=> newGame()}>New Game</button>
      <p></p>
      <Category/>
      {theme}

      <div className="blank-list">
        {blanks}
      </div>
      
    </div>
  );
  
}
export default App;
