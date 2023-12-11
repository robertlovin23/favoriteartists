const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('../config/keys')

const spotifyApi = new SpotifyWebApi({
    clientId: keys.client_id,
    clientSecret: keys.client_secret,
    redirectUri: keys.redirectUri
})

module.exports = { spotifyApi }