var CrossHair = (function(){
    function CrossHair(){
        this.draw();
    }

    CrossHair.prototype.draw = function(x,y){
        var crosImg= new Image();
        crosImg.src='Imgs/crosshair.png';
        Game.ctx.drawImage(crosImg,x,y,40,40);
    };
    return CrossHair
})();