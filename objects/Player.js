export class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "NCanim")
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.setCollideWorldBounds(true)
		this.play("NachoIdle")

		this.jumps = 0
		this.maxJumps = 2
		this.jumpCooldown = false

		this.speed = 100

		this.wallJumpSwitch = true

		this.mode = "Nacho"
		
		this.animType = "Idle"

		this.lastMode = this.mode

		this.lastAnim = this.animType
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta)
		this.animType = "Idle"
		
		if (this.body.onFloor()) {
			this.jumps = 0
		} else if (this.jumps === 0) {
			this.jumps++
		}
		if (this.scene.input.gamepad.total > 0) {
			const pad = this.scene.input.gamepad.getPad(0);

			if (pad.leftStick.x > 0.1) {
				this.body.setVelocityX(this.speed)
				if (this.scaleX < 1) { this.scaleX = 1 }
				this.body.setOffset(0, 0)

				this.animType = "Run"
			} else if (pad.leftStick.x < -0.1) {
				this.body.setVelocityX(-this.speed)
				if (this.scaleX > -1) { this.scaleX = -1 }
				this.body.setOffset(64, 0)

				this.animType = "Run"
			} else {
				this.body.setVelocityX(0)
			}

			if (pad.B) {
				if (this.jumps < this.maxJumps && !this.jumpCooldown) {
					this.body.setVelocityY(-200)
					this.jumps++
					this.jumpCooldown = true
				}
			} else {
				this.jumpCooldown = false
			}
		}

		if(this.lastMode !== this.mode || this.lastAnim !== this. animType) {
			this.updateAnim(this.mode, this.animType)
		}

		this.lastMode = this.mode

		this.lastAnim = this.animType
	}

	checkWalls(platformColor) {
		if (!this.body.onFloor() && platformColor === 'jump') {
			this.jumps = 1
		}
	}

	updateAnim(mode, type) {
		this.play(`${mode}${type}`)
	}
}