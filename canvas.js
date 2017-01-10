var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var button1 = new Button(ctx, 0,0,100 ,100, 0, 'Yea!');
button1.init();
button1.onredraw = drawAll;

var button2 = new Button(ctx, 175, 0, 100, 100, 0, 'Nay!');
button2.init();
button2.onredraw = drawAll;

drawAll();

function drawAll() {
    clearCanvas();
    button1.draw();
    button2.draw();
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function Button(ctx, x, y, w, h, r, text) {
    var self = this;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.text = text;

    this.state = 'normal';

    this.init = function() {
        ctx.canvas.addEventListener('mousemove', function(e) {
            if (self.state === 'normal') {
                if (self.contains(e)) {
                    self.setState('hover');
                    ctx.canvas.style.cursor = 'pointer';
                }
            } else if (self.state === 'hover')  {
                if (!self.contains(e)) {
                    self.setState('normal');
                    ctx.canvas.style.cursor = '';
                }
            }
        });

        ctx.canvas.addEventListener('mousedown', function(e) {
            if (self.contains(e)) {
                self.setState('active');
            }
        });

        ctx.canvas.addEventListener('mouseup', function(e) {
            if (self.contains(e)) {
                self.setState('hover');
            } else {
                self.setState('normal');
            }
        });
    };

    this.contains = function(e) {
        var offset = getOffset(e);
        return offset.x >= this.x && offset.x < this.x + this.w &&
               offset.y >= this.y && offset.y < this.y + this.h;
    };
    
    // Set some defaults to control appearances for different states.
 
    this.normal = {
        font: '14px "Helvetica Neue", Helvetica, Arial, sans-serif',
        color: '#fff',
        borderColor: 'rgba(0, 0, 0, .25)',
        backgroundColorTop: '#08c',
        backgroundColorBottom: '#04c',
        shadowColor: 'rgba(0, 0, 0, .5)',
        shadowOffsetX: 1,
        shadowOffsetY: 2,
        shadowBlur: 3
    };

    this.hover = {
        backgroundColorTop: '#04c',
        backgroundColorBottom: '#08c'
    };

    this.active = {
        backgroundColorTop: '#04c',
        backgroundColorBottom: '#04c',
        shadowOffsetX: 0,
        shadowOffsetY: 1,
        shadowBlur: 2
    };

    this.setState = function(newState) {
        if (this.state !== newState) {
            this.state = newState;
            if (this.onredraw) {
                this.onredraw();
            }
        }
    };

    this.draw = function() {
        var state = this[this.state];
    
        var left = this.x;
        var top = this.y;
        var right = this.x + this.w;
        var bottom = this.y + this.h;
        var radius = this.r;

        ctx.save();
        
        ctx.lineWidth = 1;
    
        left = Math.floor(left) + 0.5;
        top = Math.floor(top) + 0.5;
        right = Math.floor(right) + 0.5;
        bottom = Math.floor(bottom) + 0.5;
    
        ctx.beginPath();
    
        ctx.moveTo(left + radius, top);
    
        ctx.arcTo(right, top, right, top + radius, radius);
        ctx.arcTo(right, bottom, right - radius, bottom, radius);
        ctx.arcTo(left, bottom, left, top - radius, radius);
        ctx.arcTo(left, top, left + radius, top, radius);
    
        ctx.shadowColor = get('shadowColor');
        ctx.shadowOffsetX = get('shadowOffsetX');
        ctx.shadowOffsetY = get('shadowOffsetY');
        ctx.shadowBlur = get('shadowBlur');
    
        var gradient = ctx.createLinearGradient(left, top, left, bottom + this.h);
        gradient.addColorStop(0, get('backgroundColorTop'));
        gradient.addColorStop(1, get('backgroundColorBottom'));
    
        ctx.fillStyle = gradient;
        ctx.fill();
    
        ctx.strokeStyle = get('borderColor');
        ctx.stroke();
    
        ctx.font = get('font');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = get('color');
        ctx.fillText(this.text, left + this.w / 2, top + this.h / 2);
    
        ctx.restore();
    
        function get(name) {
            if (name in state) {
                return state[name];
            }
            return self.normal[name];
        }
    };
}

function getOffset(event) {
    var offsetX = 0;
    var offsetY = 0;
    
    var element = event.target;
    
    do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
    } while (element = element.offsetParent);
    
    return {
        x: event.pageX - offsetX,
        y: event.pageY - offsetY
    };
}