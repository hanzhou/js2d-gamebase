var SyncGameController = GameBase.extend({
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
			}, 20);

			var sphelper = singlePointerHelper;//new SinglePointerHelper(this.canvas);
			sphelper.onStart(function (e) {
				self.lastX = -1;
				self.lastY = -1;

				self.fireStartPos();
			});
			sphelper.onMove(function (e) {
				if (!this.tracking)
					return;

				var can = self.canvas;

				var ratioX = e.posX / can.clientWidth;
				var ratioY = e.posY / can.clientHeight;

				self.line(ratioX * can.width, ratioY * can.height);

				self.fireNewPos(ratioX, ratioY);
			});
			sphelper.onEnd(function (e) {
				//
			});

			this.started = true;
			if (gamestarted_callback)
				gamestarted_callback();
		},

		fireStartPos : function () {
			this.connection.send("CONTROLMSG " + controller.roomid + " " + controller.clientid + " start -1 -1");
		},

		fireNewPos : function (ratioX, ratioY) {

			this.connection.send("CONTROLMSG " + controller.roomid + " " + controller.clientid + " line " + ratioX + " " + ratioY);
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
		},

		blank : function () {
			this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	});

function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x : x - bbox.left * (canvas.width / bbox.width),
		y : y - bbox.top * (canvas.height / bbox.height)
	};
}
