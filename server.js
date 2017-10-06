/* jslint esversion:6*/
var fs = require("fs");
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var PORT = 3000;


var allVotes = [];

var currentVotes = [];

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});



app.post('/newVote', (req, res) => {
    var newVote = JSON.parse(req.body.voteName);
    allVotes.push(newVote);
    console.log(allVotes);
    res.send(allVotes);

    app.get("/"+newVote, (req, res) => {
        res.sendFile(__dirname + "/public/canvas.html");
    });

});




app.get('/allVotes', (req, res) => {
    console.log("ping");
    res.send(allVotes);
});

// app.get('/votepush', (req, res) => {
//  res.sendFile(__dirname + '/example.json');
// });
//
// app.post('/voteSend', (req, res) => {
//     var store = [];
//     var last = 0;
//     var hold = req.body.votes;
//
//     hold = JSON.parse(hold);
//     for(var i in hold){
//         last = hold.length;
//     }
//     for(i in hold){
//         store.push(hold[i]);
//     }
//     store = {"Name": hold[last-1].name,"Time":hold[last-1].time,"Yea":  yeaP, "Nay": nayP, "total": connectCounter};
//     var lastPoint = hold.pop(hold[last]);
//     var lastPoint2 = {"Name": lastPoint.name,"Time":lastPoint.time,"Yea":  yeaP, "Nay": nayP, "total": connectCounter};
//     hold  = hold.concat(lastPoint2);//////////dont erase until you get WTF
//     hold = JSON.stringify(hold);
//     fs.writeFile('./example.json', hold, (err) => {
//         if (err) throw err;
//             res.send("add Vote");
//     });
//     server.close();
// });


    app.post("/votePick", (req, res) => {
            voteID = req.body.votePick;
            res.send(req.body.votePick);

        app.get("/"+voteID, (req, res) => {
            res.sendFile(__dirname + "/public/canvas.html");
        });
});

io.on('connection', function (socket) {
var voteID;

    socket.on('voteID',function (data) {
        voteID = data;
         socket.join(voteID);
    });
  socket.on('vote',function (data) {
      console.log(data);

  });
});



http.listen(PORT, () => { /////local host
    console.log("Server started on port " + PORT);
});
