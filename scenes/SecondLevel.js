import {Player} from '../objects/Player.js'
import {Sword} from '../objects/Sword.js'
import {Boss} from '../objects/Boss.js'
import {Enemy} from '../objects/Enemy.js'

export class SecondLevel extends Phaser.Scene {
  constructor() {
    super({ key: "second-level"});
  }

  preload() {
		console.log("loading SecondLevel");
		this.load.spritesheet("NCidle", "assets/NCidle.png", {frameWidth: 64, frameHeight: 64})
		this.load.image("sword", "assets/sword.png")
	}

	create() {
		this.anims.create({
			key: "NachoIdle", 
			frames: this.anims.generateFrameNumbers("NCidle", {start: 0, end:3, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration:700
		})
		
		this.player = new Player(this, 0, 555)

		this.sword = new Sword(this, 0, 0, this.player)

		this.boss = new Boss(this, 1555, 555, this.player)

		this.enemies = []

		// create colliders after all objects exist
    this.createColliders();
	}

	update(timestamp, delta) {
	}

	createColliders() {
		this.physics.add.collider(
    	this.player,
      this.boss,
			(player, boss) => {
				player.destroy()
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.sword,
      this.boss,
			(sword, boss) => {
				if(boss.health > 1) {
					boss.health--
					this.player.x -= 555
					boss.x += 555
					if(boss.health === 2) {
						boss.body.setVelocityX(-200)
						boss.jump()
					}
					if(boss.health === 1) {
						boss.pogo = true
					}
				} else {
					boss.destroy()
				}
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.player,
      this.enemies,
			(player, enemy) => {
				player.destroy()
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.sword,
      this.enemies,
			(sword, enemy) => {
				enemy.destroy()
			},
			null,
			this
    );
	}
}