import react from 'react'
import './App.css'
import Text from "./Text"
import Dices from './Dices'
import Confetti from './Confetti'

function App() {
  const [dices, setDices] = react.useState([]);
  const [wonGame, setWonGame] = react.useState(false);

  react.useEffect(() => {
    let loadedDices = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.ceil(Math.random() * 6);
      loadedDices.push({
        id: i,
        value: random,
        isSelected: false,
      })
    }
    setDices(loadedDices);
  }, []);

  react.useEffect(() => {
    const won =  dices.length && dices.every(dice => dice.isSelected && dice.value === dices[0].value);
    if (won) setWonGame(won);
  }, [dices])


  const handleClickDice = (id) => {
    setDices(oldDices => {
      return oldDices.map((dice, index) => {
        return index === id ? { ...dice, isSelected: !dice.isSelected } : dice;
      });
    });
  }

  const handleRoll = () => {
    if (!wonGame) {
      setDices(oldDices => {
        return oldDices.map(dice => {
          const random = Math.ceil(Math.random() * 6);
          dice.value = dice.isSelected ? dice.value : random;
          return dice;
        });
      });
    } else {
      setDices(oldDices => {
        return oldDices.map(dice => {
          const random = Math.ceil(Math.random() * 6);
          dice.isSelected = false;
          dice.value = random;
          return dice;
        });
      });
      setWonGame(false);
    }
  }

  return (
    <main className="App">
      {wonGame && <Confetti/>}
      <Text />
      <Dices
        dices={dices}
        setDices={setDices}
        handleClick = {handleClickDice}
      />
      <button className='roll' onClick={handleRoll}>{wonGame? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
