var rule = function(width, height, rules, pxPerW, pxPerH, canvas) {
    
    var pixArray = new Set();
    var temp = new Set();
    
    var ctx = canvas.getContext('2d');
    
    var poi = function(x,y){
        return y*pxPerW+x;
    }
    
    var setPixel = function(x,y) {
        var val = poi(x,y);
        pixArray.add(val);
    }
    
    var getPixel = function(x,y){
        return pixArray.has(poi(x,y));
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
        
        for (var it = pixArray.values(), val= null; val=it.next().value; ) {
            var pt = intToPoint(val);
            ctx.beginPath();
            ctx.rect(pt.x*cw, pt.y*ch, cw, ch);
            ctx.fill();
        }
    }
    
    var getNextFrame = function(){
        var y = 0;
        
        for (var it = pixArray.values(), val= null; val=it.next().value; ) {
            var pp = intToPoint(val);
            
            if(pp.y + 1 > pxPerH){
                return false;
            }
            
            if(Math.max(y, pp.y)!=y) y = pp.y;
        }
        
        for(var x = 0; x < pxPerW; x++){
            var c = 0;
            var b1 = pixArray.has(poi(x-1, y));
            var b2 = pixArray.has(poi(x, y));
            var b3 = pixArray.has(poi(x+1, y));
            c = b1 | (b2 << 1) | (b3 << 2);
            if(rules[c]) {
                pixArray.add(poi(x, y+1));
            }
        }
        return true;
    }
    
    this.getNextFrame = getNextFrame;
    this.draw = draw;
    this.setPixel = setPixel;
}

var canv = document.getElementById("rule");

var rule_30 = [false, true, true, false, true, false, true, false];
var rule_90 = [false, true, false, true, true, false, true, false];

var cwidth = canv.width;
var cheight = canv.height;

var pxPerSide = Math.floor(cwidth);

var r = new rule(cwidth, cheight, rule_30, pxPerSide, pxPerSide, canv);

r.setPixel(Math.floor(pxPerSide/2), 0);

while(r.getNextFrame());
r.draw();