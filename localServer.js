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
    session.voteName = newVote;
    allVotes.push(newVote);
    session.allVotes = allVotes;
    newVote = {"connectCounter":0, "yea":0, "nay":0};
    currentVotes.push(newVote);
    session.currentVotes = currentVotes;
    res.send(session.voteName);

});
app.get("/getSession", (req, res) => {
    res.send(session.allVotes);
});
app.get("/getVotes", (req, res) => {
    res.send(session.currentVotes);
});

    app.get('/votepush', (req, res) => {
     res.sendFile(__dirname + '/example.json');
    });

    app.post('/voteSend', (req, res) => {
        var store = [];
        var last = 0;
        var hold = req.body.votes;

        hold = JSON.parse(hold);
        for(var i in hold){
            last = hold.length;
        }
        for(i in hold){
            store.push(hold[i]);
        }
        store = {"Name": hold[last-1].name,"Time":hold[last-1].time,"Yea":  yeaP, "Nay": nayP, "total": connectCounter};
        var lastPoint = hold.pop(hold[last]);
        var lastPoint2 = {"Name": lastPoint.name,"Time":lastPoint.time,"Yea":  yeaP, "Nay": nayP, "total": connectCounter};
        hold  = hold.concat(lastPoint2);//////////dont erase until you get WTF
        hold = JSON.stringify(hold);
        fs.writeFile('./example.json', hold, (err) => {
            if (err) throw err;
                res.send("add Vote");
        });
        server.close();
    });


    app.post("/votePick", (req, res) => {
            voteID = req.body.votePick;
            res.send(req.body.votePick);
            var nsp = io.of('/'+voteID);
        app.get("/"+voteID, (req, res) => {
            res.sendFile(__dirname + "/public/canvas.html");
        });

//////////////MONTYS SOCKET STUFF///////
    nsp.on("connection", socket => {
        currentVotes[voteID].connectCounter++;
        console.log("connection "+currentVotes[voteID].connectCounter);

        socket.on("vote", (data) => {
            console.log(data);
            if(data!="yea"){
                currentVotes[voteID].nay++;
                console.log(currentVotes[voteID]);
                socket.emit('update'+voteID,currentVotes[voteID]);
            } else {
                currentVotes[voteID].yea++;
                console.log(currentVotes[voteID]);
                socket.emit('update'+voteID,currentVotes[voteID]);
            }
        });
    });

/////////END SOCKET///////////
});








http.listen(PORT, () => { /////local host
    console.log("Server started on port " + PORT);
});
