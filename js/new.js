var game = new Phaser.Game(400, 400);
var totem;

var playState = {
  create: function() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 250;

    //var grass = game.add.sprite(364, 608, "grass");
    //// adding "unbreakable" property to assets we do not want to be removed
    //grass.unbreakable=true;
    //// naming grass sprite as "grass" to recognize it later on
    //grass.name="grass";
    //game.physics.p2.enable(grass);
    //grass.body.static=true;


    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);

  },
  fall: function() {
    this.ground1 = game.add.sprite(game.world.centerX, 0, 'block1');
    this.ground1.name = "ground1";
    game.physics.p2.enable(this.ground1);

  },
  update: function() {
    //game.physics.p2.boundsCollidesWith(this.ground, this.ground1, function() {
    //  console.log("asdasd")
    //});
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



