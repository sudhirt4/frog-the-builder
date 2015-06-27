var game = new Phaser.Game(400, 600);
var initY = 50;

var playState = {
  create: function() {

    game.world.setBounds(0,-1000,400,1600);

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
  createBlock: function() {
    this.block = game.add.sprite(game.world.centerX, initY, 'block');
    this.block.swingStatus = true;
    this.block.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.block);
    this.block.body.velocity.y = 0;
    this.block.body.velocity.x = 150;
    this.block.body.onBeginContact.add(function(x) {
      if(x == null && this.blocks.length > 1) {
        console.log("Shit !!");
      }
    }, this);
  },
  fall: function() {
    this.block.body.velocity.x = 0;
    this.block.body.velocity.y = 0;
    this.block.swingStatus = false;
    this.blocks.add(this.block);
    if(this.blocks.length > 4 ){
      initY -= 50;
      var tween = game.add.tween(game.camera);
      tween.to({ y : (game.camera.y - 50) }, 1000, Phaser.Easing.Linear.Out);
      tween.start();
    }
  },
  update: function() {
    this.updateBlockSwing();
    if(this.block.swingStatus == false) {
      if(this.block.body.y > initY+100) {
        this.createBlock();
      }
    }
  },
  updateBlockSwing: function() {
    if(this.block.swingStatus == true) {
      if(this.block.body.velocity.y >= 0) {
        this.block.body.velocity.y = -6;
      }
      if(this.block.body.x > game.world.width - (game.world.width/6)) {
        this.block.body.velocity.x = -150;
      }
      if(this.block.body.x < (game.world.width/6)) {
        this.block.body.velocity.x = 150;
      }
    }
  },
  preload: function() {
    game.load.image('block', 'images/block50.png');
  }
}

game.state.add("playState", playState);
game.state.start("playState");



