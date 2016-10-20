var SinglePointerHelper = Class.extend({
		init : function (canvas, container) {
			var self = this;
			this.canvas = canvas;
			this.container = container ? container : document.body;

			this.tracking = false;
			this.lastX = null;
			this.lastY = null;

			this.start_callback = null;
			this.move_callback = null;
			this.end_callback = null;

			this.canvas.addEventListener("mousedown", function (e) {
				if (self.start_callback)
					self.start_callback({
						data : e,
						posX : e.pageX - self.canvas.offsetLeft,
						posY : e.pageY - self.canvas.offsetTop
					});
				self.tracking = true;
			}, false);
			this.canvas.addEventListener("mousemove", function (e) {
				e.preventDefault();

				this.lastX = e.pageX;
				this.lastY = e.pageY;

				if (self.move_callback)
					self.move_callback({
						data : e,
						posX : this.lastX - self.canvas.offsetLeft,
						posY : this.lastY - self.canvas.offsetTop
					});
			}, false);
			this.canvas.addEventListener("touchstart", function (e) {
				e.preventDefault();
				self.tracking = true;

				if (self.start_callback)
					self.start_callback({
						data : e,
						posX : e.targetTouches[0].pageX - self.canvas.offsetLeft,
						posY : e.targetTouches[0].pageY - self.canvas.offsetTop
					});
			}, false);
			this.canvas.addEventListener("touchmove", function (e) {
				e.preventDefault();

				this.lastX = e.targetTouches[0].pageX;
				this.lastY = e.targetTouches[0].pageY;

				if (self.move_callback)
					self.move_callback({
						data : e,
						posX : this.lastX - self.canvas.offsetLeft,
						posY : this.lastY - self.canvas.offsetTop
					});
			}, true);
			this.canvas.addEventListener("touchend", function (e) {
				e.preventDefault();
				self.tracking = false;

				if (self.end_callback)
					self.end_callback({
						data : e,
						posX : this.lastX - self.canvas.offsetLeft,
						posY : this.lastY - self.canvas.offsetTop
					});
			}, false);

			this.container.addEventListener("mouseup", function (e) {
				self.tracking = false;

				if (self.end_callback)
					self.end_callback({
						data : e,
						posX : this.lastX - self.canvas.offsetLeft,
						posY : this.lastY - self.canvas.offsetTop
					});
			}, false);
			this.container.addEventListener("touchcancel", function (e) {
				e.preventDefault();
				self.tracking = false;

				if (self.end_callback)
					self.end_callback({
						data : e,
						posX : this.lastX - self.canvas.offsetLeft,
						posY : this.lastY - self.canvas.offsetTop
					});
			}, false);
		},

		clearAll : function () {
			this.start_callback = null;
			this.move_callback = null;
			this.end_callback = null;
		},

		onStart : function (callback) {
			this.start_callback = callback;
		},

		onMove : function (callback) {
			this.move_callback = callback;
		},

		onEnd : function (callback) {
			this.end_callback = callback;
		}
	});
