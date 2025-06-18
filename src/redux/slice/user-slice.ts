import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  currentUser: User | null
  isLoggedIn: boolean
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
    },
    loadPersistedUserState: (state, action: PayloadAction<UserState>) => {
      return action.payload
    },
  },
})

export const { login, logout, loadPersistedUserState } = userSlice.actions
export default userSlice.reducer
