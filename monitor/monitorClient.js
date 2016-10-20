var MonitorClient = WSClient.extend({
		init : function (host, port) {
			this._super(host, port);

			this.registed_callback = null;
			this.controlRegisted_callback = null;
			this.playerRegisted_callback = null;
			this.controlMsg_callback = null;
			this.gameStart_callback = null;
			this.gameWin_callback = null;
			this.gameLose_callback = null;
			this.gohome_callback = null;
			this.roomExpired_callback = null;

			this.broadcastdata_callback = null;
		},

		registMonitor : function (mode, roomid) {
			this.send("registmonitor " + mode + (roomid ? (" " + roomid) : ""));
		},

		//	使用该方法发送数据,两端同时收到
		broadcastData : function (data) {
			this.send("BROADCASTDATA " + data);
		},

		receiveMsg : function (cmd, data) {
			if (cmd == "INFO") {
				console.log("System Info: " + data);
				if (data.split(' ')[0] == 'tip') {
					if (app.mode == "online") {
						alert(data.slice(data.indexOf(' ') + 1));
					}
				}
			} else if (cmd == "MONITORREGISTED") {
				if (this.registed_callback)
					this.registed_callback(data);
			} else if (cmd == "ROOMEXPIRED") {
				if (this.roomExpired_callback)
					this.roomExpired_callback(data);
			} else if (cmd == "CONTROLLERREGISTED") {
				if (this.controlRegisted_callback)
					this.controlRegisted_callback(data);
			} else if (cmd == "PLAYERREGISTED") {
				if (this.playerRegisted_callback)
					this.playerRegisted_callback(data);
			} else if (cmd == "CONTROLMSG") {
				if (this.controlMsg_callback)
					this.controlMsg_callback(data);
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
			} else {
				this._super(cmd, data);
			}

			if (cmd !== "CONTROLMSG") {
				console.log(cmd + ": " + data);
			}
		},

		onRegisted : function (callback) {
			this.registed_callback = callback;
		},

		onRoomExpired : function (callback) {
			this.roomExpired_callback = callback;
		},

		onControlRegisted : function (callback) {
			this.controlRegisted_callback = callback;
		},

		onPlayerRegisted : function (callback) {
			this.playerRegisted_callback = callback;
		},

		onGameStart : function (callback) {
			this.gameStart_callback = callback;
		},

		onControlMsg : function (callback) {
			this.controlMsg_callback = callback;
		},

		onGameWin : function (callback) {
			this.gameWin_callback = callback;
		},

		onGameLose : function (callback) {
			this.gameLose_callback = callback;
		},

		onGoHome : function (callback) {
			this.gohome_callback = callback;
		},

		//	使用该方法接收广播数据
		onBroadcastData : function (callback) {
			this.broadcastdata_callback = callback;
		}
	});
