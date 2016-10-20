var Dribbler = Entity.extend({
		init : function (x, y, w, h) {
			this._super();

			var runningSprite = new Sprite("dribbler_run", 18, w, h, [
						'../../../animations/dribblegame/dribbler/daiqiu-2_00000.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00001.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00002.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00003.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00004.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00005.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00006.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00007.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00008.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00009.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00010.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00011.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00012.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00013.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00014.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00015.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00016.png',
						'../../../animations/dribblegame/dribbler/daiqiu-2_00017.png',
					]);
			runningSprite.setSpeed(30);

			this.sprites["run"] = runningSprite;

			this.startX = x;
			this.startY = y;
			this.originW = w;
			this.originH = h;

			this.posFunc = function (f) {
				return 500 * f / (f + 5)
			};
			this.scaleFunc = function (f) {
				return 3 / (f + 3)
			}; //	* offsetX * 21.8579

			this.isVisible = false;
			this.moveState = {
				sf : 1,
				so : 0,
				vf : 0,
				vo : 0
			},

			this.x = this.startX - this.originW / 2;
			this.y = 540 - this.originH - this.posFunc(0) - this.startY;
			this.w = this.originW * this.scaleFunc(0);
			this.h = this.originH * this.scaleFunc(0);

			this.currentSprite = this.sprites["run"];
		},

		move : function (direction) {
			if (direction == "left") {
				this.moveState.vo = -1;
				this.moveState.vf = 0;
			} else if (direction == "right") {
				this.moveState.vo = 1;
				this.moveState.vf = 0;
			} else if (direction == "up") {
				this.moveState.vf = 1;
				this.moveState.vo = 0;
			} else if (direction == "down") {
				this.moveState.vf = -1;
				this.moveState.vo = 0;
			} else if (direction == "stand") {
				this.moveState.vf = 0;
				this.moveState.vo = 0;
			} else {
				console.log("Error move cmd!");
			}
		},

		update : function (time) {
			this._super(time);

			var dt = 1 / 60;
			var ms = this.moveState;

			if (ms.sf <= 1 && ms.vf < 0 ||
				ms.sf >= 3 && ms.vf > 0)
				ms.vf = 0;
			if (ms.so <= -3 && ms.vo < 0 ||
				ms.so >= 3 && ms.vo > 0)
				ms.vo = 0;

			ms.sf += ms.vf * dt;
			ms.so += ms.vo * dt;

			var f = ms.sf;
			var o = ms.so;

			this.w = this.originW * this.scaleFunc(f);
			this.h = this.originH * this.scaleFunc(f);
			this.x = this.startX - this.w / 2 + this.scaleFunc(f) * o * 150;
			var offsetY = 540 - this.posFunc(f);
			this.y = offsetY - this.h - this.startY;

		},

		draw : function (ctx) {
			if (!this.currentSprite)
				return;

			var sprite = this.currentSprite;
			sprite.draw(ctx, this.x, this.y, this.w, this.h);
		}
	});
