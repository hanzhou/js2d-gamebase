var SoundManager = Class.extend({
    init: function () {
        if (!createjs.Sound.initializeDefaultPlugins())
            return;

        this.isGaming = false;
        this.isPlayingBg = false;

        var manifest = [{
            id: "bg",
            src: "weareone.mp3"
        }, {
            id: "kick",
            src: "kick.mp3"
        }, {
            id: "juggle",
            src: "juggle.mp3"
        }, {
            id: "dribble",
            src: "dribble.mp3"
        }, {
            id: "win",
            src: "win.mp3"
        }, {
            id: "fail",
            src: "fail.mp3"
        }, {
            id: "koushao",
            src: "koushao.mp3"
        }];

        createjs.Sound.alternateExtensions = ["ogg", "wav"];
        createjs.Sound.addEventListener("fileload", this.handleLoad.bind(this));
        createjs.Sound.registerManifest(manifest, "./audio/");
    },

    handleLoad: function (event) {
        console.log("sound loaded: " + event.id + "\t" + event.src);
        if (event.id == "bg") {
            this.bg = createjs.Sound.createInstance("bg");
            this.playBg();
        } else if (event.id == "kick") {
            this.kick = createjs.Sound.createInstance("kick");
        } else if (event.id == "juggle") {
            this.juggle = createjs.Sound.createInstance("juggle");
        } else if (event.id == "dribble") {
            this.dribble = createjs.Sound.createInstance("dribble");
        } else if (event.id == "win") {
            this.win = createjs.Sound.createInstance("win");
        } else if (event.id == "fail") {
            this.fail = createjs.Sound.createInstance("fail");
        } else if (event.id == "koushao") {
            this.koushao = createjs.Sound.createInstance("koushao");
        }
    },

    isGaming: function () {
        //
    },

    disable: function () {
        createjs.Sound.setMute(true);
    },

    enable: function () {
        createjs.Sound.setMute(false);
    },

    playBg: function () {
        if (this.isGaming)
            return;

        if (this.kick)
            this.kick.stop();
        if (this.juggle)
            this.juggle.stop();
        if (this.dribble)
            this.dribble.stop();

        if (this.bg && !this.isPlayingBg) {
            this.bg.play({
                interrupt: createjs.Sound.INTERRUPT_ANY,
                loop: -1
            });
            this.isPlayingBg = true;
        }
    },

    playKick: function () {
        this.isGaming = true;
        this.isPlayingBg = false;

        if (this.bg)
            this.bg.stop();
        if (this.kick)
            this.kick.play({
                interrupt: createjs.Sound.INTERRUPT_ANY,
                loop: -1
            });

    },

    playJuggle: function () {
        this.isGaming = true;
        this.isPlayingBg = false;

        if (this.bg)
            this.bg.stop();
        if (this.juggle)
            this.juggle.play({
                interrupt: createjs.Sound.INTERRUPT_ANY,
                loop: -1
            });

    },

    playDribble: function () {
        this.isGaming = true;
        this.isPlayingBg = false;

        if (this.bg)
            this.bg.stop();
        if (this.dribble)
            this.dribble.play({
                interrupt: createjs.Sound.INTERRUPT_ANY,
                loop: -1
            });

    },

    playWin: function () {
        if (this.win) {
            this.win.play("win");
        }
    },

    playFail: function () {
        if (this.fail) {
            this.fail.play("fail");
        }
    },

    playKouShao: function () {
        if (this.koushao) {
            this.koushao.play("koushao");
        }
    }

});
