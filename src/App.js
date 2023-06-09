import { useState } from "react"
import "./App.css"
import Board from "./components/board/Board"

function App() {
  const [history, setHistory] = useState([{ value: new Array(9).fill(null) }])
  const [xValue, setXvalue] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const calculateWinner = (value) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index]
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        return value[a]
      }
      return null
    }
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.value)

  let status
  if (winner) {
    status = `Winner: ` + winner
  } else {
    status = `Next player ${xValue ? "X" : "O"}`
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newValue = newCurrent.value.slice()
    if (calculateWinner(newValue) || newValue[i]) {
      return
    }

    newValue[i] = xValue ? "X" : "O"
    setHistory([...newHistory, { value: newValue }])
    setXvalue((prev) => !prev)

    setStepNumber(newHistory.length)
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXvalue(step % 2 === 0)
  }

  const moves = history.map((el, idx) => {
    const desc = idx ? "Go to move #" + idx : "Go to game start"
    return (
      <li key={idx}>
        <button className="move-button" onClick={() => jumpTo(idx)}>
          {desc}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board value={current.value} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  )
}

export default App
