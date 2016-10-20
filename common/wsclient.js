WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;

var WSClient = Class.extend({

		init : function (host, port) {
			this.connection = null;
			this.host = host;
			this.port = port;

			this.onopen_callback = null;
			this.onmsg_callback = null;
			this.onclose_callback = null;
			this.onerror_callback = null;
		},

		connect : function () {
			var self = this;
			var url = "ws://" + this.host + ":" + this.port + "/";

			console.log("[websocket] Connecting to server: " + url);

			if (window.MozWebSocket) {
				this.connection = new MozWebSocket(url);
			} else if (window.WebSocket) {
				this.connection = new WebSocket(url);
			} else {
				console.log("[websocket] Your browser cannot support WebSocket!");
				alert("无法开始游戏，使用右上角的在浏览器打开功能，选择Chrome、火狐浏览器打开试试!");
				//return;
			}

			this.connection.onopen = function (e) {
				console.log("[websocket] Connected to server " + self.host + ":" + self.port);
				if (self.onopen_callback) {
					self.onopen_callback();
				}
			};
			this.connection.onmessage = function (e) {
				//console.log("[websocket] " + e.data);
				var cmd = e.data.split(' ')[0].toUpperCase();
				var data = e.data.slice(e.data.indexOf(' ') + 1);

				self.receiveMsg(cmd, data);
			};
			this.connection.onerror = function (e) {
			    console.log("WebSocket Exception: " + e);			  
			};
			this.connection.onclose = function () {
				console.log('[websocket] Connection closed. state: ' + this.readyState);

				if (self.onclose_callback)
					self.onclose_callback();
				//alert('Connection closed. state: ' + this.readyState);
			};
		},

		send : function (msg) {
			if (this.connection) {
				this.connection.send(msg);
			}
		},

		receiveMsg : function (cmd, data) {
			if (this.onmsg_callback)
				this.onmsg_callback(cmd, data);
		},

		disconnect : function () {
			if (this.connection) {
				this.connection.close();
			}
		},

		onOpen : function (callback) {
			this.onopen_callback = callback;
		},

		onMsg : function (callback) {
			this.onmsg_callback = callback;
		},

		onClose : function (callback) {
			this.onclose_callback = callback;
		},

		onError : function (callback) {
			this.onerror_callback = callback
		}
	});
