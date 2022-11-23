const http = require('http');
const {loadPlanetData} = require('./models/planets.model');
const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function starServer(){

    await loadPlanetData();
    
    server.listen(PORT, ()=>{
        console.log('Listen on port ' + PORT);
    });
}
starServer();


// app.listeners();


// console.log(PORT);