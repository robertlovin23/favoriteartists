import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/authReducer'
import { eventsReducer } from '../reducers/eventsReducer'
import { artistsReducer } from '../reducers/artistsReducer'
import { relatedReducer } from '@/reducers/relatedReducer'


export const makeStore = () => {
  return configureStore({
    reducer: {
        artists: artistsReducer,
        auth: authReducer,
        events: eventsReducer,
        related: relatedReducer
    }
  })
}