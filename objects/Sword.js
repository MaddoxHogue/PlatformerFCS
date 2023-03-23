export class Sword extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, target) {
		super(scene, x, y, 'sword')
		this.scene = scene
		this.scene.add.existing(this)

		this.setOrigin(0, 0.5)
									 
		this.target = target

		const hb = new Phaser.GameObjects.Ellipse(this.scene, this.x, this.y, this.height / 2, this.height, null, 0)
		
		this.scene.add.existing(hb)
		this.scene.physics.add.existing(hb)
		hb.body.isCircle = true
		hb.body.allowGravity = false

		hb.setOrigin(0.5, 0.5)

		this.hitbox = hb
	}
	preUpdate(time, delta) {
		if (this.scene.input.gamepad.total > 0) {
      const pad = this.scene.input.gamepad.getPad(0);
			
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
	
	remove() {
		this.hitbox.destroy()
		this.destroy()
	}
}