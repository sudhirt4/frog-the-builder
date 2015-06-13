var game = new Phaser.Game(600, 600);
// Play State
var playState = {
	create : function() {
		// Add sprite and set anchor position.
		this.block = game.add.sprite(game.world.centerX, 100, 'block');
		this.block.anchor.setTo(0.5, 0.5);
		
		//Setup Physics Arcade.
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.enable(this.block);
		
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
	update : function() {},
	preload : function() {
		// Add game images.
		game.load.image('block', 'images/block50.png');
		game.load.image('bg', 'images/block100.png');
	},
	fall : function() {
		// Handles the falling behaviour of the block.
        game.tweens.removeAll();
		this.block.body.gravity.y = 2000;
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
