(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    Asteroids.movingObject = function(obj) {
        for (property in obj) {
            this[property] = obj[property];
        }
    };

    Asteroids.movingObject.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI,
            false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    Asteroids.movingObject.prototype.isCollidedWith = function(otherObject) {
        var distance = Math.pow(otherObject.pos[0] - this.pos[0], 2) +
            Math.pow(this.pos[1] - otherObject.pos[1], 2);
        return distance <= Math.pow(this.radius + otherObject.radius, 2);
    };

    Asteroids.movingObject.prototype.move = function() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (this.isWrappable === false && this.game.isOutofBounds(this.pos)) {
            this.game.remove(this);
        } else {
            this.pos = this.game.wrap(this.pos);
        }
    };

    Asteroids.movingObject.prototype.collideWith = function(otherObject) {}
    Asteroids.movingObject.prototype.isWrappable = true;
})();