(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    var Asteroid = function(pos, game) {
        Asteroids.movingObject.call(this, {
            color: Asteroid.COLOR,
            radius: Asteroid.RADIUS,
            vel: Asteroids.Util.randomVec(2),
            pos: pos,
            game: game,
            lives: 2,
            exploded: false,
            protection: 0
        });
    };

    Asteroid.inherits(Asteroids.movingObject);
    Asteroid.COLOR = "pink";
    Asteroid.RADIUS = 25;

    Asteroid.prototype.draw = function(ctx) {
        var pos = this.pos;
        base_image = new Image();
        if (this.exploded) {
            base_image.src = 'lib/explosion.png';
            this.protection -= 1;
            if (this.protection < 1) {
                this.exploded = false;
            }
        } else if (this.lives > 1) {
            base_image.src = 'lib/mario.png';
        } else {
            base_image.src = 'lib/luigi.png';
        }
        ctx.drawImage(base_image, pos[0], pos[1]);
    };

    Asteroid.prototype.collideWith = function(otherObject) {
        if (otherObject instanceof Asteroids.Ship) {
            this.game.remove(this);
            otherObject.relocate();
        } else if (otherObject instanceof Asteroids.Bullet) {
            if (this.protection < 1) {
                this.game.remove(otherObject);
                this.exploded = true;
                this.protection = 5;
                if (this.lives === 0) {
                    this.game.remove(this);
                    this.game.addPoint();
                } else {
                    this.lives -= 1;
                }
            }
        }
    };

    window.Asteroids.Asteroid = Asteroid;
})();