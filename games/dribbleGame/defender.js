var Defender = Entity.extend({
		init : function (x, y, w, h) {
			this._super();

			var runningSprite = new Sprite("defender_run", 18, w, h, [
						'../../../animations/dribblegame/defender/lajie_00000.png',
						'../../../animations/dribblegame/defender/lajie_00001.png',
						'../../../animations/dribblegame/defender/lajie_00002.png',
						'../../../animations/dribblegame/defender/lajie_00003.png',
						'../../../animations/dribblegame/defender/lajie_00004.png',
						'../../../animations/dribblegame/defender/lajie_00005.png',
						'../../../animations/dribblegame/defender/lajie_00006.png',
						'../../../animations/dribblegame/defender/lajie_00007.png',
						'../../../animations/dribblegame/defender/lajie_00008.png',
						'../../../animations/dribblegame/defender/lajie_00009.png',
						'../../../animations/dribblegame/defender/lajie_00010.png',
						'../../../animations/dribblegame/defender/lajie_00011.png',
						'../../../animations/dribblegame/defender/lajie_00012.png',
						'../../../animations/dribblegame/defender/lajie_00013.png',
						'../../../animations/dribblegame/defender/lajie_00014.png',
						'../../../animations/dribblegame/defender/lajie_00015.png',
						'../../../animations/dribblegame/defender/lajie_00016.png',
						'../../../animations/dribblegame/defender/lajie_00017.png',
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
				sf : 15,
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

		run : function () {
			this.moveState.sf = 15;
			this.moveState.vf = -3;
			this.isVisible = true;
		},

		runToDribbler : function (so) {
			var del = so - this.moveState.so;
			this.moveState.vo = del / 0.8;
		},

		update : function (time) {
			this._super(time);

			var dt = 1 / 60;
			var ms = this.moveState;

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
