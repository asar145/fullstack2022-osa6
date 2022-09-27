import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filterObj = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(a => a.content.toLowerCase().includes(filterObj.filter.toLowerCase()))
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList