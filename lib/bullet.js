(function(){
  window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
  
  var Bullet = function(pos, vel, game){
    
    if (vel[0] === 0 && vel[1] === 0){
      vel = [0, -1];
    } else
    {
      vel = [vel[0] * 1.5, vel[1] * 1.5];
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
  Bullet.RADIUS = 5;
  
  Bullet.prototype.collideWith = function(otherObject){
    if (otherObject instanceof Asteroids.Asteroid) { 
      this.game.remove(this);
      this.game.remove(otherObject);   
    }
  };
  
  Bullet.prototype.isWrappable = false;
  
  window.Asteroids.Bullet = Bullet;
})();