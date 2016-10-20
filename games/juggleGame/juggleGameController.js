var JuggleGameController = GameBase.extend({
		init : function (canvas, connection) {
			this._super(canvas, connection);

			$('#game_screen').css('background', 'url(../../../images/jugglegame/m_bg2.gif) no-repeat').css('background-size', '100% 100%');

			this.canShake = true;
		},

		start : function (gamestarted_callback) {
			var self = this;			
			var wait = setInterval(function () {
					if (true) {
						// $('#game_screen').add("<button id='shake'>shake</button>").appendTo("#game_screen");
						// var shakeBtn = $('#shake');
						// shakeBtn.css("position", "absolute").css("top", "10px").css("left", "100px")
						// .click(self.shake.bind(self));

						if ((window.DeviceMotionEvent)) {
							window.addEventListener('devicemotion', self.deviceMotionHandler.bind(self), false);
						} else {
							//document.getElementById("dmEvent").innerHTML = "Not supported."
						}

						self.started = true;
						if (gamestarted_callback)
							gamestarted_callback();

						self.tick();

						clearInterval(wait);
					}
				}, 100);
		},

		stop : function () {
			// $('#shake').remove();
			this._super();
		},

		shake : function (a) {
			this.connection.send("CONTROLMSG " + controller.roomid + " " + controller.clientid + " shake "
				 + "x:" + a.x + ",y:" + a.y + ",z:" + a.z);

			if (navigator.vibrate) {
				navigator.vibrate(100);
			}
		},

		deviceMotionHandler : function (eventData) {
			var acceleration = eventData.acceleration;
			var self = this;

			if (this.canShake) {
				if (Math.abs(acceleration.x) > 15 ||
					Math.abs(acceleration.y) > 15 ||
					Math.abs(acceleration.z) > 15) {
					this.canShake = false;
					this.shake(acceleration);

					setTimeout(function () {
						self.canShake = true;
					}, 300);
				}
			}
		}

	});
