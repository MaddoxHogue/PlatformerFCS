export class Conscript extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, target) {
		super(scene, x, y, 'conscriptEnem')
		this.target = target
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.setOrigin(0.5, 0)
		this.timer = 10000
		this.counter = this.timer

		this.slamWait = 1500
		this.slamCounter = this.slamWait

		this.slamFlag = true
	}
	preUpdate(time, delta) {
		if(this.body.onFloor()) {
			if(this.target.x < this.body.x) {
				this.body.setVelocityX(-75)
				this.flipX = false
			} else {
				this.body.setVelocityX(75)
				this.flipX = true
			}
		}

		if(this.counter <=0) {
			this.x = this.target.x

			if(this.slamFlag === true) {
				this.y = this.target.y - 100
				this.slamFlag = false
				this.body.setVelocityY(-300)
			}
			
			if(this.slamCounter <= 0) {
				this.body.setVelocityY(400)
				
				this.slamCounter = this.slamWait
				this.counter = this.timer
				this.slamFlag = true
			} else {
				this.slamCounter -= delta
			}
			
		} else {
			this.counter -= delta
		}
	}
}