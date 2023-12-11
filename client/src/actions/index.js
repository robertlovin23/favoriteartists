import { FETCH_USER, FETCH_FAV_ARTISTS, FETCH_ARTIST_EVENTS, FETCH_ARTIST, FETCH_RELATED_ARTISTS } from "./types";


export const fetchUser = () => async (dispatch) => {
  const response = await fetch('/api/userinfo', {
    method: 'GET'
  });
  const data = await response.json();
  dispatch({
    type: FETCH_USER, // Use 'type' instead of 'action'
    payload: data
  });
};

export const fetchFavArtists = () => async (dispatch) => {
  const response = await fetch('/api/favorite-artists', {
    method: 'GET'
  });
  const data = await response.json();
  dispatch({
    type: FETCH_FAV_ARTISTS, // Use 'type' instead of 'action'
    payload: data
  });
};

export const fetchArtistEvents = (artists) => async (dispatch) => {
    const response = await fetch(`/api/artist-events/${artists}`, {
        method: 'GET'
      });
      const data = await response.json();
      dispatch({
        type: FETCH_ARTIST_EVENTS, // Use 'type' instead of 'action'
        payload: data
      });
  };


  export const fetchArtist = (id) => async (dispatch) => {
    const response = await fetch(`/api/artist-info/${id}`, {
      method: 'GET'
    });
    const data = await response.json();
    dispatch({
      type: FETCH_ARTIST, // Use 'type' instead of 'action'
      payload: data
    });
  };


  export const fetchRelatedArtists = (id) => async (dispatch) => {
    const response = await fetch(`/api/related-artists/${id}`, {
      method: 'GET'
    });
    const data = await response.json();
    dispatch({
      type: FETCH_RELATED_ARTISTS, // Use 'type' instead of 'action'
      payload: data
    });
  };

