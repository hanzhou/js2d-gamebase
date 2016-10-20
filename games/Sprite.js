var Sprite = Class.extend({
		init : function (name, length, width, height, srcData) {
			this.name = name;
			this.length = length;
			this.width = width;
			this.height = height;
			this.frames = [];
			
			this.index = 0;

			if (srcData instanceof Array) {
				this.frames = srcData.map(function (src) {
						return new ImageFrame(0, 0, src);
					});
			} else {
				//	not support
			}

			this.reset();
		},

		hasLoaded : function () {
			for (var i = 0; i < this.frames.length; i++) {
				if (!this.frames[i].isLoaded)
					return false;
			}
			return true;
		},

		reset : function ()  {
			this.lastTime = 0;
			this.index = 0;
		},

		tick : function () {
			var i = this.index;

			i = (i < this.length - 1) ? i + 1 : 0;

			if (this.count > 0) {
				if (i === 0) {
					this.count -= 1;
					if (this.count === 0) {
						this.index = 0;
						this.endcount_callback();
						return;
					}
				}
			}
			this.index = i;
		},

		setSpeed : function (speed) {
			this.speed = speed;
		},

		finiteCount : function (count, onEnd) {
			this.count = count;
			this.endcount_callback = onEnd;
		},

		updateFrame : function (time) {
			if ((time - this.lastTime) > this.speed) {
				this.lastTime = time;
				this.tick();
				return true;
			} else {
				return false;
			}
		},

		draw : function (ctx, x, y, w, h) {
			var frame = this.frames[this.index];
			ctx.drawImage(frame.image, x, y, w, h);
		}
	});
