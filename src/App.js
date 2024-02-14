import { useState } from 'react';
import './App.css';
import Elems from './Elems/Elems'
import Saves from './Saves/Saves';


let winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  let [elems, setElems] = useState(Array(9).fill(null)) //массив ячеек
  let [toggle, setToggle] = useState(true) //переключатель хода
  let [history, setHistory] = useState([])

  function clean(){ //функция очистки
    setElems(Array(9).fill(null))
    setHistory([])
    setToggle(true)
  }

  function click(index) { //клик по ячейке
    if(!elems[index]) {
      let copy = elems;
      copy[index] = toggle ? 'X' : 'O';
      setElems(copy)
      setToggle(!toggle)

      
      setHistory(prevHistory => [...prevHistory, elems.slice()]);
      win()
    }
  }  

  function win(){ // проверка на выигрышную комбинацию
      let sumbol = toggle ? 'X' : 'O';
      for(let i = 0; i < winCombination.length; i++ ){
        if(elems[winCombination[i][0]] == sumbol && elems[winCombination[i][1]] == sumbol && elems[winCombination[i][2]] == sumbol) {
          alert(`Победил игрок - ${toggle ? 'X' : 'O'}`)
          setTimeout(() => {
            setElems(Array(9).fill(null))
            setToggle(true)
            setHistory([])
          }, 1000)
        }
      } 
    }

  let checkPoint = (index) => { //переход на сохраненный ход
    setElems(history[index])
  }

  return (
    <div className='main'>
      <div className='button' onClick={clean}>Очистить поле</div>
        <div className='container'>
          <Elems elems={elems} click={click}/>
        </div>
        <div className='footer'>Сейчас ходит: { toggle ? 'X' : 'O'}</div>
        <div className='history'>
          <Saves history={history} checkPoint={checkPoint}/>
        </div>
    </div>
  )
}

export default App;
