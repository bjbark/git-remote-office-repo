Ext.define('module.user.usermast.UserMast', { extend : 'Axt.app.Controller',

	requires: [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.LaboRatePopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.WkrnPopup'
	],
	models	: [
		'module.user.usermast.model.UserMast',
		'module.user.usermast.model.UserMastItem1',
		'module.user.usermast.model.UserMastItem2'
		],
	stores	: [
		'module.user.usermast.store.UserMast',
		'module.user.usermast.store.UserMastItem1',
		'module.user.usermast.store.UserMastItem2'
		],
	views	: [
		'module.user.usermast.view.UserMastLayout',
		'module.user.usermast.view.UserMastLister',
		'module.user.usermast.view.UserMastSearch',
		'module.user.usermast.view.UserMastEditor',
		'module.user.usermast.view.UserMastListerItem',
		'module.user.usermast.view.UserMastListerItem1',
		'module.user.usermast.view.UserMastListerItem2'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-usermast-layout button[action=selectAction]' : { click : me.selectAction     },	// 조회
			'module-usermast-layout #mainpanel'                  : { tabchange : me.mainTabChange},
			'module-usermast-layout button[action=enrollment]'   : { click : me.enrollment       },	//1건등록(<)
			'module-usermast-layout button[action=remove]'       : { click : me.remove           },	//1건삭제(>)
			// editer event
			'module-usermast-editor button[action=updateAction]' : { click : me.updateAction     },	// 저장
			'module-usermast-editor button[action=cancelAction]' : { click : me.cancelAction     },	// 취소
			'module-usermast-editor button[action=passwdChange]' : { click : me.passwdChange     },	// 비밀번호 초기화
			'module-userinfo-editor button[action=pospwChange ]' : { click : me.pospwChange      },
			// lister event
			'module-usermast-lister button[action=modifyAction]' : { click : me.modifyAction     },	// 수정
			'module-usermast-lister button[action=insertAction]' : { click : me.insertAction     },	// 신규
			'module-usermast-lister button[action=exportAction]' : { click : me.exportAction     },	// 엑셀
			'module-usermast-lister button[action=deleteAction]' : { click : me.deleteAction     },	// 삭제
			// lister event
			'module-usermast-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout      : function () { return Ext.ComponentQuery.query('module-usermast-layout')[0] },
		search      : function () { return Ext.ComponentQuery.query('module-usermast-search')[0] },
		editor      : function () { return Ext.ComponentQuery.query('module-usermast-editor')[0] },
		lister      : function () { return Ext.ComponentQuery.query('module-usermast-lister')[0] },
		listeritem  : function () { return Ext.ComponentQuery.query('module-usermast-lister-item')[0] },
		listeritem1 : function () { return Ext.ComponentQuery.query('module-usermast-lister-item1')[0] },
		listeritem2 : function () { return Ext.ComponentQuery.query('module-usermast-lister-item2')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex != 0){
			Ext.Msg.alert("알림","사용자 목록에서 검색하여 주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectRecord : function( grid, record ) {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//수정
	modifyAction : function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
					results.feedback( {success : true, visible : true } );
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'user_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							user_idcd : keygen.records[0].seq,
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			params = editor.getValues(),
			msg    = ""
		;
		if(params.user_name == ''){
			Ext.Msg.alert('알림','사용자명을 입력하여 주십시오.');
			return;
		}else if(params.lgin_idcd == ''){
			Ext.Msg.alert('알림','ID를 입력하여 주십시오.');
			return;
		}else if(params.lgin_pswd == ''){
			Ext.Msg.alert('알림','패스워드를 입력하여 주십시오.');
			return;
		}
		if(_global.options.pswd_level>0){
			var	chk       = /[0-9a-zA-Z]/,
				pattern   = /[!@#$%^&*/]/gi
			;
			if((params.lgin_pswd.length<8 || !chk.test(params.lgin_pswd) || !pattern.test(params.lgin_pswd)) && _global.hqof_idcd === 'N1000SJFLV'){
				Ext.Msg.alert('알림','패스워드는 영문자, 숫자, 특수문자로 조합하여 입력해야합니다. (특수문자 : ! @ # $ % ^ & * /)');
				return;
			}
		}
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/listener/seq/checkCode.do',
						method		: "POST",
						async		: false,
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								table_nm	: "user_mast",
								column_nm1	: "user_code",
								notin_column: "user_idcd",
								code1		: record.get('user_code'),
								notin		: record.get('user_idcd'),
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								if(result.records[0].seq>0){
									msg = '중복된 코드입니다.';
									return;
								}
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						}
					});
					if (record.phantom && Ext.isEmpty(record.get('user_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'user_mast'
								})
							},
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('user_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true });
					}
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation) {
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			lister		= me.pocket.lister();
			tindex		= tabPanel.items.indexOf(newCard),
			listeritem	= me.pocket.listeritem(),
			listeritem1	= me.pocket.listeritem1(),
			listeritem2	= me.pocket.listeritem2(),
			records		= lister.getSelectionModel().getSelection()
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수정 또는 조회할 사용자를 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]
			listeritem.down('[name = user_code]').setValue(record.get('user_code'));
			listeritem.down('[name = user_name]').setValue(record.get('user_name'));
			listeritem.down('[name = dept_name]').setValue(record.get('dept_name'));
			listeritem.down('[name = wkrn_name]').setValue(record.get('wkrn_name'));

			listeritem1.select({
				callback:function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {user_idcd : record.get('user_idcd')},{stor_id : _global.stor_id}, {}) );

			listeritem2.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id}, {user_idcd : record.get('user_idcd')}) );
		}
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			listeritem1	= me.pocket.listeritem1(),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			lister		= me.pocket.lister(),
			mrecords	= lister.getSelectionModel().getSelection(),
			mrecord		= mrecords[0]
			selects		= listeritem2.getSelectionModel().getSelection();
		;
		if(selects.length == 0){
			Ext.Msg.alert("알림", "추가할 권한을 선택하여 주십시오.");
		}else{
			var i = 0;
			for( i = 0; i<selects.length; i++){
				record[i] = Ext.create( store.model.modelName , {
					_set			: 'insert',
					user_idcd		: mrecord.get('user_idcd'),
					auth_idcd		: selects[i].get('base_idcd'),
					auth_name		: selects[i].get('base_name'),
					line_stat		:'0'
				});
			}
			store.add(record);
			store.sync({
				callback: function(batch, options) {

				} ,
				scope: me
			},{	synchro : _global.objects.synchro} );
			listeritem1.select({
				callback:function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {user_idcd : mrecord.get('user_idcd')},{stor_id : _global.stor_id}, {}) );
			store2.reload();
		}
	},

	// > remove
	remove : function() {
		var me = this,
			listeritem	= me.pocket.listeritem(),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem1.getSelectionModel().getSelection()
		;
		if(selects.length == 0){
			Ext.Msg.alert("알림","삭제할 권한을 선택하여 주십시오.");
		}else{
			store.remove (selects);
			store.sync({
				callback : function() {
					store2.reload();
				}
			});
		}
	},

	/**
	 * POS PW 변경
	 */
	pospwChange : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			record = editor.getRecord(),
			values = editor.getValues()
		;
		if (!record.phantom && record && values){
			Ext.Msg.prompt('POS PW 변경', '변경할 PW를 입력 하여 주시기 바랍니다.', function(btn, text, cfg) {
				if(btn == 'ok' && !Ext.isEmpty(text)) {
					var new_pw = text ;
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
					mask.show();

					Ext.Ajax.request({
						url: _global.api_host_info+'/system/user/usermast/set/pospw.do',
						method:"POST",
						params: {
							token: _global.token_id,
							param: JSON.stringify({
								emp_id	: record.get('user_idcd') ,
								local_pw: text ,
								upt_id	: _global.login_pk
							})
						},
						success: function (response, request) {
							var result = Ext.decode(response.responseText);
							if (result.success){
								record.set('local_pw', new_pw);
								editor.down('[name=local_pw]').setValue(new_pw);
								lister.getStore().commitChanges();
								Ext.Msg.show({ msg: 'PW 변경 완료', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
							}else{
								Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
							}
						},
						failure: function (response, request) {},
						callback : function() {
								mask.hide();
						}
					});
				}
			});
		}
	},

//	//암호변경
//	passwdChange : function() {
//		var me = this,
//			editor = me.pocket.editor(),
//			lister = me.pocket.lister(),
//			record = editor.getRecord(),
//			values = editor.getValues()
//		;
//		console.log(values);
//		if(values.lgin_idcd == null || values.lgin_idcd == "") {
//			return Ext.Msg.alert('알림',  'ID를 먼저 입력해주세요.' );
//		}
//		if (record && values && !record.phantom ) {
//			resource.loadPopup({
//				widget		: 'lookup-passwd-popup',
//				apiurl		: {
//					master	: _global.api_host_info+'/system/user/usermast/set/passwd.do',
//				},
//				params		: {
//					emp_id	: record.data.emp_id,
//					upt_id	: _global.login_pk
//				},
//				result		: function(records) {
//				}
//			});
//		}
//	},
	//암호초기화
	passwdChange : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			record = editor.getRecord(),
			values = editor.getValues()
		;
		if(values.lgin_idcd == null || values.lgin_idcd == "") {
			return Ext.Msg.alert('알림',  'ID를 먼저 입력해주세요.' );
		}
		if(_global.options.init_pswd){
			Ext.Ajax.request({
				url: _global.api_host_info+'/system/user/usermast/set/pwreset.do',
				method:"POST",
				params: {
					token: _global.token_id,
					param: JSON.stringify({
						user_idcd	: record.get('user_idcd') ,
						new_pass	: _global.options.init_pswd ,
						updt_idcd	: _global.login_pk
					})
				},
				success: function (response, request) {
					var result = Ext.decode(response.responseText);
					console.log(result);
					if (result.success){
						editor.down('[name=lgin_pswd]').setValue(_global.options.init_pswd);
						Ext.Msg.show({ msg: 'PW 변경 완료', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
					}else{
						Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
					}
				},
				failure: function (response, request) {},
				callback : function() {
				}
			});
		}
	},

	//취소
	cancelAction : function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},


	//삭제
	deleteAction : function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},			// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }											// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});