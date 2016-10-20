var JugglePlayer = Entity.extend({
		init : function (x, y, w, h) {
			this._super();

			var waitSprite = new Sprite("player_wait", 1, w, h, [
						'../../../animations/jugglegame/player/wait/dianqiushibai_000.png',
					]);
			waitSprite.setSpeed(1000);
			var startSprite = new Sprite("player_start", 23, w, h, [
						'../../../animations/jugglegame/player/start/dianqiushibai_001.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_002.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_003.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_004.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_005.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_006.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_007.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_008.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_009.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_010.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_011.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_012.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_013.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_014.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_015.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_016.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_017.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_018.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_019.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_020.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_021.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_022.png',
						'../../../animations/jugglegame/player/start/dianqiushibai_023.png',
					]);
			startSprite.setSpeed(40);
			var lflkSprite = new Sprite("player_lflk", 23, w, h, [
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_023.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_024.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_025.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_026.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_027.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_028.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_029.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_030.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_031.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_032.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_033.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_034.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_035.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_036.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_037.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_038.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_039.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_040.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_041.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_042.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_043.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_044.png',
						'../../../animations/jugglegame/player/lf_lk/dianqiushibai_045.png',
					]);
			lflkSprite.setSpeed(40);
			var lklkSprite = new Sprite("player_lklk", 13, w, h, [
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_045.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_046.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_047.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_048.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_049.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_050.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_051.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_052.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_053.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_054.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_055.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_056.png',
						'../../../animations/jugglegame/player/lk_lk/dianqiushibai_057.png',
					]);
			lklkSprite.setSpeed(40);
			var lkrfSprite = new Sprite("player_lkrf", 18, w, h, [
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_057.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_058.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_059.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_060.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_061.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_062.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_063.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_064.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_065.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_066.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_067.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_068.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_069.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_070.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_071.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_072.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_073.png',
						'../../../animations/jugglegame/player/lk_rf/dianqiushibai_074.png',
					]);
			lkrfSprite.setSpeed(40);
			var rfrkSprite = new Sprite("player_rfrk", 16, w, h, [
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_074.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_075.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_076.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_077.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_078.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_079.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_080.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_081.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_082.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_083.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_084.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_085.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_086.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_087.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_088.png',
						'../../../animations/jugglegame/player/rf_rk/dianqiushibai_089.png',
					]);
			rfrkSprite.setSpeed(40);
			var rkrkSprite = new Sprite("player_rkrk", 14, w, h, [
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_089.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_090.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_091.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_092.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_093.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_094.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_095.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_096.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_097.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_098.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_099.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_100.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_101.png',
						'../../../animations/jugglegame/player/rk_rk/dianqiushibai_102.png',
					]);
			rkrkSprite.setSpeed(40);
			// var lklkSprite = new Sprite("player_lklk", 13, w, h, [
			// '../../../animations/jugglegame/player/wait/dianqiushibai_001.png',
			// ]);
			// lklkSprite.setSpeed(100);

			this.sprites["wait"] = waitSprite;
			this.sprites["start"] = startSprite;
			this.sprites["lflk"] = lflkSprite;
			this.sprites["lklk"] = lklkSprite;
			this.sprites["lkrf"] = lkrfSprite;
			this.sprites["rfrk"] = rfrkSprite;
			this.sprites["rkrk"] = rkrkSprite;

			this.x = x;
			this.y = y;

			this.count = 0;
			this.started = false;
			this.needShake = false;
			this.endCallback = null;
		},

		wait : function () {
			var self = this;
			this.currentSprite = this.sprites["wait"];

			this.needShake = true;
		},

		start : function () {
			this.currentSprite = this.sprites["start"];
			this.currentSprite.finiteCount(1, this.lflk.bind(this));

			this.count = -1;
			this.started = true;
			this.needShake = false;
			this.prepareNext(0);
		},

		lflk : function () {
			this.currentSprite = this.sprites["lflk"];
			this.currentSprite.finiteCount(1, this.lklk.bind(this));

			this.prepareNext(0);
		},

		lklk : function () {
			this.currentSprite = this.sprites["lklk"];
			this.currentSprite.finiteCount(1, this.lkrf.bind(this));

			this.prepareNext(0);
		},

		lkrf : function () {
			this.currentSprite = this.sprites["lkrf"];
			this.currentSprite.finiteCount(1, this.rfrk.bind(this));

			this.prepareNext(0);
		},

		rfrk : function () {
			this.currentSprite = this.sprites["rfrk"];
			this.currentSprite.finiteCount(1, this.rkrk.bind(this));

			this.prepareNext(0);
		},

		rkrk : function () {
			this.currentSprite = this.sprites["rkrk"];
			this.currentSprite.finiteCount(1, this.rkrk.bind(this));

			var idleTime = 600;
			if (this.count >= 10) {
				this.currentSprite.setSpeed(80 - (this.count - 10));
				idleTime += (this.count - 10) * 10;
			}
			this.prepareNext(0);
		},

		prepareNext : function (t) {
			var self = this;

			if (this.needShake && this.endCallback) {
				this.endCallback();
				return;
			}

			this.count++;
			this.needShake = false;

			setTimeout(function () {
				self.needShake = true;
			}, t);
		},

		onEnd : function (callback) {
			this.endCallback = callback;
		},

		// update : function (time) {
		// this._super(time);
		// },

		draw : function (ctx) {
			if (!this.currentSprite)
				return;

			var sprite = this.currentSprite;
			sprite.draw(ctx, this.x, this.y, sprite.width, sprite.height);
		}
	});
