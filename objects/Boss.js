export class Boss extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, target) {
		super(scene, x, y, 200, 200, 0xaaaaff)
		this.target = target
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.health = 3
		this.pogo = false
	}
	preUpdate(time, delta) {
		if (this.body.onFloor()) {
			if (this.target.x < this.body.x) {
				this.body.setVelocityX(-225)
			} else {
				this.body.setVelocityX(225)
			}
		}

		if (this.pogo === true && this.body.onFloor()) {
			this.jump()
		}
	}
	jump() {
		if (this.body.onFloor()) {
			this.body.setVelocityY(-350)
		}
	}
}