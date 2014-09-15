
LineSerie.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
};

LineSerie.MainMenu.prototype = {

	create: function () {

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        //this.background = this.add.image(0, 0, 'sky');

	    this.welcomeText = this.add.bitmapText(0, 64, 'rollingThunder', 'Hey- Ho', 32);
	    this.welcomeText.x = this.world.centerX - this.welcomeText.textWidth / 2;

        this.input.onDown.addOnce(this.startGame, this);

	},

	update: function () {

	},

	startGame: function (pointer) {

		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
