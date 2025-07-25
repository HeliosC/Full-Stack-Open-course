import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setvotes] = useState({})

  const bestVoted = Object.entries(votes).reduce(
    (previous, current) => current[1] > previous[1] ? current : previous,
    [0, 0]
  )[0]

  const handleNextAnecdote = () => {
    const index = Math.trunc(Math.random() * anecdotes.length)    
    setSelected(index)
  }

  const handleVoteAnecdote = () => {
    const _votes = { ...votes }    

    if(selected in _votes) {
      _votes[selected] += 1
    } else {
      _votes[selected] = 1
    }
    setvotes(_votes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ?? 0} votes</p>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestVoted]}</p>
    </div>
  )
}

export default App