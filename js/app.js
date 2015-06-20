var game = new Phaser.Game(400, 400);

var fallingBlock;

var playState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.platform = game.add.group();



    this.platform.enableBody = true;

    this.createBlock();

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);

  },
  createBlock: function() {
    this.block = game.add.sprite(game.world.centerX, 100, 'block');
    this.block.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this.block);

    this.platform.add(this.block);

    this.block.collideWorldBounds = true;
    var tween = game.add.tween(this.block)
    .to({ x : 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.width - 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .loop()
    .start();
    this.block.body.enableBody = true;
    this.block.body.collideWorldBounds = true;
  },
  fall: function() {
    fallingBlock = this.block;
    game.tweens.removeAll();
    this.block.body.gravity.y = 1000;
    this.platform.add(this.block);
    this.createBlock();
  },
  update: function() {
    game.physics.arcade.collide(this.platform, this.platform)
  },
  preload: function() {
    game.load.image('block', 'images/block50.png');
    game.load.image('towerTop', 'images/block100.png');
    game.load.image('bg', 'images/block100.png');
  }
}


game.state.add("playState", playState);
game.state.start("playState");


