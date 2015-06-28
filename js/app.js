var game = new Phaser.Game(400, 600);

var score = 0;

var playState = {
  create: function () {

    game.world.setBounds(0, -1000, 400, 1600);

    score = 0;
    this.initY = 125;
    var background = game.add.tileSprite(0, 0, 400, 600, 'background');
    background.fixedToCamera = true;
    var scoreboard = game.add.tileSprite(75, 50, 100, 50, 'block1');
    scoreboard.anchor.setTo(0.5, 0.5);
    scoreboard.fixedToCamera = true;
    var scoreText = game.add.text(75, 50, 'score', {fill: '#fff'});
    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.fixedToCamera = true;

    var frog = game.add.tileSprite(game.world.width - 75, 550, 100, 100, 'frog');
    frog.anchor.setTo(0.5, 0.5);
    frog.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 250;

    this.platform = game.add.sprite(game.world.centerX, 575, 'block');
    this.platform.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.platform);
    this.platform.body.static = true;

    this.blocks = game.add.group();
    this.createBlock();

    game.camera.x = 200;
    game.camera.y = 200;

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);
    game.camera.x = 500;

  },
  createBlock: function () {
    this.block = game.add.sprite(game.world.centerX, this.initY, 'block');
    this.block.swingStatus = true;
    this.block.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.block);
    this.block.body.velocity.y = 0;
    this.block.body.velocity.x = 150;
    this.block.body.onBeginContact.add(function (x) {
      if (x == null) {
        score = this.blocks.length;
        game.state.start('gameOverState');
      }
    }, this);
    console.log(this.blocks.length);
  },
  fall: function () {
    this.block.body.velocity.x = 0;
    this.block.body.velocity.y = 0;
    this.block.swingStatus = false;
    this.blocks.add(this.block);
    if (this.blocks.length > 4) {
      this.initY -= 50;
      var tween = game.add.tween(game.camera);
      tween.to({y: (game.camera.y - 50)}, 1000, Phaser.Easing.Linear.Out);
      tween.start();
    }
  },
  update: function () {
    this.updateBlockSwing();
    if (this.block.swingStatus == false) {
      if (this.block.body.y > this.initY + 200) {
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
  }
}

var homeState = {
  create: function () {
    game.world.setBounds(0, 0, 400, 600);
    game.add.tileSprite(0, 0, 400, 600, 'background');
    var title = game.add.text(game.world.centerX, game.world.height / 4, "FROG THE BUILDER", {fill: '#222'});
    title.anchor.setTo(0.5, 0.5);

    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + (game.world.height / 12),
    'Build', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 2 * (game.world.height / 12),
    'Highscores', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 3 * (game.world.height / 12),
    'Instructions', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);
  },
  preload: function () {
    game.load.image('background', 'images/background.png');
  }
};

var gameOverState = {
  create: function () {
    game.world.setBounds(0, 0, 400, 600);
    game.add.tileSprite(0, 0, 400, 600, 'wood');
    var title = game.add.text(game.world.centerX, game.world.height / 4, "Game Over", {fill: '#222'});
    title.anchor.setTo(0.5, 0.5);

    game.add.text(game.world.centerX, game.world.centerY - 50, score, {fill: '#222'}).anchor.setTo(0.5,0.5);
    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + (game.world.height / 12),
    'Build', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 2 * (game.world.height / 12),
    'Highscores', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

    var btn = game.add.text(game.world.centerX,
    (game.world.height / 2) + 3 * (game.world.height / 12),
    'Instructions', {fill: '#222'});
    btn.anchor.setTo(0.5, 0.5);
    btn.inputEnabled = true;
    btn.events.onInputDown.add(function () {
      game.state.start('playState');
    }, this);

  },
  preload: function () {
    game.load.image('wood', 'images/background.png');
  }
};

game.state.add("playState", playState);
game.state.add("homeState", homeState);
game.state.add("gameOverState", gameOverState);
game.state.start("homeState");



