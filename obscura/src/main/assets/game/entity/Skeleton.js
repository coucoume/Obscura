LineSerie.Skeleton = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'skeleton');

    //  This will force it to decelerate and limit its speed
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.drag.set(0.2);
    this.body.maxVelocity.setTo(400, 400);
    //this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);

    this.animations.add('rise',[0,1,2,3,4], 8, false);

    this.following = false;
};

LineSerie.Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
LineSerie.Skeleton.prototype.constructor = LineSerie.Skeleton;

/**
 * Automatically called by World.update
 */
LineSerie.Skeleton.prototype.update = function() {
	//console.log("updating skeleton");
};

LineSerie.Skeleton.prototype.riseFromDeath = function() {
   this.animations.play('rise');
};

LineSerie.Skeleton.prototype.isFollowing = function() {
   return this.following;
};

LineSerie.Skeleton.prototype.setFollower = function() {
   console.log("follower");
   this.following = true;
};


