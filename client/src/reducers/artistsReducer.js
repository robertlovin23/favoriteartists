import { FETCH_FAV_ARTISTS, FETCH_ARTIST } from '../actions/types';

export const artistsReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_FAV_ARTISTS:
            return action.payload;
        case FETCH_ARTIST:
            return action.payload;
        default: 
            return state;
    }
}