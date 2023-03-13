export class Platform extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, platType) {
		super(scene, x, y, platType)
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.immovable = true
		this.body.allowGravity = false
	}
	preUpdate(time, delta) {}
}