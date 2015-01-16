(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    Asteroids.GameView = function(canvas) {
        this.game = new Asteroids.Game();
        this.ctx = canvas.getContext("2d");
        this.gamePaused = false;
    };

    Asteroids.GameView.prototype.start = function() {
        var gameview = this;
        this.gameLoop = setInterval(function() {
            gameview.bindKeyHandlers();
            gameview.game.step();
            if (gameview.game.stopGame) {
                gameview.endGame();
            }
            gameview.game.draw(gameview.ctx);
        }, 50);
    };

    Asteroids.GameView.prototype.pauseGame = function() {
        var gameview = this;
        if (!this.gamePaused) {
            this.gameLoop = clearInterval(this.gameLoop);
            this.gamePaused = true;
            this.pauseLoop = setInterval(function() {
                gameview.bindPause();
            }, 50)
        } else {
            this.pauseLoop = clearInterval(this.pauseLoop);
            this.gameLoop = setInterval(function() {
                gameview.bindKeyHandlers();
                gameview.game.step();
                if (gameview.game.stopGame) {
                    gameview.endGame();
                }
                gameview.game.draw(gameview.ctx);
            }, 50);
            this.gamePaused = false;
        }
    };

    Asteroids.GameView.prototype.endGame = function() {
        this.game.draw(this.ctx);
        this.gameLoop = clearInterval(this.gameLoop);
    };

    Asteroids.GameView.prototype.bindPause = function() {
        if (key.isPressed(85)) {
            this.pauseGame();
        }
    };

    Asteroids.GameView.prototype.bindKeyHandlers = function() {
        var speed = 0;
        var direction = 0;
        if (key.isPressed(32)) {
            this.game.ship.fireBullet();
        }
        if (key.isPressed(37)) {
            direction -= 10;
        }
        if (key.isPressed(38)) {
            speed += .2;
        }
        if (key.isPressed(39)) {
            direction += 10;
        }
        if (key.isPressed(40)) {
            speed -= .6;
        }
        this.game.ship.power(speed, direction);
        if (key.isPressed(80)) {
            this.pauseGame();
        }
    };
})();