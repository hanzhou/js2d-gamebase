var Goalkeeper = Entity.extend({
		init : function (x, y, gw, gh) {
			//	params: gate center, gate width height, guard height, width
			this._super();

			var waitSprite = new Sprite("guard_wait", 41, gw, gh, [
						'../../../animations/kickgame/goalkeeper/wait/puqiu_001.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_002.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_003.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_004.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_005.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_006.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_007.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_008.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_009.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_010.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_011.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_012.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_0013.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_0014.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_0015.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_016.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_017.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_018.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_019.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_020.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_021.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_022.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_023.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_024.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_025.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_026.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_027.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_028.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_029.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_030.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_031.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_032.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_033.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_034.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_035.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_036.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_037.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_038.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_0039.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_040.png',
                        '../../../animations/kickgame/goalkeeper/wait/puqiu_041.png',
					]);
			waitSprite.setSpeed(4500);
			var standSprite = new Sprite("guard_stand", 2, gw, gh, [
						'../../../animations/kickgame/goalkeeper/wait/puqiu_001.png',
						'../../../animations/kickgame/goalkeeper/wait/puqiu_001.png',
					]);
			standSprite.setSpeed(300);
			var rushRightSprite = new Sprite("guard_rright", 26, gw, gh, [
						'../../../animations/kickgame/goalkeeper/rushleft/puqiu_002.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_003.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_004.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_005.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_006.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_007.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_008.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_009.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_010.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_011.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_012.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_013.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_014.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_015.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_016.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_017.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_018.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_019.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_020.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_021.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_022.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_023.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_024.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_025.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_026.png',
                        '../../../animations/kickgame/goalkeeper/rushleft/puqiu_027.png',
					]);
			rushRightSprite.setSpeed(100);
			var rushLeftSprite = new Sprite("guard_rleft", 26, gw, gh, [		
						'../../../animations/kickgame/goalkeeper/rushright/puqiu_001.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_002.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_003.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_004.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_005.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_006.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_007.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_008.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_009.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_010.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_011.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_012.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_013.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_014.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_015.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_016.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_017.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_018.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_019.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_020.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_021.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_022.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_023.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_024.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_025.png',
                        '../../../animations/kickgame/goalkeeper/rushright/puqiu_026.png',
					]);
			rushLeftSprite.setSpeed(100);

			var moveRightSprite = new Sprite("guard_mright", 10, gw, gh, [
						'../../../animations/kickgame/goalkeeper/moveright/New20000.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20001.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20002.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20003.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20004.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20005.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20006.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20007.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20008.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20009.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20010.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20011.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20012.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20013.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20014.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20015.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20016.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20017.png',
//                        '../../../animations/kickgame/goalkeeper/moveright/New20018.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20019.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20020.png',
                        '../../../animations/kickgame/goalkeeper/moveright/New20020.png',
					]);
			moveRightSprite.setSpeed(20);
			var moveLeftSprite = new Sprite("guard_mleft", 10, gw, gh, [
						'../../../animations/kickgame/goalkeeper/moveleft/New20000.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20001.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20002.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20003.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20004.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20005.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20006.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20007.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20008.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20009.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20010.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20011.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20012.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20013.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20014.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20015.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20016.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20017.png',
//                        '../../../animations/kickgame/goalkeeper/moveleft/New20018.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20019.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20020.png',
                        '../../../animations/kickgame/goalkeeper/moveleft/New20020.png',
					]);
			moveLeftSprite.setSpeed(20);

			var lookRightSprite = new Sprite("guard_lright", 2, gw, gh, [
						'../../../animations/kickgame/goalkeeper/lookright/New20000.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20001.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20002.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20003.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20004.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20005.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20006.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20007.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20008.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20009.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20010.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20011.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20012.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20013.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20014.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20015.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20016.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20017.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20018.png',
//                        '../../../animations/kickgame/goalkeeper/lookright/New20019.png',
                        '../../../animations/kickgame/goalkeeper/lookright/New20020.png',
					]);
			lookRightSprite.setSpeed(100);
			var lookLeftSprite = new Sprite("guard_lleft", 2, gw, gh, [
						'../../../animations/kickgame/goalkeeper/lookleft/New200000.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200001.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200002.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200003.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200004.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200005.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200006.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200007.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200008.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200009.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200010.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200011.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200012.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200013.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200014.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200015.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200016.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200017.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200018.png',
//                        '../../../animations/kickgame/goalkeeper/lookleft/New200019.png',
                        '../../../animations/kickgame/goalkeeper/lookleft/New200020.png',
					]);
			lookLeftSprite.setSpeed(100);

			var sadSprite = new Sprite("guard_sad", 86, gw, gh, [
						'../../../animations/kickgame/goalkeeper/jusang/jushang_0000.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0016.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0017.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0018.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0019.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0020.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0021.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0022.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0023.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0024.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0025.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0026.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0027.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0028.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0029.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0030.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0031.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0032.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0033.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0034.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0035.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0036.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0037.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0038.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0039.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0040.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0041.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0042.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0043.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0044.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0045.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0046.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0047.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0048.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0049.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0050.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0051.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0052.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0053.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0054.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0055.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0056.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0057.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0058.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0059.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0060.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0061.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0062.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0063.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0064.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0065.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0066.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0067.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0068.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0069.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0070.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0071.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0072.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0073.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0074.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0075.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0076.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0077.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0078.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0079.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0080.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0081.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0082.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0083.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0084.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0085.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0086.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0087.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0088.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0089.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0090.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0091.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0092.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0093.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0094.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0095.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0096.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0097.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0098.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0099.png',
                        '../../../animations/kickgame/goalkeeper/jusang/jushang_0100.png',

					])
				sadSprite.setSpeed(Number.MAX_VALUE);

			this.sprites["wait"] = waitSprite;
			this.sprites["stand"] = standSprite;
			this.sprites["rright"] = rushRightSprite;
			this.sprites["rleft"] = rushLeftSprite;
			this.sprites["mright"] = moveRightSprite;
			this.sprites["mleft"] = moveLeftSprite;
			this.sprites["lright"] = lookRightSprite;
			this.sprites["lleft"] = lookLeftSprite;
			this.sprites["sad"] = sadSprite;

			this.x = x;
			this.y = y;
			this.w = gw;
			this.h = gh;

			this.endCallback = null;

			this.judged = false;
			this.ended = false;
		},

		wait : function () {
			var self = this;

			if (this.currentSprite == this.sprites["wait"])
				return;
			this.currentSprite = this.sprites["wait"];
			this.currentSprite.setSpeed(70);

			this.judged = false;
			this.ended = false;
			this.reset();
			console.log("goalkeeper wait");

			this.currentSprite.finiteCount(1, function () {
				self.currentSprite.setSpeed(Number.MAX_VALUE);
				// self.currentSprite.index = self.currentSprite.frames.length - 1;
			});
		},

		stand : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["stand"];
			this.currentSprite.setSpeed(300);
			console.log("goalkeeper stand");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		rushRight : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["rright"];
			this.currentSprite.setSpeed(60);
			console.log("goalkeeper rush right");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		rushLeft : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["rleft"];
			this.currentSprite.setSpeed(60);
			console.log("goalkeeper rush left");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		moveRight : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["mright"];
			this.currentSprite.setSpeed(50);
			console.log("goalkeeper move right");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		moveLeft : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["mleft"];
			this.currentSprite.setSpeed(50);
			console.log("goalkeeper move left");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		lookRight : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["lright"];
			this.currentSprite.setSpeed(1000);
			console.log("goalkeeper look right");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		lookLeft : function () {
			var self = this;
			if (this.judged)
				return;

			this.judged = true;
			this.ended = false;
			this.currentSprite = this.sprites["lleft"];
			this.currentSprite.setSpeed(1000);
			console.log("goalkeeper look left");

			this.currentSprite.finiteCount(1, function () {
				self.ended = true;
				self.currentSprite.setSpeed(100000);

				if (self.endCallback)
					self.endCallback();
			});
		},

		sad : function () {
			this.currentSprite = this.sprites["sad"];
		},

		onAnimationEnd : function (callback) {
			this.endCallback = callback;
		},

		// update : function (time) {
		// this._super(time);
		// },

		draw : function (ctx) {
			if (!this.currentSprite)
				return;

			this.currentSprite.draw(ctx, this.x, this.y, this.w, this.h);
		}
	});
