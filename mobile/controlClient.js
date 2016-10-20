var ControlClient = WSClient.extend({

    init: function (host, port) {
        this._super(host, port);

        this.registed_callback = null;
        this.playerRegisted_callback = null;
        this.gameStart_callback = null;
        this.gameWin_callback = null;
        this.gameLose_callback = null;
        this.gohome_callback = null;

        this.broadcastdata_callback = null;
    },

    regist: function (roomid, clientid) {
        this.send("REGISTCONTROLLER " + roomid + (clientid ? (" " + clientid) : ""));
    },

    registPlayer: function (roomid, clientid, name) {
        if (!name)
            name = "";
        this.send("REGISTPLAYER " + roomid + " " + clientid + " " + name);
    },

    startGame: function (roomid, clientid, game, param) {
        if (!game)
            return;
        this.send("STARTGAME " + roomid + " " + clientid + " " + game + " " + param);
    },

    //	使用该方法发送数据,两端同时收到
    broadcastData: function (data) {
        this.send("BROADCASTDATA " + data);
    },

    receiveMsg: function (cmd, data) {
        if (cmd == "INFO") {
            console.log("System Info: " + data);
            if (data.split(' ')[0] == 'tip') {
                var loading_r = $("#msgcontainer");
                $.FloatingHint_r({
                    id: "successFloatHint",
                    width: "",
                    title: "",
                    corner: 1,
                    closable: false,
                    mark:false,
                    holdTime: 5000,
                    text: loading_r
                });
                //				    alert(data.slice(data.indexOf(' ') + 1));
            }
        } else if (cmd == "CONTROLLERREGISTED") {
            if (this.registed_callback)
                this.registed_callback(data);
        } else if (cmd == "PLAYERREGISTED") {
            if (this.playerRegisted_callback)
                this.playerRegisted_callback(data);
        } else if (cmd == "GO") {
            if (this.gameStart_callback)
                this.gameStart_callback(data);
        } else if (cmd == "WIN") {
            if (this.gameWin_callback)
                this.gameWin_callback(data);
        } else if (cmd == "LOSE") {
            if (this.gameLose_callback)
                this.gameLose_callback(data);
        } else if (cmd == "BROADCASTDATA") {
            if (this.broadcastdata_callback)
                this.broadcastdata_callback(data);
        } else if (cmd == "STARTSCREEN") {
            if (this.gohome_callback)
                this.gohome_callback(data);
        } else
            this._super(cmd, data);
    },

    onRegisted: function (callback) {
        this.registed_callback = callback;
    },

    onPlayerRegisted: function (callback) {
        this.playerRegisted_callback = callback;
    },

    onGameStart: function (callback) {
        this.gameStart_callback = callback;
    },

    onGameWin: function (callback) {
        this.gameWin_callback = callback;
    },

    onGameLose: function (callback) {
        this.gameLose_callback = callback;
    },

    onGoHome: function (callback) {
        this.gohome_callback = callback;
    },

    //	使用该方法接收广播数据
    onBroadcastData: function (callback) {
        this.broadcastdata_callback = callback;
    }
});
