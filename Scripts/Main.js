/**
 * Created by KirillY on 08.02.2017.
 */
window.addEventListener("load", function (e) {
    var game = new Game();
});
var voiceCounter = 480;
var Game = (function () {
    function Game() {
        console.log("game started");
        this.zombies = [];
        Game.screen = document.querySelector("#canvas");
        Game.ctx = Game.screen.getContext("2d");
        this.ss = null;
        this.crossHair = null;
        this.weapon = null;
        this.weaponTimer = 100;
        this.mouse = {x: 0, y: 0};
        this.zomieImages = {};
        this.sndShoot = new Audio("Sounds/shoot.wav");
        this.sndDeath= new Audio("Sounds/death.wav");
        this.loadAssets(["ground.jpg","zombie.png"]);
    }

    Game.prototype.loadAssets = function(list){
        var that = this;
        var count = 0;
        list.forEach(function (item, index) {
            var img = new Image();
            img.src = "Imgs/"+list[index];

            img.addEventListener("load",function(){
                that.zomieImages[list[index]] = img;
                count++;
                if (count>=list.length){
                    that.setup();
                }
            });
        })
    };

    Game.prototype.setup = function(){
        this.ss = this.zomieImages["zombie.png"];
        Game.screen.style.background = "url("+this.zomieImages["ground.jpg"].src+")";
        Game.screen.style.cursor = 'none';
        for (var i = 0;i<4;i++){
            var zombie = new Zombie(this.ss);
            zombie.x = Math.random()*380+100;
            zombie.y = Math.random()*200+50;
            this.zombies.push(zombie);
        }
        Game.screen.addEventListener("mousedown",this.onClick.bind(this),false);
        this.crossHair = new CrossHair();
        this.weapon = new Weapon();
        this.crossHair.draw();
        this.weapon.draw();
        Game.screen.addEventListener("mousemove", function (e) {
            var offsetLeft = Game.screen.offsetLeft,
                offsetTop = Game.screen.offsetTop,
                x, y;
            x = e.pageX;
            y = e.pageY;
            x -= offsetLeft;
            y -= offsetTop;
            this.mouse.x = x;
            this.mouse.y = y;
        }.bind(this));
        this.updateAll();
    };

    Game.prototype.getDistance = function (x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var dist = Math.sqrt(dx*dx+dy*dy);
        return dist;
    };

    Game.prototype.onClick = function(e){

        this.sndShoot.cloneNode(true).play();
        Game.weaponTimer=0;
        var that = this;
        this.zombies.forEach(function(zombie) {
            if (zombie.status == 0 && that.getDistance(zombie.x, zombie.y, that.mouse.x, that.mouse.y) < 35) {
                that.sndDeath.cloneNode(true).play();
                zombie.hit();
            }
        });

    };

    Game.prototype.updateAll = function(e){
        var that = this;
        (function drawFrame(){
            voiceCounter ++;
            Game.weaponTimer++;
            window.requestAnimationFrame(drawFrame);
            Game.ctx.clearRect(0,0,800,600);
            that.zombies.forEach(function(e){
                if (e.status<3){
                    e.update();
                }
            });
            that.crossHair.draw(that.mouse.x,that.mouse.y);
            that.weapon.draw(that.mouse.x);
        })()
    };
    return Game
})();



