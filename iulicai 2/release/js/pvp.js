var ipAddr = "http://cz.iulicai.com:8080/ulicai";
AllUrl={
    registUrl:ipAddr+"/user/register.htm?",//注册
    loginUrl:ipAddr+"/user/login.htm?",//登录
    logout:ipAddr+"/user/logout.htm?",//退出登录
    modPass:ipAddr+"/user/modPwd.htm?",//修改密码
    findPass:ipAddr+"/user/findPwd.htm?",//找回密码
    sendRegCode:ipAddr+"/sms/genRegCode.html?",//发验证码-注册
    sendModCode:ipAddr+"/sms/genModCode.htm?",//发验证码-修改
    sendFindCode:ipAddr+"/sms/genFindCode.htm?",//发验证码-找密码
    acctInfo:ipAddr+"/acct/assertStat.htm",//我的账户
    earnDay:ipAddr+'/acct/dayEarns.htm?',//昨日收益详情
    totalEarns:ipAddr+'/acct/ordEarns.htm?',//累计收益详情
    accDetail:ipAddr+"/acct/books.htm",//账户明细
    bonusUrl:ipAddr+"/acct/acctCoupons.htm?",//优惠券
    getProds:ipAddr+"/prodqry/getprods4page.htm?",//获取所有产品
    getRevenue:ipAddr+"/pay/prosRevenue.htm?",//计算收益
    getOrds:ipAddr+"/order/getorders4page.htm?",//获取所有交易记录
    getCardList:ipAddr+"/pay/infoQuery.htm?operate=query_bankcard_list",//所有已绑定卡号
    bindCard:ipAddr+"/pay/infoQuery.htm?operate=query_card_bin",//绑定银行卡
    pay:ipAddr+"/pay/toPay.htm?"//支付
    getorder:ipAddr+"/order/getorder.htm?"//获取单个产品

}

var BonusType = {
    "a":"好友红包",
    "b":"注册红包"
}

var PayStatus = {
    0:"未支付-初始化",
    1:"支付处理中",
    2:"已付款",
    3:"支付失败"
}
//手机号验证
function verifyTel(num){
    var resObj = {
        flag:true
    };
    if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(num))){
        resObj.error = "请输入正确的手机号码";
        resObj.flag = false;
    }
    return resObj;
}
//密码验证
function verifyPass(str){
    var resObj = {
        flag:true
    };
    if(!(/^[a-zA-Z0-9!@#$%^&*()]{6,20}$/.test(str))){
        resObj.error = "密码格式错误";
        resObj.flag = false;
    }
    return resObj;
}

//身份证验证
function verifyIdCard(str){
    var resObj = {
        flag:true
    };
    if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(str))){
        resObj.error = "身份证输入有误";
        resObj.flag = false;
    }
    return resObj;
}

//银行卡验证
function verifyBankCode(num){
    var resObj = {
        flag:true
    };
    if(num.length<16 || num.length >19){
        resObj.error = "银行卡长度必须在16到19位间";
        resObj.flag = false;
    }

    if(!(/^\d*$/.test(num))){
        resObj.error = "银行卡输入有误";
        resObj.flag = false;
    }

    return resObj;
}
//判断cookie是否存在
function getCookieByName(name){
    var cookies = document.cookie.split(";");
    for(var i= 0,l=cookies.length;i<l;i++){
        var item = cookies[i];
        if(item.indexOf(name) !== -1){
            var cvalue = item.substring(item.indexOf("=")+1);
            if(cvalue !== "" && cvalue != 0){
                return true;
            }
            return false;
        }
        return false;
    }
}

//弹出信息提示框
function popWin(msg){
    var bodyStr = '';
    if(msg){
        bodyStr = '<p>'+msg+'</p>';
    }else{
        bodyStr =  '<p>操作成功</p>';
    }
    var alert = {
        body: bodyStr,
        closable: true,
        buttons: {
            action: {
                title: '确定',
                fn: function () {
                    basicModal.close();
                    return;
                }
            }
        }
    }
    basicModal.show(alert);

}
;;(function(win, app){
	var View = app.module.View,
		Page = app.module.Page
		;

	View.fn.delegateEvents = Page.fn.delegateEvents = 
		function(events) {
			var $el = this.$el, context = this;

			$el && events.forEach(function(ev) {
				context[ev[2]] && (ev[2] = context[ev[2]]);

				$el && $el.on(ev[0], ev[1], function(e) {
					ev[2].apply(context, arguments);
				});
			});
		}

	View.fn.undelegateEvents = Page.fn.undelegateEvents = 
		function() {
			this.$el && this.$el.off();
		}

	app.plugin.domevent = {
		onPageStartup : function(page, options) {
			page.events && page.delegateEvents(page.events);
		},

		onPageTeardown : function(page, options) {
			page.undelegateEvents();
		},

		onViewRender : function(view, options) {
			if (!view._isDelegateEvents && view.events) {
				view._isDelegateEvents = true;
				view.delegateEvents(view.events);
			}
		},

		onViewDestory : function(view, options) {
			view.undelegateEvents();
			view._isDelegateEvents = false;
		}
	}
})(window, window['app']);;(function(win, app){
	var doc = win.document
		;

	app.plugin.lazyload = {
		_options: null,
		_domready: false,

		handleEvent: function(e) {
			(e.type === 'scrollend' && this._domready) && this.check();
		},

		check: function() {
			var options = this._options,
				dataAttr = options.dataAttr || 'data-src',
				imgs = app.scroll.getElement().querySelectorAll('img[' + dataAttr + ']'),
				viewportTop = app.scroll.getScrollTop(),
				viewportBottom = viewportTop + app.scroll.getViewHeight()
				;

			for (var i = 0; i < imgs.length; i++) {
				var img = imgs[i], offset = app.scroll.offset(img), src;

				if (((offset.top > viewportTop && offset.top < viewportBottom) ||
						(offset.bottom > viewportTop && offset.bottom < viewportBottom)) && 
							(src = img.getAttribute(dataAttr))) {
					img.setAttribute('src', src);
					img.removeAttribute(dataAttr);
				}
			}
		},

		onNavigationSwitch: function() {
			this._domready = false;
		},

		onDomReady: function(options) {
			this._options = options;
			this._domready = true;
			this.check();
		},

		onPageShow : function(page, options) {
			this._options = options;
			app.scroll.addEventListener('scrollend', this, false);
		},

		onPageHide : function(page, options) {
			app.scroll.removeEventListener('scrollend', this);
		}
	}
})(window, window['app']);;(function(win, app) {
	var doc = win.document,
		config = app.config,
		id, ids = [], wrap, item;

	app.plugin.loading = {
		show: function(text) {
			if (text) {
				item.innerHTML = text;

				if (wrap.style.display !== 'block') {
					wrap.style.display = 'block';
					var bodyRect = document.body.getBoundingClientRect();
					var spanRect = item.getBoundingClientRect();
					item.style.left = (bodyRect.width - spanRect.width) / 2 + 'px';
					item.style.top = ((window.innerHeight - spanRect.height) / 2 - bodyRect.top) + 'px';
				}
			}

			var now = Date.now();
			ids.push(now);
			return now;
		},

		hide: function(_id) {
			if (_id) {
				ids.splice(ids.indexOf(_id), 1);
			} else {
				ids = [];
			}

			if (ids.length === 0) {
				item.innerHTML = '';
				wrap.style.display = 'none';
			}
		},

		onAppStart: function() {
			wrap = document.createElement('div');
			wrap.className = 'loading';
			wrap.style.cssText = [
				'display: none', 
				'background: transparent', 
				'position: absolute',
				'width: 100%', 
				'height: 100%', 
				'left: 0', 
				'top: 0',
				'overflow: hidden', 
				'z-index: 99999'
			].join(';');
			item = document.createElement('div');
			item.style.cssText = [
				'position:absolute',
				'width: 100px',
				'height: 90px',
				'line-height: 100px',
				'background-color: rgba(0,0,0,0.5)',
				'color: #FFF',
				'text-align: center',
				'font-size: 11px',
				'border-radius: 13px'
			].join(';');
			wrap.appendChild(item);
			doc.body.appendChild(wrap);
		},

		onNavigationSwitch: function() {
			id = this.show('正在加载');
		},

		onDomReady: function() {
			this.hide(id);
		}
	}


})(window, window['app']);;(function(win, app){
	var doc = win.document,
		config = app.config,
		bounceHeight = 50;

	app.plugin.pullbounce = {
		_options : null,
		_page : null,
		_pullType : false,

		_onPullStart: function() {
			var page = this._page,
				options = this._options,
				wrap = page.el.parentNode;

			options.onPullDown && (wrap.querySelector('#J_pullRefresh').style.visibility = 'visible');
			options.onPullUp && (wrap.querySelector('#J_pullUpdate').style.visibility = 'visible');
		},

		_onPullDown: function(offset) {
			var page = this._page,
				span = page.el.parentNode.querySelector('#J_pullRefresh span'),
				text = span.innerText
				;

			//if (offset > 50 && text !== '松开即刷新') {
			//	span.innerText = '松开即刷新';
			//} else if (offset < 50 && text !== '下拉可刷新'){
			//	span.innerText = '下拉可刷新';
			//}


			span.innerText = '';

		},

		_onPullUp: function(offset) {
			var page = this._page,
				span = page.el.parentNode.querySelector('#J_pullUpdate span'),
				text = span.innerText
				;

			//if (offset > 50 && text !== '松开即加载更多') {
			//	span.innerText = '松开即加载更多';
			//} else if (offset < 50 && text !== '上拉可加载更多'){
			//	span.innerText = '上拉可加载更多';
			//}
			span.innerText = '';
		},

		_onPullEnd: function() {
			app.scroll.refresh();
			app.scroll.resumeBounce();
		},

		handleEvent: function(e) {
			var that = this,
				page = this._page,
				options = this._options,
				offset = app.scroll.getBoundaryOffset()
				;


			if (e.type === 'panstart') {
				app.scroll.refresh();//cy
				app.scroll.resumeBounce();//cy
				console.log("start");
				this._onPullStart();
			} else if (e.type === 'pulldown') {
				//console.log(offset);
				//if (offset > bounceHeight) {
				//	this._pullType = 'PullDown';
				//} else {
				//	this._pullType = false;
				//}
				this._pullType = 'PullDown';
				this._onPullDown(offset);
			} else if (e.type === 'pullup') {
				//console.log(offset);
				//if (offset > bounceHeight) {
				//	this._pullType = 'PullUp';
				//} else {
				//	this._pullType = false;
				//}
				this._pullType = 'PullUp';
				this._onPullUp(offset);
			} else if (e.type === 'panend') {
				//console.log("end");
				//console.log(offset);
				//console.log(this._pullType);
				if (offset && this._pullType) {
					//app.scroll.stopBounce();

					setTimeout(function() {

						var func = options['on' + that._pullType];
						//console.log(func);

						if (typeof func === 'string') {
							func = page[func];
						}
						//console.log("pageFunc");
						if (func) {
							//console.log(func);
							func.call(page, that._onPullEnd);
						} else {
							that._onPullEnd();
						}
					}, 400);
				}
			}
		},

		onAppStart: function() {
			var ss = doc.styleSheets[0];

			ss.addRule('#J_pullRefresh, #J_pullUpdate', [
				  'visibility: hidden;',
				  'width: 100%;',
				  'padding: 10px;',
				  'height: ' + bounceHeight +'px;',
				  'line-height: 30px;',
				  'box-sizing: border-box;',
				  'background-color: #FFF;',
				  'font-size: 12px;',
				  'color: #999;'
			].join(''));
		},

		onPageDefine: function(page, options) {
			page.scroll = {
				bounceTop: options.onPullDown?bounceHeight:0,
				bounceBottom: options.onPullUp?bounceHeight:0
			}
		},

		onPageStartup: function(page, options) {
			//page.el.innerHTML = (options.onPullDown?'<section id="J_pullRefresh"><span>下拉可刷新</span></section>':'') +
			//					'<section id="J_pullContent"></section>' +
			//					(options.onPullUp?'<section id="J_pullUpdate"><span>上拉可加载更多</span></section>':'');

			page.el.innerHTML = (options.onPullDown?'<section id="J_pullRefresh"><span></span></section>':'') +
				'<section id="J_pullContent"></section>' +
				(options.onPullUp?'<section id="J_pullUpdate"><span></span></section>':'');

			page.el = page.el.querySelector('#J_pullContent');
		},

		onPageShow: function(page, options) {
			if (page.el.getAttribute('id') !== 'J_pullContent') {
				page.el = page.el.querySelector('#J_pullContent');
			}

			this._page = page;
			this._options = options;
			this._pullType = false;

			options.onPullDown && app.scroll.addEventListener('pulldown', this, false);
			options.onPullUp && app.scroll.addEventListener('pullup', this, false);
			app.scroll.addEventListener('panstart', this, false);
			app.scroll.addEventListener('panend', this, false);
		},

		onPageHide: function(page, options) {
			options.onPullDown && app.scroll.removeEventListener('pulldown', this, false);
			options.onPullUp && app.scroll.removeEventListener('pullup', this, false);
			app.scroll.removeEventListener('panstart', this, false);
			app.scroll.removeEventListener('panend', this, false);
		}
	}
})(window, window['app']);;(function(win, app){
	var doc = win.document
		;

	app.plugin.scrollpos = {
		_options: null,
		_domready : false,

		handleEvent: function(e) {
			(e.type === 'scrollend' && this._domready) && this.setPos();
		},

		setPos: function() {
			this._options.pos = app.scroll.getScrollTop();
		},

		reset: function(pos) {
			var options = this._options
				;

			(pos != null) && (options.pos = pos);
			app.scroll.scrollTo(options.pos);
		},

		onNavigationSwitch: function() {
			this._domready = false;
		},

		onDomReady: function(options) {
			this._options = options;
			this._domready = true;
			this.reset();
		},

		onPageShow: function(page,  options) {
			app.scroll.addEventListener('scrollend', this, false);
		},

		onPageHide: function(page, options) {
			app.scroll.removeEventListener('scrollend', this);
		}
	}
})(window, window['app']);(function(win, app) {
	var doc = win.document,
		Transition = app.module.Transition,
		Scroll = app.module.Scroll,
		navigation = app.module.Navigation.instance,
		stack = navigation.getStack(), state,
		config = app.config,
		slideWrap, slideWrapWidth, slidesWrapHeight, slideStack = [];

	app.extendView({
		name: 'slideview',

		slideIn: function() {
			var that = this,
				wrap = document.createElement('div'),
				lastSlide = slideStack[slideStack.length - 1]

			wrap.style.cssText = 'z-index:' + (slideStack.length + 1000) + ';position:absolute;width:100%;height:100%;left:0;top:0;background:#FFF;';
			wrap.appendChild(this.el);
			slideWrap.appendChild(wrap);

			if (slideStack.length === 0) {
				var headerHeight = 0, footerHeight = 0, contentHeight = doc.body.getBoundingClientRect().height;
				if (config.enableNavbar) {
					headerHeight = config.enableNavbar.wrapEl.getBoundingClientRect().height;
				}
				// if (config.enableToolbar) {
				// 	footerHeight = config.enableToolbar.wrapEl.getBoundingClientRect().height;
				// }
				if (config.enableScroll) {
					contentHeight = window.innerHeight;	
				}
				slideWrap.style.height = (contentHeight - headerHeight) + 'px';
				slideWrap.style.top = (headerHeight + window.scrollY) + 'px';
				slideWrap.style.display = '';
				var rect = slideWrap.getBoundingClientRect();
				slideWrapWidth = rect.width;
				slidesWrapHeight = rect.height;
			}

			// if (lastSlide) {
			// 	lastSlide.view.hide && lastSlide.view.hide();
			// }

			slideStack.push({
				lastHeader: {
					title: state.pageMeta.title,
					buttons: state.pageMeta.buttons
				},
				wrap: wrap,
				view: this
			});

			app.navigation.resetNavbar();

			Transition.slide(wrap, 'RI', slideWrapWidth, function() {
				if (lastSlide) {
					lastSlide.wrap.style.display = 'none';
				}

				app.navigation.setButton({
					type: 'back',
					text: '返回',
					handler: function() {
						that.slideOut();
					}
				});

				if (that.el.getBoundingClientRect().height > slidesWrapHeight) {
					Scroll.enable(that.el);
				}

				that.show && that.show();
			});
		},

		slideOut: function() {
			var that = this,
				slide = slideStack.pop(),
				wrap = slide.wrap,
				lastHeader = slide.lastHeader,
				lastSlide = slideStack[slideStack.length - 1];

			if (lastSlide) {
				lastSlide.wrap.style.display = '';
			}

			Transition.slide(wrap, 'RO', slideWrapWidth, function() {
				Scroll.disable(slide.view.el);
				slideWrap.removeChild(wrap);
				that.hide && that.hide();

				app.navigation.resetNavbar();
				app.navigation.setTitle(lastHeader.title);
				app.navigation.setButton(lastHeader.buttons);

				// if (lastSlide) {
				// 	lastSlide.view.show && lastSlide.view.show();
				// }	

				if (slideStack.length === 0) {
					slideWrap.style.display = 'none';
				}
			});
		},

		close: function() {
			var that = this,
				slide = slideStack.pop(),
				wrap = slide.wrap;

			Transition.slide(wrap, 'RO', slideWrapWidth, function() {
				while (slideStack.length) {
					slide = slideStack.pop();
					slide.view.hide && slide.view.hide();
				}

				var lastHeader = slide.lastHeader;
				app.navigation.resetNavbar();
				app.navigation.setTitle(lastHeader.title);
				app.navigation.setButton(lastHeader.buttons);

				slideWrap.innerHTML = '';
				slideWrap.style.display = 'none';
			});
		}
	});

	app.plugin.slideview = {
		onAppStart: function() {
			slideWrap = document.createElement('div');
			slideWrap.style.cssText = 'z-index:999;display:none;position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0);overflow:hidden;'
			doc.body.appendChild(slideWrap);
		},

		onNavigationSwitch: function() {
			if (slideStack.length && state) {
				var slide = slideStack.shift();

				state.pageMeta.title = slide.lastHeader.title;
				state.pageMeta.buttons = slide.lastHeader.buttons;
				slideWrap.innerHTML = '';
				slideWrap.style.display = 'none';
			}

			state = stack.getState();
		}
	}

})(window, window['app']);;(function(win, app){
	var ss = win.sessionStorage,
		stack = app.module.Navigation.instance.getStack(),
		SS_PREIX = 'mix_storage_001_'
		;

	try {
		ss.setItem('testPrivateModel', 'false');
	} catch(e) {
		return console.error('run@private model', window.navigator.appVersion);
	}

	function cleanup(state) {
		var o = {};

		for (var p in state) {
			if (p === 'pageMeta' || p === 'plugins') continue;
			var type = Object.prototype.toString.call(state[p]);
			if (type === '[object Number]' || type === '[object String]') {
				o[p] = state[p];
			} else if (type === '[object Array]') {
				o[p] = state[p].map(function(s) {return cleanup(s)});
			} else if (type === '[object Object]') {
				o[p] = cleanup(state[p]);
			}
		}

		return o;
	}

	app.plugin.stateStorage = {

		saveAll: function() {
			ss.setItem(SS_PREIX + 'state_index', stack._stateIdx);
			ss.setItem(SS_PREIX + 'state_length', stack._states.length);
			stack._states.forEach(function(state, i) {
				ss.setItem(SS_PREIX + 'state_item[' + i + ']', JSON.stringify(cleanup(state)));
			});
		},

		save: function() {
			var stateIdx = stack._stateIdx,
				state = stack._states[stateIdx]
				;

			ss.setItem(SS_PREIX + 'state_item[' + stateIdx + ']', JSON.stringify(cleanup(state)));
		},

		loadAll: function() {
			var len, i;

			stack._stateIdx = parseInt(ss.getItem(SS_PREIX + 'state_index') || 0);
			len = parseInt(ss.getItem(SS_PREIX + 'state_length') || 0);

			for (i = 0;i < len; i++) {
				stack._states[i] = JSON.parse(ss.getItem(SS_PREIX + 'state_item[' + i + ']') || '{}');
			}
		},

		load: function() {
			var stateIdx = stack._stateIdx
				;

			stack._states[stateIdx] = JSON.parse(ss.getItem(SS_PREIX + 'state_item[' + stateIdx + ']') || '{}');
		},

		clear: function() {
			var len = stack._stateLimit;

			ss.removeItem(SS_PREIX + 'state_index');
			ss.removeItem(SS_PREIX + 'state_length');

			for (var i = 0; i < len; i++) {
				ss.removeItem(SS_PREIX + 'state_item[' + i + ']');
			}
		},

		onNavigationSwitch: function() {
			this.saveAll();
		},

		onAppStart: function() {
			this.loadAll();
		}
	};
})(window, window['app']);/**
 * Created by chenyao on 15/10/30.
 */
(function(app, undef) {
    app.extendView({
        name : 'earnDayView',
        el: 'div.dayEarn',
        template:'{{#dayEarnslist}}<span class="earnRecord" data-total="{{totalDailyEarn}}元">{{earnDay}}</span>{{/dayEarnslist}}',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.earnDay+"page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.ordEarnslist || [],
                        len = arr.length || 0;
                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(result);
                    }


                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.earnDay+"page="+1;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data;
                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;/**
 * Created by chenyao on 15/10/21.
 */
(function(app, undef) {
    app.extendView({
        name : 'invalidBonusView',
        el: 'article.invalid',
        template : './templates/invalidBonus.tpl',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.bonusUrl+"status=3&queryType=4&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.acctCouponList,
                        len = arr.length;
                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(result);
                    }


                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.bonusUrl+"status=3&queryType=4&page="+1;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data;
                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                if(datas.acctCouponList.length == 0){
                    that.$el.html("<div class='noData'>暂无失效红包</div>");
                }else{
                    that.$el.html(html);
                }
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;(function(app, undef) {
	app.extendView({
		name : 'searchItems',
		template : './templates/searchItems.tpl',
		word : null,
		page : 1,

		_itemClickHandler : function(e, that) {
			var el = this
				;

			e.preventDefault();
			app.navigation.push('detail/' + el.getAttribute('dataid') + '/');
		},

		_getSearchItems : function(callback) {
			var that = this,
				word = that.word,
				page = that.page,
				//url = 'http://s.m.taobao.com/search_turn_page_iphone.htm?q=' + encodeURIComponent(word) + '&sst=1&wlsort=5&abtest=5&page=' + page
				url='/ulicai/data/data1.json';

			$.ajax({
				url : url,
				dataType : 'json',
				success : function(json) {
					console.log(json);
					callback(json);
				},
				error:function(){
					console.log("ajax error");
				}
			});
		},

		render : function(callback) {
			var that = this
				;

			that._getSearchItems(function(datas) {
				console.log(datas);
				that.renderTemplate(datas, function(html) {
					that._el = $(html);
					that._el.on('click', 'a', that._itemClickHandler);
					callback(that._el);
				});
			});
		},

		destroy : function() {
			if (this._el) {
				this._el.off('click', 'a', this._itemClickHandler);
			}
		}
	});

})(window['app']);;/**
 * Created by chenyao on 15/10/15.
 */
(function(app, undef) {
    app.extendView({
        name : 'supermarketView',
        el: 'div.rec-content',
        template : './templates/supermarketItem.tpl',
        pageno : 1,

        events: [
            ['click', 'ul', '_itemClickHandler']
        ],

        plugins: {
            domevent: true
        },

        _itemClickHandler : function(e) {
            e.preventDefault();
            var proId = $(e.currentTarget).attr("data-proId");
            app.navigation.push("/productDetails",{
                type:'GET',
                data:{productId:proId}
            });//进入产品详情页面
        },

        _getSearchItems : function(callback) {
            var that = this,
                pageno = that.pageno,
                //url='/wstorm/CLtest/data/supermarket.json';
                url = AllUrl.getProds+"&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json.data);
                    if(json.data.upProductList.length == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(json.data);
                    }

                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.getProds+"&page="+0;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    callback(json.data);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                if(datas.upProductList.length == 0){
                    that.$el.html("<div class='noData'>暂无理财产品</div>");
                }else{
                    that.$el.html(html);
                }
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getSearchItems(function(datas) {
                var html = that.template(datas);
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;/**
 * Created by chenyao on 15/10/30.
 */
(function(app, undef) {
    app.extendView({
        name : 'totalEarnView',
        el: 'div.totalEarn',
        template:'{{#ordEarnslist}}<span class="earnRecord" data-total="{{ordTotalEarns}}元/{{dayCount}}天">{{productName}}</span>{{/ordEarnslist}}',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.totalEarns+"page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.ordEarnslist || [],
                        len = arr.length || 0;
                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(result);
                    }


                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.totalEarns+"page="+1;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data;
                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;/**
 * Created by chenyao on 15/10/21.
 */
(function(app, undef) {
    app.extendView({
        name : 'transactionView',
        el: 'div#transactionList',
        template : './templates/transactionView.tpl',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.getOrds+"&orderId=189990012872&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    var result = json.data,
                        arr = result.ordProdDtoList,
                        len = arr.length;

                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        for(var i= 0;i<len;i++){
                            var tmp = arr[i].payStatus;
                            console.log(tmp);
                            if(PayStatus[tmp] !== "undefined"){
                                result.ordProdDtoList[i].payStatus = PayStatus[tmp];
                            }
                        }
                        callback(result);
                    }

                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.getOrds+"&page="+0;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data,
                        arr = result.ordProdDtoList,
                        len = arr.length;
                    if(len == 0){
                        var alert = {
                            body: '<p>暂无订单。</p>',
                            buttons: {
                                action: {
                                    title: '关闭',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                    }

                    for(var i= 0;i<len;i++){
                        var tmp = arr[i].payStatus;
                        console.log(tmp);
                        if(PayStatus[tmp] !== "undefined"){
                            result.ordProdDtoList[i].payStatus = PayStatus[tmp];
                        }
                    }

                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;/**
 * Created by chenyao on 15/10/26.
 */
(function(app, undef) {
    app.extendView({
        name : 'validBonusView',
        el: 'article.valid',
        template : './templates/validBonus.tpl',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.bonusUrl+"status=1&queryType=1&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.acctCouponList,
                        len = arr.length;
                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(result);
                    }


                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.bonusUrl+"status=1&queryType=1&page="+1;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data;
                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                if(datas.acctCouponList.length == 0){
                    that.$el.html("<div class='noData'>暂无可用红包</div>");
                }else{
                    that.$el.html(html);
                }
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
;(function(app,undef){
    app.definePage({
        name:'addCard',
        title:'添加银行卡',
        route : '/addDebitCard',
        template:'./templates/addDebitCard.tpl',

        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
            }
        },

        startup : function() {
            var that = this;
            var html = that.template();
            that.html(html);
            //console.log(window['app'].navigation.getParameter("card_type"));
            $(document).on("touchend","#addDebitCard .btn",function(){
               var card_no = $("#addDebitCard #cardNum").val();
                $.ajax({
                    url:AllUrl.bindCard,
                    dataType:"jsonp",
                    data:{
                        card_no:card_no,
                        card_type:window['app'].navigation.getParameter("card_type")
                    },
                    success:function(result){
                        if(result.code == 0){
                            var alert = {
                                body: '<p>绑定成功</p>',
                                buttons: {
                                    action: {
                                        title: '关闭',
                                        //fn: basicModal.close
                                        fn:function(){
                                            //console.log(2);
                                            $("#addDebitCard #cardNum").val("");
                                            basicModal.close();
                                        }

                                    }
                                }
                            }
                            basicModal.show(alert);
                        }else{
                            var alert = {
                                body: '<p>绑定失败：'+result.message+'</p>',
                                buttons: {
                                    action: {
                                        title: '关闭',
                                        //fn: basicModal.close
                                        fn:function(){
                                            //console.log(2);
                                            $("#addDebitCard #cardNum").val("");
                                            basicModal.close();
                                        }
                                    }
                                }
                            }
                            basicModal.show(alert);
                        }

                    },
                    error:function(error){
                        console.log(error);
                    }
                })
            })

        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
    app.definePage({
        name:'assetDetails',
        title:'投资记录',
        route : '/assetDetails',
        template:'./templates/assetDetails.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        toolbar:{
            html: '<nav class="footnav" id="foot-nav">' +
            '<a class="reco-cur" href="/ulicai/index.html?" dataid="reco">首页</a>' +
            ' <a class="supe" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
            ' <a class="asse" href="" dataid="asse">我的账户</a> ' +
            '<a class="more" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
            '</nav>', // html
            height: 50
        },

        plugins: {
            domevent: true,
            pullbounce: {
            }
        },

        _getDta: function (callback) {
            $.ajax({
                url:"/ulicai/data/assetDetails.json",
                dataType:"json",
                success:function(data){
                    callback(data);
                }
            })
        },

        startup : function() {
            var that = this;
            that._getDta(function(datas){
                var html = that.template(datas);
                that.html(html);
            });

            //document.title = "投资记录";

            $(document).on("tap","#assetDetails li",function(e){
                $("#assetDetails li").removeClass("cur");
                this.className = "cur";
                switch ($(this).attr("data-type")){
                    case "all":
                        $(".all").show();
                        $(".undue").hide();
                        $(".repay").hide();
                        $(".paid").hide();
                        break;
                    case "undue":
                        $(".all").hide();
                        $(".undue").show();
                        $(".repay").hide();
                        $(".paid").hide();
                        break;
                    case "repay":
                        $(".all").hide();
                        $(".undue").hide();
                        $(".repay").show();
                        $(".paid").hide();
                        break;
                    case "paid":
                        $(".all").hide();
                        $(".undue").hide();
                        $(".repay").hide();
                        $(".paid").show();
                        break;
                    default:
                        return;
                }

            });
        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
	app.definePage({
		name:'assets',
		title:'我的账户',
		route : '/asse',
		template:'./templates/assets.tpl',


		buttons : [
			{
				type : 'back',
				text : '< 返回'
			}
		],
		plugins: {
			domevent: true,
			pullbounce: {
				onPullDown: '_onPullDownHandler',
				onPullUp: '_onPullUpHandler'
			}
		},
		_onPullDownHandler : function(callback) {

		},
		_onPullUpHandler:function(callback){

		},
		toolbar:{
			html: '<nav class="footnav" id="foot-nav">' +
			'<a class="reco" href="/ulicai/index.html?" dataid="reco">首页</a>' +
			' <a class="supe" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
			' <a class="asse-cur" href="" dataid="asse">我的账户</a> ' +
			'<a class="more" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
			'</nav>', // html
			height: 50
		},
		_getDta: function (callback) {
			var url = AllUrl.acctInfo;
			$.ajax({
				url:url,
				dataType:"jsonp",
				success:function(json){
					console.log(1);
					console.log(json);
					if(json.code == "0000"){
						callback(json.data);
					}else{
						var alert = {
							body: '<p>数据查询出错</p>',
							buttons: {
								action: {
									title: '关闭',
									fn: basicModal.close
								}
							}
						}
						basicModal.show(alert);
						return;
					}

				}
			})
		},
		startup : function() {
			var that = this;
			that._getDta(function(datas) {
				var html = that.template(datas);
				that.html(html);
			});

			$(document).on("touchend",".assets,.allIncom",function(e){
				var el = $(e.currentTarget)[0].className;
				console.log(el);
				if(el.indexOf("assets") !== -1){
					window['app'].navigation.push("/earnDay");
				}else if(el.indexOf("allIncom") !== -1){
					window['app'].navigation.push("/totalEarn");
				}
			})

			$(document).on("touchend",".userCtrl span", function (e) {
				var el = $(e.currentTarget)[0].className;
				if(el == "logout"){
					$.ajax({
						url:AllUrl.logout,
						dataType:'jsonp',
						success: function (result) {
							window['app'].navigation.push("/login");
						}
					})
				}else if(el == "modPass"){
					window['app'].navigation.push("/modPass");
				}

			})

			$(document).on("touchend",".account-nav li", function (e) {
				e.preventDefault();
				var el = $(e.currentTarget)[0].className;

				if(el.indexOf("invest")!= -1){
					var alert = {
						body: '<p>正在建设中...</p>',
						buttons: {
							action: {
								title: '确定',
								fn: function (event) {
									basicModal.close();
								}
							}
						}
					}
					basicModal.show(alert);
					//window['app'].navigation.push("/assetDetails");
				}else if(el.indexOf("trade")!= -1){
					window['app'].navigation.push("/transaction");
				}else if(el.indexOf("bonus")!= -1){
					window['app'].navigation.push("/bonus");
				}else if(el.indexOf("card")!= -1){
					window['app'].navigation.push("/manageCard");
				}


			})
		},

		show: function() {

		},

		hide: function() {

		},

		teardown : function() {
			$(document).off();
		}
	});
})(window['app']);;(function(app, undef) {
    //产品详情->项目详情
   app.definePage({
        name : 'baseInfo',
        title : '项目详情',
        route:"/baseInfo",
        template : './templates/baseInfo.tpl',

        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }],

       plugins: {
           domevent: true,
           pullbounce: {
               onPullDown: '_onPullDownHandler',
               onPullUp: '_onPullUpHandler'
           }
       },
       _onPullDownHandler : function(callback) {

       },
       _onPullUpHandler:function(callback){

       },
        startup : function() {

            var that = this;
            var html = that.template({});
            that.html(html);

        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });

})(window['app']);;(function(app,undef){
    app.definePage({
        name:'bonus',
        title:'我的红包',
        route : '/bonus',
        template:'./templates/bonus.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],

        plugins: {
            dynamic: true,
            lazyload : true,
            scrollpos : true,
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {
            //向下拉刷新列表
            this.activeView.pageno = 1;
            this.activeView.render(function() {
                callback();
                setTimeout(function(){
                    app.plugin.lazyload.check();
                }, 500);
            });
        },
        _onPullUpHandler:function(callback){
            //上拉，加载更多页
            this.activeView.renderMore(function() {
                callback();
                setTimeout(function(){
                    app.plugin.lazyload.check();
                }, 500);
            });
        },

        startup : function() {
            var that = this;
            var	validBonusView = this.validBonusView = app.getView('validBonusView');
            var	invalidBonusView = this.invalidBonusView = app.getView('invalidBonusView');
            var activeView = validBonusView;

            this.validBonusView.render(function() {
                var html = that.template();
                that.html(html);
                $('.bonusList').append(validBonusView.el);
                console.log(validBonusView.el);
                setPara();
            });

            function setPara(){
                var param = window["app"].navigation.getParameter("content");
                if(param==="useful"){//应该重新获取可用红包，条件时间，投资金额，周期下可用，getData的url不同
                    $(".bonusType").hide();
                    $(".valid").on("touchend",".bonus",function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        var curEl = $(e.currentTarget).find(".worth");
                        var bonusWorth = $(curEl).attr("data-worth");
                        var bonusTitle = encodeURIComponent($($(e.currentTarget).find(".bonusTitle")).text());
                        window["app"].navigation.push("/purchase",{
                            type:"GET",
                            data:{
                                ct:bonusTitle,//红包类型
                                cw:bonusWorth,//红包价值
                                cId:$(curEl).attr("data-cId"),//红包ID
                                //worth:encodeURIComponent(bonusTitle+bonusWorth+"元"),
                                purchaseAmount:window['app'].navigation.getParameter("purchaseAmount"),
                                proTitle:window['app'].navigation.getParameter("proTitle"),
                                effects:window['app'].navigation.getParameter("effects"),
                                expect:window['app'].navigation.getParameter("expect"),
                                pid:window['app'].navigation.getParameter("pid"),
                                //bank:window["app"].navigation.getParameter("bank")
                                bt:window["app"].navigation.getParameter("bt"),//银行类型
                                tn:window["app"].navigation.getParameter("tn"),//尾号
                                //s:window["app"].navigation.getParameter("s"),//单笔限额
                                //d:window["app"].navigation.getParameter("d"),//每天限额
                                //m:window["app"].navigation.getParameter("m"),//每月限额
                                p:window["app"].navigation.getParameter("p"),//支付方式
                                pcode:window['app'].navigation.getParameter("pcode"),//银行类型
                                name:window["app"].navigation.getParameter("name"),//用户姓名
                                uid:window["app"].navigation.getParameter("uid")//身份证
                            }
                        });
                    });
                }
            }

            //tab切换处理
            $(document).on("touchend",".bonusType li",function(e){
                e.preventDefault();
                e.stopPropagation();
                $(".bonusType li").removeClass("cur");
                this.className = "cur";

                if($(this).attr("data-flag") == "valid"){
                    that.activeView = that.validBonusView;
                    $(".valid").show();
                    $(".invalid").hide();
                }else{
                    //获取数据
                    that.activeView = that.invalidBonusView;
                    that.invalidBonusView.render(function() {
                        $('.bonusList').append(that.invalidBonusView.el);
                        console.log(that.invalidBonusView.el);
                        $(".valid").hide();
                        $(".invalid").show();
                    });
                }
            });
        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app, undef) {
	//首页
	var listPage = app.definePage({
			name : 'defaultPage',
			title : '柚理财',
			template : './templates/defaultPage.tpl',

			buttons : [
				{
					type : 'back',
					text : '< 返回'
				}],

		plugins: {
			domevent: true,
			pullbounce: {
				onPullDown: '_onPullDownHandler',
				onPullUp: '_onPullUpHandler'
			}
		},
		_onPullDownHandler : function(callback) {

		},
		_onPullUpHandler:function(callback){

		},
			toolbar:{
				html: '<nav class="footnav" id="foot-nav">' +
				'<a class="reco-cur" href="/ulicai/index.html?" dataid="reco">首页</a>' +
				' <a class="supe" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
				' <a class="asse" href="/ulicai/index.html?#/asse" dataid="asse">我的账户</a> ' +
				'<a class="more" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
				'</nav>', // html
				height: 50
			},

			_getDta: function (callback) {
				$.ajax({
					url:AllUrl.getProds,
					dataType:"jsonp",
					success:function(json){
						console.log(json.data.upProductList[0]);
						callback(json.data.upProductList[0]);
					}
				})
			},
			startup : function() {

				var that = this;
				var proId;
				that._getDta(function(datas){
					proId = datas.productId;
					var html = that.template(datas);
					that.html(html);
				});

				$(document).on("touchend","#defaultView .buy", function (e) {
					e.preventDefault();
					window['app'].navigation.push('/productDetails?productId='+proId);

				})

			},

			show: function() {

			},

			hide: function() {

			},

			teardown : function() {
				$(document).off();
			}
		});

})(window['app']);;(function(app, undef) {
	//昨天收益详情
	app.definePage({
			name : 'earnDayPage',
			title : '理财推荐',
			route : '/earnDay',
			template : '<div id="earnDay-wrap"> <h4>昨日收益详情</h4></div>',
			buttons : [
				{
					type : 'back',
					text : '< 返回'
				}
			],

			plugins : {
				dynamic: true,
				lazyload : true,
				scrollpos : true,
				domevent: true,
				pullbounce: {
					onPullDown: '_onPullDownHandler',
					onPullUp: '_onPullUpHandler'
				}
			},
			_onPullDownHandler : function(callback) {
                //向下拉刷新列表
                this.earnDayView.pageno = 1;
                this.earnDayView.render(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			_onPullUpHandler:function(callback){
                //上拉，加载更多页
                this.earnDayView.renderMore(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			startup : function() {
				var that = this;
				var	earnDayView = this.earnDayView = app.getView('earnDayView');
				this.earnDayView.render(function() {
					var html = that.template({});
					that.html(html);
					$('#earnDay-wrap').append(earnDayView.el);
					console.log(earnDayView.el);
				});


			},

			show: function() {

			},

			hide: function() {

			},

			teardown : function() {
				var earnDayView = this.earnDayView;
				earnDayView.destroy();
				$(document).off();
			}
		});

})(window['app']);;(function(app,undef){
    app.definePage({
        name:'findPass',
        title:'找回密码',
        route : '/findPass',
        template:'./templates/findPass.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },

        startup : function() {
            var html = this.template();
            this.html(html);
            var that = this;

            var codeFlag = false;
            var tel;

            //发送验证码
           $("#findPass-wrap .sendIdCode").on("click",function(e){
                e.preventDefault();
                tel = $("#tel4find").val();
                var obj = verifyTel(tel);//验证是否注册？手机号是否正确;
                if(obj.flag){
                    $.ajax({
                        url:AllUrl.sendFindCode,
                        dataType:"jsonp",
                        data:{
                            mobile:tel
                        },
                        success: function (result) {
                            console.log(result);
                            if(result.code == "0000"){
                                codeFlag = true;
                                var el = $($("#findPass-wrap .sendIdCode")[0]);
                                el.addClass("dis");
                                var count = 60,str="";
                                var timerId = setInterval(function () {
                                    if(count > -1){
                                        str =  "("+count+"s)后重发";
                                        el.text(str);
                                        count--;
                                    }else{
                                        codeFlag = false;
                                        el.removeClass("dis");
                                        el.text("重发验证码");
                                        clearInterval(timerId);
                                    }
                                },1000);
                            }else{
                                popWin(result.message);
                            }


                        }
                    })
                }else{
                    popWin(obj.error);
                }

            });


            //确认
            $("#findPass-wrap .setNewPass").on("click",function(e){


                if(codeFlag){//在发送完验证码1分钟内

                    var verifyCode = $("#findPass-wrap #idCode4find").val();
                    if(!verifyCode){
                        popWin("请输入验证码");
                        return;
                    }

                    var newPass = $("#newPass").val();
                    var obj = verifyPass(newPass);
                    if(!obj.flag){
                        popWin(obj.error);
                        return;
                    }

                    var passAgain = $("#passAgain").val();
                    if(newPass !== passAgain){
                        popWin("两次输入的新密码不相同，请重新输入");
                        return;
                    }

                    $.ajax({
                        url:AllUrl.findPass,
                        dataType:"jsonp",
                        data:{
                            mobile:tel,
                            newPwd:md5(newPass),
                            verifyCode:verifyCode
                        },
                        success:function(data){
                            console.log(data);
                            var code = data.data.code;

                            //成功
                            if(code === "0000"){
                                window['app'].navigation.push("/login");
                            }else{
                                //失败
                                var desc = data.data.desc;
                               popWin(desc);

                            }

                        },
                        error:function(error){
                            popWin("系统错误，请稍后重试！");
                        }
                    });
                }else{
                    popWin("请重发验证码");
                }


            })
        },

        show: function() {

        },

        hide: function() {
        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
	//常见问题
	app.definePage({
		name:'help',
		title:'常见问题',
		route : '/help',
		template:'./templates/help.tpl',
		buttons:[{
			type:"back",
			text:"< 返回"
		}],
		plugins: {
			domevent: true,
			pullbounce: {
				onPullDown: '_onPullDownHandler',
				onPullUp: '_onPullUpHandler'
			}
		},
		_onPullDownHandler : function(callback) {

		},
		_onPullUpHandler:function(callback){

		},
		startup : function() {
			var html = this.template();
			this.html(html);
			//new IScroll("#help-wrap");
			//app.scroll.refresh();
			console.log(app.scroll);

		},

		show: function() {

		},

		hide: function() {

		},

		teardown : function() {
			$(document).off();
		}
	});
})(window['app']);;(function(app,undef){
    app.definePage({
        name:'login',
        title:'登录',
        route : '/login',
        template:'./templates/login.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },
        startup : function() {
            var html = this.template();
            this.html(html);
            var that = this;
            //document.title = "登录";

            //如果已经登录。跳转到“我的账户”
            var flag = false;
            var cookies = document.cookie.split(";");
            for(var i= 0,l=cookies.length;i<l;i++){
                var item = cookies[i];
                if(item.indexOf("userId") !== -1){
                    var userId = item.substring(item.indexOf("=")+1);
                    if(userId !== ""){
                        flag = true;
                    }
                }
            }

            if(flag){
                //已登录显示我的资产
                window['app'].navigation.push("/asse");
            }

            //点击注册
           $(".regist").on("click",function(e){
                e.preventDefault();
                app.navigation.push("/regist");

            });


            //登录
            $("#login-btn").on("click",function(e){
                var tel = $("#user").val();
                verifyTel(tel);
                var password = $("#password").val();

                $.ajax({
                    url:AllUrl.loginUrl,
                    dataType:"jsonp",
                    data:{
                        mobile:tel,
                        pwd:md5(password)
                        //pwd:password
                    },
                    success:function(data){
                        console.log(data);
                        var code = data.data.code;
                        //debugger;
                        //成功
                        if(code === "0000"){
                            window['app'].navigation.push("/asse");
                        }else{
                            //失败
                            var desc = data.data.desc;
                            var alert = {
                                body: '<p>'+desc+'</p>',
                                buttons: {
                                    action: {
                                        title: '确定',
                                        fn: basicModal.close
                                    }
                                }
                            }
                            basicModal.show(alert);

                        }

                    },
                    error:function(error){
                        var alert = {
                            body: '<p>'+"系统错误，请稍后重试！"+'</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                    }
                });
            })
        },

        show: function() {

        },

        hide: function() {
        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
    app.definePage({
        name:'manageCard',
        title:'银行卡管理',
        route : '/manageCard',
        template:'./templates/manageCard.tpl',

        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],

        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },

        _getDta: function (callback) {
            var url = AllUrl.getCardList;
            $.ajax({
                url:url,
                dataType:"jsonp",
                success:function(json){
                    console.log(json);
                    var result = json.data;
                        len = result.bindCardList.length;
                    if(len !== 0){
                        for(var i=0;i<len;i++){
                            var type = result.bindCardList[i].cardType.toString();
                            switch (type){
                                case "2":
                                    result.bindCardList[i].cardType = "储蓄卡";
                                    break;
                                case "3":
                                    result.bindCardList[i].cardType = "信用卡";
                                    break;
                                default :
                            }
                        }
                    }
                    callback(result);
                }
            })
        },

        startup : function() {
            var that = this;
            that._getDta(function(datas){
                var len = datas.canPayBankList.length;
                var html = that.template(datas);
                that.html(html);

                if(len == 0){
                   $("#canPayList").html("<p>暂无可支付银行卡</p>");
                }
                if(!(datas.bindCardList && datas.bindCardList.length && datas.bindCardList.length != 0)){
                    $("#bindList").html("<p>暂无绑定银行卡</p>");
                }
                //绑定银行卡
                $(document).on("click","span.addCard",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var popup = {
                        body: '<ul class="popAddCard"><li class="debitCard">添加储蓄卡</li><li class="creditCard">添加信用卡</li></ul>',
                        buttons: {
                            cancel: {
                                title: '取消',
                                class: basicModal.THEME.xclose,
                                fn: basicModal.close
                            }
                        }
                    }
                    basicModal.show(popup);

                })



                var useful = window['app'].navigation.getParameter("content");
                if(useful==="useful"){
                    $("#manageCard-wrap").on("touchend",".cardList",function(e){
                        //var bank = $($(e.currentTarget).find("li:nth-child(1)")).attr("data-bank");
                        //var tailNum = $($(e.currentTarget).find("li:nth-child(2)")).attr("data-tailNum");
                        //var bt = $(e.currentTarget).attr("data-bt");

                        window["app"].navigation.push("/purchase",{
                            type:"GET",
                            data:{
                                bt:encodeURIComponent($(e.currentTarget).attr("data-bt")),//银行类型
                                tn:$(e.currentTarget).attr("data-tn"),//尾号
                                //s:$(e.currentTarget).attr("data-s"),//单笔限额
                                //d:$(e.currentTarget).attr("data-d"),//每天限额
                                //m:$(e.currentTarget).attr("data-m"),//每月限额
                                p:$(e.currentTarget).attr("data-p"),//支付方式
                                pcode:$(e.currentTarget).attr("data-pcode"),//银行类型
                                //bank:bank+" 尾号（"+tailNum+"）",
                                purchaseAmount:window['app'].navigation.getParameter("purchaseAmount"),
                                proTitle:window['app'].navigation.getParameter("proTitle"),
                                effects:window['app'].navigation.getParameter("effects"),
                                expect:window['app'].navigation.getParameter("expect"),
                                pid:window['app'].navigation.getParameter("pid"),
                                ct:window['app'].navigation.getParameter("ct"),//红包类型
                                cw:window['app'].navigation.getParameter("cw"),//红包价值
                                cId:window['app'].navigation.getParameter("cId"),//红包Id
                                name:window["app"].navigation.getParameter("name"),//用户姓名
                                uid:window["app"].navigation.getParameter("uid")//身份证
                            }
                        })
                    });
                }
            });

            $(document).on("touchend",".popAddCard li",function(e){
                e.preventDefault();
                e.stopPropagation();
                basicModal.close();
                var cn = $(e.currentTarget)[0].className;
                if(cn == "debitCard"){
                    window['app'].navigation.push("/addDebitCard",{
                        type:"GET",
                        data:{
                            card_type:2
                        }
                    });
                }else if(cn == "creditCard"){
                    window['app'].navigation.push("/addDebitCard",{
                        type:"GET",
                        data:{
                            card_type:3
                        }
                    });
                }
            });

            $(".addCard").on("click",function(e){
                alert(1);
            });

           
        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
    app.definePage({
        name:'modPass',
        title:'修改密码',
        route : '/modPass',
        template:'./templates/modPass.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },

        startup : function() {
            var html = this.template();
            this.html(html);
            var that = this;
            var codeFlag = false;

            //发送验证码
           $("#modPass-wrap .sendIdCode").on("click",function(e){
               e.preventDefault();
               $.ajax({
                   url:AllUrl.sendModCode,
                   dataType:"jsonp",
                   success: function (result) {
                       console.log(result);
                       if(result.code == "0000"){
                           codeFlag = true;
                           var el = $($("#modPass-wrap .sendIdCode")[0]);
                           el.addClass("dis");
                           var count = 60,str="";
                           var timerId = setInterval(function () {
                               if(count > -1){
                                   str =  "("+count+"s)后重发";
                                   el.text(str);
                                   count--;
                               }else{
                                   codeFlag = false;
                                   el.removeClass("dis");
                                   el.text("重发验证码");
                                   clearInterval(timerId);
                               }
                           },1000);
                       }else{
                           popWin(result.message);
                       }

                   }
               })
            });

            //确认
            $("#modPass-wrap .setNewPass").on("click",function(e){
                var oldPwd = $("#modPass-wrap .oldPass").val();
                if(!oldPwd){
                    popWin("请输入旧密码");
                    return;
                }

                var newPwd = $("#modPass-wrap .newPass").val();
                if(!newPwd){
                    popWin("请输入新密码");
                    return;
                }

                var obj =  verifyPass(newPwd);
                if(!obj.flag){//新密码验证
                    popWin(obj.error);
                    return;
                }

                var verifyCode = $("#modPass-wrap .verifyCode").val();
                if(!verifyCode){
                    popWin("请输入验证码");
                    return;
                }

                if(codeFlag){
                    $.ajax({
                        url:AllUrl.modPass,//修改
                        dataType:"jsonp",
                        data:{
                            oldPwd:md5(oldPwd),
                            newPwd:md5(newPwd),
                            verifyCode:verifyCode
                        },
                        success:function(data){

                            //成功
                            if(data.code === "0000"){
                                window['app'].navigation.push("/login");
                            }else{
                                //失败
                                popWin(data.message);

                            }

                        },
                        error:function(error){
                            popWin("系统错误，请稍后重试！");
                        }
                    });
                }else{
                    popWin("请重发验证码");
                }

            })
        },

        show: function() {

        },

        hide: function() {
        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
	app.definePage({
		name:'morePage',
		title:'更多',
		route : '/more',
		template:'./templates/morePage.tpl',
		buttons:[{
			type:"back",
			text:"< 返回"
		}],
		plugins: {
			domevent: true,
			pullbounce: {
				onPullDown: '_onPullDownHandler',
				onPullUp: '_onPullUpHandler'
			}
		},
		_onPullDownHandler : function(callback) {

		},
		_onPullUpHandler:function(callback){

		},
		toolbar:{
			html: '<nav class="footnav" id="foot-nav">' +
			'<a class="reco" href="/ulicai/index.html?" dataid="reco">首页</a>' +
			' <a class="supe" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
			' <a class="asse" href="" dataid="asse">我的账户</a> ' +
			'<a class="more-cur" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
			'</nav>', // html
			height: 50
		},

		startup : function() {
			var html = this.template();
			this.html(html);
			$(document).on("touchend",".more-menu li", function (e) {
				e.preventDefault();
				var el = $(e.currentTarget)[0].className;
				//console.log(el);
				if(el.indexOf("help") !== -1){
					window['app'].navigation.push("/help");
				}else{
					var alert = {
						body: '<p>正在建设中...</p>',
						buttons: {
							action: {
								title: '确定',
								fn: function (event) {
									basicModal.close();
								}
							}
						}
					}
					basicModal.show(alert);
				}



			})

		},

		show: function() {

		},

		hide: function() {

		},

		teardown : function() {
			$(document).off();
		}
	});
})(window['app']);;(function(app, undef) {
    //产品详情->基本信息
   app.definePage({
        name : 'proInfo',
        title : '基本信息',
        route:"/proInfo",
        template : './templates/proInfo.tpl',

        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }],

       plugins: {
           domevent: true,
           pullbounce: {
               onPullDown: '_onPullDownHandler',
               onPullUp: '_onPullUpHandler'
           }
       },
       _onPullDownHandler : function(callback) {

       },
       _onPullUpHandler:function(callback){

       },


        _getDta: function (callback) {




        },

       _getDayObj:function(delta){
           if(typeof delta !=="number") return;
           var date = new Date(),
               year = date.getFullYear(),
               month = date.getMonth(),
               day = date.getDay(),endY,endM,endD;

           var endTime = new Date(date.getTime()+ delta*24*60*60);
           endY = endTime.getFullYear();
           endM = endTime.getMonth();
           endD = endTime.getDay();

           return {
               beginDay :year + ((month+1)<10 ? ("-0"+(month+1)):("-"+(month+1))) + ((day+1)<10 ? ("-0"+(day+1)):("-"+(day+1))),
               endDay : endY + ((endM+1)<10 ? ("-0"+(endM+1)):("-"+(endM+1))) + ((endD+1)<10 ? ("-0"+(endD+1)):("-"+(endD+1)))
           }

       },


        startup : function() {


            var that = this;
            var tmpData = {
                proTilte : decodeURIComponent(window['app'].navigation.getParameter("proTitle")),
                totalAmount : window['app'].navigation.getParameter("totalAmount"),
                effects : window['app'].navigation.getParameter("effects"),
                expect : window['app'].navigation.getParameter("expect")
            };
            dayObj = that._getDayObj(parseInt(tmpData.expect));
            tmpData.begainDay = dayObj.beginDay;
            tmpData.endDay = dayObj.endDay;

            var html = that.template(tmpData);
            that.html(html);

        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });

})(window['app']);;(function(app, undef) {
    //产品详情
   app.definePage({
        name : 'productDetails',
        title : '产品详情',
        route:"/productDetails",
        template : './templates/productDetails.tpl',

        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }],

       plugins: {
           domevent: true,
           pullbounce: {
               onPullDown: '_onPullDownHandler',
               onPullUp: '_onPullUpHandler'
           }
       },
       _onPullDownHandler : function(callback) {

       },
       _onPullUpHandler:function(callback){

       },

        _getDta: function (callback) {

            var url=AllUrl.getProds;
            var proId = window['app'].navigation.getParameter("productId");
            $.ajax({
                url:url+"&productId="+proId,
                dataType:"jsonp",
                success:function(json){
                    var result = json.data.upProductList[0];
                    console.log(result);
                    result["if(canBuy==true)"] = function(){
                        if(result.restAmount > 0){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    result["if(canBuy==false)"] = function(){
                        if(result.restAmount > 0){
                            return false;
                        }else{
                            return true;
                        }
                    }
                    callback(result);
                }
            })
        },
        startup : function() {

            var that = this;
            var cacheDate = {};
            that._getDta(function(datas){
                var html = that.template(datas);
                that.html(html);
                cacheDate.totalAmount = datas.totalAmount;//总金额
                cacheDate.effects = datas.rate;//预期年华收益
                cacheDate.expect = datas.prodPeriod;//理财期限
                cacheDate.minBuy = datas.minBuyAmount;//最少投资金额
                cacheDate.proTitle =datas.productName;//产品名称
                cacheDate.pid = datas.productId;//产品ID

            });
           
            $(document).on("touchend",".buyNow,.moreDetails span",function(e){
                e.preventDefault();

                var purchaseAmount = $("#purchaseAmount").val();//投资金额


                var elCN = this.className;

                if(elCN === "buyNow" ){
                    //判断是否登录
                    var isLogin = getCookieByName("userId");
                    //if(!isLogin){
                    if(false){
                        //没有登录，跳转登录页
                        //window['app'].navigation.push("/login");
                        //return;
                    }else{

                        var purNum = Number(purchaseAmount);
                        if(isNaN(purNum)){
                            popWin("请输入正确的数字");
                            return;
                        }else if(purchaseAmount < cacheDate.minBuy){
                            popWin(cacheDate.minBuy+'元起购');
                            return;
                        }

                        //跳转到购买页面
                        window['app'].navigation.push("/purchase",{
                            type:"GET",
                            data:{
                                purchaseAmount:purchaseAmount,
                                proTitle:encodeURIComponent(cacheDate.proTitle),
                                effects:cacheDate.effects,
                                expect:cacheDate.expect,
                                pid:cacheDate.pid
                            }
                        });
                    }
                }else if(elCN === "proInfo"){
                    //基本信息
                    window['app'].navigation.push("/baseInfo");

                }else if(elCN === "baseInfo"){
                    //项目详情
                    window['app'].navigation.push("/proInfo?totalAmount="
                        +cacheDate.totalAmount
                        +"&effects="+cacheDate.effects
                        +"&expect="+cacheDate.expect
                        +"&proTitle="+encodeURIComponent(cacheDate.proTitle));

                }



            })
            $(document).on("touchend",".gray",function(e){

                console.log("无效");
            })

        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });

})(window['app']);;(function(app,undef){
    app.definePage({
        name:'purchase',
        title:'购买',
        route : '/purchase',
        template:'./templates/purchase.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },
        _getDta:function(callback){

        },

        startup : function() {
            var data = {
                purchaseAmount:window['app'].navigation.getParameter("purchaseAmount"),//投资金额
                proTitle:decodeURIComponent(window['app'].navigation.getParameter("proTitle")),//产品名称
                effects:window['app'].navigation.getParameter("effects"),//年化收益
                expect:window['app'].navigation.getParameter("expect"),//理财期限
                pid:window['app'].navigation.getParameter("pid")//产品ID--提交
            };
            var expectIncome = 100;
            data.expectIncome = expectIncome;//估计收益


            var bt = decodeURIComponent(window["app"].navigation.getParameter("bt"));
            //data.bt = bt == "undefined"? "":bt;//银行类型

            var tn = window["app"].navigation.getParameter("tn");//尾号
            //var s = window["app"].navigation.getParameter("s");//单笔限额
            //var d = window["app"].navigation.getParameter("d");//每天限额
            //var m = window["app"].navigation.getParameter("m");//每月限额
            var p = window["app"].navigation.getParameter("p");//支付方式 --提交
            var pcode = window['app'].navigation.getParameter("pcode");//支持银行卡类型 --提交

            var ct = decodeURIComponent(window["app"].navigation.getParameter("ct"));
            data.ct = ct == "undefined"? "":ct;//红包类型
            data.cw = window["app"].navigation.getParameter("cw");//红包价值
            data.cId = window['app'].navigation.getParameter("cId");//红包ID--提交

            //判断是否已经实名认证
            var flag = getCookieByName("_i_r_");
            if(flag) {//已经认证过
                data.uInfoArr = [];
            }else{
                var name = decodeURIComponent(window["app"].navigation.getParameter("name"));
                name = name == "undefined"? "":name;//用户姓名
                var uid = window["app"].navigation.getParameter("uid");//用户身份证
                uid = uid == "undefined"? "":uid;
                data.uInfoArr = [{
                    name : name,
                    uid:uid
                }];
            }

            if(bt == "undefined"){//显示选择付款方式
                data.bt = "";
                data.payArr = [{}];
                data.payInfoArr = [];
            }else{//显示支付银行卡
                data.payArr = [];
                data.payInfoArr = [{
                    tn:tn,
                    //s:s,
                    //d:d,
                    //m:m,
                    p:p,
                    bt:bt,
                    pcode:pcode
                }];
            }


            var html = this.template(data);

            this.html(html);

            $.ajax({
                url:AllUrl.getRevenue,
                dataType:"jsonp",
                data:{
                    buyAmount:data.purchaseAmount,
                    productId:data.pid
                },
                success: function (result) {
                    console.log(result);
                    if(result.code == "0000"){
                        $("#purchaseAmount").attr("data","预计收益"+result.data.prosRevenue+"元");
                    }
                }
            });

            //获取银行卡信息,如果有已经绑定的读取一个
            var bindCard = {};
            $.ajax({
                url:AllUrl.getCardList,
                dataType:"jsonp",
                success:function(json){
                    console.log(json);
                    var result = json.data,len;
                    if(result.bindCardList && (len = result.bindCardList.length) != 0){
                        var item = result.bindCardList[0]
                        bindCard = {
                            tn:item.bankCardNum,
                            s:item.bankCardName,
                            //s:item.singleAmt,
                            //d:item.dayAmt,
                            //m:item.monthAmt,
                            p:item.paymentBankId,
                            pcode:item.bankCode,
                            bt:item.bankName
                        }
                    }
                }
            });

            //选择红包
            $(".getBonus").click(function(e){

                e.preventDefault();
                e.stopPropagation();
                window["app"].navigation.push("/bonus",{
                    type:'GET',
                    data:{
                        content:"useful",
                        purchaseAmount:data.purchaseAmount,
                        proTitle:encodeURIComponent(data.proTitle),
                        effects:data.effects,
                        expect:data.expect,
                        pid:data.pid,
                        bt:encodeURIComponent($(".blankName").attr("data-bt")),//银行类型
                        tn:$(".blankName").attr("data-tn"),//尾号
                        //s:$("#bankLimit").attr("data-s"),//单笔限额
                        //d:$("#bankLimit").attr("data-d"),//每天限额
                        //m:$("#bankLimit").attr("data-m"),//每月限额
                        p:$("#bankLimit").attr("data-p"),//支付方式
                        pcode:$(".blankName").attr("data-pcode"),//银行类型
                        name:encodeURIComponent($("#username").val()),//用户姓名
                        uid:$("#uid").val()//身份证
                    }
                });




            });

            //选择银行卡
            $(".getBank,.payInfo li:nth-child(1)").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                //var payWin =
                //{
                //    body:''
                //    +'<div id="wrapper"><div><div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div>'
                //    +'<div class="modal_div">招商银行</div></div></div>',
                //    buttons: {
                //        cancel: {
                //            title: 'Dismiss',
                //            class: basicModal.THEME.xclose,
                //            fn: basicModal.close
                //        }
                //    }
                //}
                //basicModal.show(payWin);

                //new IScroll('#wrapper', {
                //    mouseWheel: true,
                //    scrollbars: true
                //});

                window["app"].navigation.push("/manageCard",{
                    type:'GET',
                    data:{
                        content:"useful",
                        purchaseAmount:data.purchaseAmount,
                        proTitle:encodeURIComponent(data.proTitle),
                        effects:data.effects,
                        expect:data.expect,
                        pid:data.pid,
                        ct:encodeURIComponent($(".sltBonus").attr("data-ct")),//红包类型
                        cw:$(".sltBonus").attr("data-cw"),//红包价值
                        cId:$(".sltBonus").attr("data-cId"),//红包ID
                        name:encodeURIComponent($("#username").val()),//用户姓名
                        uid:$("#uid").val()//身份证
                    }
                });
            });

            //提交
            $(document).on("touchend",".doPurchase", function (e) {

                e.preventDefault();
                e.stopPropagation();
                console.log("rjuq");
                //未认证，需要姓名和身份证
                var name = $("#username").val();//姓名
                var idCard =$("#uid").val();//身份证
                if(!getCookieByName("_i_r_")){
                    if(!name){
                        popWin("姓名必须填写");
                        return;
                    }

                    var obj = verifyIdCard(idCard);
                    if(!obj.flag){//身份证格式
                       popWin(obj.error);
                        return;
                    }
                }

                var card_no = $("#bId").val(); //card_no和bankId二选一
                var bankId = $("#bId").attr("data-p");
                if(bankId == "undefined" || bankId == ""){
                    bankId = "";
                    var obj = verifyBankCode(card_no);
                    if(!obj.flag){//银行卡
                        popWin(obj.error);
                        return;
                    }
                }else{
                    card_no = "";
                }

                var productId = data.pid;
                var buyFee = data.purchaseAmount;
                var insCouponId = $(".sltBonus").attr("data-cId");
                var checked = $("#check-agree").val();
                console.log(checked);

                $.ajax({
                    url:AllUrl.pay,
                    dataType:"jsonp",
                    data:{
                        name:encodeURIComponent(name),
                        idCard:idCard,
                        card_no:card_no,
                        bankId:bankId,
                        productId:productId,
                        buyFee:buyFee,
                        insCouponId:insCouponId
                    },
                    success:function(json){
                        console.log(json);
                        if(json.code == "0000"){
                            popWin("购买成功");
                        }else{
                            popWin(json.message);
                        }

                    }
					error:function(error){
                            popWin("系统错误，请稍后重试！");
                        }                    
                });



            })


        },

        show: function() {


        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
	app.definePage({
		name:'regist',
		title:'注册',
		route : '/regist',
		template:'./templates/regist.tpl',
		
		buttons : [
			{
				type : 'back',
				text : '< 返回'
			}
		],

		plugins: {
			domevent: true,
			pullbounce: {
				onPullDown: '_onPullDownHandler',
				onPullUp: '_onPullUpHandler'
			}
		},
		_onPullDownHandler : function(callback) {

		},
		_onPullUpHandler:function(callback){

		},

		startup : function() {
			var html = this.template();
			this.html(html);
			var that = this;

			var tel,codeFlag = false;
			$(document).on("click","#registForm .verifyCode,#registBtn",function(e){
				var cn = $(e.currentTarget)[0].className;
				if(cn == "registBtn"){//注册
					if(codeFlag){//在发送完验证码1分钟内
						var verifyCode = $("#regist-wrap .code").val();
						if(!verifyCode){
							popWin("请输入验证码");
							return;
						}

						//处理注册
						var password = $("#passCode").val();
						var obj = verifyPass(password);
						if(!obj.flag){
							popWin(obj.error);
							return;
						}

						var passAgain = $("#passAgain").val();
						if(password !== passAgain){
							popWin("两次输入密码不相同,请重新输入");
							return;
						}

						$.ajax({
							url:AllUrl.registUrl,
							dataType:"jsonp",
							data:{
								mobile:tel,
								pwd:md5(password),
								verifyCode:verifyCode
							},
							success:function(data){
								console.log(data);
								var code = data.data.code;

								//成功
								if(code === "0000"){
									window['app'].navigation.push("/login");
								}else{
									//失败
									var desc = data.data.desc;
									popWin(desc);
								}

							},
							error:function(error){
								popWin("系统错误，请稍后重试！");
								return;
							}
						});
					}else{
						popWin("请重发验证码");
					}


				}else if(cn == "verifyCode"){
					//发送短信验证码
					tel = $("#telNum").val();
					var obj = verifyTel(tel);
					if(!obj.flag){//电话号码验证
						popWin(obj.error);
						return;
					}

					$.ajax({
						url:AllUrl.sendRegCode,
						data:{
							mobile:tel
						},
						dataType:'jsonp',
						success: function (result) {
							console.log(result);
							if(result.code == "0000"){
								codeFlag = true;
								var el = $($("#regist-wrap .verifyCode")[0]);
								el.addClass("dis");
								var count = 60,str="";
								var timerId = setInterval(function () {
									if(count > -1){
										str =  "("+count+"s)后重发";
										el.text(str);
										count--;
									}else{
										codeFlag = false;
										el.removeClass("dis");
										el.text("重发验证码");
										clearInterval(timerId);
									}
								},1000);
							}else{
								popWin(result.message);
							}

						}
					});							


				}

			});
		},

		show: function() {

		},

		hide: function() {
		},

		teardown : function() {
			$(document).off();
		}
	});
})(window['app']);;(function(app, undef) {
	//理财超市
	app.definePage({
			name : 'supermarketPage',
			title : '理财推荐',
			route : '/supe',
			template : './templates/supermarketPage.tpl',
			buttons : [
				{
					type : 'back',
					text : '< 返回'
				}
			],

			plugins : {
				dynamic: true,
				lazyload : true,
				scrollpos : true,
				domevent: true,
				pullbounce: {
					onPullDown: '_onPullDownHandler',
					onPullUp: '_onPullUpHandler'
				}
			},
			toolbar:{
				html: '<nav class="footnav" id="foot-nav">' +
				'<a class="reco" href="/ulicai/index.html?" dataid="reco">首页</a>' +
				'<a class="supe-cur" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
				'<a class="asse" href="" dataid="asse">我的账户</a> ' +
				'<a class="more" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
				'</nav>', // html
				height: 50
			},
			_onPullDownHandler : function(callback) {
                //向下拉刷新列表
                this.itemViews.pageno = 1;
                this.itemViews.render(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			_onPullUpHandler:function(callback){
                //上拉，加载更多页
                this.itemViews.renderMore(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			_getDta : function(callback) {
				//var url='/wstorm/CLtest/data/supermarket.json';
				var url =  AllUrl.getProds;//理财体验，目前无数据，只显示其他理财产品
				$.ajax({
					url :url,
					dataType : 'jsonp',
					success : function(json) {
						callback(json.data);
					}
				});
			},
			startup : function() {
				var that = this;
				var	itemViews = this.itemViews = app.getView('supermarketView');
				this.itemViews.render(function() {
					that._getDta(function(datas) {
						var html = that.template(datas);
						that.html(html);
						$('#supe-wrap').append(itemViews.el);
						console.log(itemViews.el);
					});
				});


			},

			show: function() {
				//var that = this,
				//	pageno = app.navigation.getParameter('pn') || 1,
				//	itemViews = this.itemViews
				//;
                //
				//itemViews.render({pageno: parseInt(pageno)}, function() {
				//	setTimeout(function(){
				//		app.plugin.lazyload.check();
				//	}, 500);
				//});

			},

			hide: function() {

			},

			teardown : function() {
				$(document).off();
			}
		});

})(window['app']);;(function(app, undef) {
	//昨天收益详情
	app.definePage({
			name : 'totalEarnPage',
			title : '理财推荐',
			route : '/totalEarn',
			template : '<div id="totalEarn-wrap"> <h4>累计收益详情</h4></div>',
			buttons : [
				{
					type : 'back',
					text : '< 返回'
				}
			],

			plugins : {
				dynamic: true,
				lazyload : true,
				scrollpos : true,
				domevent: true,
				pullbounce: {
					onPullDown: '_onPullDownHandler',
					onPullUp: '_onPullUpHandler'
				}
			},
			_onPullDownHandler : function(callback) {
                //向下拉刷新列表
                this.totalEarnView.pageno = 1;
                this.totalEarnView.render(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			_onPullUpHandler:function(callback){
                //上拉，加载更多页
                this.totalEarnView.renderMore(function() {
                    callback();
                    setTimeout(function(){
                        app.plugin.lazyload.check();
                    }, 500);
                });
			},
			startup : function() {
				var that = this;
				var	totalEarnView = this.totalEarnView = app.getView('totalEarnView');
				this.totalEarnView.render(function() {
					var html = that.template({});
					that.html(html);
					$('#totalEarn-wrap').append(totalEarnView.el);
					console.log(totalEarnView.el);
				});


			},

			show: function() {

			},

			hide: function() {

			},

			teardown : function() {
				var totalEarnView = this.totalEarnView;
				totalEarnView.destroy();
				$(document).off();
			}
		});

})(window['app']);;(function(app,undef){
    app.definePage({
        name:'transaction',
        title:'交易记录',
        route : '/transaction',
        template:'./templates/transaction.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        toolbar:{
            html: '<nav class="footnav" id="foot-nav">' +
            '<a class="reco-cur" href="/ulicai/index.html?" dataid="reco">首页</a>' +
            ' <a class="supe" href="/ulicai/index.html?#/supe" dataid="supe">理财推荐</a>' +
            ' <a class="asse" href="" dataid="asse">我的账户</a> ' +
            '<a class="more" href="/ulicai/index.html?#/more" dataid="more">更多</a> ' +
            '</nav>', // html
            height: 50
        },

        plugins : {
            dynamic: true,
            lazyload : true,
            scrollpos : true,
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {
            //向下拉刷新列表
            this.transactionView.pageno = 1;
            this.transactionView.render(function() {
                callback();
                setTimeout(function(){
                    app.plugin.lazyload.check();
                }, 500);
            });
        },
        _onPullUpHandler:function(callback){
            //上拉，加载更多页
            this.transactionView.renderMore(function() {
                callback();
                setTimeout(function(){
                    app.plugin.lazyload.check();
                }, 500);
            });
        },
        _getDta: function (callback) {
            $.ajax({
                url:"/ulicai/data/transaction.json",
                dataType:"json",
                success:function(data){
                    callback(data);
                }
            })
        },

        startup : function() {
            var that = this;
            var	transactionView = this.transactionView = app.getView('transactionView');

            this.transactionView.render(function() {
                that._getDta(function(datas) {
                    var html = that.template(datas);
                    that.html(html)
                    $('#transaction-wrap').append(transactionView.el);
                    console.log(transactionView.el);
                });
            });


           $(document).on("touchend",".record p",function(e){
               e.preventDefault();
               var el = $(e.target.nextElementSibling)[0];
               if($(el).hasClass("expand")){
                   $(el).removeClass("expand");
               }else{
                   $(el).addClass("expand");
               }
           });

        },

        show: function() {

        },

        hide: function() {

        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);;(function(app,undef){
    app.definePage({
        name:'personalCenter',
        title:'个人中心',
        route : '/personalCenter',
        template:'./templates/personalCenter.tpl',


        buttons : [
            {
                type : 'back',
                text : '< 返回'
            }
        ],
        plugins: {
            domevent: true,
            pullbounce: {
                onPullDown: '_onPullDownHandler',
                onPullUp: '_onPullUpHandler'
            }
        },
        _onPullDownHandler : function(callback) {

        },
        _onPullUpHandler:function(callback){

        },
        startup : function() {
            var html = this.template();
            this.html(html);
            var that = this;
            //document.title = "登录";

            //如果已经登录。跳转到“我的账户”
            var flag = false;
            var cookies = document.cookie.split(";");
            for(var i= 0,l=cookies.length;i<l;i++){
                var item = cookies[i];
                if(item.indexOf("userId") !== -1){
                    var userId = item.substring(item.indexOf("=")+1);
                    if(userId !== ""){
                        flag = true;
                    }
                }
            }

            if(flag){
                //已登录显示我的资产
                window['app'].navigation.push("/asse");
            }

            //点击注册
           $(".regist").on("click",function(e){
                e.preventDefault();
                app.navigation.push("/regist");

            });


            //登录
            $("#login-btn").on("click",function(e){
                var tel = $("#user").val();
                verifyTel(tel);
                var password = $("#password").val();

                $.ajax({
                    url:AllUrl.loginUrl,
                    dataType:"jsonp",
                    data:{
                        mobile:tel,
                        pwd:md5(password)
                        //pwd:password
                    },
                    success:function(data){
                        console.log(data);
                        var code = data.data.code;
                        //debugger;
                        //成功
                        if(code === "0000"){
                            window['app'].navigation.push("/asse");
                        }else{
                            //失败
                            var desc = data.data.desc;
                            var alert = {
                                body: '<p>'+desc+'</p>',
                                buttons: {
                                    action: {
                                        title: '确定',
                                        fn: basicModal.close
                                    }
                                }
                            }
                            basicModal.show(alert);

                        }

                    },
                    error:function(error){
                        var alert = {
                            body: '<p>'+"系统错误，请稍后重试！"+'</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                    }
                });
            })
        },

        show: function() {

        },

        hide: function() {
        },

        teardown : function() {
            $(document).off();
        }
    });
})(window['app']);