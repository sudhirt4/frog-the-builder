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
	create : function() {},
	update : function() {},
	preload : function() {}
};

game.state.add("homestate", homeState);
game.state.start("homestate");
