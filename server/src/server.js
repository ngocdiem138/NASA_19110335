const http = require('http');
const {loadPlanetData} = require('./models/planets.model');
const express = require('express');
const app = require('./app');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const {mongoConnect} = require('./services/mongo');
const {loadLaunchData} = require('./models/launches.model')


async function starServer(){
    await mongoConnect();
    await loadPlanetData();
    await loadLaunchData();
    
    server.listen(PORT, ()=>{
        console.log('Listen on port ' + PORT);
    });
}
starServer();


// app.listeners();


// console.log(PORT);