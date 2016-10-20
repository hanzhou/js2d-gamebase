var app = {
    roomid: "",
    clientid: "",
    game: null,
    soundManager: null,
    mode: "offline"
};
app.soundManager = new SoundManager();

if (!window.console)
    window.console = {};
if (!window.console.log)
    window.console.log = function () { };

$(function () {

    var mode = window.location.href.split('=')[1]; //	仅一个参数
    var mode_cookie = getCookie("mode");
    if (mode)
        app.mode = mode;
    else if (mode_cookie)
        app.mode = mode_cookie;

    app.roomid = getCookie("roomid");

    if (app.mode == "offline") {
        //	TODO 显示用户名输入框
        //	界面其他不同元素是否显示均可在这控制
        $(".btn").hide();
        $(".user-info").hide();
        $("#bar .right").hide();
        //$(".jumpBM").hide();
    }

    $('#sound_img').on('click', function () {
        var soundBtn = document.getElementById('sound_img');

        if (soundBtn.className == 'soundon') {
            soundBtn.className = 'soundoff';
            app.soundManager.disable();

            soundBtn.onmouseover = function () {
                this.src = 'images/common/soundOff_on.png';
            }
            soundBtn.onmouseout = function () {
                this.src = 'images/common/soundOff_on.png';
            }
        } else {
            soundBtn.className = 'soundon';
            app.soundManager.enable();

            soundBtn.onmouseover = function () {
                this.src = 'images/common/sound_on.png';
            }
            soundBtn.onmouseout = function () {
                this.src = 'images/common/sound.png';
            }
        }
    });
});

window.onload = function onLoad() {
    $('.left_user').css('display', 'none');
    $("#ranking_img").unbind("click");
    $("#ranking_img").bind("click", function () {
        $("#ranking_imgModal").modal('show');
    });
    //滚动到最底部

    var winWidth = $("body").width();
    //给最外层container赋指定的宽度和高度  
    $('#container').width(winWidth);
    $('#container').height(winWidth * 1164 / 1920);
    console.log("container  height is " + winWidth * 1164 / 1920);
    var offset = 278 * winWidth / 1920;
    if (bowser.safari || (bowser.name == "Chrome" && bowser.version <= 21.0)) {
        $('#mobileurl_qrcode').css('margin-top', '18.3%').css('height', '24.5%');
    }

    var canvas = document.getElementById('canvas');
    var wsclient = new MonitorClient(window.location.hostname, 8086);
    wsclient.connect();

    wsclient.onOpen(function () {
        wsclient.registMonitor(app.mode, app.roomid);
    });
    wsclient.onRoomExpired(function () {
        wsclient.registMonitor(app.mode, app.roomid);
		//	跳转到首页
        hideAllScreen();
        $('#start_screen').fadeIn();
    });
    wsclient.onClose(function () {
        //	这里能把 alert 做到页面里面最好
        //alert("与服务器连接失败，请点击确定刷新");
        if (app.mode == "online") {
            //alert("与服务器连接失败，请点击确定刷新");
            window.location.href = window.location.protocol + "//" + window.location.host;
        } else if (app.mode == "offline")
            window.location.href = window.location.protocol + "//" + window.location.host + "/OffLine.aspx";
    });
    wsclient.onRegisted(function (roomid) {
        app.roomid = roomid;
        var loading = $("#tempNode");
        if (app.mode == "offline") {
            makeEWMCode();
        }
        else {
            $.FloatingHint({
                id: "successFloatHint",
                width: "",
                holdTime: 5000,
                opacity: 1,
                text: loading,
                mask: true,
                closable: true,
                callback: function () {
                    console.log("makeEWMCode callback: ");
                    makeEWMCode();
                }
            });
        }

    });
    wsclient.onControlRegisted(function (data) {
        var params = data.split(' ');
        var cid = params[0];
        var mode = params[1];
        app.clientid = cid;

        //	手机注册后立即跳转到 XX 页面，别人不能扫二维码
        hideAllScreen();
        $('#choose_screen').fadeIn();

        $('#barcounter').css('margin-top', '2%');

    });
    wsclient.onPlayerRegisted(function (data) {
        var playername = data;
        app.username = data;
        $('#data').html(data);
        $('#userData').html(data);
        $('.left_user').fadeIn("slow");
        // -----------------新需求是，线下游戏需要选择界面-----------------
        // if (checkDataUsability1(playername) && app.mode == "offline") { //判断用户名是否存在，存在则显示用户名
        // $("#gx_name").html(playername);
        // $("#gx_name").show();
        // displayIcons("loading_screen");
        // return; //	线下游戏不需要切换屏幕
        // }

        hideAllScreen();
        $('#choose_screen').fadeIn();
        displayIcons("choose_screen");
        pcwaitinganimation();
        app.soundManager.isGaming = false;
        app.soundManager.playBg();
    });
    wsclient.onGameStart(function (data) {
        
        var params = data.split(' ');
        var gamename = params[0].trim();
        bindIconEvent(gamename);
        if (app.game)
            app.game.stop();
        var srcPath = "../../images/loading/";
        var cimages = [srcPath + "time03.png", srcPath + "time02.png", srcPath + "time01.png", srcPath + "time00.png"];
        $(".progress").hide();
        switch (gamename) {
            case "kickGame":
                app.game = new KickGameMonitor(canvas, wsclient);
                //                cimages = [srcPath + "sm_3.png", srcPath + "sm_2.png", srcPath + "sm_1.png", srcPath + "sm_0.png"];
                $('#count_screen_img').attr("src", "../../images/kickgame/d_bg.jpg");
                break;
            case "juggleGame":
                $(".juggleProgress").show();
                app.game = new JuggleGameMonitor(canvas, wsclient);
                //                cimages = [srcPath + "dq_3.png", srcPath + "dq_2.png", srcPath + "dq_1.png", srcPath + "dq_0.png"];
                $('#count_screen_img').attr("src", "../../images/jugglegame/d_bg.jpg");
                break;
            case "dribbleGame":
                $(".dribbleProgress").show();
                app.game = new DribbleGameMonitor(canvas, wsclient);
                //                cimages = [srcPath + "gr_3.png", srcPath + "gr_2.png", srcPath + "gr_1.png", srcPath + "gr_0.png"];
                $('#count_screen_img').attr("src", "../../images/dribblegame/d_bg.jpg");
                break;
        }
        app.game.setSize(960, 540);
        if (params[1] == "new") {
            hideAllScreen();
            $('#count_screen').fadeIn("slow");
            $("#downtimer").downtimer({
                width: 300,
                height: 300,
                top: "50%",
                imgs: cimages,
                callback: function () {
                    hideAllScreen();
                    $('#game_screen').fadeIn("slow");
                    displayIcons("game_screen");
                    app.game.start();
                }
            });
        } else if (params[1] == "replay") {
            hideAllScreen();
            $('#count_screen').fadeIn("slow");
            $("#downtimer").downtimer({
                width: 300,
                height: 300,
                top: "50%",
                imgs: cimages,
                callback: function () {
                    hideAllScreen();
                    $('#game_screen').fadeIn("slow");
                    displayIcons("game_screen");
                    app.game.start();
                }
            });
        }

    });
    wsclient.onGameWin(function (data) {
        hideAllScreen();
        $('#win_screen').fadeIn("slow");
        displayIcons("win_screen");
        app.game.stop();
        app.soundManager.playWin();

        console.log("score: " + data);
        var username;
        if (app.mode == "offline") {
            username = app.username;
        } else {
            window.checkLogin(function (user) {
                if (user) {
                    username = user.nickname;
                } else {
                    //用户mei登录,不用去请求卡片，
                    var html = '<li class="li1"><font>很抱歉，您还没有登陆</font></li>' +
						'<li class="li1" id="dy">请登录再来，感谢支持。</li>' +
						'<li class="li1">&nbsp;</li><li class="li1">&nbsp;</li>';
                    $("#win_bottom").html(html);
                    //$(".getCard_img").hide();
                    $("#win_screen .bg_img").attr("src", "images/win/d_bg_2.jpg");
                    //                $("#win_left_1").hide();
                    //                $(".cardBox").hide();
                    wsclient.broadcastData(app.roomid + ' ' + app.clientid + ' ' + "-1");
                    return;
                }
            });
        }
        if (username) {
            // 用户已登录
            $.ajax({
                type: "get",
                url: "../../GetCardInfo.ashx",
                data: {
                    "username": username,
                    "userid": "",
                    "mode": app.mode
                },
                success: function (result) {
                    //console.log("star card: " + result);
                    var data = "(" + result + ")";
                    data = eval(data);
                    $("#userData").html(username);
                    $("#userData").show();
                    if (app.mode == "offline") { //如果是线下，清楚一些部位的显示
                        $(".getCard_img").hide(); //隐藏右侧按钮部分

                        $("#win_screen .bg_img").attr("src", "images/win/d_bg_1.jpg"); //更改背景色
                        $("#win_left_1").hide(); //隐藏分享
                    }
                    if (data.resCode == "0") {
                        if (data.playerCard && data.playerCard.length > 0) {
                            var html = '<li class="li1"><font>获得2014世界杯' + getCountry(data.playerCard[0].pid) + '队</font></li>' +
								'<li class="li1" id="dy"><font color="#ffc912">' + data.playerCard[0].name + '</font>球星卡一张</li>' +
								'<li class="li1">下载网易新闻客户端兑换奖品</li>' +
								'<li class="li1">千万大奖，<font color="#ffc912">100%</font>有你份</li>';
                            $("#win_bottom").html(html);
                            $("#card_img").attr("src", data.playerCard[0].cardUrl);
                            $("#hidencryptCode").val(data.playerCard[0].encryptCode);
                            //alert(data.playerCard[0].cardUrl);
                            setShare(data.playerCard[0].name, data.playerCard[0].cardUrl);
                            wsclient.broadcastData(app.roomid + ' ' + app.clientid + ' ' + result);
                            $(".cardBox").show();
                            var urlcard = "http://2014.163.com/card?code=" + data.playerCard[0].encryptCode;
                            //"http://wc.c.m.163.com/template/mobile/partner.html?pid=" + data.playerCard[0].pid + "&code=" + data.playerCard[0].encryptCode;
                            $("#a_getStarCard").attr("href", urlcard);
                        }
                    } else if (data.resCode == "-2") { //超过三次领取
                        var html = '<li class="li1">对不起，您今天的球星卡已兑满，</li>' +
							'<li class="li1">请明天再来，感谢支持。</li>' +
							'<li class="li1">下载网易新闻客户端兑换奖品</li>' +
							'<li class="li1">千万大奖，<font color="#ffc912">100%</font>有你份</li>';
                        $("#win_bottom").html(html);
                        $(".getCard_img").hide();
                        $("#win_screen .bg_img").attr("src", "images/win/d_bg_2.jpg");
                        share_weibo_msg = "收集球星卡，玩转世界杯！我在网易球星卡双屏互动游戏挑战成功，千万大奖100%有你份！心动不如行动，还等什么，马上参加：http://2014.163.com/card";
                        share_weibo_pic = window.location.hostname + "/images/choose/qxk_01.png";
                        wsclient.broadcastData(app.roomid + ' ' + app.clientid + ' ' + result);
                    } else {
                        ////                    var html = '<li class="li1"><font></font></li>' +
                        ////							'<li class="li1" id="dy">请登录再来，感谢支持。</li>' +
                        ////							'<li class="li1"></li>' +
                        ////							'<li class="li1"></li>';
                        ////                    $("#win_bottom").html(html);
                        ////                    $(".getCard_img").hide();
                        ////                    $("#win_screen .bg_img").attr("src", "images/win/d_bg_1.jpg");
                        wsclient.broadcastData(app.roomid + ' ' + app.clientid + ' ' + result);
                    }
                }
            });
        }
    });
    wsclient.onGameLose(function (data) {
        hideAllScreen();
        $('#lose_screen').fadeIn("slow");
        displayIcons("lose_screen");
        app.game.stop();
        app.soundManager.playFail();

        console.log("score: " + data);

        //        setTimeout(function () {
        //            location.reload();
        //        }, 3000);

    });

    wsclient.onGoHome(function () {
        //	TODO 这里回到开始屏幕
        //	注意：在输赢界面，PC和手机端不做任何处理，只等待该指令
        console.log("onGoHome");
        //	服务端一段时间后发出指令回到开始界面，并加载二维码。而不需要重新加载整个页面
        hideAllScreen();
        $('#start_screen').fadeIn();
        makeEWMCode();
    });

    //提交登录
    $("#btn-login").click(function () {
        $("#loginForm").submit();
    });
}
function setShare(name, pic) {
    share_weibo_msg = "收集球星卡，玩转世界杯！我在网易球星卡双屏互动游戏挑战成功，获得了" + name + "球星卡，快来一起玩，千万大奖100%有你份！心动不如行动，还等什么，马上参加：http://2014.163.com/card";
    share_weibo_pic = pic;
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
        case ("PT"):
            return "葡萄牙"
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
    $('#count_screen').fadeOut("fast");
    $('#win_screen').fadeOut("fast");
    $('#lose_screen').fadeOut("fast");
    $('#game_screen').fadeOut("fast");
    $('#choose_screen').fadeOut("fast");
}
function displayIcons(screen_name) {
    switch (screen_name) {
        case "start_screen":
            $('#back_img').fadeIn("fast");
            $('#rules_img').fadeOut("fast");
            $('#logooption').fadeIn("fast");
            break;
        case "choose_screen":
            $('#back_img').fadeIn("fast");
           // $('#rules_img').fadeOut("fast");
            $('#rules_img').fadeIn("fast");
            $('#logooption').fadeOut("fast");
            break;
        case "loading_screen":
            $('#back_img').fadeIn("fast");
            $('#rules_img').fadeIn("fast");
            $('#logooption').fadeOut("fast");
            break;
        case "game_screen":
            $('#back_img').fadeIn("fast");
            $('#rules_img').fadeIn("fast");
            $('#logooption').fadeOut("fast");
            break;
        case "win_screen":
            $('#back_img').fadeIn("fast");
            $('#rules_img').fadeIn("fast");
            $('#logooption').fadeOut("fast");
        case "lose_screen":
            $('#back_img').fadeIn("fast");
            $('#rules_img').fadeIn("fast");
            $('#logooption').fadeOut("fast");
            break;
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

//PC端开始界面提示
function closeBt() {
    var button = document.getElementById("gameTip_img");
    var div = document.getElementById("game_tip");
    var imgs = div.getElementsByTagName("img");
    if (button.style.display == "block") {
        imgs[0].style.display = "none";
        imgs[1].style.display = "none";
        imgs[2].style.display = "block";
        imgs[3].style.display = "block";
    }
}
function showBt() {
    var button = document.getElementById("gameTip_img1");
    var div = document.getElementById("game_tip");
    var imgs = div.getElementsByTagName("img");
    if (button.style.display == "block") {
        imgs[0].style.display = "block";
        imgs[1].style.display = "block";
        imgs[2].style.display = "none";
        imgs[3].style.display = "none";
    }
}

function changeSound(n) { }
//pc端倒计时
function showTime() { }
function pcwaitinganimation() {
    var lfs = $("#left_fs");
    var rfs = $("#right_fs");
    var lfsWidth = lfs.width();
    var rfsWidth = rfs.width();
    lfs.css("left", 0 - lfsWidth);
    rfs.css("right", 0 - rfsWidth);
    lfs.delay(300).show().animate({
        "left": "0"
    }, 600);
    rfs.delay(300).show().animate({
        "right": "0"
    }, 600);
    $("#cardsBox_bg").css("bottom", "17%");
    $("#zb_fb").css("bottom", "50%").css("opacity", "0");

    $("#zb_txt").hide();
    $("#cardsBox").css("top", "100%");
    $("#cardsBox").delay(300).animate({
        "top": "12.6%"
    }, 600);
    $("#cardsBox_bg").delay(1000).animate({
        "bottom": "0"
    }, 300, function () {
        $("#zb_txt").fadeIn(600, function () {
            $("#zb_fb").animate({
                //"bottom": "30%",
                "bottom": "22%",
                "opacity": '+=1'
            }, 600);
        });
    });
}
function bindIconEvent(gamename) {
    $("#rules_img").unbind("click");
    $("#rules_img").bind("click", function () {
        var id = gamename + "Modal";
        var msg = $("#" + id);
        $.FloatingHint({
            id: "myhint",
            width: "",
            holdTime: 0,
            opacity: 1,
            text: msg,
            closable: true
        });
        //	    $("#" + gamename + "Modal").modal('show');
    });
    $("#ranking_img").unbind("click");
    $("#ranking_img").bind("click", function () {     
        var id = "#" + gamename + "Modal";
        var msg = $("#" + gamename + "Modal");
        $.FloatingHint({
            id: "ranking_imgModal",
            width: "",
            holdTime: 0,
            opacity: 1,
            text: msg,
            closable: true
        });
        //$("#ranking_imgModal").modal('show');
    });
}
//图片不停闪烁效果
var i = 0;
function flash() {

    if (gx_img.style.visibility == "hidden") {
        gx_img.style.visibility = "visible";
    } else {
        gx_img.style.visibility = "hidden";
    }
    if (win_img.style.visibility == "hidden") {
        win_img.style.visibility = "visible";
    } else {
        win_img.style.visibility = "hidden";
    }
    setTimeout("flash()", 300);

}

$(document).ready(function () {
    $("#back_img").bind("click", function () {
		hideAllScreen();
        $('#start_screen').fadeIn("fast");
        $('#sound_img').fadeIn("fast");
        $('#ranking_img').fadeIn("fast");
        $('#score_show').fadeOut("fast");
        $('#rules_img').fadeOut("fast");
        $('#back_img').fadeOut("fast");
		app.game.stop();
    });
});
function makeEWMCode() {
    if ($('#game_screen').css('display') == 'block') {
        location.reload();
    } else {
        var mobileurl;
        window.checkLogin(function (user) {
            if (user) {
                $(".user-name").html(user.nickname);
                loadStation(true);
                mobileurl = window.location.protocol + "//" + window.location.host + "/controller.aspx?roomid=" + app.roomid + "&username=" + user.nickname;
            } else {
                mobileurl = window.location.protocol + "//" + window.location.host + "/controller.aspx?roomid=" + app.roomid + "&username=-1";
                // 用户未登录
                loadStation(false);
            }
        });
        console.log("controller url: " + mobileurl);
        mobileurl = encodeURI(mobileurl);
        setCookie("roomid", app.roomid);

        //	qrcode 图像显示大小通过 CSS 更改
        if (app.mode == "offline") {
            if (window.navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("version") >= 0) {
                $("#mobileurl_qrcode").css("width", "20.1%");
                $("#mobileurl_qrcode").css("height", "41.5%");
                //$("#mobileurl_qrcode").css("left", "39.5%");
                $("#mobileurl_qrcode").css("left", "29.7%"); //0705活动必须
                $("#mobileurl_qrcode").css("margin-top", "7.3%");
            }
            else {
                
                $("#mobileurl_qrcode").css("width", "14.6%");
                //$("#mobileurl_qrcode").css("height", "29.6%");
                //$("#mobileurl_qrcode").css("left", "39.5%");
                $("#mobileurl_qrcode").css("height", $("#mobileurl_qrcode").css('width')); //0705活动必须
                $("#mobileurl_qrcode").css("left", "25.3%"); //0705活动必须
                $("#mobileurl_qrcode").css("margin-top", "14.1%");
            }
        }
        $('#mobileurl_qrcode').empty();
        var qrcode = new QRCode(document.getElementById("mobileurl_qrcode"), {
            width: 150,
            height: 150,
            colorDark: '#006900', //'#004bb2',藍色
            colorLight: '#ffef00', //'#ffef00',黃色
            correctLevel: 1
        });

        //mobileurl = window.location.protocol + "//" + window.location.host + "/flash_wstest.html";
        qrcode.makeCode(mobileurl);
    }
}
