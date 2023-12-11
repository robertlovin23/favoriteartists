
const { spotifyApi } = require('../helpers/spotifyCredentials');

module.exports = (app) => {
    app.get('/api/userinfo', async (req,res) => {
        const accessToken = spotifyApi.getAccessToken(); 
        const response = await fetch('https://api.spotify.com/v1/me', {
         method: 'GET',
         headers: { 'Authorization':`Bearer ${accessToken}`}
        })
        const data = await response.json();
        res.send(data)
     })
}


