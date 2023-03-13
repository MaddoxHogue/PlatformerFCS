export class Enemy extends Phaser.GameObjects.Rectangle{
	constructor(scene, x, y, target) {
		super(scene, x, y, 55, 55, 0xffaaaa)
		this.target = target
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
	}
	preUpdate(time, delta) {
		if(this.target.x < this.body.x) {
			this.body.setVelocityX(-55)
		} else {
			this.body.setVelocityX(55)
		}
	}
}