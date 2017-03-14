var Zombie = (function(){
    Zombie.prototype = Object.create(Sprite.prototype);
    function Zombie(img){
        Sprite.call(this,img);
        this.status = 0;
        this.dir = 1;
        this.voice = new Audio("Sounds/voice.wav");
        if (Math.random()<.5){
            this.scaleX=-1;
            this.dir=-1
        }
        this.speed = Math.floor((Math.random()*3)+1);
        this.delay = 0;
    }
    Zombie.prototype.hit = function() {
        this.status = 1;
        this.index = 6;
        this.delay = 30;
    };
    Zombie.prototype.update = function(){

        if(this.status==0) {
            this.index += this.aspeed;
            if (this.index > 6) {
                this.index = 0;
            }
            if (voiceCounter >480){
                this.voice.cloneNode(true).play();
                voiceCounter = 0;
            }
            this.x+=this.speed*this.dir;
        }  else if (this.status==1){
            this.delay--;
            if (this.delay<1){
                this.status++;
                this.index=7;

            }
        } else if (this.status==2){
            this.y-=5;

            this.delay--;
            if (this.y>550){
                this.status++;
            }
        }
        this.stageWrap();
        this.draw();

    };
    return Zombie;
})();
