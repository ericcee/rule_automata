var rule = function(width, height, rules, pxPerW, pxPerH, canvas) {
    
    var pixArray = new Set(); // Pixels are stored in a HashSet
    
    var ctx = canvas.getContext('2d');
    
    var pointToInt = function(x,y){
        return y*pxPerW+x;
    }
    
    var setPixel = function(x,y) {
        var val = pointToInt(x,y);
        pixArray.add(val);
    }
    
    var intTopointToIntnt = function(x) {
        var y = Math.floor(x/pxPerH);
        var x = Math.floor(x%pxPerW);
        return {x: x, y: y};
    }
    
    var draw = function() {
        ctx.clearRect(0, 0, width, height);
        
        var cw = width/pxPerW;
        var ch = height/pxPerH;
        
        ctx.fillStyle = "black";
        
        for (var it = pixArray.values(), val= null; val=it.next().value; ) {
            var pt = intTopointToIntnt(val);
            ctx.beginPath();
            ctx.rect(pt.x*cw, pt.y*ch, cw, ch);
            ctx.fill();
        }
    }
    
    var getNextFrame = function(){
        var y = 0;
        
        for (var it = pixArray.values(), val= null; val=it.next().value; ) {
            var pp = intTopointToIntnt(val);
            
            if(pp.y + 1 > pxPerH){
                return false; // Reached the end. Return false.
            }
            
            if(Math.max(y, pp.y)!=y) y = pp.y;
        }
        
        for(var x = 0; x < pxPerW; x++){
            var c = 0;
            // Get Neighbours left right and middle above the pixel.
            var b1 = pixArray.has(pointToInt(x-1, y));
            var b2 = pixArray.has(pointToInt(x, y));
            var b3 = pixArray.has(pointToInt(x+1, y));
            c = b1 | (b2 << 1) | (b3 << 2); // Convert neighbours to index for the given rules.
            if(rules[c]) {
                pixArray.add(pointToInt(x, y+1)); // Add the pixel if the rules fit.
            }
        }
        return true;
    }
    
    this.getNextFrame = getNextFrame;
    this.draw = draw;
    this.setPixel = setPixel;
}

var canv = document.getElementById("rule");

//Rules
var rule_30 = [false, true, true, false, true, false, true, false];
var rule_90 = [false, true, false, true, true, false, true, false];

var cwidth = canv.width;
var cheight = canv.height;

var pxPerSide = Math.floor(cwidth);

//Initiate rule class
var r = new rule(cwidth, cheight, rule_30, pxPerSide, pxPerSide, canv);

r.setPixel(Math.floor(pxPerSide/2), 0);

//Itterate all frames
while(r.getNextFrame());

//Draw to canvas
r.draw();