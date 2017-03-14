var Sprite = (function(){
    function Sprite(img){
        var manager = new Manager();
        var zombieSprite = 0;
        this.frames = manager.getSprites(zombieSprite);
        this.img = img;
        this.ctx = Game.ctx;
        this.index = 0;
        this.aspeed = .15;
        this.x=0;
        this.y=0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.width = 0;

    }
    Sprite.prototype.draw = function(){
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.scale(this.scaleX,this.scaleY);
        var temp = Math.floor(this.index);

            debugger;
            this.ctx.drawImage(this.img,
            this.frames[temp][0],
            this.frames[temp][1],
            this.frames[temp][2],
            this.frames[temp][3],
            -(this.frames[temp][2]) *.5,
            -(this.frames[temp][3])*.5,
            this.frames[temp][2],
            this.frames[temp][3]);
            this.width = this.frames[temp][3];
            this.ctx.restore();

    };
    Sprite.prototype.stageWrap = function(){
        if (this.x>800+this.width*.5){
            this.x = -this.width*.5
        }
        else if (this.x<-this.width*.5){
            this.x = 800+this.width*.5
        }
        else if (this.y>600+this.height*.5){
            this.y = -this.height*.5
        }
        else if (this.y<-this.height*.5){
            this.y = 600+this.height*.5
        }
    };
    return Sprite;
})();
