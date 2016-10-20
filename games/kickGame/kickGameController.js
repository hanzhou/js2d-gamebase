var KickGameController = GameBase.extend({
    init: function (canvas, connection) {
        this._super(canvas, connection);

        $('#game_screen').css('background', 'url(../../../images/kickgame/m_bg2.jpg) no-repeat').css('background-size', '100% 100%');

        // this.comment = new ImageFrame(140 / 640 * window.innerWidth, 620 / 1136 * window.innerHeight, '../../../images/kickgame/m_comment.png');
        // this.notice = new ImageFrame(window.innerWidth / 2, window.innerHeight - 80, '../../../images/kickgame/m_notice.png');
        this.shadow = new ImageFrame(window.innerWidth / 2, window.innerHeight - 80, '../../../images/kickgame/m_shadow.png');
        this.ball = new Ball(window.innerWidth / 2, window.innerHeight - 80);
        this.ball.posFunc = function (f, h) {
            //return (200 * h + 400 / 950 * window.innerHeight * f) / (f + 0.282);
            return 142.76 * f / 2;
        };
        this.ball.radius = 60;
        this.ball.scaleFunc = function (f) {
            //return 2 / (f + 2);
            return 4 / (f + 8);
        };

        // this.fireStarted = false;
        this.hasShadow = true;
        this.readyToFire = false;
        this.startTime = -1;
        this.posArr = new Array();

        this.hue = 0;
    },

    start: function (gamestarted_callback) {

        var self = this;
        var wait = setInterval(function () {
            if (self.ball.spritesLoaded()) {
                self.setupTouchListener();

                startKickGameTips();
                document.ontouchstart = function (e) {
                    e.preventDefault();
                };

                self.connection.onBroadcastData(function (data) {
                    var params = data.split(' ');
                    console.log(data);
                    if ('newround' == params[0]) {
                        self.ball.reset();
                        startKickGameTips();
                        // self.fireStarted = false;
                        self.hasShadow = true;

                        $('#fireball').hide();
                    }
                });

                self.started = true;
                if (gamestarted_callback)
                    gamestarted_callback();

                self.tick();

                clearInterval(wait);
            }
        }, 100);
    },

    stop: function () {
        $('#kickgametips').hide();
        $('#fireball').hide();
        document.ontouchstart = null;

        this._super();
    },

    setupTouchListener: function () {
        var self = this;
        var sphelper = singlePointerHelper;
        var startTime = -1;

        sphelper.onStart(function (e) {

            if (e.posY > window.innerHeight / 2) {
                self.readyToFire = true;
                self.posArr.push({
                    x: e.posX,
                    y: e.posY
                });
                startTime = new Date().getTime();
                console.log('start in position: X = ' + e.posX + ", Y = " + e.posY);
            }
        });
        sphelper.onMove(function (e) {
            if (!this.tracking)
                return;

            if (self.readyToFire) {
                self.posArr.push({
                    x: e.posX,
                    y: e.posY
                });
            }
        });
        sphelper.onEnd(function (e) {
            if (!self.readyToFire)
                return;
            self.readyToFire = false;
            self.posArr.push({
                x: e.posX,
                y: e.posY
            });

            var startPos = self.posArr[0];
            var endPos = self.posArr[self.posArr.length - 1];
            var endTime = new Date().getTime();

            setTimeout(function () {
                self.posArr.length = 0;
            }, 100);

            // if (self.fireStarted)
            // return;

            self.fireBall(endTime - startTime, startPos, endPos);

            setTimeout(function () {
                //				    $('#kickandsee').show();
                closeTip();
                var amode = controller.mode;
                if (amode == "offline") {
                    $.FloatingHint({
                        id: "fireball",
                        width: "80%",
                        height: "120",
                        title: "",
                        corner: 1,
                        closable: false,
                        mask: false,
                        holdTime: 30000,
                        text: "<div class='kick' style='padding:20px;color:#FFF700'>请看大屏幕，双屏互动，完成挑战！</div>"
                    });
                }
                else {
                    $.FloatingHint({
                        id: "fireball",
                        width: "80%",
                        height: "120",
                        title: "",
                        corner: 1,
                        closable: false,
                        mask: false,
                        holdTime: 30000,
                        text: "<div class='kick' style='padding:20px;color:#FFF700'>请看前方PC屏幕，双屏互动，完成挑战！</div>"
                    });
                }
            }, 200);

            //self.fireStarted = true;
        });
    },

    fireBall: function (deltime, startPos, endPos) {
        var self = this;
        var dx = endPos.x - startPos.x;
        var dy = -(endPos.y - startPos.y);
        if (isNaN(dx) || isNaN(dy) || dy <= 1)
            return;
        if (dx > 1.5 * dy)
            dx = 1.5 * dy;
        if (dx < -1.5 * dy)
            dx = -1.5 * dy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var force = dist / deltime * 1.5;
        if (force < 1.5)
            force = 1.5;
        if (force > 4)
            force = 4;
        this.connection.send("CONTROLMSG " + controller.roomid + " " + controller.clientid + " fireball " + force + " " + dx / dist + " " + dy / dist);
        this.ball.fire(force * 10, {
            x: dx / dist,
            y: dy / dist
        });

        setTimeout(function () {
            self.hasShadow = false;
        }, 100);
    },

    update: function (time) {
        this.ball.update(time);
    },

    draw: function (ctx) {
        ctx.clearRect(0, 0, this.w, this.h);

        if (this.hasShadow) {
            var s_w = this.shadow.image.width / 640 * window.innerWidth * 2;
            var s_h = this.shadow.image.height / 1136 * window.innerHeight * 2;
            ctx.drawImage(this.shadow.image, this.shadow.x - s_w / 2, this.shadow.y + this.ball.w * 0.5, s_w, s_h);
        }

        this.ball.draw(ctx);

        if (this.posArr && this.posArr.length > 1) {
            this.drawPath(ctx, this.posArr);
        }
    },

    drawPath: function (ctx, posArray) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 5; // + Math.random() * 10;
        ctx.moveTo(posArray[0].x, posArray[0].y);
        for (var i = 1; i < posArray.length; i++) {
            ctx.lineTo(posArray[i].x, posArray[i].y);
        }
        this.hue = this.hue + 10 * Math.random();
        ctx.strokeStyle = 'hsl(' + this.hue + ', 50%, 50%)';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

    }
});
