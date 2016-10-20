var DribbleGameMonitor = GameBase.extend({
    init: function (canvas, connection) {
        this._super(canvas, connection);

        $('#game_screen').css('background', 'url(../../../images/dribblegame/d_bg.jpg) no-repeat').css('background-size', '100% 100%');
//        $('.game_bg img').attr('src', '../../../images/dribblegame/d_bg.jpg')
        this.dribbler = new Dribbler(480, 0, 210, 270);
        this.defender = new Defender(480, 0, 360, 270);

        this.roundIndex = 0;
        this.result = null;
        this.reslist = new Array(5);
    },

    start: function (gamestarted_callback) {
        var self = this;
        $('#game_screen').showLoading();
        var wait = setInterval(function () {
            if (self.dribbler.spritesLoaded() &&
						self.defender.spritesLoaded()) {

                app.soundManager.playDribble();

                $('.dribbleProgress').show();
                $('#dribbleBg').show();
                $("#uibar3").statusBar({
                    width: 30,
                    height: 240,
                    value: 0,
                    padding: 5,
                    total: 5
                });

                //var winWidth=$(window).width();
                $("#footballpitchAnimate").css({
                    "background-position": "0 " + -1 * $("#footballpitch_dg").width() * 100 / 1920 + "px"
                });
                $("#backgroundAnimate").css({
                    "background-position": "0 " + -1 * $("#backgroundAnimate").width() * 100 / 1920 + "px"
                });
                backgroundAnimate();
                footballpitchAnimate();
                //                        $("#downtimer").downtimer();
                self.started = true;
                if (gamestarted_callback)
                    gamestarted_callback();

                self.connection.onControlMsg(function (data) {
                    self.dribbler.move(data.trim());
                });

                self.defender.run();

                self.tick();

                clearInterval(wait);
            }
        }, 100);
    },

    stop: function () {
        $('.dribbleProgress').hide();
        $('#dribbleBg').show();

        this._super();
    },

    sendResult: function () {
		var score =  this.roundIndex * 5;
		if (this.result == "win") score += 5;
		
        if (this.result == "win")
            this.connection.send("WIN " + app.roomid + " " + app.clientid + " " + score);
        else if (this.result == "lose")
            this.connection.send("LOSE " + app.roomid + " " + app.clientid + " " + score);
        else
            console.log("ERROR game result!");
    },

    update: function (time) {
        var self = this;
        var dms = this.defender.moveState;
        var yms = this.dribbler.moveState;

        this.dribbler.update(time);
        this.defender.update(time);

        this.defender.runToDribbler(yms.so);

        $("#num3").text(this.roundIndex);
        $("#uibar3").statusBar("update", this.roundIndex);

        if (!this.reslist[this.roundIndex]) {
            if (Math.abs(dms.sf - yms.sf) < 0.2 &&
					Math.abs(dms.so - yms.so) < 0.5) {
                this.reslist[this.roundIndex] = "f";
                console.log("round " + this.roundIndex + " : fail");

                this.result = "lose";
                this.sendResult();
                this.stop();
            } else if (dms.sf < yms.sf) {
                this.reslist[this.roundIndex] = "w";
                console.log("round " + this.roundIndex + " : win");

                if (!this.result && this.roundIndex >= 4) {
                    this.result = "win";
                    this.sendResult();
                    this.stop();
                } else {
                    this.defender.isVisible = false;
                    setTimeout(function () {
                        self.roundIndex++;
                        self.defender.run();
                    }, 200);
                }
            }
        }

    },

    draw: function (ctx) {
        ctx.clearRect(0, 0, this.w, this.h);

        var dribblerSF = this.dribbler.moveState.sf;
        var defenderSF = this.defender.moveState.sf;

        if (defenderSF > dribblerSF) {
            this.defender.draw(ctx);
            this.dribbler.draw(ctx);
        } else {
            this.dribbler.draw(ctx);
            this.defender.draw(ctx);
        }
        $('#game_screen').hideLoading();
    }

});

function backgroundAnimate() {
	var winWidth = $("#backgroundAnimate").width();
	var offset = 100 * winWidth / 1920;
	var moveLength = -1 * offset;
	//var moveMaxLength=offset;
	var speed = 5;
	var isForward = true;
	setInterval(function () {

		if (moveLength < -1 * speed) {
			isForward = true;
			moveLength = moveLength + speed;
		} else {
			isForward = false;
			moveLength = -1 * offset;
		}
		//$("#footballpitchAnimate").css({"background-position":"0 "+moveLength/3+"px"});
		$("#backgroundAnimate").css({
			"background-position" : "0 " + moveLength + "px"
		});
	}, 50);
}
function footballpitchAnimate() {
	var winWidth = $("#footballpitchAnimate").width();
	var offset = 100 * winWidth / 1920;
	var moveLength = -1 * offset;
	//var moveMaxLength=offset;
	var speed = 5;
	var isForward = true;
	setInterval(function () {
		moveLength = moveLength + speed;
		$("#footballpitchAnimate").css({
			"background-position" : "0 " + moveLength + "px"
		});
	}, 50);
}
