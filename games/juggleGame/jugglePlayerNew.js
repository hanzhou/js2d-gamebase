var JugglePlayerNew = Entity.extend({
		init : function (x, y, w, h) {
			this._super();

			var waitSprite = new Sprite("player_wait", 1, w, h, [
						'../../../animations/jugglegame/player/rk_rf/dianqiushibai_128.png',
					]);
			waitSprite.setSpeed(1000);
			var rSprite = new Sprite("player_r", 14, w, h, [
						'../../../animations/jugglegame/player/rk_rf/dianqiushibai_128.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_127.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_126.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_125.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_124.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_123.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_122.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_121.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_120.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_119.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_118.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_117.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_116.png',					
                        '../../../animations/jugglegame/player/rk_rf/dianqiushibai_115.png',					

					]);
			rSprite.setSpeed(60);

			this.sprites["wait"] = waitSprite;
			this.sprites["r"] = rSprite;

			this.x = x;
			this.y = y;

			this.count = 0;
			this.started = false;
			this.needShake = false;
			this.roundTime = 0;
			this.endCallback = null;
		},

		wait : function () {
			var self = this;
			this.currentSprite = this.sprites["wait"];

			this.needShake = true;
		},

		start : function () {
			this.currentSprite = this.sprites["r"];
			this.currentSprite.finiteCount(1, this.r.bind(this));

			this.count = -1;
			this.started = true;
			this.needShake = false;
			this.prepareNext(0);
		},

		r : function () {
			this.currentSprite = this.sprites["r"];
			this.currentSprite.finiteCount(1, this.r.bind(this));

			// if (this.count >= 10) {
			// this.currentSprite.setSpeed(60 - (this.count - 10));
			// }

			this.prepareNext(0);
		},

		prepareNext : function (t) {
			this.roundTime = new Date().getTime();

			if (this.needShake && this.endCallback) {
				this.endCallback();
				return;
			}

			this.count++;
			this.needShake = true;

			// setTimeout(function () {
			// self.needShake = true;
			// }, t);
		},

		shake : function () {
			this.needShake = false;
			var time = new Date().getTime();
			var rate = (time - this.roundTime) / (14 * 60);

			this.currentSprite.setSpeed(40 + 40 * rate);
		},

		onEnd : function (callback) {
			this.endCallback = callback;
		},

		draw : function (ctx) {
			if (!this.currentSprite)
				return;

			var sprite = this.currentSprite;
			sprite.draw(ctx, this.x, this.y, sprite.width, sprite.height);
		}
	});
