// start slingin' some d3 here.
(function() {
  var Player, axes, createEnemies, gameBoard, gameOptions, gameStats, play, players, render, updateBestScore, updateScore,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  gameOptions = {
    height: 550,
    width: 950,
    nEnemies: 50,
    padding: 20
  };

  gameStats = {
    score: 0,
    bestScore: 0,
    collisions: 0
  };

  axes = {
    x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
    y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
  };

  gameBoard = d3.select('.board').append('svg:svg').attr('width', gameOptions.width).attr('height', gameOptions.height);

  updateScore = function() {
    return d3.select('.current').text(gameStats.score.toString());
  };

  updateBestScore = function() {
    gameStats.bestScore = _.max([gameStats.bestScore, gameStats.score]);
    return d3.select('.highscore').text(gameStats.bestScore.toString());
  };

  Player = (function() {

    Player.prototype.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';

    Player.prototype.fill = '#ff6600';

    Player.prototype.x = 0;

    Player.prototype.y = 0;

    Player.prototype.angle = 0;

    Player.prototype.r = 5;

    function Player(gameOptions) {
      this.setupDragging = __bind(this.setupDragging, this);
      this.moveRelative = __bind(this.moveRelative, this);
      this.moveAbsolute = __bind(this.moveAbsolute, this);
      this.transform = __bind(this.transform, this);
      this.setY = __bind(this.setY, this);
      this.getY = __bind(this.getY, this);
      this.setX = __bind(this.setX, this);
      this.getX = __bind(this.getX, this);
      this.render = __bind(this.render, this);      this.gameOptions = gameOptions;
    }

    Player.prototype.render = function(to) {
      this.el = to.append('svg:path').attr('d', this.path).attr('fill', this.fill);
      this.transform({
        x: this.gameOptions.width * 0.5,
        y: this.gameOptions.height * 0.5
      });
      this.setupDragging();
      return this;
    };

    Player.prototype.getX = function() {
      return this.x;
    };

    Player.prototype.setX = function(x) {
      var maxX, minX;
      minX = this.gameOptions.padding;
      maxX = this.gameOptions.width - this.gameOptions.padding;
      if (x <= minX) x = minX;
      if (x >= maxX) x = maxX;
      return this.x = x;
    };

    Player.prototype.getY = function() {
      return this.y;
    };

    Player.prototype.setY = function(y) {
      var maxY, minY;
      minY = this.gameOptions.padding;
      maxY = this.gameOptions.height - this.gameOptions.padding;
      if (y <= minY) y = minY;
      if (y >= maxY) y = maxY;
      return this.y = y;
    };

    Player.prototype.transform = function(opts) {
      this.angle = opts.angle || this.angle;
      this.setX(opts.x || this.x);
      this.setY(opts.y || this.y);
      return this.el.attr('transform', ("rotate(" + this.angle + "," + (this.getX()) + "," + (this.getY()) + ") ") + ("translate(" + (this.getX()) + "," + (this.getY()) + ")"));
    };

    Player.prototype.moveAbsolute = function(x, y) {
      return this.transform({
        x: x,
        y: y
      });
    };

    Player.prototype.moveRelative = function(dx, dy) {
      return this.transform({
        x: this.getX() + dx,
        y: this.getY() + dy,
        angle: 360 * (Math.atan2(dy, dx) / (Math.PI * 2))
      });
    };

    Player.prototype.setupDragging = function() {
      var drag, dragMove,
        _this = this;
      dragMove = function() {
        return _this.moveRelative(d3.event.dx, d3.event.dy);
      };
      drag = d3.behavior.drag().on('drag', dragMove);
      return this.el.call(drag);
    };

    return Player;

  })();

  players = [];

  players.push(new Player(gameOptions).render(gameBoard));

  createEnemies = function() {
    return _.range(0, gameOptions.nEnemies).map(function(i) {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      };
    });
  };

  var meteorSize = 30;

  render = function(enemy_data) {
    var checkCollision, enemies, onCollision, tweenWithCollisionDetection;
    enemies = gameBoard.selectAll('.enemy').data(enemy_data, function(d) {
      return d.id;
    });
    enemies.enter().append('svg:image')
      .attr('xlink:href', 'asteroid.png')
      .attr('class', 'enemy').attr('x', function(d){
        return d.x})
      .attr('y', function(d){
        return d.y})
      .attr('width', '' + meteorSize + 'px').attr('height', '' + meteorSize + 'px');
    enemies.exit().remove();
    checkCollision = function(enemy, collidedCallback) {
      return _(players).each(function(player) {
        var radiusSum, separation, xDiff, yDiff;
        radiusSum = parseFloat(meteorSize/2) + player.r;
        xDiff = parseFloat(enemy.attr('x') + 15) - player.x;
        yDiff = parseFloat(enemy.attr('y') + 15) - player.y;
        separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        if (separation < radiusSum) return collidedCallback(player, enemy);
      });
    };
    onCollision = function() {
      updateBestScore();
      gameStats.score = 0;
      gameStats.collisions++;
      d3.select('.collisions').text(gameStats.collisions.toString());
      return updateScore();
    };
    tweenWithCollisionDetection = function(endData) {
      var endPos, enemy, startPos;
      enemy = d3.select(this);
      startPos = {
        x: parseFloat(enemy.attr('x')),
        y: parseFloat(enemy.attr('y'))
      };
      endPos = {
        x: axes.x(endData.x),
        y: axes.y(endData.y)
      };
      return function(t) {
        var enemyNextPos;
        checkCollision(enemy, onCollision);
        enemyNextPos = {
          x: startPos.x + (endPos.x - startPos.x) * t,
          y: startPos.y + (endPos.y - startPos.y) * t
        };
        return enemy.attr('x', enemyNextPos.x).attr('y', enemyNextPos.y);
      };
    };
    return enemies.transition().duration(500).attr('r', 10).transition().duration(2000).tween('custom', tweenWithCollisionDetection);
  };

  play = function() {
    var gameTurn, increaseScore;
    gameTurn = function() {
      var newEnemyPositions;
      newEnemyPositions = createEnemies();
      return render(newEnemyPositions);
    };
    increaseScore = function() {
      gameStats.score += 1;
      return updateScore();
    };
    gameTurn();
    setInterval(gameTurn, 2000);
    return setInterval(increaseScore, 50);
  };

  play();

}).call(this);