var y_position = 0;
var x_position = 0;
var z_position = 0;

function move(y, x, z){
    console.log("---> z movement from game:"+z);
    y_position = y;
    x_position = x;
    z_position = z;
}



LineSerie.Game = function (game) {
    this.cursors = null;
    this.cameraMotionVelocity = 10;
    this.path = null;
    this.pathElements = 0;
    this.centerPointer = null;
 };

LineSerie.Game.prototype = {

	create: function () {

        //  Resize our game world to be a 2000 x 2000 square
        //this.game.world.setBounds(-1000, -1000, 1000, 1000);
        //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
        this.game.world.setBounds(-1000, -1000, 2000, 2000);
        
        var x = this.game.rnd.integerInRange(1, 10);
        var graphics = this.game.add.graphics(0, 0);

        //follow path
        this.path = this.game.add.graphics(0 , 0 );

        // draw BACKGROUND random circles
        for (var i = 0; i < 200; i++)
        {
            //Draw random circles
            graphics.beginFill(0x00CC00, 1/x);
            graphics.drawCircle(this.game.world.randomX, this.game.world.randomY, 100);

            x = this.game.rnd.integerInRange(1, 10);
        }

       // draw CENTER circle
        graphics.lineStyle(0);
        graphics.beginFill(0xFFCC00, 1);
        graphics.drawCircle(0, 0, 50);

        //Reset stroke
        graphics.lineStyle(0);        

        
        // draw BASE rectangle TOP

        graphics.lineStyle(20, 0x000000);
        graphics.moveTo(-1000,-1000);
        graphics.lineTo(1000, -1000);

        //graphics.lineStyle(2, 0x0000FF, 1);
        //graphics.drawRect(-1000, -1000, this.game.world.width, 10);

        // draw BASE rectangle BOTTOM
        graphics.moveTo(-1000, 1000);
        graphics.lineTo(1000, 1000);

        //graphics.lineStyle(2, 0x0000FF, 1);
        //graphics.drawRect(-1000, 1000-10, this.game.world.width, 10);

        // draw BASE rectangle RIGHT
        graphics.moveTo(1000, -1000);
        graphics.lineTo(1000, 1000);

        //graphics.lineStyle(2, 0x0000FF, 1);
        //graphics.drawRect(1000-10, -1000, 10, this.game.world.height);

        // draw BASE rectangle LEFT
        graphics.moveTo(-1000, -1000);
        graphics.lineTo(-1000, 1000);

        //graphics.lineStyle(2, 0x0000FF, 1);
        //graphics.drawRect(-1000, -1000, 10, this.game.world.height);

        this.centerPointer = this.game.add.graphics(0, 0);
        this.centerPointer.lineStyle(0);
        this.centerPointer.beginFill(0xFF0000, 1);
        this.centerPointer.drawCircle(this.game.width/2, this.game.height/2, 10); //CENTER VIEW PORT 800x600
        this.centerPointer.fixedToCamera = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.time.advancedTiming=true;

       
 	},

	update: function () {

        if(y_position > 0){
            this.game.camera.y += this.cameraMotionVelocity;
        }else if(y_position <= 0){
            this.game.camera.y -= this.cameraMotionVelocity;
        }

        if(x_position > 0){
            this.game.camera.x += this.cameraMotionVelocity;
            this.updatePath();
        }else if(x_position <= 0){
            this.game.camera.x -= this.cameraMotionVelocity;
            this.updatePath();
        }


        if (this.cursors.up.isDown)
        {
            this.game.camera.y -= this.cameraMotionVelocity;
            this.updatePath();  

        }
        else if (this.cursors.down.isDown)
        {
            this.game.camera.y += this.cameraMotionVelocity;
            this.updatePath();  
        }

        if (this.cursors.left.isDown)
        {
            this.game.camera.x -= this.cameraMotionVelocity;
            this.updatePath();  
        }
        else if (this.cursors.right.isDown)
        {
            this.game.camera.x += this.cameraMotionVelocity;
            this.updatePath();  
        }

    },

    render: function() {

        this.game.debug.text("fps:"+this.game.time.fps, this.game.width/2, this.game.height/2 + 20); 
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.geom(this.line);
        //this.game.debug.rectangle(this.line);

    },

    updatePath : function (){
        
        if(this.pathElements > 5){
            this.path.destroy(true);
            this.pathElements = 0;
            this.path = this.game.add.graphics(0, 0);
        }

        this.path.lineStyle(0.1);
        this.path.beginFill(0xFFCC00, 1);
        this.path.drawCircle(this.game.camera.x + this.game.width/2, this.game.camera.y + this.game.height/2, 2);

        this.pathElements ++;

    }

};
