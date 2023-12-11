import { FETCH_RELATED_ARTISTS } from '../actions/types';

export const relatedReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_RELATED_ARTISTS:
            return action.payload;
        default: 
            return state;
    }
}