import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [count,setCount] = useState(0)
  const [result,setResult] = useState(false)
  const [x,setX] = useState([])
  const [o,setO] = useState([])
  const [winner,setWinner] = useState()
  const [ties,setTies] = useState(0)
  const [xWins,setXWins] = useState(0)
  const [oWins,setOWins] = useState(0)

  useEffect(()=>{
    if(findResult(x)){
      setResult(true)
      setXWins(prev => prev + 1)
      setWinner('X')
    } 
    if(findResult(o))  {
      setResult(true) 
      setOWins(prev => prev + 1)
      setWinner('O')
    }
    
  },[count])

  function toggle(event) {
    if(result) {
      console.log("end of the game");
    }
    else {
      if(count%2 === 0) {
        let index = event.target.classList[1]
        if(x.includes(index) || o.includes(index)){
          return
        }
        setX(prev => [...prev,index])
        event.target.innerHTML = "X"
      }
      else {
        let index = event.target.classList[1]
        if(x.includes(index) || o.includes(index)) {
          return
        };
        setO(prev => [...prev,index])
        event.target.innerHTML = "O"
      }
      setCount(prev => prev+1)
      if(count === 8) {
        setResult(true)
        setTies(prev => prev + 1)
      }
    }
  }

  function findResult(array) {
    if( array.includes('1') && array.includes('2') && array.includes('3') ||
        array.includes('4') && array.includes('5') && array.includes('6') ||
        array.includes('7') && array.includes('8') && array.includes('9') ||
        array.includes('1') && array.includes('4') && array.includes('7') ||
        array.includes('2') && array.includes('5') && array.includes('8') ||
        array.includes('3') && array.includes('6') && array.includes('9') ||
        array.includes('1') && array.includes('5') && array.includes('9') ||
        array.includes('3') && array.includes('5') && array.includes('7')
    ) {
      return true;
    }
  }

  function reset() {
    setCount(0)
    setResult(false)
    setX([])
    setO([])
    setWinner()
  }

  return (
    <div className='app'>
      <h1>Tic Tac Toe</h1>
      {!result ? 
      <div className='container'>
        <div onClick={toggle} className='cell 1'></div>
        <div onClick={toggle} className='cell 2'></div>
        <div onClick={toggle} className='cell 3'></div>
        <div onClick={toggle} className='cell 4'></div>
        <div onClick={toggle} className='cell 5'></div>
        <div onClick={toggle} className='cell 6'></div>
        <div onClick={toggle} className='cell 7'></div>
        <div onClick={toggle} className='cell 8'></div>
        <div onClick={toggle} className='cell 9'></div>
      </div> : <div></div>}
      {winner || result ?
      <div>
        <h4>Times X wins: {xWins}</h4>
        <h4>Times O wins: {oWins}</h4>
        <h4>Times ties: {ties}</h4>
      </div>:
      <></>}
      <h3 className={winner || result ? 'message' : ''}>
      {winner === 'X' ? 'Winner: player X' : winner === 'O' ? 'Winner: player O' : result ? 'Tie!' : <></> }
      </h3>
      {winner || result ? <button onClick={reset}>Play Again</button>: ''}
    </div>
  )
  
}

export default App