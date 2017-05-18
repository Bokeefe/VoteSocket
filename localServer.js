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
var voteID = 0;
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

var voteID = 0;

app.post("/votePick", (req, res) => {
        voteID = req.body.votePick;
        res.send(req.body.votePick);
        var nsp = io.of('/'+voteID);

     app.get("/"+voteID, (req, res) => {
        res.sendFile(__dirname + "/public/canvas.html");
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



//////////////SOCKET STUFF///////
    nsp.on('connection', function(socket){
    currentVotes[voteID].connectCounter++;
    nsp.emit('update-msg',currentVotes[voteID]);
      console.log('a user connected to '+voteID+" count "+ JSON.stringify(currentVotes[voteID]));
        nsp.emit('update-msg',currentVotes[voteID]);
        socket.on('button yea', function (data) {
            console.log(data+" data");
            currentVotes[voteID].yea++;
            console.log(currentVotes[voteID]);
            io.emit('update-msg',currentVotes[voteID]);
            update(currentVotes[voteID]);
        });
        socket.on('button nay', function (data) {
            currentVotes[voteID].nay++;
            console.log(data);
            console.log(currentVotes[voteID]);
          io.emit('update-msg',currentVotes[voteID]);
              update(currentVotes[voteID]);
        });




        socket.on('disconnect', function(){
        nsp.emit('update-msg',currentVotes[voteID]);
            // currentVotes[voteID].connectCounter--;
            // console.log('user disconnected from '+currentVotes[voteID].connectCounter);

        });



    });
/////////END SOCKET///////////


function update(data){
    nsp.emit('update-msg',data);
}


});



http.listen(PORT, () => { /////local host
    console.log("Server started on port " + PORT);
});
