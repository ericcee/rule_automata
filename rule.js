var rule = function(width, height, rules, pxPerW, pxPerH, canvas) {
    
    var pixArray = new Array(); // Pixels are stored in a array
    
    var ctx = canvas.getContext('2d');
    
    var pointToInt = function(x,y){
        return y*pxPerW+x;
    }
    
    var setPixel = function(x,y) {
        var val = pointToInt(x,y);
        pixArray.push(val);
    }
    
    var intToPoint = function(x) {
        var y = Math.floor(x/pxPerH);
        var x = Math.floor(x%pxPerW);
        return {x: x, y: y};
    }
    
    var draw = function() {
        ctx.clearRect(0, 0, width, height);
        
        var cw = width/pxPerW;
        var ch = height/pxPerH;
        
        ctx.fillStyle = "black";
        
        let array = Array.from(pixArray);
        
        for (var i = 0; i < array.length; i++ ) {
            var val = array[i];
            var pt = intToPoint(val);
            ctx.beginPath();
            ctx.rect(pt.x*cw, pt.y*ch, cw, ch);
            ctx.fill();
        }
    }
    
    var getNextFrame = function(){
        var y = 0;
        
        let array = Array.from(pixArray);
        
        for (var i = 0; i < array.length; i++ ) {
            var val = array[i];
            var pp = intToPoint(val);
            
            if(pp.y > pxPerH){
                return false; // Reached the end. Return false.
            }
            
            y = Math.max(y, pp.y);
        }
        
        for(var x = 0; x < pxPerW; x++){
            var c = 0;
            // Get Neighbours left right and middle above the pixel.
            var b1 = 0, b2 = 0, b3 = 0;
            
            if(x-1 >= 0) b1 = pixArray.includes(pointToInt(x-1, y));
            b2 = pixArray.includes(pointToInt(x, y));
            if(x+1 <= pxPerW-1) b3 = pixArray.includes(pointToInt(x+1, y));
            
            c = b1 | (b2 << 1) | (b3 << 2); // Convert neighbours to index for the given rules.
            if(rules[c]) {
                pixArray.push(pointToInt(x, y + 1)); // Add the pixel if the rules fit.
            }
        }
        return true;
    }
    var knall = false, sec = false;
    var removeLine = function(line){
        var temp = new Array();
        var y = 0;
        var itr = 0;
        
        let array = Array.from(pixArray);
        
        for (var i = 0; i < array.length; i++ ) {
            itr++;
            var pp = intToPoint(array[i]);
            if(pp.y == line) continue;
            if(pp.y < line) temp.push(pointToInt(pp.x, pp.y));
            else if(pp.y > line) {temp.push(pointToInt(pp.x, pp.y - 1));}
            
        }
        pixArray = temp;
    }
    
    var fillRandomDots = function(size){
        for(var i = 0; i < size; i++){
            var b = Math.random()*pxPerH*pxPerW;
            pixArray.add(b);
        }
        
    }
    
    this.getNextFrame = getNextFrame;
    this.draw = draw;
    this.setPixel = setPixel;
    this.removeLine = removeLine;
    this.fillRandomDots = fillRandomDots;
}

var canv = document.getElementById("rule");

//Rules
var rule_30 = [false, true, true, false, true, false, true, false];
var rule_90 = [false, true, false, true, true, false, true, false];
var rule_110 = [false, false, true, true, true, true, true, false];

var cwidth = canv.width;
var cheight = canv.height;

var pxPerSide = Math.floor(256);

//Initiate rule class
var r = new rule(cwidth, cheight, rule_30, pxPerSide, pxPerSide, canv);

r.setPixel(Math.floor((pxPerSide)/2), 0);

while(r.getNextFrame());
var ti = setInterval(
function(){
    //Itterate all frames
    while(r.getNextFrame());
    
    //Draw to canvas
    r.draw();
    r.removeLine(0);
}, 50);
