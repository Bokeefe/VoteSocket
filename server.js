/* jslint esversion:6*/
var fs = require("fs");
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require("express")();
var Schema = mongoose.Schema;
var http = require("http").Server(app);
var io = require("socket.io")(http);
var User = require('./VoteSchema.js')(mongoose);
var io = require("socket.io")(http);

var yea = 0;
var nay = 0;
var yeaP = 0;
var nayP = 0;
var connectCounter = 0;


app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.get('/votepush', (req, res) => {
 res.sendFile(__dirname + '/example.json');
});

app.post('/voteSend', (req, res) => { 
  //  console.log(req.body.votes);
   // console.log(appendObject(req.body.votes));
    fs.writeFile('./example.json', req.body.votes, (err) => {
        //console.log(req.body.votes);
        if (err) throw err;
            res.send("add Vote");
    });
});

function appendObject(obj){
  var configFile = fs.readFileSync('./example.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./example.json', configJSON);
}

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
        yeaP = Math.floor(yea/connectCounter*100);
    io.emit('recv click', yea);
    });
    socket.on('button click2', (message) => {
        nay += 1;
        nayP = Math.floor(nay/connectCounter*100);
    io.emit('recv click2', nay);
    });
        
});
io.emit('count', connectCounter);

function update(){
    io.emit('recv click', yea);
    io.emit('recv click2', nay);
    io.emit('recv percY', Math.floor(yea/connectCounter*100));
    io.emit('recv percN', Math.floor(nay/connectCounter*100));
}
var timer = setInterval(update,1500);

// http.listen(3000, () => { /////local host
//     console.log("Server started on port 3000");
// });



http.listen(3000, '104.131.1.90');
console.log('Server running at http://104.131.1.90:3000/');