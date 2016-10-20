var Entity = Class.extend({
		init : function () {
			this.sprites = {};
			this.currentSprite = null;
			this.isLoaded = false;
		},

		spritesLoaded : function () {
			var self = this;
			var hasLoaded = true;

			Object.keys(this.sprites).forEach(function (key) {
				var spr = self.sprites[key];
				if (spr instanceof Sprite)
					hasLoaded = spr.hasLoaded() && hasLoaded;
			});

			return hasLoaded;
		},

		update : function (time) {
			if (!this.currentSprite)
				return;

			this.currentSprite.updateFrame(time);
		},

		draw : function (ctx) {}
	});
