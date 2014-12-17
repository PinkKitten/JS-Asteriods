(function(){
  window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
  
  var Asteroid = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      vel: Asteroids.Util.randomVec(2),
      pos: pos,
      game: game,
			lives: 2
    });
    
  };
  
  Asteroid.inherits(Asteroids.movingObject);

  Asteroid.COLOR = "pink";
  Asteroid.RADIUS = 10;
  
  Asteroid.prototype.collideWith = function(otherObject){
    
    if (otherObject instanceof Asteroids.Ship) {
				this.game.remove(this);
        otherObject.relocate();
    } 
		else if (otherObject instanceof Asteroids.Bullet) {
			this.game.remove(otherObject);
			this.lives -= 1;
			if (this.lives === 0) {
				this.game.remove(this);
				this.game.addPoint();
			} else {
				this.radius -= 2;
			}
    }
  };
  
  window.Asteroids.Asteroid = Asteroid;

})();