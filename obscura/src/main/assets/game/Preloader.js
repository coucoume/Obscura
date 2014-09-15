
LineSerie.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

LineSerie.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);
		
	},

	create: function () {

		this.preloadBar.cropEnabled = false;

		//this.state.start('MainMenu');
		this.state.start('Game');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
