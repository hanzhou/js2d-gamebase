var JuggleGameMonitor = GameBase.extend({
    init: function (canvas, connection) {
        this._super(canvas, connection);

        $('#game_screen').css('background', 'url(../../../images/jugglegame/d_bg.jpg) no-repeat').css('background-size', '100% 100%');
//        $('.game_bg img').attr('src', '../../../images/jugglegame/d_bg.jpg')
        this.notice = new ImageFrame(650, 450, '../../../images/jugglegame/d_notice.png');
        this.player = new JugglePlayerNew(375, 130, 300 * 0.7, 500 * 0.7);

        this.started = false;
        this.result = null;

        this.timeHandler = 0;
        this.time = 0;
    },

    start: function (gamestarted_callback) {
        var self = this;
        $('#game_screen').showLoading();
        var wait = setInterval(function () {
            if (self.player.spritesLoaded()) {

                app.soundManager.playJuggle();

                $('.juggleProgress').show();
                $("#uibar1").statusBar({
                    width: 30,
                    height: 240,
                    value: 0,
                    padding: 5,
                    total: 60
                });
                $("#uibar2").statusBar({
                    width: 30,
                    height: 240,
                    value: 0,
                    padding: 8,
                    total: 30
                });

                self.started = true;
                if (gamestarted_callback)
                    gamestarted_callback();

                self.player.wait();
                self.player.onEnd(function () {
                    if (!this.result) {
                        self.result = 'lose';
                        self.sendResult();
                        self.stop();
                    }
                });

                self.connection.onControlMsg(function (data) {
                    var params = data.split(' ');
                    console.log(data);
                    if ('shake' == params[0]) {
                        if (!self.player.started) {
                            self.player.start();

                            self.timeHandler = setTimeout(self.updateTime.bind(self), 1000);
                        }
                        self.player.shake();
                    };
                });

                self.tick();

                clearInterval(wait);
            }
        }, 100);
    },

    stop: function () {
        $('.juggleProgress').hide();
        clearTimeout(this.timeHandler);

        this._super();
    },

    updateTime: function () {
        if (this.time <= 60) {
            $("#num1").text(this.time);
            $("#uibar1").statusBar("update", this.time);
        }
        this.time++;

        this.timeHandler = setTimeout(this.updateTime.bind(this), 1000)
    },

    sendResult: function () {
		var score = this.player.count * 5;
		if (this.result == "win") score += 5;
		
        if (this.result == "win")
            this.connection.send("WIN " + app.roomid + " " + app.clientid + " " + score);
        else if (this.result == "lose")
            this.connection.send("LOSE " + app.roomid + " " + app.clientid + " " + score);
        else
            console.log("ERROR game result!");
    },

    update: function (time) {
        this.player.update(time);
        $("#num2").text(this.player.count);
        $("#uibar2").statusBar("update", this.player.count);

        if (!this.result && this.player.count >= 30) {
            this.result = 'win';
            this.sendResult();
            this.stop();
        }
    },

    draw: function (ctx) {
        ctx.clearRect(0, 0, this.w, this.h);

        this.player.draw(ctx);

        if (this.player.needShake) {
            var notice_w = this.notice.image.width; // / 960 * window.innerWidth;
            var notice_h = this.notice.image.height; // / 540 * window.innerHeight;
            ctx.drawImage(this.notice.image, this.notice.x - notice_w / 2, this.notice.y - notice_h, notice_w, notice_h);
        }
        $('#game_screen').hideLoading();
    }

});
