Ext.define('com.controller.MainPswd', { extend:'Ext.app.Controller',
	requires:[
		'com.view.main.MainConf',
		'com.view.main.MainGear',
		'com.view.main.MainSignup',
		'Axt.popup.view.InvoiceSaleConfig',
		'Axt.Encrypts',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.CstmPopup4'
	],
	views: ['com.view.main.MainPswd' , 'com.view.main.MainMenu' , 'com.view.main.MainHead' ],

	refs: [
		{ref: 'viewport'    , selector: 'viewport' },
		{ref: 'mainPswd'    , selector: 'mainpswd' },
		{ref: 'mainMenu'    , selector: 'mainmenu' },
		{ref: 'mainHead'    , selector: 'mainhead' },
		{ref: 'stor_id'     , selector: 'textfield[name="stor_id"]'},
		{ref: 'login_id'    , selector: 'textfield[name="login_id"]'},
		{ref: 'password'    , selector: 'textfield[name="password"]'},
		{ref: 'lang_gbcd'   , selector: 'lookupfield[name="lang_gbcd"]'},
		{ref: 'accessor'    , selector: 'textfield[name="accessor"]'},
		{ref: 'remember'    , selector: 'checkbox[name="remember"]'}
	],
	init: function() {
		var me = this,
			template,
			_process = Ext.isEmpty(_access.process) ? {
				location : '' ,
				accessor : '' ,
				onscreen : false,
				protocol : {},
			} :  Ext.decode(  _access.process )
		;
		_access.onscreen = _process.onscreen ;
		_access.accessor = _process.accessor ;
		_access.protocol = _process.protocol ;

		if(sessionStorage.accepted && sessionStorage.template){ // 새로고침
			try{
				me.doLoginAction(Ext.decode(Axt.Encrypts.decode(sessionStorage.template)));
			}catch(e){
				sessionStorage.removeItem('accepted');
				sessionStorage.removeItem('template');
			}
		} else { // 새로고침 아닌경우
			me.control({
				'mainpswd button[action=login]': { click: this.loginAction },
				'mainpswd button[action=setup]': { click: this.setupAction },
				'mainpswd button[action=gear]' : { click: this.gearAction },
				'mainpswd button[action=signup]' : { click: this.signupAction },
			});
			if(!Ext.isEmpty(_access.process)){ // 외부 로그인인 경우
				var licenses = localStorage.getItem('licenses'),
					identify = Ext.merge( (licenses) ? Ext.decode(Encrypts.decode(licenses)) : {} , _process);
				;
				if (!Ext.isEmpty(identify.location)){
					window.location.hash = '#!'+ identify.location ;
				}
				if (_access.accessor == 'pos') {
					setTimeout(function(){
						me.doLoginAction({
							stor_id  : identify.stor_id,
							login_id : identify.login_id,
							password : identify.password,
							accessor : identify.accessor
						});
					},200);
				}
			}
			delete _access.process;
		}
	},

	/**
	 * 로그인 액션
	 */
	loginAction:function(button){
		var me = this;
		// 로그인버튼 중복 클릭 방지를 위해 disable한다.
		if (button) {
			button.setDisabled(true);
		}


		me.doLoginAction({
			stor_id  : me.getStor_id().getValue(),
			login_id : me.getLogin_id().getValue(),
			password : me.getPassword().getValue(),
			lang_gbcd: me.getLang_gbcd().getValue(),
			accessor : me.getAccessor().getValue()
		});
	},

	/**
	 * 로그인 액션<br/>
	 * 일반사용자, 개발자용 로그인 모두 이곳을 호출
	 */
	doLoginAction:function(values){
//		localStorage.removeItem('licenses');
		var me = this,
			licenses = localStorage.getItem('licenses'),
			identify = {}
		;
		var hq_chg = values.stor_id;
		if	(hq_chg.length < 11) {
			hq_chg = 'N1000'+hq_chg+'1000';
		}
		_global.hq_id		= hq_chg.substring(0,10);
		_global.hqof_idcd	= hq_chg.substring(0,10);
		_global.stor_id		= 'N1000'+values.stor_id ;
		_global.login_pk	= values.login_id ;
		_global.login_id	= values.login_id ;
		_global.stor_grp	= hq_chg;
		_global.frc_chg		= values.auth_frc;
		_global.brc_chg		= values.auth_stor_grp;
		var param1 = {
			hq_id	: _global.hq_id
		};
		var error = "";
	 	Ext.Ajax.request({
			url		: _global.location.http() + '/auth/systemoption.do' ,
			method	: "POST",
			params	: {
				param: Ext.encode(param1)
			},
			async	: false,
			success: function (response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if (result.success){
					var record = result.records ;
					Ext.merge( _global.options, record );
				}else{
//					Ext.Msg.show({ msg: '사업자번호를 확인해주세요.', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
//					Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
					error = '사업자번호를 확인해주세요.';

				}
			},
			failure: function (response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	 	if(error != ""){
			me.gearAction();
			Ext.Msg.alert('알림',error);
			me.getMainPswd().down('[action=login]').setDisabled(false);

			return;
	 	}
		console.log('options is ',_global.options);
		document.getElementById('theme1').setAttribute("href", 'resource/sdk/extjs/resources/css/'+_global.options.theme+'.css');
		if (licenses) {
			identify = Ext.decode(Encrypts.decode(licenses));
		} else {
			if (_access.accessor != 'pos' ) {
				if (values.login_id != 'developer') {
					if (_global.options.cert_chck_yorn == '1') {
						Ext.Msg.alert(Const.NOTICE , '초기설정후 사용하시기 바랍니다..');
						me.getMainPswd().down('[action=login]').setDisabled(false);
				 		return false;
					}
				}
			}
		}


		if( ! me.loginValidationCheck(values, param)) {
			return false;
		}

		// url에 전달될 파라미터
		var param = {
				hq_id    : _global.hq_id  ,
				stor_id  : values.stor_id   ,
				stor_wk  : values.stor_wk   ,
				login_id : values.login_id   ,
				cert_idcd: identify.cert_idcd ,
				cert_code: identify.cert_code ,
				password : values.password   ,
				accessor : values.accessor   ,
				solution : _global.solution  ,
				app_name : _global.app_site
		};
	 	Ext.Ajax.request({
			url: _global.location.http() + '/auth/identify.do' ,
			method:"POST",
			params: {
				param: Ext.encode(param)
			},
			success: function (response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if (me.getMainPswd())
					me.getMainPswd().down('[action=login]').setDisabled(false);
				if (result.success){
					var record = result.records ;
					Ext.merge( _global, record );
//					console.log('record is ' , record)
					_global.stor_id = _global.hq_id + '1000'
					sessionStorage.accepted = true ;
					sessionStorage.template = Axt.Encrypts.encode(JSON.stringify( values ) );



					Ext.Ajax.request({
						url: _global.location.http() + '/auth/provider.do',
						method : "POST",
						params : {
							token : _global.token_id,
							param : Ext.encode({
								hq_id  : _global.hq_id
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								_global.provider		= result.records[0].provider;
								_global.hq_grp        	= result.records[0].hq_grp;
								_global.hq_gb         	= result.records[0].hq_gb;
								_global.logo_url      	= result.records[0].logo_url;
								_global.pos_ddns      	= result.records[0].pos_ddns;
								_global.web_ddns      	= result.records[0].web_ddns;
								_global.img_ddns      	= result.records[0].img_ddns;
								_global.img_http      	= result.records[0].img_http;
								_global.epo_ddns   		= result.records[0].epo_ddns;
								_global.taxdb_id	  	= result.records[0].taxdb_id;
								_global.smsdb_id		= result.records[0].smsdb_id;
								_global.regex_itm_ds  	= result.records[0].regex_itm_ds;
								_global.regex_itm_sn  	= result.records[0].regex_itm_sn;
								_global.regex_cust_sn 	= result.records[0].regex_cust_sn;
								_global.regex_vend_sn 	= result.records[0].regex_vend_sn;
								_global.ftp_url			= 'ftp://'+result.records[0].img_http;
//								if(_global.hq_id){
//									Ext.Ajax.request({
//										url: _global.location.http() + '/auth/connectXml.do',
//										method : "POST",
//										params : {
//											token : _global.token_id,
//											param : Ext.encode({
//												hq_id  : _global.hq_id
//											})
//										},
//										success : function(response, request) {
//											var object = response,
//												result = Ext.decode(object.responseText)
//											;
//											if (result.success) {
//											} else {
//											}
//										},
//										failure : function(response, request) {
//											resource.httpError(response);
//										},
//										callback : function() {
//										}
//									});
//								}

							} else {
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});

//TODO 여기가 로그인 및 새로고침시 처리되는 곳. 아래가 이동(리다이렉트)

//					Notification.requestPermission(); //https에서만 처리가능
//					if(Notification.permission==="granted"){
//						var cont = "";
//
//						Ext.Ajax.request({
//							url: _global.location.http() + '/notice/noticeview/get/notification.do',
//							method : "POST",
//							async : false,
//							params : {
//								token : _global.token_id,
//								param : Ext.encode({
//									empy_idcd  : _global.login_pk
//								})
//							},
//							success : function(response, request) {
//								var object = response,
//									result = Ext.decode(object.responseText)
//								;
//								if (result.success) {
//									if(result.records.length > 0){
//										if(result.records[0].ntce_ttle){
//											cont = result.records[0].ntce_ttle.replace(/,/gi,'\n');
//										}
//									}
//								} else {
//								}
//							},
//							failure : function(response, request) {
//								resource.httpError(response);
//							},
//							callback : function() {
//							}
//						});
//						if(cont != ""){
//							var opt1 = { title : '알림', body:cont, requireInteraction:true}
//							var t1 = new Notification(opt1.title,opt1);
//							t1.onclick = function(e){
//								window.location.hash = _global.options.notification_path;
//								me.viewportChang();
//							}
//						}
//					}

					if(_global.options.dashboard_used_yorn == '1' && sessionStorage.getItem('dashboard') == null){
						sessionStorage.setItem('dashboard', '1');
						window.location.hash = _global.options.dashboard_path;
						me.viewportChang();
					}else{
						me.viewportChang();
					}
					//me.screenSetting();
					// 성공시에는 me.getMainPswd().down('[action=login]').setDisabled(false);를 하지 않는다.
				}else{
					sessionStorage.removeItem('accepted');
					sessionStorage.removeItem('template');
					Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				}
			},
			failure: function (response, request) {
				resource.httpError(response);
				sessionStorage.removeItem('accepted');
				sessionStorage.removeItem('template');
				if (me.getMainPswd())
					me.getMainPswd().down('[action=login]').setDisabled(false);
			}
		});
		var param2 = {
				hq_id    : _global.hq_id,
				login_id : _global.login_id
		};
	 	Ext.Ajax.request({
			url: _global.location.http() + '/auth/userauth.do' ,
			method:"POST",
			params: {
				param: Ext.encode(param2)
			},
			success: function (response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if (result.success){
					var record = result.records ;
//					console.log('record :', record);
//					console.log('auth :', _global);
					Ext.merge( _global.auth, record );
				}else{
					Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				}
			},
			failure: function (response, request) {
				resource.httpError(response);
			},
			callback : function() {
//				console.log('auth is ',_global.auth)
			}
		});
	},

	/**
	 * @private
	 * 로그인직전 유효성 체크
	 */
	loginValidationCheck : function ( values, param ) {
		var me = this
		;
		if(Ext.isEmpty(values.stor_id)){
			Ext.Msg.alert(Const.NOTICE , '사업장 ID를 입력하여 주시기 바랍니다.');
			me.getMainPswd().down('[action=login]').setDisabled(false);
			return;
		}
		if(Ext.isEmpty(values.login_id)){
			Ext.Msg.alert(Const.NOTICE , '로그인 ID를 입력하여 주시기 바랍니다.!!');
			me.getMainPswd().down('[action=login]').setDisabled(false);
			return;
		}
		if(Ext.isEmpty(values.password)){
			Ext.Msg.alert(Const.NOTICE , '패스워드를 입력하여 주시기 바랍니다.');
			me.getMainPswd().down('[action=login]').setDisabled(false);
			return;
		}
		_global.lang_gbcd = values.lang_gbcd;
		return true;
	},

	/**
	 * 뷰 포트를 메인 화면으로 변경한다.
	 */
	viewportChang : function(){
		var me   = this,
			param = {
				pjt_id		: _global.solution.toLowerCase(),
				hq_id		: _global.hq_id,
				lang_gbcd	: _global.lang_gbcd
			};
		resource.loadResource({
			type    : 'ajax' ,
			method  : 'POST' ,
			params  : {
				token : _global.token_id,
				param : JSON.stringify({
						hq_id		: _global.hq_id  ,
						pjt_id		: _global.solution ,
						site_id		: _global.hq_grp,
						lang_gbcd	: _global.lang_gbcd
					}
				)
			},
			url		: _global.location.http() + '/auth/resource.do',
			callback: function(records, operation, success) {
				Language.setConfig({
					ajaxConfig : { method : 'GET', params : { param:JSON.stringify(param) }},
					language   : navigator.language, // 'en',
					tpl        : _global.location.http() + '/auth/language.do',
					type       : 'ajax'
				});
				/* 언어 설정 초기화 */
				Language.init( function(  ){
					/* login지우고 main띄우기 */
					com.app.viewMain();
					/* 사용자 화면 메뉴 설정 */
					me.screenSetting();

					me.getMainHead().down('#login_user').setText( '<span style="text-decoration:underline;"><font color="blue">' + _global.login_nm + '</font></span>');
					me.getMainMenu().down('#login_user').setText( '<span style="text-decoration:underline;"><font color="blue">' + _global.login_nm + '</font></span>');
					var workedit     = me.getMainMenu().down('#stor_nm');
					var workeditform = me.getMainMenu().down('[name=stor_form]');
					if  (workedit) {
						workedit.setValue(_global.stor_nm);
					}
					if (!Ext.isEmpty(_global.options.logo_name)){
						me.getMainMenu().down('#login_logo').update( '<img src="resource/img/' + _global.options.logo_name + '" width="188" height="45">');
					}

				});
			}
		});
	},

	/**
	 * 사용자 화면 메뉴를 설정 한다.
	 */
	screenSetting : function(){
		var me = this, tree = me.getMainMenu(), head = me.getMainHead();
		var param = {
			pjt_id		: _global.solution.toLowerCase(),
			hq_id		: _global.hq_id,
			admin_yn	: _global.admin_yn,
			stor_id		: _global.stor_id,
			login_id	: _global.login_id,
			login_pk	: _global.login_pk,
			stor_grp	: _global.stor_grp,
			lang_gbcd	: _global.lang_gbcd
		};

		tree.getStore().load({
			params:{ token : _global.token_id, param :JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					tree.getRootNode().expand();
				}
			}
		});
	},

	/**
	 * 초기설정 팝업 띄우기
	 */
	setupAction : function(button, e) {
		var me = this;
		var stor_id = me.getStor_id();

		resource.loadPopup({
			widget : 'popup-main-conf',
			title  : '초기설정',
			result : function(license){
				stor_id.setValue(license.stor_id)
		 	}
		});
	},
	/**
	 * 사업자설정 팝업 띄우기
	 */
	gearAction : function(button, e) {
		var me = this;
		var stor_id = me.getStor_id()
		resource.loadPopup({
			widget : 'popup-main-gear',
			title  : '사업장설정',
			result : function(values){
				stor_id.setValue(values.stor_id)
		 	}
		});
	},
	
	/**
	 * 회원가입 팝업 띄우기
	 */
	signupAction : function(button, e) {
		var me = this;
		var stor_id = me.getStor_id();

		resource.loadPopup({
			widget : 'popup-main-signup',
			title  : '회원가입',
			result : function(values){
				stor_id.setValue(values.stor_id)
		 	}
		});
	},
});