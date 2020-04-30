class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, asset, pv, id, speed) { //, animIdle, animMvt, animAction, animDeath
        //private
        var _pv = pv;
        var _id = id;
        var _alive = 1;
        var direction;
        var compt = 0;
        var drop = 0;

        

        super(scene, x, y, asset);
        scene.physics.world.enableBody(this);


        this.getPv = function () {
            return _pv
        };
        this.setPv = function (newPv) {
            _pv = newPv
        };

        this.mouvements = function (player) {

            if (player.body.x < this.body.x) {
                if (speed == 0) {
                    speed = 100;
                }
                this.body.velocity.x = -speed; //ZOnZON REVIENS
                direction = 1;

            } else {
                this.body.velocity.x = speed;
                direction = 2;
            }
            if (player.body.y < this.body.y) {
                this.body.velocity.y = -speed;
                direction = 3;

            } else {
                this.body.velocity.y = speed;
                direction = 4;
            }
        }

        this.hurt = function () {
            _pv -= 1;
            if (_pv <= 3) {
                _alive = 0;
                this.dead();
            };
        };

        this.dead = function () {
            compt+=1 ;
            if(compt == 10 ){
                drop = 1;
            }
            
        };

        this.getAlive = function(){
            return _alive;
        }

        this.getDrop = function(){
            return drop;
        }
        //--Zombie ANIMATION--

    } //END CONSTRUCTOR
}