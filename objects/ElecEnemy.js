export class ElecEnemy extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, target) {
		super(scene, x, y, 'elecEnem')
		this.target = target
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.setOrigin(0.5, 0)
	}
	preUpdate(time, delta) {
		if(this.target.x < this.body.x) {
			this.body.setVelocityX(-150)
			this.flipX = false
		} else {
			this.body.setVelocityX(150)
			this.flipX = true
		}
	}
}
