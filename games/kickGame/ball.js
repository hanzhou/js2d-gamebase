var Ball = Entity.extend({
		init : function (posx, posy) {
			this._super();

			var ballSprite = new Sprite("ball", 2, 50, 50, [
						'../../../images/ball.png',
						'../../../images/ball.png',
					]);
			ballSprite.setSpeed(1000);
			this.sprites["ball"] = ballSprite;

			this.startX = posx;
			this.startY = posy;
			this.radius = 20;
			this.forwardDist = 11;
			this.G = 5;

			this.posFunc = function (f, h) {
				return (800 * h + 260 * f) / (f + 2)
			};
			this.scaleFunc = function (f) {
				return 8 / (f + 8);
			}

			this.reset();
			this.updatePos();
		},

		fire : function (initSpeed, direction) {
			var angle = 10 * 2 * Math.PI / 360;
			this.moveState = {
				sf : 0,
				sh : 0,
				so : 0,
				vf : initSpeed * Math.cos(angle) * direction.y,
				vh : initSpeed * Math.sin(angle),
				vo : initSpeed * Math.cos(angle) * direction.x
			};
			this.Fired = true;

			console.log("ball speed\tvf: " + this.moveState.vf + "\tvh: " + this.moveState.vh + "\tvo: " + this.moveState.vo);
		},

		reset : function () {
			this.Fired = false;
			this.moveState = {
				sf : -0.2, //	forward
				sh : 0, //	height
				so : 0, //	offset
				vf : 0, //	forward speed
				vh : 0, //	up speed
				vo : 0 //	offset speed
			};
		},

		updatePos : function () {
			var f = this.moveState.sf;
			var h = this.moveState.sh;
			var o = this.moveState.so;

			var r = this.radius * this.scaleFunc(f);
			this.x = this.startX + this.scaleFunc(f) * o * 142.76 - r;
			this.y = this.startY - this.posFunc(f, h) - r;
			this.w = this.h = 2 * r;
		},

		update : function (time) {
			if (this.Fired) {
				var dt = 1 / 60;
				this.moveState.vh -= this.G * dt;

				this.moveState.sf += this.moveState.vf * dt;
				this.moveState.so += this.moveState.vo * dt;
				this.moveState.sh += this.moveState.vh * dt;

				if (this.moveState.sh <= 0) {
					this.moveState.vh = -this.moveState.vh * 0.5;
					this.moveState.sh = 0;
				}

				//	判断碰撞
				if (this.moveState.sh <= 0.001) {
					this.moveState.vf = this.moveState.vf * 0.8;
					this.moveState.vo = this.moveState.vo * 0.8;
					if (this.moveState.sf >= this.forwardDist) {
						this.moveState.vf = this.moveState.vf * 0.2;
						this.moveState.vo = this.moveState.vo * 0.2;
					}
				}
			}

			this.updatePos();
		},

		draw : function (ctx) {
			this.sprites["ball"].draw(ctx, this.x, this.y, this.w, this.h);
		}
	});
