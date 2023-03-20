export class Cannon extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, target) {
		super(scene, x, y, 'cannon')
		this.scene = scene
		this.scene.add.existing(this)

		this.setOrigin(0, 0.5)
									 
		this.target = target

		this.hitbox = new Phaser.GameObjects.Ellipse(this.scene, this.x, this.y, this.height / 2, this.height, null, 0)
		this.scene.add.existing(this.hitbox)
		this.scene.physics.add.existing(this.hitbox)
		this.hitbox.body.isCircle = true
		this.hitbox.body.allowGravity = false

		this.hitbox.setOrigin(0.5, 0.5)
	}
	preUpdate(time, delta) {
		//this.scene.physics.moveToObject(this, this.target, 100, null)

		if (this.scene.input.gamepad.total > 0) {
      const pad = this.scene.input.gamepad.getPad(0);
			/*
			if(pad.rightStick.x > 0.1) {
				this.scaleX = 1
				this.body.setOffset(0, 0)
			} else if(pad.rightStick.x < -0.1) {
				this.scaleX = -1
				this.body.setOffset(64, 0)
			}
	 		*/
			this.setPosition(this.target.x, this.target.y)
			this.angle = Math.atan2(pad.rightStick.y, pad.rightStick.x) * (180 / Math.PI)
			this.setAngle(this.angle)
			
			/*
			this.hitbox.setPosition(this.target.x, this.target.y)
			this.hitbox.setAngle(this.angle)
			*/
	 
			this.hitbox.setPosition(this.x + Math.cos(this.rotation) * this.width, this.y + Math.sin(this.rotation) * this.width)
		}
	}
}