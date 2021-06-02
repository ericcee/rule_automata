var rule30 = function(width, height, rules, pxPerSide, canvas) {
    this.width = width;
    this.height = height;
    this.pxPerW = pxPerSide;
    this.pxPerH = pxPerSide;
    var _this = this;
    
    var pixArray = new Set();
    
    var ctx = canvas.getContext('2d');
    
    var setPixel = function(x,y) {
        var val = y*_this.width+x;
        pixArray.add(val);
    }
    
    var getPixel = function(x,y){
        return pixArray.has(y*_this.width+x);
    }
    
    var intToPoint = function(x) {
        var y = x/_this.pxPerH;
        var x = x%_this.pxPerW;
        return {x: x, y: y};
    }
    
    var draw = function() {
        ctx.clearRect(0, 0, _this.width, _this.height);
        
        var cw = _this.width/_this.pxPerW;
        var ch = _this.height/_this.pxPerH;
        
        ctx.fillStyle = "black";
        
        for(var i = 0; i < pixArray.length; i++){
            var pt = intToPoint(pixArray[i]);
            ctx.beginPath();
            ctx.rect(pt.x,pt.y, cw, wh);
            ctx.fill();
        }
    }
}