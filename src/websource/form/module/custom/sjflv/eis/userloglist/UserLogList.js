 Ext.define('module.custom.sjflv.eis.userloglist.UserLogList', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.UserPopup'],
	models	: ['module.custom.sjflv.eis.userloglist.model.UserLogList'],
	stores	: ['module.custom.sjflv.eis.userloglist.store.UserLogList'],
	views	: [
		'module.custom.sjflv.eis.userloglist.view.UserLogListLayout',
		'module.custom.sjflv.eis.userloglist.view.UserLogListSearch',
		'module.custom.sjflv.eis.userloglist.view.UserLogListLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-userloglist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event

			// lister event
			'module-userloglist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-userloglist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-userloglist-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-userloglist-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-userloglist-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc1date=param.invc1_date,
			invc2date=param.invc2_date
		;
		if(invc1date == null || invc2date == null || invc1date == '' || invc2date == ''){
			Ext.Msg.alert("알림","조회기간 반드시 입력해주세요.");
			return;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});