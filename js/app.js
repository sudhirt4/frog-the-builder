;(function(){

var game = new Phaser.Game(400, 600);

var score = 0;

var playState = {
  create: function () {

    game.world.setBounds(0, -1000, 400, 1600);

    score = 0;
    this.initY = 125;
    var background = game.add.tileSprite(0, 0, 400, 600, 'background');
    background.fixedToCamera = true;
    var scoreboard = game.add.sprite(100, 50, 'board');
    scoreboard.anchor.setTo(0.5, 0.5);
    scoreboard.fixedToCamera = true;
    this.scoreText = game.add.text(100, 50, '0', {fill: '#333'});
    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.fixedToCamera = true;

    var resetGame = game.add.sprite(game.world.width - 40, 40, 'restart');
    resetGame.anchor.setTo(0.5, 0.5);
    resetGame.fixedToCamera = true;
    resetGame.inputEnabled = true;
    resetGame.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    var frog = game.add.sprite(game.world.width - 50, 550, 'frog');
    frog.anchor.setTo(0.5, 0.5);
    frog.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 250;

    game.camera.x = 200;
    game.camera.y = 200;

    this.fallActive = false;

    this.platform = game.add.sprite(game.world.centerX, 580, 'block');
    this.platform.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.platform);
    this.platform.body.static = true;

    this.blocks = game.add.group();
    this.createBlock();

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);

  },
  createBlock: function () {
    var self = this;
    this.block = game.add.sprite(game.world.centerX, this.initY, 'block');
    this.block.swingStatus = true;
    this.block.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.block);
    this.block.body.velocity.y = 0;
    this.block.body.velocity.x = 150;
    this.block.body.onBeginContact.add(function (x) {
      score = this.blocks.length;
      self.scoreText.setText(score);
      if (x == null) {
        game.state.start('gameOverState');
      }
    }, this);
  },
  fall: function () {
    if(!this.fallActive) {
      this.block.body.velocity.x = 0;
      this.block.body.velocity.y = 0;
      this.block.swingStatus = false;
      this.blocks.add(this.block);
      if (this.blocks.length > 8) {
        this.initY -= 29;
        var tween = game.add.tween(game.camera);
        tween.to({y: (game.camera.y - 29)}, 1000, Phaser.Easing.Linear.Out);
        tween.start();
      }
      this.fallActive = true;
    }
  },
  update: function () {
    this.updateBlockSwing();
    if (this.block.swingStatus == false) {
      if (this.block.body.y > this.initY + 200) {
        score = this.blocks.length;
        this.fallActive = false;
        this.createBlock();
      }
    }
  },
  updateBlockSwing: function () {
    if (this.block.swingStatus == true) {
      if (this.block.body.velocity.y >= 0) {
        this.block.body.velocity.y = -6;
      }
      if (this.block.body.x > game.world.width - (game.world.width / 6)) {
        this.block.body.velocity.x = -150;
      }
      if (this.block.body.x < (game.world.width / 6)) {
        this.block.body.velocity.x = 150;
      }
    }
  },
  preload: function () {
    game.load.image('block', 'images/block.png');
    game.load.image('frog','images/frog.png')
    game.load.image('background', 'images/background.png');
    game.load.image('board', 'images/board.png');
    game.load.image('restart', 'images/restart.png');
  }
}

var homeState = {
  create: function () {
    game.world.setBounds(0, 0, 400, 600);
    game.add.tileSprite(0, 0, 400, 600, 'background');

    var logo = game.add.sprite(game.world.centerX,
    (game.world.height / 2) - (game.world.height / 4),
    'titleLogo')
    logo.anchor.setTo(0.5,0.5);

    var startButton = game.add.sprite(game.world.centerX,
    (game.world.height / 2) + 2*(game.world.height / 9),
    'board');
    game.add.text(game.world.centerX,
    (game.world.height / 2) + 2*(game.world.height / 9), "Build", {fill: '#333', font:'30px Simpsons'}).anchor.setTo(0.5,0.5);
    startButton.anchor.setTo(0.5, 0.5);
    startButton.inputEnabled = true;
    startButton.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

  },
  preload: function () {
    game.load.image('background', 'images/background.png');
    game.load.image('board', 'images/board.png');
    game.load.image('titleLogo', 'images/title.png')
  }
};

var gameOverState = {
  create: function () {
    game.world.setBounds(0, 0, 400, 600);
    game.add.tileSprite(0, 0, 400, 600, 'background');

    var title = game.add.text(game.world.centerX, game.world.height / 4, "Game Over", {fill: '#333',  fontSize: 30});
    title.anchor.setTo(0.5, 0.5);

    game.add.text(game.world.centerX, game.world.centerY - 50, score  , {fill: '#111', fontSize: 50}).anchor.setTo(0.5,0.5);

    game.add.sprite(game.world.centerX,  (game.world.height / 2) + (game.world.height / 9), 'board')
      .anchor.setTo(0.5, 0.5);
    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + (game.world.height / 9),
    'Retry', {fill: '#333'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    game.add.sprite(game.world.centerX,  (game.world.height / 2) + 2 * (game.world.height / 9), 'board')
      .anchor.setTo(0.5, 0.5);
    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 2 * (game.world.height / 9),
    'Highscores', {fill: '#333'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    game.add.sprite(game.world.centerX,  (game.world.height / 2) + 3 * (game.world.height / 9), 'board')
      .anchor.setTo(0.5, 0.5);
    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 3 * (game.world.height / 9),
    'Instructions', {fill: '#333'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

  },
  preload: function () {
    game.load.image('background', 'images/background.png');
    game.load.image('board', 'images/board.png');
  }
};

game.state.add("playState", playState);
game.state.add("homeState", homeState);
game.state.add("gameOverState", gameOverState);
game.state.start("homeState");

})();
