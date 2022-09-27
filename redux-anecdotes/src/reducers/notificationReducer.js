import { createSlice } from '@reduxjs/toolkit'

let timeOutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: 'initial notification',
    show: false
  },
  reducers: {
    setNotificationMessage(state, action) {
      state.message = action.payload
      state.show = true
    },
    toggleOffNotification(state) {
        state.show = false
    }
  }
})

export const setNotification = (message, time) => {
  return dispatch => {
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      dispatch(toggleOffNotification())
    }, time*1000)
    dispatch(setNotificationMessage(message))
  }
}

export const { setNotificationMessage, toggleOffNotification } = notificationSlice.actions
export default notificationSlice.reducer