const keys = require('../config/dev');
const user = require('../models/user');
const axios = require('axios')
const { spotifyApi } = require('../helpers/spotifyCredentials');
const mongoose = require('mongoose');

module.exports = (app) => {

    const token_url = 'https://accounts.spotify.com/api/token';

    app.get('/auth/login', (req, res) => {

        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        const scopes = ['user-read-private, user-read-email, user-top-read'];
        const state = makeid(16);

        var authorizeUrl = spotifyApi.createAuthorizeURL(scopes, state);

        res.redirect(authorizeUrl);
    })


    app.get("/auth/logout", (req,res) => {
        const access_token = spotifyApi.getAccessToken();
        if(access_token){
            spotifyApi.setAccessToken('');
            res.redirect(keys.homeRedirect);
        }
    })


    app.get('/auth/refresh_token', async function(req, res) {
        const refresh_token = req.query.refresh_token;
        const access_token = spotifyApi.getAccessToken()

        const params = new URLSearchParams();

        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refresh_token);

        const refreshRequest = await fetch(token_url, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64'))
            },
            body: params
        })

        const data = await refreshRequest.json();
        res.send({
            'access_token': access_token,
            'refresh_token': data.refresh_token
        })
    });


    app.get('/auth/callback', async function(req, res) {
        const auth_token = new Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64');

        var code = req.query.code || null;
        var state = req.query.state || null;

        const params = new URLSearchParams();
    
        params.append("client_id", keys.client_id);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", keys.redirectUri);
        params.append("verifier", state)

        const response = await fetch(token_url, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${auth_token}`
            },
            body: params
        })
        const {access_token} = await response.json();
        if(access_token){
            spotifyApi.setAccessToken(access_token)
            res.redirect(keys.homeRedirect)
        }
    });

}