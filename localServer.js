/* jslint esversion:6*/
var fs = require("fs");
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require("express")();
var Schema = mongoose.Schema;
var http = require("http").Server(app);

// var http = require('http');
var io = require("socket.io")(http);
var User = require('./VoteSchema.js')(mongoose);


var yea = 0;
var nay = 0;
var yeaP = 0;
var nayP = 0;
var connectCounter = 0;

mongoose.connect('mongodb://localhost');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

// var User = mongoose.model('User', UserSchema);


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
    fs.writeFile('./example.json', req.body.votes, (err) => {
        console.log(req.body.votes);
        if (err) throw err;
            res.send("add Vote");
    });
});

function appendObject(obj){
  var configFile = fs.readFileSync('./config.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./config.json', configJSON);
}
//app.post('/votepush', (req, res) => { //register new User
  // User.find({name: req.body.name}, (err, data) => {
  //     if (data.length === 0) {  
  //       var newUser = new User({
  //         name: req.body.name,
  //         yeaP: 0,
  //         nayP: 0,
  //         time: req.body.time,
  //         total: 1
  //       });
  //       newUser.save((err) => { // save the newUser object to the database
  //         if (err) {
  //           res.status(500);
  //           console.error(err);
  //           res.send({status: 'Error', message: 'unable to register User:' + err});
  //         }
  //         res.send({status: 'success', message: 'User added successfully'});
  //       });
  //     } else if (err) { // send back an error if there's a problem
  //       res.status(500);
  //       console.error(err);
  //       res.send({status: 'Error', message: 'server error: ' + err});
  //     } else {
  //       res.send({status: 'Error', message: 'User already exists'}); // otherwise the user already exists
  //     }
  //   });
//});

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

http.listen(3000, () => { /////local host
    console.log("Server started on port 3000");
});
