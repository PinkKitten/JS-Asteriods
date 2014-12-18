(function() {
    window.Asteroids = (window.Asteroids) ? window.Asteroids : {};
    Asteroids.HighScores = function() {
    };
    
    Asteroids.HighScores.prototype.fetchScores = function() {
        var GameScore = Parse.Object.extend("Score");
        var query = new Parse.Query(GameScore);
        query.descending("score");
        query.exists("score");
        query.limit(10);
        query.find({
            success: function(results) {
                $bestScores = $('#best-scores');
                results.forEach(function(result) {
                    str = result.attributes.name +
                        " " + result.attributes.score +
                        "<br>";
                    $bestScores.append(str);
                });
            },
            error: function(object, error) {
            }
        });
    };
    
    Asteroids.HighScores.prototype.addScore = function(username, points) {
        var Score = Parse.Object.extend("Score");
        var newScore = new Score();
        newScore.save({
            name: username,
            score: parseInt(points)
        }).then(function(object) {
            this.fetchScores();
        }.bind(this));
    };
})();