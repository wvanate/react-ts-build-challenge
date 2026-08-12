import { createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

type ThemeState = {
    value: Theme
}

const initialState: ThemeState = {
    value: 'dark',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === 'dark' ? 'light' : 'dark'
        },
        setTheme: (state, action: { payload: Theme }) => {
            state.value = action.payload
        },
    },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
