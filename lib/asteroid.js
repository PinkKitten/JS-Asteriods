(function(){
  window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
  
  var Asteroid = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      vel: Asteroids.Util.randomVec(2),
      pos: pos,
      game: game
    });
    
  };
  
  Asteroid.inherits(Asteroids.movingObject);

  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;
  
  Asteroid.prototype.collideWith = function(otherObject){
    this.game.remove(this);
    if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
    } 
		else if (otherObject instanceof Asteroids.Bullet) {
			this.game.remove(otherObject);
			this.game.addPoint()
    }
  };
  
  window.Asteroids.Asteroid = Asteroid;

})();