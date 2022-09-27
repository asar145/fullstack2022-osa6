import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVotes(state, action) {
      const newState = state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return action.payload
        }
        return anecdote;
      })
      return newState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const newAnecdote = {
      ...content,
      votes: content.votes + 1
    }
    await anecdoteService.update(newAnecdote)
    dispatch(updateVotes(newAnecdote))
  }
}

export const { updateVotes, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
