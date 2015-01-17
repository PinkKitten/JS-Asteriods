(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

    var Bullet = function(pos, vel, dir, game) {
        if (vel[0] === 0 && vel[1] === 0) {
            var y = Math.sin(Math.abs(dir) * Math.PI / 180);
            var x = Math.cos(Math.abs(dir) * Math.PI / 180);
            vel = [x * 10, y * 10];
        } else {
            vel = [vel[0] * 10, vel[1] * 10];
        }
        Asteroids.movingObject.call(this, {
            color: Bullet.COLOR,
            radius: Bullet.RADIUS,
            vel: vel,
            pos: pos,
            game: game
        });
    };

    Bullet.inherits(Asteroids.movingObject);
    Bullet.COLOR = "red";
    Bullet.RADIUS = 3;

    Bullet.prototype.collideWith = function(otherObject) {
        if (otherObject instanceof Asteroids.Asteroid) {
            this.game.remove(this);
            this.game.remove(otherObject);
            this.game.addPoint();
        }
    };

    Bullet.prototype.isWrappable = false;
    window.Asteroids.Bullet = Bullet;
})();