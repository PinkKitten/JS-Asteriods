Function.prototype.inherits = function(ParentClass){
  var Surrogate = function(){};
  Surrogate.prototype = ParentClass.prototype;
  this.prototype = new Surrogate();
}

var MovingObject = function(){};

MovingObject.prototype.move = function(){
  return true;
};

var Asteroid = function(){};

Asteroid.inherits(MovingObject);
