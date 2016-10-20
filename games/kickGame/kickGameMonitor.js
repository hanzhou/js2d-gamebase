var KickGameMonitor = GameBase.extend({
		init : function (canvas, connection) {
			this._super(canvas, connection);
			$('#game_screen').css('background',
				'url(../../../images/kickgame/d_bg.jpg) no-repeat')
			.css('background-size', '100% 100%');
//			$('.game_bg img').attr('src', '../../../images/kickgame/d_bggame.jpg')
			this.goalkeeper = new Goalkeeper(280, 150, 400, 200);
			this.ball = new Ball(480, 540);

			this.gateHeight = 2.44;
			this.gateWidth = 7.32;

			this.result = null;
			this.roundIndex = 0;
			this.reslist = new Array();

			this.whiteCount = 0;
			this.winCount = 0;
			this.loseCount = 0;
		},

		start : function (gamestarted_callback) {
			$('#game_screen').showLoading();
			var self = this;
			var wait = setInterval(function () {
					if (self.goalkeeper.spritesLoaded() &&
						self.ball.spritesLoaded()) {

						app.soundManager.playKick();

						$("#footballBar").show();
						$("#footballbar").footballbar();
						$("#footballbar").footballbar("clear");

						//	...
						$('#game_screen').hideLoading();

						self.goalkeeper.wait();
						self.goalkeeper.onAnimationEnd(function () {
							//	TODO
							self.postRound();
						});

						self.connection.onControlMsg(function (data) {
							var params = data.split(' ');
							console.log(data);
							if ('fireball' == params[0] && !self.ball.Fired) {
								var force = Math.abs(params[1]) * 15;
								var direction = {
									x : params[2],
									y : params[3]
								};
								self.ball.fire(force, direction);
							}
						});
						self.connection.onBroadcastData(function (data) {
							var params = data.split(' ');
							console.log(data);
							if ('newround' == params[0]) {
								self.goalkeeper.wait();
								self.ball.reset();
								self.roundIndex++;

								$('#winpanel').hide();
							}
						});

						self.started = true;
						this.winCount = 0;
						this.loseCount = 0;
						
						if (gamestarted_callback)
							gamestarted_callback();

						self.tick();

						clearInterval(wait);
					}
				}, 100);
		},

		stop : function () {
			$("#footballBar").hide();

			this._super();
		},

		requestNewRound : function () {
			this.connection.broadcastData(app.roomid + " " + app.clientid + " newround");
		},

		sendResult : function () {
			var score = this.winCount * 10;
			if (this.result == "win") score += 5;
			console.log("win count: " + this.winCount + "\tscore: " + score);
			
			if (this.result == "win")
				this.connection.send("WIN " + app.roomid + " " + app.clientid + " " + score);
			else if (this.result == "lose")
				this.connection.send("LOSE " + app.roomid + " " + app.clientid + " " + score);
			else
				console.log("ERROR game result!");
		},

		checkResult : function () {
			var ball = this.ball;
			var keeper = this.goalkeeper;

			var x1 = Math.max(ball.x, keeper.x);
			var y1 = Math.max(ball.y, keeper.y);
			var x2 = Math.min(ball.x + ball.w, keeper.x + keeper.w);
			var y2 = Math.min(ball.y + ball.h, keeper.y + keeper.h);

			if (x1 >= x2 || y1 >= y2)
				return false;

			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			var w = x2 - x1;
			var h = y2 - y1;
			var keeperSprite = this.goalkeeper.currentSprite;

			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(keeperSprite.frames[keeperSprite.index].image,
				x1 - keeper.x, y1 - keeper.y, w, h, 0, 0, w, h);

			var data = ctx.getImageData(0, 0, w, h).data;

			for (var i = 0; i < data.length; i += 4) {
				if (data[i + 3] != 0)
					return true;
			}
			return false;
		},

		postRound : function () {
			if (!this.goalkeeper.ended || !this.reslist[this.roundIndex])
				return;

			$("#footballbar").footballbar("update", {
				valid : this.reslist[this.roundIndex] == "w"
			});

			if (this.result) {
				this.sendResult();
				this.stop();
			}

			if (this.roundIndex < 4) {
				setTimeout(this.requestNewRound.bind(this), 1000);

				if (this.reslist[this.roundIndex] == "w") {
					app.soundManager.playWin();

					this.whiteCount = 5;
					this.goalkeeper.sad();

					setTimeout(function () {
						$('#winpanel').show();
					}, 90);						//	whiteCount(= 5) * 1/60 = 83.33
					//	新一轮开始时，才会执行 $('#winpanel').hide();
				} else {
					app.soundManager.playFail();

					setTimeout(function () {
						//						$('#winpanel').show();
					}, 90);
				}
			}
		},

		update : function (time) {
			this.goalkeeper.update(time);
			this.ball.update(time);

			var ball = this.ball;
			var ms = this.ball.moveState;
			var gateleft = -this.gateWidth / 2 + 0.1;
			var gateright = this.gateWidth / 2 - 0.1;

			if (!this.reslist[this.roundIndex] && ms.sf >= this.ball.forwardDist - 1) {
				if (ms.sf >= this.ball.forwardDist &&
					(ms.so < gateleft || ms.so > gateright || ms.sh > 2.44)) {
					//	球飞到球门外
					this.reslist[this.roundIndex] = "f";
				} else if (this.checkResult()) {
					//	球被守门员挡住
					ms.vf = -ms.vf * 0.1;
					ms.vo = ms.vo * 0.5;
					ms.vh = 0;
					ms.sf = this.ball.forwardDist - 1;
					this.reslist[this.roundIndex] = "f";
				} else if (ms.sf >= this.ball.forwardDist) {
					this.reslist[this.roundIndex] = "w";
				}

				this.postRound();
			}
			if (this.reslist[this.roundIndex] == "w") {
				if (ms.sf >= this.ball.forwardDist + 1) {
					ms.vf = 0;
					ms.vo = ms.vo * 0.1;
					ms.vh = ms.vh * 0.1;
					ms.sf = this.ball.forwardDist + 0.99;
				}
				if (ms.sh >= this.gateHeight) {
					ms.vh = -ms.vh * 0.5;
				}
			}

			if (!this.result && this.roundIndex >= 2 && this.reslist[this.roundIndex]) {
				// var winCount = 0;
				// var loseCount = 0;
				for (var i = 0; i < this.reslist.length; i++) {
					if (this.reslist[i] == "w")
						this.winCount++;
					if (this.reslist[i] == "f")
						this.loseCount++;
				}
				if (this.winCount >= 3) {
					this.result = "win";
				}
				if (this.loseCount >= 3) {
					this.result = "lose";
				}
				if (this.result && this.goalkeeper.ended) {
					this.sendResult();
					this.stop();
				}
			}

			if ((this.ball.forwardDist - ms.sf) / ms.vf < 0.3 && !this.goalkeeper.judged) {
				if (ms.vo > 12)
					this.goalkeeper.lookRight();
				else if (ms.vo < -12)
					this.goalkeeper.lookLeft();
				else if (ms.vo > 3)
					this.goalkeeper.rushLeft();
				else if (ms.vo < -3)
					this.goalkeeper.rushRight();
				else if (ms.vo > 0.2)
					this.goalkeeper.moveRight();
				else if (ms.vo < -0.2)
					this.goalkeeper.moveLeft();
				else
					this.goalkeeper.stand();
			}
		},

		draw : function (ctx) {
			if (this.whiteCount > 0) {
				ctx.fillStyle = 'rgba(255, 255, 255, 1)';
				ctx.fillRect(0, 0, this.w, this.h);
				this.whiteCount--;
				return;
			}

			this.ctx.clearRect(0, 0, this.w, this.h);

			if (this.ball.moveState.sf >= this.ball.forwardDist - 1) {
				this.ball.draw(ctx);
				this.goalkeeper.draw(ctx);
			} else {
				this.goalkeeper.draw(ctx);
				this.ball.draw(ctx);
			}
		}

	});
