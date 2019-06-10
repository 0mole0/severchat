const express = require('express');
const fs = require('fs')

const app = express();


let port = 3001;

const server = app.listen(port, function() { 
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);
let s = []
io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        s = fs.readFileSync('db.json', 'utf-8').toString()
        s = JSON.parse(s)
        s.push(data)
        let ss= JSON.stringify(s)
        console.log('full',s)
        io.emit('MESSAGE', s)
        console.log('pp', ss)
        fs.writeFileSync("db.json", ss)
    });
});
