(function(){
  window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
  
  Asteroids.HighScores = function() {
		// this.addScore()
		// this.fetchScores();
  };
	
  Asteroids.HighScores.prototype.fetchScores = function() {
		var GameScore = Parse.Object.extend("Score");
		var query = new Parse.Query(GameScore);
		query.get("23LLO2pOTi", {
		  success: function(gameScore) {
		    alert(gameScore.get("name"));
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		  }
		});
  };
	
  Asteroids.HighScores.prototype.addScore = function(username, points) {		
		var Score = Parse.Object.extend("Score");
		var newScore = new Score();
		newScore.save({name: username, score: parseInt(points)}).then(function(object) {
		  alert("yay! it worked");
		});
  };

  
})();