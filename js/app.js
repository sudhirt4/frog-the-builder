var game = new Phaser.Game(400, 400);

var fallingBlock;
var topBlock;

var playState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.blocks = game.add.group();

    this.createBlock();

    this.ground = game.add.sprite(game.world.centerX, 375, 'block1');
    this.physics.arcade.enable(this.ground);
    this.ground.anchor.setTo(0.5, 0.5);
    this.ground.enableBody = true;
    this.ground.body.immovable = true;
    this.blocks.add(this.ground);

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);

  },
  createBlock: function() {
    this.block = game.add.sprite(game.world.centerX, 100, 'block');
    this.block.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.block);
    var tween = game.add.tween(this.block)
    .to({ x : 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.width - 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .loop()
    .start();
  },
  fall: function() {
    game.tweens.removeAll();
    this.block.body.gravity.y = 1000;
  },
  update: function() {
    var self = this;

    game.physics.arcade.collide(this.block, this.blocks, function() {
      self.block.body.gravity.y = 0;
      self.block.enableBody = true;
      self.block.body.immovable = true;
      self.blocks.add(self.block);
      self.createBlock();

      if(self.blocks.length > 2) {
        self.blocks.forEach(function(_block){
          var _y = (_block.y + _block.height + 20);
          var demoTween = game.add.tween(_block).to({y:_y},1000);
          demoTween.start();
        });
      }
      console.log(this.blocks)
    });

  },
  preload: function() {
    game.load.image('block', 'images/block50.png');
    game.load.image('towerTop', 'images/block100.png');
    game.load.image('bg', 'images/block100.png');
    game.load.spritesheet('block1',  'images/block50.png', 50, 50);
  }
}


game.state.add("playState", playState);
game.state.start("playState");


