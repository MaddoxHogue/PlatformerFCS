export class Cannon extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, target) {
		super(scene, x, y, 'cannon')
		this.scene = scene
		this.scene.add.existing(this)

		this.setOrigin(-0.5, 0.5)
									 
		this.target = target

		this.hitbox = null
	}
	preUpdate(time, delta) {
		//this.scene.physics.moveToObject(this, this.target, 100, null)

		if (this.scene.input.gamepad.total > 0) {
      const pad = this.scene.input.gamepad.getPad(0);
			
			this.setPosition(this.target.x, this.target.y)
			this.angle = Math.atan2(pad.rightStick.y, pad.rightStick.x) * (180 / Math.PI)
			this.setAngle(this.angle)
		}
	}

	remove() {
		this.destroy()
	}

	shoot(shooter) {
		shooter.body.setVelocityY(-100)
		console.log('ewdhbdfshbdfx')
	}
}