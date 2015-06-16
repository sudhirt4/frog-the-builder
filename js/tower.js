var game = new Phaser.Game(600, 600);
var platforms;
// Play State
var playState = {
  create : function() {
	//Setup Physics Arcade.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Array will handle the balance itself along with its data
    this.balance = [];
    // balance[0] will be the left balance
    this.balance[0] = game.add.group();
    // set left balance weight to zero
    this.balance[0].weight = 0;
    // balance[1] will be the right balance
    this.balance[1] = game.add.group();
    // set right balance weight to zero
    this.balance[1].weight = 0;
    // The threshold upto which left and right balance can be deviated
    this.balanceThreshold = 500;

     

    //Setup Physics Arcade.
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// Add sprite and set anchor position.
		this.block = game.add.sprite(game.world.centerX, 100, 'block');
		this.block.anchor.setTo(0.5, 0.5);
		
		game.physics.arcade.enable(this.block);
		this.block.collideWorldBounds = true;

		// Create obstacle
		platforms = game.add.group();
		platforms.enableBody = true;

		var towerTop = platforms.create(0, 300, 'towerTop');
		towerTop.body.immovable = true;

   

    // Set up tween for oscillating the block
    var tween = game.add.tween(this.block)
    .to({ x : 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.width - 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
    .loop()
    .start();
    console.log("Tween Move : ", tween);

    // Make the block fall on pressing spacebar.
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.fall, this);
  },

  update : function() {
    var hasCollided = game.physics.arcade.collide(this.block, platforms);
    if (hasCollided) {
    	// Update Scores
    	// Create another oscillating block.
    } else {
    	// Update Scores
		// Update life status
		// Create another oscillating block if player has remaining life.
    }

  },

  fall : function() {
    // Handles the falling behaviour of the block.
    game.tweens.removeAll();
    this.block.body.gravity.y = 2000;
    // this.placeBlock();
  },

  placeBlock: function() {
    this.block = game.add.sprite(game.input.worldX,game.input.worldY,"blocks");
    this.block.anchor.setTo(0.5, 0.5);
    // checked if the block is deviated from centre position
    if (game.width/2 !== this.block.x) {
      // define the side in which block have deviated 0 for left and 1 for right
      this.block.side = Math.floor(this.block.x/(game.width/2));
      // Add the block into the relevant side Array
      this.balance[this.block.side].add(this.block);
      //
      this.checkBalance();
    }
  },

  checkBalance: function() {
    var deviations = [];
    // Running loop two times to check two side deviation value
    for(var i = 0; i < 2; i++) {
      var deviation = 0;
      // Looping to check out deviation
      for (var j = 0; j < this.balance[i].length; j++) {
        // Access a block
        var block = this.balance[i]._hash[j];
        // Add deviation to of the block
        deviation += Math.abs(block.x - game.width/2);
      }
      // Left deviation and right deviation are feed to array
      deviations[i] = deviation;
    }
    // Check if the deviation exceed the threshold
    if ( Math.abs(deviations[0] - deviations[1]) > 500) {
      this.deathHandler();
    }
  },

  preload : function() {
    game.load.image('block', 'images/block50.png');
	game.load.image('towerTop', 'images/block100.png');
	game.load.image('bg', 'images/block100.png');
  },


  stopFall : function() {
    // Stops the falling of the block on reaching bottom
    // TODO: Possibly not need. Try collision method.
    console.log("Stopped");
    this.block.body.gravity.y = -200;
    console.log("Gravity of the block after calling stopFall: ",this.block.body.gravity.y);
  },

  oscillate : function() {
    // Handles oscillation of the block in circular motion
    // TODO: Currently not used as oscillation is handled by tween inside create() method.
  },

  deathHandler : function() {}
};

game.state.add("playstate", playState);

// Home State
var homeState = {
  create : function() {
    var btn1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {fill : '#FFF'});
    btn1.anchor.setTo(0.5, 0.5);
    btn1.inputEnabled = true;
    btn1.events.onInputDown.add(function(){
      game.state.start("playstate");
    },this);
  },

  update : function() {},
  preload : function() {}
};

game.state.add("homestate", homeState);
game.state.start("homestate");
