var GameBase = Class.extend({
		init : function (canvas, connection) {
			this.canvas = canvas;
			this.connection = connection;
			this.ctx = canvas.getContext('2d');

			this.started = false;
			this.handler = 0;
		},

		setSize : function (width, height) {
			this.w = width;
			this.h = height;
			this.canvas.width = width;
			this.canvas.height = height;
		},

		start : function (gamestarted_callback) {},

		stop : function () {
			if (this.handler)
				window.cancelAnimationFrame(this.handler);
			this.handler = 0;
			this.started = false;
		},

		update : function (time) {},

		draw : function (ctx) {},

		tick : function () {
			var time = new Date().getTime();

			if (this.started) {
				this.update(time);
				this.draw(this.ctx);

				this.handler = requestAnimationFrame(this.tick.bind(this));
			}
		}
	});

window.requestAnimationFrame =
	(window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback, element) {
	window.setTimeout(callback, 1000 / 60);
});
