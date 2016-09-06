/**
 * 初始化一些系统级别的方法
 * @auoth drank
 */
var $pageTab = $('#page-tab'), $leftNavList = $('#leftNavList');

(function($) {
	function lfh() {
		return document.body.scrollHeight >= window.innerHeight ? document.body.scrollHeight : window.innerHeight;
	}

	function setTabHeight() {
		var $tab = $('#mainBg'),
			winHeight = $(window).height(); //winHeight 还可以再做调整
		var height = winHeight - $tab.offset().top;

		$tab.height(height);
		$leftNavList.css('height', (lfh() - 50) + 'px'); //顺带设置leftnav height
	}
	setTabHeight();

	//浏览器窗口发生变化时重置 #mainBg的高度
	$(window).on('resize', function() {
		setTabHeight();
	});

	//设置左侧导航事件
	$("#leftNavList .item").hoverIntent({
        sensitivity: 1,
        interval: 120,
        over: showNavWrap,
        timeout: 120,
        out: hideNavWrap
    });

	//点击 A=>sub-nav-wrap a 以后 A隐藏
	$('.sub-nav-wrap a').on('click', function() {
		$(this).parents('.sub-nav-wrap').hide();
	});
})(jQuery);

// 展示sub-nav-wrap
function showNavWrap(){
	$(this).children('.sub-nav-wrap').stop(true, true).show();
}
// 隐藏sub-nav-wrap
function hideNavWrap(){
	$(this).children('.sub-nav-wrap').stop(true, true).hide();
}

//设置tab部分的一些事件
$pageTab.ligerTab({
	showSwitchInTab: true,
	showSwitch: true,
	height: '100%',
	changeHeightOnResize: true,
	onBeforeAddTabItem: function(tabid) {
		//tabid != 'index' ? setCurrentNav(tabid) : 'undefined';
	},
	onAfterAddTabItem: function(tabid) {
		//setCurrentNav(tabid);
	},
	onAfterSelectTabItem: function(tabid) {
		tabid != 'index' ? setCurrentNav(tabid) : $leftNavList.find('.item').removeClass('active');
	},
	onBeforeRemoveTabItem: function(tabid) {

	},
	onAfterRemoveTabItem: function(tabid) {
		var $lSelected = $('.l-selected');
		var tabid = $lSelected.attr('tabid');

		tabid != 'index' ? setCurrentNav(tabid) : $leftNavList.find('.item').removeClass('active');
	},
	onAfterLeaveTabItem: function(tabid) { /** 暂时用不到 */ }
});

//显示左侧当前一级导航的位置
function setCurrentNav(tabid) {
	if (!tabid) {
		return;
	}
	var pre = tabid.match((/([a-zA-Z]+)[-]?/))[1];
	$('#leftNavList li').removeClass('active');
	$('#leftNavList li.item-' + pre).addClass('active');
}

//增加页签
var tab = $pageTab.ligerGetTabManager();

$('#leftNavList').on('click', 'a[rel="pageTab"]', function(e) {
	e.preventDefault();
	var $this = $(this),
		tabid = $this.attr('tabid'),
		url = $this.attr('href'),
		text = $this.text().replace('+', ''), //去掉+号
		ischild = $this.data('ischild'),
		showclose = $this.data('showclose');
	var rightId = $(this).data('rightid');

	//权限校验
	if (rightId && !Business.verifyRight(rightId)) {
		return false;
	}

	if (!!ischild) {
		parent.tab.addTabItem({
			tabid: tabid,
			text: text,
			url: url,
			showClose: showclose
		});
	} else {
		tab.addTabItem({
			tabid: tabid,
			text: text,
			url: url,
			showClose: showclose
		});
	}
});

//start
//切换门店鼠标移入事件
$(".store-nav>li, .headerNavBox").hover(function (e) {
    $(this).children('ul').stop(true, true).slideDown(200);
}, function (e) {
    $(this).children('ul').stop(true, true).slideUp(200);
});

//点击切换门店
$('.changeShop').on('click', function (event) {
    event.preventDefault();
    var shopId = $(this).data('id'),
    	name = $(this).text();
    if (!shopId) {
        return false;
    }
    confirmDialog('确认切换到 '+name+' ?',function(){
		Public.Ajax('/web/user/changeShop', {'shopId': shopId}, 'GET',function (data) {
        	parent.location.href =  '/web/user/home';
    	});
    });
});

//点击登出ajax
$('#logout').on('click', function (event) {
    //前端--删除cookie
    event.preventDefault();
    confirmDialog('确定安全登出?',function(){
        Public.Ajax('/web/user/logout', '','GET', function (data) {
            window.location.href = "/web";
        });
//        $.removeCookie('token');
//        $.removeCookie('shopId');
    });
});

//点击新增tab 消息列表页
$('#msgCenter').on('click', function() {
    tab.addTabItem({
        tabid: 'tab-msgCenter',
        text: '消息中心',
        url: '/web/message/messageCenter?random='+Math.random()
    });
});
(function($) {
	var messageUrl = '/web/message/updateMsgStatus?index=1&random=' + Math.random();
	var messageControl = setInterval(changeMessageCount, 180000);

	function changeMessageCount() {
		$.get(messageUrl, function(res) {
			$('.msg-count').html(res.data.count);
		});
	}
})(jQuery);

//初始化首页
tab.addTabItem({
	tabid: 'index',
	text: '首页',
	url: '/web/user/guide',
	showClose: false
});

// confirm选择框
var confirmDialog = function(txt,callback){
	return new newDialog(txt,callback);
}
var newDialog = function(txt,callback){
	this.init(txt,callback);
}
newDialog.prototype = {
	init: function(txt,callback){
		if ($('#confirmDialog').length) {
			return false;
		};
		this.addDiv(txt,callback);
		this.initEvent(txt,callback);
	},
	initEvent: function(txt,callback){
		var $confirmDialog = $('#confirmDialog');
		$('body').on('click', '#confirm', function(e) {
			e.preventDefault();
			$confirmDialog && $confirmDialog.remove();
			callback();
		});
		$('body').on('click', '#cancel', function(e) {
			e.preventDefault();
			$confirmDialog && $confirmDialog.remove();
		});
	},
	addDiv: function(txt,callback){
		var htm = this.createHtm();
		$(htm).appendTo('body');
		this.tipsDialog(txt,callback);

	},
	createHtm: function(){
		return '<div id="confirmDialog" style="display: box; display: -webkit-box; display: -moz-box; position: fixed; left: 0; right: 0; top: 0; bottom: 0; -webkit-box-pack:center; -moz-box-pack:center; -webkit-box-align:center; -moz-box-align:center; z-index:9999; background: rgba(0,0,0,0.3)"></div>'
	},
	tipsDialog: function(txt,callback){
		var dialog = this.createDialog(txt,callback);
		$(dialog).appendTo('#confirmDialog');
	},
	createDialog: function(txt,callback){
		return '<div class="zoomIn animated" style="background: #3d9ad1;margin: 20% auto;padding: 10px 50px;border-radius: 5px;display:inline-block;box-shadow: 0 0 10px #555;">' +
  				'<p style="font-size: 18px;color: #f9f9f9;">'+txt+'</p>' +
  				'<div style="text-align:center">' +
    					'<button id="confirm" style="border: none;padding: 8px 15px;line-height: 1;border-radius: 5px;color: #fcfcfc;background: #ff920d;margin-right: 10px;">确认</button>' +
    					'<button id="cancel" style="border: none;padding: 8px 15px;line-height: 1;border-radius: 5px;color: #3d9ad1;background: #f8f8f8;">取消</button>' +
			'</div>' +
		'</div>';
	}
};
