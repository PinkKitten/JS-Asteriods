(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    var Ship = function(pos, game) {
        Asteroids.movingObject.call(this, {
            color: Ship.COLOR,
            radius: Ship.RADIUS,
            vel: [0, 0],
            pos: pos,
            game: game,
            direction: 90,
            speed: 0,
            lives: 3,
            exploded: 5
        });
    };

    Ship.inherits(Asteroids.movingObject);
    Ship.COLOR = "#F778A1";
    Ship.RADIUS = 20;
    Ship.TO_RADIANS = Math.PI / 180;

    Ship.prototype.draw = function(ctx) {
        var pos = this.pos;
        base_image = new Image();
        if (this.exploded > 0) {
            base_image.src = 'lib/explosion.png';
            this.exploded -= 1;
        } else {
            base_image.src = 'lib/cat_sprite_large.png';
        }
        var ship = this;
        var direction = this.direction;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(Math.abs(direction) * Math.PI / 180);
        ctx.drawImage(base_image, -(base_image.width / 2), -(base_image
            .height / 2));
        ctx.restore();
    };

    Ship.prototype.relocate = function() {
        if (this.exploded < 1) {
            this.lives -= 1;
            $('#number-of-lives').html(this.lives);
            if (this.lives == 0) {
                alert('Game over!!!!')
                this.game.gameOver();
            }
            // this.pos = Asteroids.Game.randomPosition();
            this.vel = [0, 0];
            this.exploded = 10;
        }
    };

    Ship.prototype.collideWith = function(otherObject) {
        if (otherObject instanceof Asteroids.Asteroid) {
            this.relocate();
            this.game.remove(otherObject);
        }
    };

    Ship.prototype.power = function(speed, direction) {
        this.speed += speed;
        if (this.speed < 0) {
            this.speed = 0
        }
        if (this.speed > 15) {
            this.speed = 15
        }
        this.direction += direction;
        if (this.direction > 360) {
            this.direction -= 360
        }
        if (this.direction < 0) {
            this.direction += 360
        }
        var y = Math.sin(Math.abs(this.direction) * Math.PI / 180);
        var x = Math.cos(Math.abs(this.direction) * Math.PI / 180);
        this.vel[0] = x * this.speed;
        this.vel[1] = y * this.speed;
    }

    Ship.prototype.fireBullet = function() {
        var bullet = new Asteroids.Bullet(this.pos, this.vel.slice(0),
            this.direction, this.game);
        this.game.bullets.push(bullet);
    };

    window.Asteroids.Ship = Ship;
})();