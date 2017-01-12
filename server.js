/* jslint esversion:6*/
var express = require('express');
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var yea = 0;
var nay = 0;
var connectCounter = 0;

app.use(express.static("./public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});




io.on('connect', function() { connectCounter++; });
io.on('disconnect', function() { connectCounter--; });

io.on('connection', (socket) => {
        io.sockets.emit('update-msg', { data: connectCounter});
        socket.on('disconnect', () => {
            connectCounter--;
            io.sockets.emit('update-msg', { data: connectCounter});
});

socket.on('button click', (message) => {
        yea += 1;
        console.log(Math.floor(yea/connectCounter*100) + "% Yea");
        console.log(Math.floor(nay/connectCounter*100) +"% Nay"+"====");
    io.emit('recv click', yea);
    });
    socket.on('button click2', (message) => {
        nay += 1;
        console.log(Math.floor(nay/connectCounter*100) +"% Nay");
        console.log(Math.floor(yea/connectCounter*100) + "% Yea"+"====");
    io.emit('recv click2', nay);
    });
        
});
io.emit('count', connectCounter);

http.listen(3000, () => {
    console.log("Server started on port 3000");
});