/* jslint esversion:6 */


    var socket = io();
    var total = 0;
    var voted = false;
    // var yeaG = 0;
    // var nayG = 0;

    socket.on('update-msg', function (msg) {
        total = msg.data;
       // console.log(total);
        $('#total').html(" / " + msg.data + " people connected");
    });


var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    ctx = elem.getContext('2d'),
    elements = [];

var ctx = elem.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Hello World",10,50);

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    console.log(x, y);
    elements.forEach(function(element) {
        // if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
        //     alert('clicked an element');
        if (voted === false) {
            if(y<250){
                voted = true;
                socket.emit("button click");
                socket.on('recv click', (yea) => {
                    $('#yeaG').html(yea);
                });
             } else {
                socket.emit("button click2");
                socket.on('recv click2', (nay) => {
                    $('#nayG').html(nay);
                });
                voted = true;
            }
        }
    });
}, false);

// Add element.
elements.push({
    color: '#05EFFF',
    width: 500,
    height: 250,
    top: 0,
    left: 0,
    name: "yea"
},{

    color: 'red',
    width: 500,
    height: 250,
    top: 250,
    left: 0,
    name: "Nay"
});

// Render elements.
elements.forEach(function(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.left, element.top, element.width, element.height);

});

// elements[0].fillText("Yea",200,100);
// // elements[0].ctx.font = "50px Helvetica";