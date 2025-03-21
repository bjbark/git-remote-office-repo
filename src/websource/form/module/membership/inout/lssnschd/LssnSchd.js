Ext.define('module.membership.inout.lssnschd.LssnSchd', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
		'module.membership.inout.lssnschd.model.LssnSchd'
	],
	stores:
	[
		'module.membership.inout.lssnschd.store.LssnSchd'
	],
	views:
	[
		'module.membership.inout.lssnschd.view.LssnSchdLayout',
		'module.membership.inout.lssnschd.view.LssnSchdSearch',
		'module.membership.inout.lssnschd.view.LssnSchdLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-lssnschd-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-lssnschd-lister button[action=exportAction]' : { click : me.exportAction }	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-lssnschd-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-lssnschd-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-lssnschd-lister')[0] },
	},


	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
					me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//엑셀
	exportAction : function(){
//		this.pocket.lister().writer({enableLoadMask:true});
		this.pocket.lister().excelExport();
	}
});
