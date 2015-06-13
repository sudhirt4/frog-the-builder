var game = new Phaser.Game(600, 600);
// Play State
var playState = {
	create : function() {

		// Create the bird
		// this.bg = game.add.tileSprite(0, 0, 600, 400, 'bg');
		// this.bg.autoScroll(-150, 0);

		this.block = game.add.sprite(game.world.centerX, game.world.centerY, 'block');
		this.block.anchor.setTo(0.5, 0.5);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.enable(this.block);

		// this.bird.body.gravity.y = 1000;

		// Move the bird from the keyboard
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space.onDown.add(this.jump, this);

		// this.makePipes();


	},
	update : function() {
		// this.block.angle += 2.5;
		if (this.block.y < 499) {
			console.log(this.block.y);
			this.block.y++;
		} 
		if (this.block.y == 499) {
			this.block.y = this.block.y - 1;
			this.block.y;
		}

		// if (this.block.y)

		// if (!(this.bird.inWorld)) {
		// 	console.log("Game Over");
		// 	game.state.start("homestate");
		// }
		// this.game.physics.arcade.collide(this.bird, this.pipes, this.deathHandler, null, this);
	},
	preload : function() {
		game.load.image('block', 'images/block100.png');
		game.load.image('bg', 'images/block100.png');
		// game.load.spritesheet('block','images/block100.png', 54, 320);
	},

	jump : function() {
		this.block.body.velocity.y = -300;
		game.add.tween(this.block).to({angle: -40}, 100).start();
	},

	makePipes : function() {

		// console.log("makePipes");
		// this.pipesGenerator = game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.makePipe, this);
		// this.pipesGenerator.timer.start();

		// this.pipes = game.add.group();
	},

	makePipe: function() {
		// console.log("makePipe");
		// var pipeY = game.rnd.integerInRange(-100, 100);
		// var pipeX = game.width;

		// var pipe1 = game.add.sprite(pipeX, 0, "pipes", 0);
		// var pipe2 = game.add.sprite(pipeX, 440, "pipes", 1);

		// game.physics.arcade.enable(pipe1);
		// game.physics.arcade.enable(pipe2);

		// this.pipes.add(pipe1);
		// this.pipes.add(pipe2);

		// this.pipes.setAll('body.velocity.x', -200);
	},

	deathHandler : function() {
		// game.state.start("homestate");
	}
	};

game.state.add("playstate", playState);
// game.state.start("homestate");

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
	update : function() {

	},
	preload : function() {}
};

game.state.add("homestate", homeState);
game.state.start("homestate");
