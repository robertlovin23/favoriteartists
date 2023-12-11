import {  FETCH_ARTIST_EVENTS } from '../actions/types';

export const eventsReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_ARTIST_EVENTS:
            return action.payload;
        default: 
            return state;
    }
}