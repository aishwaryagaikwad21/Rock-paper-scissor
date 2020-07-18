const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server);//express does not have access to pass hence raw http server is created 

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.send('Hello')
})

server.listen(port,()=>{
    console.log('Server running on port',port);
})
