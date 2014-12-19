(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    var Game = function() {
        var shipPos = Game.randomPosition();
        this.ship = new Asteroids.Ship(shipPos, this);
        this.asteroids = [];
        this.addAsteroids();
        this.bullets = [];
        this.points = 0;
        this.stopGame = false;
    };

    Game.DIM_X = 900;
    Game.DIM_Y = 550;
    Game.NUM_ASTEROIDS = 2;
    Game.randomPosition = function() {
        var x = Math.random() * Game.DIM_X;
        var y = Math.random() * Game.DIM_Y;
        return [x, y];
    };

    Game.prototype.wrap = function(pos) {
        var x = pos[0];
        var y = pos[1];
        x = (x > Game.DIM_X) ? 0 : x;
        x = (x < 0) ? Game.DIM_X : x;
        y = (y > Game.DIM_Y) ? 0 : y;
        y = (y < 0) ? Game.DIM_Y : y;
        return [x, y];
    }

    Game.prototype.addAsteroids = function() {
        for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
            var pos = Game.randomPosition();
            this.asteroids.push(new Asteroids.Asteroid(pos, this));
        }
    };

    Game.prototype.draw = function(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        if (this.asteroids.length === 0) {
            this.gameOver();
        } else {
            this.allObjects().forEach(function(object) {
                object.draw(ctx);
            })
        }
    };

    Game.prototype.moveObjects = function() {
        this.allObjects().forEach(function(object) {
            object.move();
        })
    };

    Game.prototype.checkCollisions = function() {
        var collidedPairs = [];
        var objects = this.allObjects();
        for (var i = 0; i < objects.length - 1; i++) {
            for (var j = i + 1; j < objects.length; j++) {
                if (objects[i].isCollidedWith(objects[j])) {
                    collidedPairs.push([objects[i], objects[j]]);
                }
            }
        }
        collidedPairs.forEach(function(pair) {
            pair[0].collideWith(pair[1]);
        });
    };

    Game.prototype.step = function() {
        this.moveObjects();
        this.checkCollisions();
        this.addMoreAsteroids();
    };

    Game.prototype.addMoreAsteroids = function() {
        if (this.asteroids.length < 2) {
             Game.NUM_ASTEROIDS = Math.random() * 5;
             this.addAsteroids();
        }
    };
    
    Game.prototype.remove = function(obj) {
        var arr = (obj instanceof Asteroids.Bullet) ? this.bullets :
            this.asteroids;
        var index = arr.indexOf(obj);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    };

    Game.prototype.allObjects = function() {
        return this.asteroids.concat([this.ship]).concat(this.bullets);
    }

    Game.prototype.isOutofBounds = function(pos) {
        var x = pos[0];
        var y = pos[1];
        return (x < 0 || x > Game.DIM_X || y < 0 || y > Game.DIM_Y);
    };

    Game.prototype.addPoint = function() {
        this.points += 1;
        $('#number-of-points').html(this.points);
    };

    Game.prototype.gameOver = function() {
        this.removeAllObjects();
        this.stopGame = true;
        $('#game-over').removeClass('hidden');
        $('#game-over').addClass('visible');
        $('#final-score').html(this.points)
        debugger
    };

    Game.prototype.removeAllObjects = function() {
        var objs = this.allObjects();
        objs.forEach(function(obj) {
            this.remove(obj);
        }.bind(this));
        // this.ship = nil
    };

    Asteroids.Game = Game;
})();