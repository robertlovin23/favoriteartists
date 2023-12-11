
const { spotifyApi } = require('../helpers/spotifyCredentials');
const keys = require('../config/keys')

module.exports = (app) => {
    app.get('/api/fetchrecs', async (req,res) => {
        // const params = req.body;
        const accessToken = spotifyApi.getAccessToken(); 

        const params = new URLSearchParams();

        params.append('seed_genres', 'electronic,indie')
        params.append('limit', 5);
        params.append('target_valence', 0.7);
        params.append('max_danceability', 0.4);
        params.append('target_energy', 0.3)

        const response = await fetch('https://api.spotify.com/v1/recommendations?' + params, {
            method: 'GET',
            headers: { 'Authorization':`Bearer ${accessToken}`}
        })
        const data = await response.json();
        res.send(data)
     })

     app.get('/api/favorite-artists', async (req,res) => {

        // const params = req.body;
        const accessToken = spotifyApi.getAccessToken(); 
        console.log(accessToken);

        const params = new URLSearchParams();

        params.append('limit', 10);
        params.append('offset', 0);

        const response = await fetch('https://api.spotify.com/v1/me/top/artists?' + params, {
            method: 'GET',
            headers: { 'Authorization':`Bearer ${accessToken}`}
        })
        const data = await response.json();
        res.send(data)
     })

     app.get('/api/artist-events/:keyword', async (req,res) => {
        const keyword = req.params.keyword;

        const params = new URLSearchParams();

        params.append('keyword', keyword);
        params.append('apikey', keys.api_key);

        const response = await fetch(keys.ticketmaster_uri + '/events?' + params, {
            method: 'GET',
        })
        const data = await response.json();
        res.send(data)
     })


     app.get("/api/artist-info/:id", async (req, res) => {
          const artistId = req.params.id;

          console.log(artistId)
          const accessToken = spotifyApi.getAccessToken(); 
  
          const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
              method: 'GET',
              headers: { 'Authorization':`Bearer ${accessToken}`}
          })
  
          const data = await response.json();
          res.send(data)
     })


     app.get("/api/related-artists/:id", async (req, res) => {
        const artistId = req.params.id;

        const accessToken = spotifyApi.getAccessToken();

        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}`}
        })

        const data = await response.json();
        console.log(data)
        res.send(data)
     })

     
}
