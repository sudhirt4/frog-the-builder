var game = new Phaser.Game(600, 600);
// Play State
var playState = {
	create : function() {
		this.block = game.add.sprite(game.world.centerX, 100, 'block');
		this.block.anchor.setTo(0.5, 0.5);



		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.enable(this.block);
		this.block.collideWorldBounds = true;
		this.block.checkCollision = { up: true, down: true, left: true, right: true };

	    var tween = game.add.tween(this.block)
	    .to({ x : 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
	    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
	    .to({ x : game.world.width - 25, y : 25 }, 1000, Phaser.Easing.Linear.Out)
	    .to({ x : game.world.centerX, y : 100 }, 1000, Phaser.Easing.Linear.Out)
	    .loop()
	    .start();
		console.log("Tween Move : ", tween);
		
		// Move the block from the keyboard
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space.onDown.add(this.fall, this);
	},
	update : function() {
		//Oscillate
		// this.oscillate();
		if (!(this.block.y < 600)) {
			this.stopFall();
		}
	},
	preload : function() {
		game.load.image('block', 'images/block50.png');
		game.load.image('bg', 'images/block100.png');
	},
	fall : function() {
        game.tweens.removeAll();
		this.block.body.gravity.y = 2000;
	},
	stopFall : function() {
		console.log("Stopped");
		this.block.body.gravity.y = -200;
		console.log("Gravity of the block after calling stopFall: ",this.block.body.gravity.y);

	},
	oscillate : function() {
		this.block.x++;
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
