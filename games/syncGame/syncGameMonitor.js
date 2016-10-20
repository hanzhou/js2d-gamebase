var SyncGameMonitor = GameBase.extend({
		init : function (canvas, connection) {
			this._super(canvas, connection);
			this.hue = 0;
			this.lastX = -1;
			this.lastY = -1;
		},

		start : function (gamestarted_callback) {
			var self = this;

			setInterval(function () {
				self.blank();
			}, 40);

			this.connection.onControlMsg(function (data) {
				var params = data.split(' ');
				if ('start' == params[0]) {
					self.lastX = -1;
					self.lastY = -1;
				} else if ('line' == params[0]) {
					self.line(params[1] * self.canvas.width, params[2] * self.canvas.height);
				}
			});

			this.started = true;
			if (gamestarted_callback)
				gamestarted_callback();
		},

		blank : function () {
			this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		},

		line : function (x, y) {
			if (this.lastX == -1 && this.lastY == -1) {
				this.lastX = x;
				this.lastY = y;
				return;
			}
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.lineWidth = 5; // + Math.random() * 10;
			this.ctx.moveTo(this.lastX, this.lastY);
			this.ctx.lineTo(x, y);
			this.lastX = x;
			this.lastY = y;
			this.hue = this.hue + 10 * Math.random();
			this.ctx.strokeStyle = 'hsl(' + this.hue + ', 50%, 50%)';
			this.ctx.shadowColor = 'white';
			this.ctx.shadowBlur = 10;
			this.ctx.stroke();
			this.ctx.restore();
		}
	});
