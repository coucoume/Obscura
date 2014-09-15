LineSerie = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check LineSerie.orientated in internal loops to know if it should pause or not */
    orientated: false

};

LineSerie.Boot = function (game) {
};

LineSerie.Boot.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'images/preload.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 800;
            this.scale.minHeight = 600;
            this.scale.maxWidth = 3000;//window.innerWidth;
            this.scale.maxHeight = 3000;//window.innerHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            //this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1920;
            this.scale.maxHeight = 1080;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {
    },

    /*
    enterIncorrectOrientation: function () {

        LineSerie.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        LineSerie.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
    */
};