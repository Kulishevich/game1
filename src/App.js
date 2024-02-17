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
  let [history, setHistory] = useState([]) // массив ходдов(история)

  let [progress, setProgress] = useState(0) // номер хода
  let [editMode, setEditMode] = useState(false) //режим редактирования, влючается при переходе на предыдущий ход

  const clean = () => { //функция очистки
    setElems(Array(9).fill(null))
    setHistory([])
    setToggle(true)
  }

  const click = (index) => { //клик по ячейке 
    if(!elems[index]) {
      let copy = elems;
      copy[index] = toggle ? 'X' : 'O';
      setElems(copy)
      setToggle(!toggle)
      if(editMode) {
        setHistory(prevHistory => [...prevHistory.slice(0, progress + 1), elems.slice()])
        setEditMode(false)
      } else {
        setHistory(prevHistory => [...prevHistory, elems.slice()]) 
      }
      win()
    } 
  }  

  const win = () => { // проверка на выигрышную комбинацию
      let sumbol = toggle ? 'X' : 'O';
      for(let i = 0; i < winCombination.length; i++ ){
        if(elems[winCombination[i][0]] == sumbol && elems[winCombination[i][1]] == sumbol && elems[winCombination[i][2]] == sumbol) {
          alert(`Победил игрок - ${toggle ? 'X' : 'O'}`)
          setTimeout(() => clean(), 1000)
          return
        }
      }
      if(elems.filter(elem => elem == 'X' || elem == 'O').length == 9){ // проверка на Ничью
        alert('Ничья')
        setTimeout(() => clean(), 1000)
      }
    }


  const checkPoint = (index) => { //переход на сохраненный ход
    setToggle(index % 2 == 1 ? true : false)
    setProgress(index)
    setEditMode(true)
    setElems(history[index].slice())
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
