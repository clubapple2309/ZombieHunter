var Weapon = (function(){
    function Weapon(){
        var wepImg= new Image();
        wepImg.src='Imgs/weapon.png';
        this.draw();
    }

    Weapon.prototype.draw = function(x){
        var temp =null;
        var wepImg= new Image();
        wepImg.src='Imgs/weapon.png';
        var manager = new Manager();
        var weponSprite = 1;
        this.frames = manager.getSprites(weponSprite);
        debugger;
        if(Game.weaponTimer > 60 ||  isNaN(Game.weaponTimer))
        {
            temp = 0;
        }else {
            temp =1;
        }
        Game.ctx.drawImage(wepImg,
            this.frames[temp][0],
            this.frames[temp][1],
            this.frames[temp][2],
            this.frames[temp][3],
            x,
            400,
            this.frames[temp][2],
            this.frames[temp][3]);
    };
    return Weapon
})();