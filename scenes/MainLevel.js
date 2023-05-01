import {Player} from '../objects/Player.js'
import {Enemy} from '../objects/Enemy.js'
import {ElecEnemy} from '../objects/ElecEnemy.js'
import {LankyEnemy} from '../objects/LankyEnemy.js'
import {Platform} from '../objects/Platform.js'
import {Conscript} from '../objects/Conscript.js'
	
export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
		this.hitbox = []
  }

  preload() {
    console.log("loading MainLevel");
		
		this.load.spritesheet("NCanim", "assets/NCanim.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet("CRanim", "assets/CRanim.png", {frameWidth: 64, frameHeight: 64})
		this.load.image("jumpPlat", "assets/jumpPlat.png")
		this.load.image("brickPlat", "assets/brickPlat.png")
		this.load.spritesheet("swordAnim", "assets/sword.png", {frameWidth: 64, frameHeight: 20})
		this.load.image("cannon", "assets/cannon.png")
		this.load.image("breakPlat", "assets/breakPlat.png")
		this.load.image("basicEnem", "assets/basicEnem.png")
		this.load.image("elecEnem", "assets/elecEnem.png")
		this.load.image("lankyEnem", "assets/lankyEnem.png")
		this.load.image("conscriptEnem", "assets/conscriptEnem.png")
		this.load.image("saw", "assets/saw.png")
  }

  create() {
		this.anims.create({
			key: "NachoIdle", 
			frames: this.anims.generateFrameNumbers("NCanim", {start: 0, end:3, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration:700
		})
		
		this.anims.create({
			key: "NachoRun", 
			frames: this.anims.generateFrameNumbers("NCanim", {start: 4, end:15, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration: 1200
		})

		this.anims.create({
			key: "CoolIdle", 
			frames: this.anims.generateFrameNumbers("CRanim", {start: 0, end:3, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration:700
		})
		
		this.anims.create({
			key: "CoolRun", 
			frames: this.anims.generateFrameNumbers("CRanim", {start: 4, end:15, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration: 1200
		})

		this.anims.create({
			key: "SwordIdle", 
			frames: this.anims.generateFrameNumbers("swordAnim", {start: 0, end:0, first: 0}), 
			framerate: 0,
			repeat:-1,
			duration: 1000
		})

		this.anims.create({
			key: "SwordStab", 
			frames: this.anims.generateFrameNumbers("swordAnim", {start: 1, end:3, first: 1}), 
			framerate: 0,
			repeat:0,
			duration: 200
		})

		this.player = new Player(this, 0, 0)

		this.spritePlatform = new Platform(this, 555, 55, 'breakPlat')
		
		this.enemies = []
		this.enemies.push(new Enemy(this, 200, 555, this.player))
		this.enemies.push(new ElecEnemy(this, 200, 555, this.player))
		this.enemies.push(new LankyEnemy(this, 200, 555, this.player))
		this.enemies.push(new Conscript(this, 200, 555, this.player))

		this.platforms = []
  	this.addPlatform(1350 / 2, 0, 1350, 10, 'norm')
		this.addPlatform(1350 / 2, 600, 1350, 10, 'norm')
		this.addPlatform(0, 600 / 2, 10, 600,'norm')
		this.addPlatform(1350, 600 / 2, 10, 600,'norm')

		switch(this.rng(1, 4)) {
			case 1:
				this.addPlatform(1350 * 0.2, 400, 1350 / 6, 10,'jump')
				this.addPlatform(1350 / 2, 300, 1350 / 6, 10,'jump')
				this.addPlatform(1350 * 0.8, 400, 1350 / 6, 10,'jump')
					break;
			case 2:
				this.addPlatform(1350 / 2, 475, 50, 250,'jump')
				this.addPlatform(1350 / 2, 125, 50, 250,'jump')
				break;
			case 3:
				this.addPlatform(50, 475, 100, 250,'jump')
				this.addPlatform(1300, 475, 100, 250,'jump')
				this.addPlatform(1350 / 2, 275, 200, 25,'jump')
				break;
			case 4:
				this.addPlatform(250, 350, 500, 25,'jump')
				this.addPlatform(1100, 350, 500, 25,'jump')
				break;
		}
		

    // create colliders after all objects exist
    this.createColliders();
  }

  update(timestamp, delta) {
  }

  
  createColliders() {
    this.physics.add.collider(
    	this.player,
      this.platforms,
			this.wallCheck(),
			null,
			this
    );

		this.physics.add.collider(
    	this.player,
      this.powerPlatform,
			(player, powerPlatform) => {
				player.speed = 200 
				powerPlatform.destroy()
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.player,
      this.spritePlatform,
			(player, spritePlatform) => {
				switch (this.rng(1,4)) {
					case 1:
						this.enemies.push(new Enemy(this, 555, 555, this.player))
							break;
					case 2:
						this.enemies.push(new ElecEnemy(this, 555, 555, this.player))
						break;
					case 3:
						this.enemies.push(new LankyEnemy(this, 555, 555, this.player))
						break;
					case 4:
						this.enemies.push(new Conscript(this, 555, 555, this.player))
						break;
				}
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.player,
      this.levelPlatform,
			(player, levelPlatform) => {
				this.scene.start('second-level')
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

		this.physics.add.overlap(
    	this.hitbox,
      this.enemies,
			(weapon, enemy) => {
				if(weapon.hit === true) {
					enemy.destroy()
					weapon.hit = false
				}
			},
			null,
			this
    );

		this.physics.add.collider(
    	this.platforms,
      this.enemies
    );
  }

	addPlatform(x, y, width, height, type) {
		let platform = 0
		
		if(type === 'norm') {
			platform = this.add.rectangle(x, y, width, height, 0xffaa99)
		} else if(type === 'jump') {
			platform = this.add.rectangle(x, y, width, height, 0x99ff99)
		}
		
		this.physics.add.existing(platform)
		platform.body.setAllowGravity(false)
		platform.body.setImmovable(true)
		this.platforms.push(platform)
	}

	wallCheck(platformColor) {
		this.player.checkWalls(platformColor)
	}

	rng(min, max, numOfDecimals = 0) {
		const i = Math.pow(10, numOfDecimals)
		return (Math.round((Math.random() * (max - min) + min) * i) / i)
	}
}
