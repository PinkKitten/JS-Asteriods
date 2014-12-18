(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    Asteroids.Util = {};

    Function.prototype.inherits = function(ParentClass) {
        var Surrogate = function() {};
        Surrogate.prototype = ParentClass.prototype;
        this.prototype = new Surrogate();
    };

    Asteroids.Util.randomVec = function(length) {
        result = [];
        for (var i = 0; i < length; i++) {
            result.push((Math.random() * 10) - 3);
        }
        return result;
    }
})();