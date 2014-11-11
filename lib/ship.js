(function(){
  window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
  
  var Ship = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0, 0],
      pos: pos,
      game: game,
      direction: 90,
      speed: 0
    });
    
  };
  
  Ship.inherits(Asteroids.movingObject);

  Ship.COLOR = "#F778A1";
  Ship.RADIUS = 10;
  
  Ship.prototype.draw = function(ctx) {
    var pos = this.pos;
     
    var positions = [
      [0, -12.5],
      [12.5, 12.5],
      [-12.5, 12.5]
    ]
    
    var ship = this;
    var direction = this.direction;
    
    var adjusted = positions.map(function(_pos){
      return ship.rotate(_pos, direction);
    });
    
    ctx.beginPath();
    ctx.moveTo(adjusted[0][0], adjusted[0][1]);
    ctx.lineTo(adjusted[1][0], adjusted[1][1]);
    ctx.lineTo(adjusted[2][0], adjusted[2][1]);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  
  Ship.prototype.relocate = function(){
    this.pos = Asteroids.Game.randomPosition();
    this.vel = [0, 0];
  };
  
  Ship.prototype.collideWith = function(otherObject){
    if (otherObject instanceof Asteroids.Asteroid) {
      this.relocate();  
      this.game.remove(otherObject);
    }
  };
  
  Ship.prototype.power = function(speed, direction){
    this.speed += speed;
    this.direction += direction;
    
    var y = -Math.sin(this.direction);
    var x = Math.cos(this.direction);
    
    this.vel[0] = x * this.speed;
    this.vel[1] = y * this.speed;
  }
  
  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(this.pos, this.vel.slice(0), this.game);
    this.game.bullets.push(bullet);
  };
  
  Ship.prototype.rotate = function(coord, rotation){
    var x1 = coord[0];
    var y1 = coord[1];
    var x2 = x1 * Math.cos(rotation) - y1 * Math.sin(rotation);
    var y2 = y1 * Math.cos(rotation) + x1 * Math.sin(rotation);
    return [x2 + this.pos[0], -y2 + this.pos[1]];
  }
  
  window.Asteroids.Ship = Ship;
})();