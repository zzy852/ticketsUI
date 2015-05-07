/**
 * global.js
 * @zzy
 * @date    2014-11-19 16:39:01
 * @version 1.000
 */

jQuery(document).ready(function($) {
	//刷新功能
	$(".icon-fresh").parent().click(function() {
		window.location.reload();
	});

	//倒计时
	var End = new Date(new Date().getTime() + 40 * 60 * 1000);

	function GetRTime() {
		var EndTime = End; //截止时间 前端路上 http://www.51xuediannao.com/qd63/
		var NowTime = new Date();
		var t = EndTime.getTime() - NowTime.getTime();
		//如果超过时间
		if (t <= 0) {
			window.location.reload();
		}
		var d = Math.floor(t / 1000 / 60 / 60 / 24);
		var h = Math.floor(t / 1000 / 60 / 60 % 24);
		var m = Math.floor(t / 1000 / 60 % 60);
		var s = Math.floor(t / 1000 % 60);

		$("#t_m").innerHTML = m + "分";
		$("#t_s").innerHTML = s + "秒&nbsp;";
	}
	setInterval(GetRTime, 1000);
	//标题居中
	$(".nav-body .text-white").css('margin-left', -($(".nav-body .text-white").width() + 20) / 2);
});
//判断是否是微信内置浏览器
function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	//验证身份证号码
function isCardNo(card) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(card) === false) {
		return false;
	} else {
		return true;
	}
}

//获取url参数
function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	//获取url参数(正则)
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return (r[2]);
	return null;
}

//日期选择控件
var TX_datePicker = function(opts) {
	this.opt = {
		startDate: new Date(),
		endDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
		_monthRange: 3,
		parent: $("body"),
		multSelect: false,
		clickEvent: function(Data) {}
	};
	this.init = function() {
		if (opts) {
			opts.startDate ? this.opt.startDate = opts.startDate : this.opt.startDate = this.opt.startDate;
			opts.endDate ? this.opt.endDate = opts.endDate : this.opt.endDate = this.opt.endDate;
			opts.multSelect ? this.opt.multSelect = opts.multSelect : this.opt.multSelect = this.opt.multSelect;
			opts.parent ? this.opt.parent = opts.parent : this.opt.parent = this.opt.parent;
			opts.clickEvent ? this.opt.clickEvent = opts.clickEvent : this.opt.clickEvent = this.opt.clickEvent;
		}
		this._render();
		this._bindEvent();
	};
	this._render = function() {
		var endMonth = new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).getMonth();
		var startMonth = new Date().getMonth();
		if (endMonth < startMonth) {
			this.opt._monthRange = endMonth + (11 - startMonth);
		}
		else if(endMonth > startMonth){
			this.opt._monthRange = endMonth - startMonth;
		} 
		else {
			this.opt._monthRange = 1;
		}
		for (var i = 0; i < this.opt._monthRange; i++) {
			this._renderMonth(i);
		}
	};
	this._renderMonth = function(monthIndex) {
		var curDate = new Date(this.opt.startDate);
		var curMonth = curDate.getMonth();
		curDate.setMonth(curMonth + monthIndex + 1);
		var monthId = 'dateDay' + monthIndex;
		var targetDate = new Date(curDate);
		targetDate.setMonth(curMonth + monthIndex);
		var targetMonth = targetDate.getMonth() + 1;

		var timeBody = '<div class="datePicker"><div class="dateTitle"><h3>' +
			curDate.getFullYear() + '年' + targetMonth + '月</h3></div><div>' +
			'<table class="table dateTable"><thead class="dateWeek"><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="font-red">六</th><th class="font-red">日</th></tr></thead><tbody class="dateDay" id="dateDay' + monthIndex + '"></tbody></table>';
		this.opt.parent.append(timeBody);
		curDate.setDate(0);
		/* 返回当月的天数 */
		var dateRange = curDate.getDate();
		var insertText = "";
		for (var i = 1; i <= dateRange; i++) {
			curDate.setDate(i);
			//今天标红
			if (curDate.getDate() == new Date().getDate() && curDate.getFullYear() == new Date().getFullYear() && curDate.getMonth() == new Date().getMonth()) {
				var dateClass = "dateLink font-red";
			}
			//今天之前
			else if (curDate < new Date()) {
				var dateClass = "dateLink disabled";
			}
			//超过结束日期
			else if (curDate > new Date(this.opt.endDate)) {
				var dateClass = "dateLink disabled";
			}
			//正常
			else {
				var dateClass = "dateLink";
			}
			if (i == 1) {
				insertText = "<tr>";
				var startIndex = curDate.getDay();
				if (startIndex == 0) {
					insertText += '<td></td><td></td><td></td><td></td><td></td><td></td><td><a href="javascript:void(0);" class="' + dateClass + '" data-date="' + curDate + '">' + i + '</a></td>';
				} else {
					for (var j = 1; j < startIndex; j++) {
						insertText += "<td></td>";
					}
					insertText += '<td><a href="javascript:void(0);" class="' + dateClass + '" data-date="' + curDate + '">' + i + '</a></td>';
				}
			} else {
				var startIndex = curDate.getDay();
				if (startIndex == 0) {
					insertText += '<td><a href="javascript:void(0);" class="' + dateClass + '" data-date="' + curDate + '">' + i + '</a></td></tr>';
				} else if (startIndex == 1) {
					insertText += '<tr><td><a href="javascript:void(0);" class="' + dateClass + '" data-date="' + curDate + '">' + i + '</a></td>';
				} else {
					insertText += '<td><a href="javascript:void(0);" class="' + dateClass + '" data-date="' + curDate + '">' + i + '</a></td>';
				}
			}
		}
		$("#" + monthId).append(insertText);
	};
	this._bindEvent = function() {
		var picker = this;
		$(".dateLink").unbind('click');
		$(".dateLink").bind('click', "", function(event) {
			var me = $(this);
			if (me.hasClass('active')) {
				return;
			} else {
				$(".dateLink.active").removeClass('active');
				me.addClass('active');
			}
			var date = me.data('date');
			picker.opt.clickEvent(date);
		});
	};
	this.init();
};