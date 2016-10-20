var controller = {
	roomid : "",
	clientid : "",
	gameName : "",
	game : null,
	mode : "offline",
	username : ""
};

if (!window.console)
	window.console = {};
if (!window.console.log)
	window.console.log = function () {};

var singlePointerHelper = null;
var wsclient = new ControlClient(window.location.hostname, 8086);
var tipprogress = null; //求的轨迹

$(function () {
    //	注册手机端，和用户操作无关的可以提前
    controller.roomid = $.getUrlParam("roomid");
    controller.username = $.getUrlParam("username");
    if ($.getUrlParam("clientid") != null) {
        setCookie("clientid", $.getUrlParam("clientid"));
    }
    controller.clientid = getCookie("clientid");
    controller.mode = getCookie("mode");

    wsclient.onOpen(function () {
        //	刷新浏览器后，id 已存在，不需要再次注册
        if (controller.clientid &&
			controller.mode) {
            //alert("clientid: " + controller.clientid + "\nmode: " + controller.mode);
        }

        wsclient.regist(controller.roomid, controller.clientid);
    });
    wsclient.connect();

    ///////////////////////////////////////////
    //	3s 后或者获取到 clientID 后显示开始游戏。尝试解决问题
    //	获取不到 clientid 可以说明不支持 WebSocket，这时 alert 信息起作用
    //	3s 内获取到了，说明 WebSocket 支持和通讯都没有问题
    wsclient.onRegisted(function (data) {
        var params = data.split(' ');
        controller.clientid = params[0];
        controller.mode = params[1];
        setCookie("clientid", controller.clientid);
        setCookie("mode", controller.mode);
        showPlayBtn();
    });
    //    setTimeout(showPlayBtn, 3000);
    showTipAnimate();
    tipprogress = setInterval(function () {
        showTipAnimate();
    }, 4000);
    $(".input_bt").focus(function () {
        if ($(this).val() == "请输入您的名称") {
            $(this).val("")
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("请输入您的名称")
        }
    });
    $(".input_ph").focus(function () {
        if ($(this).val() == "请输入您的手机号") {
            $(this).val("")
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("请输入您的手机号")
        }
    });

    function showPlayBtn() {
        $('#registPlayer').on("click", function () {
            if (controller.clientid == '') {
                $.FloatingHint({
                    id: "playerfailure",
                    width: "",
                    title: "失败",
                    corner: 5,
                    holdTime: 8000,
                    text: "手机未注册成功，从新扫码登录吧。"
                });
            }
            console.log("showPlayBtn ok");
            console.log(controller.clientid);
            console.log(controller.roomid);
            var flg = true;
            //判断为线下模式直接随机开始游戏
            if (controller.mode == "offline") {
                //	TODO 这里最好能判断用户名是否为空
                if ($(".input_bt").val() != "" && $(".input_bt").val() != "请输入您的名称") {
                    controller.username = $(".input_bt").val();
                } else {
                    $.FloatingHint({
                        id: "usernameempty",
                        width: "",
                        title: "提示",
                        corner: 5,
                        holdTime: 8000,
                        text: "请输入用户名"
                    });
                    flg = false;
                    return;
                }
                if ($(".input_ph").val() != "" && $(".input_ph").val() != "请输入您的手机号") {
                    controller.mobilePhone = $(".input_ph").val();
                } else {
                    $.FloatingHint({
                        id: "mobilePhoneempty",
                        width: "",
                        title: "提示",
                        corner: 5,
                        holdTime: 8000,
                        text: "请输入手机号"
                    });
                    flg = false;
                    return;
                }
                if (flg) {
                    $("#win_name").html(controller.username.substr(0, 3));
                    $(".chooseHead .chooseHName span").html(controller.username.substr(0, 3));
                    wsclient.registPlayer(controller.roomid, controller.clientid, controller.username);
                    $(".chooseHead").show(); //打开公共积分头部
                }
                $(".jumpBM").hide();

            } else {
                console.log("不该走这里");
                wsclient.registPlayer(controller.roomid, controller.clientid, "");
                $(".chooseHead").show(); //打开公共积分头部
                $("#choose_screen").hide();
                $(".kickGame").click();

                $("#tryAgain_img").css("margin-top", "3%");
                $("#returnFirst_img").css("margin-top", "1%");
                $("#Img2").css("margin-top", "1%");
            }
        });
        if (controller.mode == "offline") {
            //开始游戏界面
//            $(".input_bt").show();
//            $(".input_ph").show();
            //右上角重新开始游戏按钮隐藏
            $("#bar").hide();
        }
    }
});
window.onload = function onLoad() {
    $(".dialaog_mark").hide();
    initUI();
    //$('body').height(window.innerHeihgt);
    var canvas = document.getElementById('canvas');
    var gameScreen = document.getElementById('game_screen');
    singlePointerHelper = new SinglePointerHelper(canvas, gameScreen);

    wsclient.onPlayerRegisted(function (data) {
        var playername = data;
        controller.username = data;
        console.log(data);
        // -----------------新需求是，线下游戏需要选择界面-----------------
        // if (controller.mode == "offline") {
        // //	线下游戏不需要切换屏幕
        // return;
        // }

        hideAllScreen();
        $('#choose_screen').fadeIn("slow");
    });
    wsclient.onGameStart(function (data) {
        $(".dialaog_mark").hide();
        console.log("onGameStart ok");
        var params = data.split(' ');
        var gamename = params[0].trim();
        controller.gameName = gamename;

        if (controller.game)
            controller.game.stop();
        var srcPath = "../../images/loading/";
        var cimages = [srcPath + "time03.png", srcPath + "time02.png", srcPath + "time01.png", srcPath + "time00.png"];

        switch (gamename) {

            case "kickGame":
                gameNowGz = 2;
                startKickGameTips();
                //                var obj = $("#game_screen");
                //                obj.addEventListener('touchstart', function (event) {
                //                     如果这个元素的位置内只有一个手指的话
                //                    stopKickGameTips();
                //                }, false);
                controller.game = new KickGameController(canvas, wsclient);
                //                cimages = [srcPath + "sm_3.png", srcPath + "sm_2.png", srcPath + "sm_1.png", srcPath + "sm_0.png"];
                $("#img_loading_screen").attr("src", "../../images/kickgame/m_bg.jpg");
                $('#index').val(2);
                break;
            case "juggleGame":
                gameNowGz = 1;
                controller.game = new JuggleGameController(canvas, wsclient);
                //                cimages = [srcPath + "dq_3.png", srcPath + "dq_2.png", srcPath + "dq_1.png", srcPath + "dq_0.png"];
                $("#img_loading_screen").attr("src", "../../images/jugglegame/m_bg2.jpg");
                $('#index').val(1);
                break;
            case "dribbleGame":
                gameNowGz = 3;
                controller.game = new DribbleGameController(canvas, wsclient);
                //                cimages = [srcPath + "gr_3.png", srcPath + "gr_2.png", srcPath + "gr_1.png", srcPath + "gr_0.png"];
                $("#img_loading_screen").attr("src", "../../images/dribblegame/m_bg.jpg");
                $('#index').val(3);
                break;
        }
        controller.game.setSize(window.innerWidth, window.innerHeight);
        console.log(params[1]);
        if (params[1] == "new") {
            hideAllScreen();
            $('#loading_screen').fadeIn("slow");
            $("#downtimer").downtimer({
                width: 200,
                height: 200,
                top: "50%",
                imgs: cimages,
                callback: function () {
                    countertimeback();
                }
            });
        } else if (params[1] == "replay") {
            hideAllScreen();
            $('#loading_screen').fadeIn("slow");
            $("#downtimer").downtimer({
                width: 200,
                height: 200,
                top: "50%",
                imgs: cimages,
                callback: function () {
                    countertimeback();
                }
            });

        }
    });
    wsclient.onGameWin(function (score) {
        var gameNowGz = 0;
        $(".dialaog_mark").hide();
        var _openId = $('#openidHid').val();
        var _gameId = $('#gameidHid').val();
        var _roomId = controller.roomid;
        var _activityId = 1;
        //提交成绩
        insertScore(_openId, _gameId, _roomId, score, _activityId);
        
        console.log("controller score: " + score);
        hideAllScreen();
        $('#win_screen').fadeIn("slow");
        controller.game.stop();
        wsclient.onBroadcastData(function (result) {
            if (result != -1) {
                var data = eval("(" + result + ")");
                if (controller.mode == "offline") { //如果是线下，清楚一些部位的显
                    $("#win_name").html(controller.username.substr(0, 3));
                    $("#win_name").show();
                }
            } else {
                var html = '<li class="li1">很抱歉，您还没有登陆</li>' +
					'<li class="li1">请登录再来，感谢支持。</li>' +
					'<li class="li1">&nbsp;</li><li class="li1">&nbsp;</li>';
                $("#win_bottom ul").html(html);
                $("#win_screen .menu_img").attr("src", "images/win/m_win_bg.jpg");
            }
        });
    });
    wsclient.onGameLose(function (data) {
        var gameNowGz = 0;
        $(".dialaog_mark").hide();
        var _openId = $('#openidHid').val();
        var _gameId = $('#gameidHid').val();
        var _roomId = controller.roomid;
        var _activityId = 1;
        //提交成绩
        insertScore(_openId, _gameId, _roomId, data, _activityId);
       
        hideAllScreen();
        $('#lose_screen').fadeIn("slow");
        controller.game.stop();
        console.log("controller score: " + data);
    });

    wsclient.onGoHome(function () {
        var gameNowGz = 0;
        $(".dialaog_mark").hide();
        //	TODO 这里回到开始屏幕
        //	注意：在输赢界面，PC和手机端不做任何处理，只等待该指令
        hideAllScreen();
        $(".chooseHead").fadeOut("slow");
        $('#start_screen').fadeIn("slow");
    });

    $('.kickGame').click(function () {
        //        $.FloatingHint({
        //            id: "kickGameTip",
        //            width: "70%",
        //            title: "射门提醒",
        //            corner: 5,
        //            holdTime: 3000,
        //            text: "暂未开放！"
        //        });
        wsclient.startGame(controller.roomid, controller.clientid, "kickGame", "new");
    });
    $('.juggleGame').click(function () {
        wsclient.startGame(controller.roomid, controller.clientid, "juggleGame", "new");
    });
    $('.dribbleGame').click(function () {
        wsclient.startGame(controller.roomid, controller.clientid, "dribbleGame", "new");
    });
    $(".chooseHead .chooseHBack").click(function () {
        var gameNowGz = 0;
        $(".dialaog_mark").hide();
        wsclient.registPlayer(controller.roomid, controller.clientid, controller.username);
    });
    $('.playagain').click(function () {
        $(".dialaog_mark").hide();
        wsclient.startGame(controller.roomid, controller.clientid, controller.gameName, "replay");
    });
    $('.returnhome,.return_lose').click(function () {
        var gameNowGz = 0;
        $(".dialaog_mark").hide();
        //	回到首页
        //		hideAllScreen();
        //        $(".chooseHead").fadeOut("slow");
        //        $('#start_screen').fadeIn("slow");
        wsclient.registPlayer(controller.roomid, controller.clientid, controller.username);
    });
}

function setShare(name, pic) {
    share_weibo_msg = "收集球星卡，玩转世界杯！我在网易球星卡双屏互动游戏挑战成功，获得了" + name + "球星卡，快来一起玩，千万大奖100%有你份！心动不如行动，还等什么，马上参加：http://2014.163.com/card";
    share_weibo_pic = pic;
}

function initUI() {
	$(".choose_bt img").on("touchstart", function () {
		$(this).className = "gamebtn_after";
	});
	$(".choose_bt img").on("touchend", function () {
		$(this).className = "gamebtn";
	});
	$('#choose_screen').on('touchcancel', function () {
		$(this).className = "gamebtn";
	});
}

function getCountry(pid) {
	switch (pid.substring(0, 2)) {
	case ("ES"):
		return "西班牙"
		break;
	case ("BR"):
		return "巴西";
		break;
	case ("DE"):
		return "德国";
		break;
	case ("IT"):
		return "意大利"
		break;
	case ("AR"):
		return "阿根廷";
		break;
	case ("NL"):
		return "荷兰";
		break;
	case ("UK"):
		return "英格兰"
		break;
	case ("PT"):
		return "葡萄牙"
		break;
	case ("FR"):
		return "法国";
		break;
	case ("BE"):
		return "比利时";
		break;
	case ("UY"):
		return "乌拉圭";
		break;
	case ("HR"):
		return "克罗地亚"
		break;
	case ("CL"):
		return "智利";
		break;
	case ("JP"):
		return "日本";
		break;
	case ("KP"):
		return "韩国"
		break;
	case ("YX"):
		return "群英队";
		break;
	default:
	}
}
function hideAllScreen() {
	$('#start_screen').fadeOut("fast");
	$('#choose_screen').fadeOut("fast");
	$('#loading_screen').fadeOut("fast");
	$('#game_screen').fadeOut("fast");
	$('#win_screen').fadeOut("fast");
	$('#lose_screen').fadeOut("fast");
}
//选择界面
function onChange(n) {
	var img = document.getElementById("gamebtn" + n);
	img.src = "images/choose/m_option" + n + n + ".png";
	img.style.width = "94%";
}
//点球动画轨迹动画
function showTipAnimate() {
	$("#hand").delay(300).fadeIn(200).delay(300).animate({
		"bottom" : '+=40',
		"left" : '-=20'
	}, 100).animate({
		"bottom" : '+=40',
		"left" : '-=10'
	}, 100).animate({
		"bottom" : '+=30',
		"left" : '+=10'
	}, 75).animate({
		"bottom" : '+=40',
		"left" : '+=15',
		opacity : '-=1'
	}, 75, function () {
		$(this).removeAttr("style");
	});
	$("#touch").delay(400).fadeIn(400).delay(1000).fadeOut(300, function () {
		$(this).removeAttr("style");
	});
	$("#pointarrow").delay(800).fadeIn(800).fadeOut(1200, function () {
		$(this).removeAttr("style");
	});
	$("#desc").delay(300).fadeIn(600).delay(1000).fadeOut(600);
}

//游戏选择
function chooseChange(n) {
	n.className = "gamebtn_after";
}
function chooseBack(n) {
	n.className = "gamebtn";
}
function startKickGameTips() {
	$("#kickgametips").show();
	$("#kickgametips").on("touchmove", function () {
		closeTip();
	});
	$("#kickgametips").on("touchend", function () {
		closeTip();
	});
	$("#kickgametips").on("touchcancel", function () {
		closeTip();
	});
	showTipAnimate();
	tipprogress = setInterval(function () {
			showTipAnimate();
		}, 4000);
}
//关闭轨迹动画
function closeTip() {
	if (tipprogress) {
		clearInterval(tipprogress);
		tipprogress = null;
	}
	$(".handTouch").hide();
}
function showTipAnimate() {
	$("#hand").fadeIn(0).delay(300).animate({
		"bottom" : '+=50',
		"left" : '-=20'
	}, 100).animate({
		"bottom" : '+=50',
		"left" : '-=10'
	}, 100).animate({
		"bottom" : '+=50',
		"left" : '+=10'
	}, 75).animate({
		"bottom" : '+=50',
		"left" : '+=20',
		opacity : '-=1'
	}, 75, function () {
		$(this).removeAttr("style");
	});
	$("#touch").delay(300).css("opacity", 1).fadeIn(0).animate({
		"bottom" : '+=40',
		"left" : '-=10'
	}, 100).animate({
		"bottom" : '+=40',
		"left" : '-=10'
	}, 100).animate({
		"bottom" : '+=40',
		"left" : '+=10'
	}, 100).animate({
		"bottom" : '+=30',
		"left" : '+=15',
		opacity : '-=1'
	}, 100, function () {
		$(this).removeAttr("style");
		$(this).hide();
	});
	//$("#touch").delay(360).fadeIn(200).delay(240).fadeOut(300,function(){$(this).removeAttr("style");});
	$("#pointarrow").delay(200).fadeIn(800).fadeOut(1200, function () {
		$(this).removeAttr("style");
	});
	$("#desc").fadeIn(600).delay(1000).fadeOut(600);
}
function countertimeback() {
	hideAllScreen();
	$('#game_screen').fadeIn("slow");
	controller.game.start();
	if (controller.gameName == "kickGame") {}
	else if (controller.gameName == "juggleGame") {
		$.FloatingHint({
			id : "successFloatHint",
			width : "",
			title : "摇一摇",
			corner : 5,
			holdTime : 3000,
			text : "30秒颠20个球战胜<br />对手，汉子挺30秒！"
		});
	} else if (controller.gameName == "dribbleGame") {
		//        $.FloatingHint({ id: "successFloatHint", width: "", title: "左右晃一晃", corner: 5, holdTime: 3000, text: "过5人就胜利！" });
	}
}

function setCookie(name, value) {
	document.cookie = name + "=" + escape(value);
}
function getCookie(name) {
	var cookies = document.cookie.split('; ');
	for (var i = 0; i < cookies.length; i++) {
		var kv = cookies[i].split('=');
		if (kv[0] == name)
			return unescape(kv[1]);
	}
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
