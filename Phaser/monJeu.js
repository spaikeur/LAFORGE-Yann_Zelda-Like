var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}

};


var game = new Phaser.Game(config);


function init() {
	var walls;

	var cursors;

	var player;
	var looking;
	var action;

	var baseballObject;
	var flashLightObject;

	var light;
	var zonzon;
	var zombies;

}


function preload() {
	this.load.image('room1', ['_img/Scene_Room.gif', '/_img/NormalMap_Scene_Room.png']);
	this.load.image('room2', ['_img/Scene_Room2.gif', '_img/NormalMap_Scene_Room2.png']);
	this.load.image('corridor', ['_img/Scene_Corridor.gif', '/_img/NormalMap_Scene_Corridor.png']);
	this.load.image('downStairs', ['_img/Scene_DownStairs.gif', '/_img/NormalMap_Scene_DownStairs.png']);
	this.load.image('kitchen', ['_img/Scene_Kitchen_inverted.gif', '/_img/NormalMap_Scene_Kitchen_inverted.png']);
	this.load.image('door', ['_img/Object_Door.png', '/_img/NormalMap_Object_Door.png']);

	this.load.image('BBB', '_img/BaseBall.png');
	this.load.image('FL', '_img/FlashLight.png');
	this.load.image('key', '_img/Object_Key.gif');

	this.load.spritesheet('zombie', '_img/Character_Zombie1-Sheet.png', {
		frameWidth: 63,
		frameHeight: 61
	});

	this.load.spritesheet('perso', '_img/Character_Player-Sheet.png', {
		frameWidth: 75,
		frameHeight: 75
	});
}

function create() {
	var timeSinceLastIncrement = 0;

	alert(' -TUTO- Votre objectif : tuez 10 zombies afin d obtenir la clef pour ouvrir la porte dans le couloir. ');
	alert(' -TUTO- Touche E afin d interagir pour recuperer les objets et d ouvrir les portes');
	alert(' -TUTO- Touche R afin de changer d equipement');

	//--Player Variables--
	looking = 0;
	baseball = 0;
	action = 0;
	flashLight = 0;
	flashLightEquiped = 0;
	baseBallEquiped = 0;
	attacking = 0;
	posCamera = 0;
	interacting = 0;
	key = 0;

	this.add.image(0, 0, 'room1').setOrigin(0, 0).setPipeline('Light2D');
	this.add.image(0, 600, 'corridor').setOrigin(0, 0).setPipeline('Light2D');
	this.add.image(0, 900, 'room2').setOrigin(0, 0).setPipeline('Light2D');
	this.add.image(1200, 590, 'kitchen').setOrigin(0, 0).setPipeline('Light2D');


	player = this.physics.add.sprite(200, 250, 'perso');
	player.setSize(50, 50, true);

	this.lights.enable().setAmbientColor(0x000000);
	light = this.lights.addLight(100, 100, 150).setIntensity(0.20);

	baseballObject = this.physics.add.sprite(180, 432, 'BBB');
	baseballObject.setSize(30, 40, true);

	flashLightObject = this.physics.add.sprite(110, 432, 'FL');
	flashLightObject.setSize(30, 40, true);

	//Zombies
	var id = 0;
	zonzon = new Zombie(this, 400, 300, 'zombie', 3, id, 0);

	


	this.add.existing(zonzon);
	this.physics.world.enableBody(zonzon);

	zombies = this.physics.add.group();
	zombies.add(new Zombie(this, 400, 300, 'zombie', 3, 1, 100), true);
	zombies.add(new Zombie(this, 700, 300, 'zombie', 3, 1, 36), true);
	zombies.add(new Zombie(this, 400, 750, 'zombie', 3, 1, 15), true);
	zombies.add(new Zombie(this, 500, 750, 'zombie', 3, 1, 100), true);
	zombies.add(new Zombie(this, 400, 1200, 'zombie', 3, 1, 75), true);
	zombies.add(new Zombie(this, 300, 1100, 'zombie', 3, 1, 37), true);
	zombies.add(new Zombie(this, 1200, 900, 'zombie', 3, 1, 50), true);
	zombies.add(new Zombie(this, 1300, 800, 'zombie', 3, 1, 200), true);
	zombies.add(new Zombie(this, 1495, 1070, 'zombie', 3, 1, 20), true);
	zombies.add(new Zombie(this,1675, 1000, 'zombie', 3, 1, 10), true);





	//COLLIDERS

	walls = this.physics.add.group();

	wallRoom1Top = walls.create(400, 0).setSize(800, 120).setImmovable();
	wallRoom1Left = walls.create(25, 400).setSize(120, 800).setImmovable();
	wallRoom1Right = walls.create(770, 200).setSize(120, 600).setImmovable();
	wallRoom1BotLeft = walls.create(160, 595).setSize(400, 120).setImmovable();
	wallRoom1BotRight = walls.create(640, 595).setSize(400, 120).setImmovable();
	wallRoom1Table = walls.create(203, 475).setSize(230, 117).setImmovable();
	wallRoom1Wardrobe = walls.create(685, 415).setSize(75, 165).setImmovable();
	wallRoom1Table = walls.create(203, 475).setSize(230, 117).setImmovable();

	wallCorridorLeft = walls.create(25, 1200).setSize(120, 800).setImmovable();
	wallCorridorBotRight = walls.create(1130, 895).setSize(250, 100).setImmovable();
	wallCorridorTopRight = walls.create(1350, 595).setSize(1000, 120).setImmovable();

	wallRoom2TopLeft = walls.create(160, 895).setSize(400, 120).setImmovable();
	wallRoom2TopRight = walls.create(690, 895).setSize(480, 120).setImmovable();
	wallRoom2Right = walls.create(770, 1300).setSize(120, 800).setImmovable();
	wallRoom2Bot = walls.create(400, 1500).setSize(800, 120).setImmovable();
	wallRoom2Table = walls.create(595, 1025).setSize(230, 117).setImmovable();
	wallRoom1Wardrobe = walls.create(685, 1300).setSize(75, 165).setImmovable();

	wallKitchenTopRight = walls.create(1620, 595).setSize(1000, 220).setImmovable();
	wallKitchenBot = walls.create(1620, 1245).setSize(1000, 220).setImmovable();
	wallKitchenLeft = walls.create(1200, 1195).setSize(120, 800).setImmovable();
	wallKitchenLeft = walls.create(1210, 1205).setSize(120, 800).setImmovable();
	wallKitchenRight = walls.create(1970, 1095).setSize(120, 800).setImmovable();
	wallKitchenTable = walls.create(1407, 965).setSize(137, 230).setImmovable();

	wallDoor = walls.create(967, 859).setSize(50, 50).setImmovable();

	doors = this.physics.add.group();

	doorKitchen = doors.create(967, 847, 'door');

	keys = this.physics.add.group();




	// this.physics.add.collider(player, zombies);

	this.physics.add.collider(walls, player);
	this.physics.add.collider(walls, zombies);
	this.physics.add.collider(zombies,zombies);
	this.physics.add.overlap(player, zombies, playerAttack, null);
	this.physics.add.overlap(player, flashLightObject, interactToFlashLight, null);
	this.physics.add.overlap(player, baseballObject, interactToBaseBall, null);
	this.physics.add.overlap(doors, player, interactToDoor, null);
	this.physics.add.overlap(player, keys, interactToKey, null);

	// this.physics.add.overlap(player, zombies, playerAttack, null, this);

	//--Keyboard config--
	cursors = this.input.keyboard.createCursorKeys();
	attackRight = this.input.keyboard.addKey('D');
	attackLeft = this.input.keyboard.addKey('Q');
	attackUp = this.input.keyboard.addKey('Z');
	attackDown = this.input.keyboard.addKey('S');
	changeEquip = this.input.keyboard.addKey('R');
	interaction = this.input.keyboard.addKey('E');


	//--Player ANIMATION--
	this.anims.create({ //--Player attack Y--
		key: 'attackY',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 8,
			end: 10
		}),
		frameRate: 6,
		repeat: 0
	});

	this.anims.create({ //--Player attack X--
		key: 'attackX',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 23,
			end: 25
		}),
		frameRate: 6,
		repeat: 0
	});

	this.anims.create({ //--Player run Top/Down with BBB--
		key: 'down&topB',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 7,
			end: 8
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //--Player run Right/Left with BBB--
		key: 'left&rightB',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 22,
			end: 23
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //--Player idle Top/Down with BBB--
		key: 'stopYB',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 5,
			end: 6
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //--Player idle Right/Left with BBB--
		key: 'stopXB',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 20,
			end: 21
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //Player run Down/Top
		key: 'down&top',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 2,
			end: 3
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //Player run Right/Left
		key: 'left&right',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 17,
			end: 18
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //Player Idle Top/Down
		key: 'stopY',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 0,
			end: 1
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //Player Idle Right/Left
		key: 'stopX',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 15,
			end: 16
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //Player run Down/Top FL
		key: 'down&topF',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 13,
			end: 14
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //Player run Right/Left FL
		key: 'left&rightF',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 28,
			end: 29
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //Player Idle Top/Down FL
		key: 'stopYF',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 11,
			end: 12
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //Player Idle Right/Left FL
		key: 'stopXF',
		frames: this.anims.generateFrameNumbers('perso', {
			start: 26,
			end: 27
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //Player Interact Top/Down
		key: 'InteractY',
		frames: [{
			key: 'perso',
			frame: 4
		}],
		frameRate: 5
	});

	this.anims.create({ //Player Interact Right/Left
		key: 'InteractX',
		frames: [{
			key: 'perso',
			frame: 19
		}],
		frameRate: 5
	});

	this.anims.create({ //zombi run Down/Top
		key: 'down&topZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 2,
			end: 3
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //zombi run Right/Left
		key: 'left&rightZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 17,
			end: 18
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({ //zombi Idle Top/Down
		key: 'stopYZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 0,
			end: 1
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //zombi Idle Right/Left
		key: 'stopXZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 15,
			end: 16
		}),
		frameRate: 1,
		repeat: -1
	});

	this.anims.create({ //zombi attack Top/Down
		key: 'attackYZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 0,
			end: 1
		}),
		frameRate: 1,
		repeat: 0
	});

	this.anims.create({ //zombi attack Right/Left
		key: 'attackXZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 15,
			end: 16
		}),
		frameRate: 1,
		repeat: 0
	});

	this.anims.create({ //zombi attack Right/Left
		key: 'attackXZ',
		frames: this.anims.generateFrameNumbers('zombie', {
			start: 15,
			end: 16
		}),
		frameRate: 1,
		repeat: 0
	});

}

function update() {
	//changement de salles
	
	if (player.body.y < 599) {
		console.log('testCusiine');
		this.cameras.main.pan(400, 300);
		posCamera = 0;
	}
	if (player.body.y > 601 && player.body.y < 799 && player.body.x < 801) {
		this.cameras.main.pan(400, 750);
		posCamera = 1;
	}
	if (player.body.y > 801 && player.body.x < 1175) {
		this.cameras.main.pan(400, 1200);
		posCamera = 2;
	}
	if (player.body.x > 801 && player.body.x < 1174) {
		this.cameras.main.pan(1200, 900);
		posCamera = 3;
	}
	if (player.body.x > 1175) {
		this.cameras.main.pan(1600, 900);
		posCamera = 4;
	}


	// --zombies actions--
	zombies.children.iterate(function (child) {
		child.mouvements(player);
	});

	// zonzon.mouvements(player);

	//--player actions--

	light.x = player.x;
	light.y = player.y;

	if (Phaser.Input.Keyboard.JustDown(changeEquip)) { //Player ChangeEquipement

		if (baseball == 0 && flashLight == 0 && baseBallEquiped == 1) {
			baseball = 1;

		} else if (baseball == 1 || (flashLightEquiped == 1 && baseball == 0 && flashLight == 0)) {
			if (flashLightEquiped == 1) {
				flashLight = 1;
				light.setIntensity(2.5);
			}
			baseball = 0;
		} else if (flashLight == 1) {
			flashLight = 0;
			baseball = 0;
			light.setIntensity(0.5);
		}
	}

	if (Phaser.Input.Keyboard.JustDown(interaction) && action == 0) { //--Player interaction--
		interacting = 1;
		if (looking == 1) {
			action = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('stopY', false);
			player.anims.remove('stopX', false);
			player.anims.play('InteractY', true);
			player.setFlipY(false);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					interacting = 0;
					player.anims.play('InteractY', false);
				},
			})
		} else if (looking == 2) {
			action = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('stopY', false);
			player.anims.remove('stopX', false);
			player.anims.play('InteractY', true);
			player.setFlipY(true);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					interacting = 0;
					player.anims.play('InteractY', false);
				},
			})
		} else if (looking == 3) {
			action = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('stopY', false);
			player.anims.remove('stopX', false);
			player.anims.play('InteractX', true);
			player.setFlipY(true);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					interacting = 0;
					player.anims.play('InteractX', false);
				},
			})
		} else if (looking == 4) {
			action = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('stopY', false);
			player.anims.remove('stopX', false);
			player.anims.play('InteractX', true);
			player.setFlipY(false);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					interacting = 0;
					player.anims.play('InteractX', false);
				},
			})
		}

	}
	if (baseball == 0 && flashLight == 0) {
		if (cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Down--
			player.anims.play('down&top', true);
			player.setVelocityY(300);
			player.setFlipY(false);
			looking = 1;
			action = 0;
		} else if (!cursors.up.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Up--
			player.setVelocityY(-300);
			player.anims.play('down&top', true);
			player.setFlipY(true);
			looking = 2;
			action = 0;
		} else if (!cursors.down.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Left--
			player.setVelocityX(-300);
			player.anims.play('left&right', true);
			player.setFlipX(false);
			looking = 3;
			action = 0;
		} else if (!cursors.right.isDown) {
			player.setVelocityX(0);
		}

		if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Right--
			player.setVelocityX(300);
			player.anims.play('left&right', true);
			player.setFlipX(true);
			looking = 4;
			action = 0;
		} else if (!cursors.left.isDown) {
			player.setVelocityX(0);
		}

		if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown && action == 0) { //--Player IDLE--
			if (looking == 3 || looking == 4) {
				player.anims.play('stopX', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			} else if (looking == 2 || looking == 1) {
				player.anims.play('stopY', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			}
		}
	} else if (flashLight == 1) {

		if (cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Down--
			player.anims.play('down&topF', true);
			player.setVelocityY(300);
			player.setFlipY(false);
			looking = 1;
			action = 0;
		} else if (!cursors.up.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Up--
			player.setVelocityY(-300);
			player.anims.play('down&topF', true);
			player.setFlipY(true);
			looking = 2;
			action = 0;
		} else if (!cursors.down.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Left--
			player.setVelocityX(-300);
			player.anims.play('left&rightF', true);
			player.setFlipX(false);
			looking = 3;
			action = 0;
		} else if (!cursors.right.isDown) {
			player.setVelocityX(0);
		}

		if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Right--
			player.setVelocityX(300);
			player.anims.play('left&rightF', true);
			player.setFlipX(true);
			looking = 4;
			action = 0;
		} else if (!cursors.left.isDown) {
			player.setVelocityX(0);
		}

		if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown && action == 0) { //--Player IDLE--
			if (looking == 3 || looking == 4) {
				player.anims.play('stopXF', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			} else if (looking == 2 || looking == 1) {
				player.anims.play('stopYF', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			}
		}
	} else if (baseball == 1) { //--Player actions BBB--

		if (cursors.down.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Down--
			player.anims.play('down&topB', true);
			player.setVelocityY(300);
			player.setFlipY(false);
			looking = 1;
			action = 0;
		} else if (!cursors.up.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown) { //--Player Run Up--
			player.setVelocityY(-300);
			player.anims.play('down&topB', true);
			player.setFlipY(true);
			looking = 2;
			action = 0;
		} else if (!cursors.down.isDown) {
			player.setVelocityY(0);
		}

		if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Left--
			player.setVelocityX(-300);
			player.anims.play('left&rightB', true);
			player.setFlipX(false);
			looking = 3;
			action = 0;
		} else if (!cursors.right.isDown) {
			player.setVelocityX(0);
		}

		if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) { //--Player Run Right--
			player.setVelocityX(300);
			player.anims.play('left&rightB', true);
			player.setFlipX(true);
			looking = 4;
			action = 0;
		} else if (!cursors.left.isDown) {
			player.setVelocityX(0);
		}

		if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown && action == 0) { //--Player Idle--
			if (looking == 3 || looking == 4) {
				player.anims.play('stopXB', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			} else if (looking == 2 || looking == 1) {
				player.anims.play('stopYB', true);
				player.setVelocityY(0);
				player.setVelocityX(0);
			}
		}

		if (Phaser.Input.Keyboard.JustDown(attackLeft) && action == 0) { //--Player Attack Left--
			action = 1;
			attacking = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('attackX', true);
			player.setFlipX(false);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					attacking = 0;
				},
			})
		}
		if (Phaser.Input.Keyboard.JustDown(attackRight) && action == 0) { //--Player Attack Right--
			action = 1;
			attacking = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('attackX', true);
			player.setFlipX(true);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					attacking = 0;
				},
			})
		}
		if (Phaser.Input.Keyboard.JustDown(attackUp) && action == 0) { //--Player Attack Up--
			action = 1;
			attacking = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('attackY', true);
			player.setFlipY(true);
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;
					attacking = 0;
				},
			})
		}
		if (Phaser.Input.Keyboard.JustDown(attackDown) && action == 0) { //--Player Attack Down--
			action = 1;
			attacking = 1;
			player.anims.play('stopYB', false);
			player.anims.remove('stopXB', false);
			player.anims.play('attackY', true);
			player.setFlipY(false);
			attacking = 0;
			this.time.addEvent({
				delay: 500,
				callback: () => {
					action = 0;

				},
			})
		}
	}

}

function interactToBaseBall(player, thing) {

	if (interacting == 1) {
		baseBallEquiped = 1;
		alert(' -TUTO- Vous avez récupéré une batte de baseball');
		alert(' -TUTO- ZQSD afin d attaquer ! ');
		thing.disableBody(true, true);
	}
}

function interactToFlashLight(player, thing) {

	if (interacting == 1) {
		flashLightEquiped = 1;
		alert(' -TUTO- Vous avez acquéri une lampe torche, utile pour s éclairer  ! ');
		thing.disableBody(true, true);
	}
}

function interactToDoor(player, thing) {

	if (interacting == 1 && key == 1) {
		thing.disableBody(true, true);
		wallDoor.disableBody(true, true);
		alert(' -TUTO- Vous avez finis le jeu !! (héhé) ');
	}
}

function interactToKey(player, thing) {
	if (interacting == 1) {
		thing.disableBody(true, true);
		key = 1;
	}
}

function playerAttack(player, zz) {
	if (attacking == 1) {
		zombies.children.iterate(function (child) {
			Alive = child.getAlive()
			drop = child.getDrop()
			child.hurt();
			if (Alive == 0) {
				if (drop == 1) {
					key = keys.create(child.body.x, child.body.y, 'key');
					key.setSize(81, 29, true);
				}
				zz.disableBody(true, true);
			}
		});
	}
}