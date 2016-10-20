var ImageFrame = Class.extend({
		init : function (x, y, src) {
			this.x = x;
			this.y = y;
			this.image = null;

			this.onload_callback = null;

			if (typeof src !== "undefined") {
				this.load(src);
			}
		},

		load : function (src) {
			var self = this;

			this.src = src;
			this.isLoaded = false;
			this.image = new Image();
			this.image.src = src;
			this.image.onload = function () {
				self.isLoaded = true;

				if (self.onload_callback)
					self.onload_callback();
			};
		}
	});
