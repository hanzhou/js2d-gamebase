var DribbleGameController = GameBase.extend({
		init : function (canvas, connection) {
			this._super(canvas, connection);

			$('#game_screen').css('background', 'url(../../../images/dribblegame/m_bg.jpg) no-repeat').css('background-size', '100% 100%');

			this.padW = 306 / 640 * window.innerWidth * 1.2;
			this.padH = 306 / 1136 * window.innerHeight * 1.2;
			this.touchPad = new ImageFrame(
					window.innerWidth / 2 - this.padW / 2, 400 / 1136 * window.innerHeight,
					'../../../images/dribblegame/m_touchpad.png');

			this.state = "stand";
		},

		start : function (gamestarted_callback) {
			var self = this;
			$('#game_screen').showLoading();
			var wait = setInterval(function () {

					self.setupTouchListener();

					self.started = true;
					if (gamestarted_callback)
						gamestarted_callback();

					self.tick();

					clearInterval(wait);

				}, 100);
		},

		stop : function () {
			singlePointerHelper.clearAll();

			this._super();
		},

		setupTouchListener : function () {
			var self = this;

			singlePointerHelper.onStart(function (e) {
				self.updateState(e.posX, e.posY);
			});
			singlePointerHelper.onMove(function (e) {
				if (!this.tracking)
					return;

				self.updateState(e.posX, e.posY);
			});
			singlePointerHelper.onEnd(function (e) {
				self.updateCmd("stand");
			});
		},

		updateState : function (x, y) {
			var centerX = this.touchPad.x + this.padW / 2;
			var centerY = this.touchPad.y + this.padH / 2;
			var dx = Math.abs(x - centerX);
			var dy = Math.abs(y - centerY);

			if (x < this.touchPad.x || x > this.touchPad.x + this.padW ||
				y < this.touchPad.y || y > this.touchPad.y + this.padH ||
				dx < this.padW / 8 && dy < this.padH / 8)
				return;

			if (y < centerY && dx < dy) {
				this.updateCmd("up");
			} else if (y > centerY && dx < dy) {
				this.updateCmd("down");
			} else if (x < centerX && dx > dy) {
				this.updateCmd("left");
			} else if (x > centerX && dx > dy) {
				this.updateCmd("right");
			}
		},

		updateCmd : function (cmd) {
			if (this.state == cmd)
				return;
			this.state = cmd;
			console.log("update cmd: " + cmd);
			this.connection.send("CONTROLMSG " + controller.roomid + " " + controller.clientid + " " + cmd);
		},

		draw : function (time) {
			this.ctx.clearRect(0, 0, this.w, this.h);

			this.ctx.drawImage(this.touchPad.image,
				this.touchPad.x, this.touchPad.y, this.padW, this.padH);
			$('#game_screen').hideLoading();
		}

	});
