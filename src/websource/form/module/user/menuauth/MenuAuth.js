Ext.define('module.user.menuauth.MenuAuth', { extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.UserPopup' ,
		'lookup.popup.view.DeptPopup' ,
		'lookup.popup.view.StorePopup'
	],
	models   : [
		'module.user.menuauth.model.MenuAuthMaster',
		'module.user.menuauth.model.MenuAuthDetail'
	],
	stores   : [
		'module.user.menuauth.store.MenuAuthMaster',
		'module.user.menuauth.store.MenuAuthDetail'
	],
	views    : [
		'module.user.menuauth.view.MenuAuthLayout',
		'module.user.menuauth.view.MenuAuthListerMaster',
		'module.user.menuauth.view.MenuAuthListerDetail',
		'module.user.menuauth.view.MenuAuthSearch'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-menuauth-layout  button[action=selectAction]'        : { click : me.selectAction },
			'module-menuauth-lister-detail button[action=updateAction]'  : { click : me.updateAction },
			'module-menuauth-lister-detail button[action=exportAction]'  : { click : me.exportAction },
			'module-menuauth-lister-master ' : {
				selectionchange : me.selectRecord,
				itemdblclick    : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-menuauth-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-menuauth-search')[0] },
		lister	: {
			master	: function () { return Ext.ComponentQuery.query('module-menuauth-lister-master')[0] },
			detail	: function () { return Ext.ComponentQuery.query('module-menuauth-lister-detail')[0] }
		}
	},
	/**
	 * 조회
	 */
	selectAction:function() {
		var	me     = this,
			lister = me.pocket.lister.master(),
			param  = me.pocket.search().getValues()
		;
		param.pjt_id	=  _global.solution ;
		param.stor_grp	=  _global.stor_grp ;
		param.stor_gb	=  _global.stor_gb ;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.getStore().load({
			params:{param:JSON.stringify(param )}, scope:me,
			callback : function(records, operation, success) {
				if (success) {
					lister.getRootNode().expand();
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope : me
		});
	},

	/**
	 * 마스터 레코드가 변경이 될때
	 */
	selectRecord : function( grid, records ){
		var  me     = this,
			detail  = me.pocket.lister.detail()
		;
		detail.getStore().removeAll();
	},

	/**
	 *  디테일을 조회 한다.
	 */
	selectDetail : function(grid, record) {
		var	me = this,
			detail = me.pocket.lister.detail()
		;
		if (record.get('leaf')){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope    : me
			}, Ext.merge( me.pocket.search().getValues(),{
					pjt_id		: _global.solution,
					menu_id		: record.get('menu_id'),
					stor_grp	: _global.stor_grp,
//					admin_yn	: _global.admin_yn
					//auth_gb : record.get('auth_gb')
				}
			));
		}
	},


	/**
	 * 저장
	 */
	updateAction:function( ) {
		var me = this,
//			master = me.pocket.lister.master(),
//			select = master.getSelectionModel().getSelection()[0],
			detail = me.pocket.lister.detail()
			changs = detail.getStore().getUpdatedRecords().length
		;

		if (changs>0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = detail.getStore();

			setTimeout(function(){
				detail.getStore().sync({
					success : function(operation){  }, // 저장 성공시
					failure : function(operation){  }, // 저장 실패시 호출
					callback: function(operation){
						mask.hide();
						//me.selectDetail(master, select);
					}
				});
			}, 100);
		}
	},

	/**
	* 엑셀
	*/
	exportAction : function(button){
		var me = this,
			value = button.button
		;
		if ( value == 'detail' ){
			this.pocket.lister.detail().exportExcel({ redirect : { url : _global.api_host_info + '/system/user/menuauth/export/detail.do'} });
		}
	}
});