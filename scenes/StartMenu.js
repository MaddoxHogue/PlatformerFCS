export class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: "start-menu"});
  }

  preload() {
    console.log("loading StartMenu");
		this.load.image("waffle","../assets/waffle.png")
  }

  create() {
		this.group = this.physics.add.group({
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
		})
		this.mySprite = this.group.create(100,100,"waffle")
		
    this.welcome = this.add.text(600, 250, "Welcome to My Game!");
		this.physics.add.existing(this.welcome)
		this.welcome.body.collideWorldBounds = true
		this.welcome.body.setImmovable(true)

		this.instructions = this.add.text(0, 0, "Hold Y for info");

		this.cursor = this.add.text(400, 200, "0");
		this.physics.add.existing(this.cursor)
		this.cursor.body.collideWorldBounds = true
		
		this.physics.add.collider(
			this.cursor,
			this.welcome,
			null,
			null,
			this
		)

		this.physics.add.collider(
			this.cursor,
			this.mySprite,
			null,
			null,
			this
		)

		this.jumps = 0
		this.maxJumps = 2
		this.jumpCooldown = false
  }

  update() {
		//this.scene.start('main-level')
		
		if(this.cursor.body.onFloor()) {
			this.jumps = 0
		} else if(this.jumps === 0) {
			this.jumps++
		}
			
		
    if (this.input.gamepad.total > 0) {
      const pad = this.input.gamepad.getPad(0);

			if(pad.leftStick.x > 0.1) {
				this.cursor.body.setVelocityX(100)
			} else if(pad.leftStick.x < -0.1) {
				this.cursor.body.setVelocityX(-100)
			} else {
				this.cursor.body.setVelocityX(0)
			}
			
      if (pad.A) {
				this.instructions.setText("Left Stick = move, B = Jump, Y = instructions, X = start");
        //this.scene.start("main-level");
      } else {
				this.instructions.setText("Hold Y for info");
			}
			if(pad.B) {
				if(this.jumps < this.maxJumps && !this.jumpCooldown) {
					this.cursor.body.setVelocityY(-100)
					this.jumps++
					this.jumpCooldown = true
				}
			} else {
				this.jumpCooldown = false
			}	
			if (pad.X) {
      }
			if (pad.Y) {
				this.scene.start('main-level')
      }
    }
  }
}

//	Y
//A		X
//	B