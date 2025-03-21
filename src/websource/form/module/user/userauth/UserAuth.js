Ext.define('module.user.userauth.UserAuth', { extend   : 'Axt.app.Controller',
	requires: [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.StorePopup',
		'module.common.view.SearchBar',
		'module.common.view.SearchRowStatus'
	],

	models: [
		'module.user.userauth.model.UserAuthMaster',
		'module.user.userauth.model.UserAuthDetail',
		'module.user.userauth.model.UserAuthCopyPopup'
	],
	stores: [
		'module.user.userauth.store.UserAuthMaster',
		'module.user.userauth.store.UserAuthDetail',
		'module.user.userauth.store.UserAuthCopyPopup'
	],
	views: [
		'module.user.userauth.view.UserAuthLayout',
		'module.user.userauth.view.UserAuthListerMaster',
		'module.user.userauth.view.UserAuthListerDetail',
		'module.user.userauth.view.UserAuthSearch',
		'module.user.userauth.view.UserAuthCopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-userauth-layout			button[action=selectAction]	' : { click : me.selectAction  },
			'module-userauth-lister-master	button[action=exportAction] ' : { click : me.exportAction  },
			'module-userauth-lister-detail	button[action=AuthCopyAction]': { click : me.AuthCopyAction}, /* 메뉴 권한 복사 */
			'module-userauth-lister-detail	button[action=updateAction] ' : { click : me.updateAction  },
			'module-userauth-lister-detail	button[action=cancelAction] ' : { click : me.cancelAction  },
			'module-userauth-lister-master ' : {
				selectionchange : me.selectRecord,
				itemdblclick    : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-userauth-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-userauth-search')[0] },
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-userauth-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-userauth-lister-detail')[0] }
		}
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var	me = this,
			lister = me.pocket.lister.master(),
			search = me.pocket.search().getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback : function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope : me
		}, Ext.merge( me.pocket.search().getValues() , { stor_grp : _global.stor_grp, auth_gb : _global.auth_gb , admin_yn : _global.admin_yn  }));
	},

	/**
	 * 마스터 레코드가 변경이 될때
	 */
	selectRecord:function( grid, records ){
		var  me    = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().getRootNode().removeAll();
	},
	/**
	 *  디테일을 조회 한다.
	 */
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
		;
		if (record){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			detail.getStore().load({
			//detail.select({
				params:{
					param:JSON.stringify({
						prjt_idcd	: _global.solution,
						user_idcd	: record.get('user_idcd'),
						admn_yorn	: _global.admin_yn
					}
				)}, scope:me,
				callback : function(records, operation, success) {
					if (success) {
						detail.getRootNode().expand();
						detail.getRootNode().cascadeBy(function( record ) {
							if (record.internalId != 'root') {
								if (record.get('row_sts') != 0) {
									record.set('active_yn' , false);
								}
							}
						});
						detail.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope : me
			});
		}
	},

	/*
	 * 메뉴 권한 복사
	 */
	AuthCopyAction:function( ) {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(!select){
			Ext.Msg.show({ title: '오류', msg: '사용자를 선택해주시기 바랍니다.', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
			});
			return;
		}

		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-userauth-copypopup',
			params : { stor_grp : _global.stor_grp,
				user_idcd	: _global.emp_id,
				dept_idcd	: select.get('dept_idcd'),
				admn_yorn	: select.get('admn_yorn')
			},
			result : function(records) {
				Ext.Msg.show({ title: '오류', msg: _global.emp_id, icon: Ext.Msg.ERROR, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me});
				Ext.Msg.show({ title: '오류', msg: _global.lingin_id, icon: Ext.Msg.ERROR, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me});
				if (selects.get('user_idcd') == _global.emp_id ){
					Ext.Msg.show({ title: '오류', msg: '동일한 사용자를 선택하셨습니다!!!!', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
					});
					return;
				}
			}
		});
	},


	/**
	 * 저장
	 */
	updateAction:function( ) {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			lister = me.pocket.lister.detail(),
			changs = lister.getStore().getUpdatedRecords().length
		;
		if (changs>0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			setTimeout(function(){
				lister.getStore().sync({
					success : function(operation){  }, // 저장 성공시
					failure : function(operation){  }, // 저장 실패시 호출
					callback: function(operation){
						mask.hide();
						me.selectDetail(master, select);
					}
				});
			}, 100);
		}
	},

	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			lister = me.pocket.lister.detail()
		;
		lister.getStore().rejectChanges();
	},

	/**
	* 엑셀
	*/
	exportAction : function(button){
		var me = this,
			value = button.button
		;

		if ( value == 'master' ){
			this.pocket.lister.master().writer({enableLoadMask:true});
		}
	}
});