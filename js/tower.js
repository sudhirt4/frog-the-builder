var game = new Phaser.Game(600, 600);
// Play State
var playState = {
	create : function() {},
	update : function() {},
	preload : function() {},
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
