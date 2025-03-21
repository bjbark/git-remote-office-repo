Ext.define('module.membership.inout.lssnschdtoday.LssnSchdToday', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
		'module.membership.inout.lssnschdtoday.model.LssnSchdToday'
	],
	stores:
	[
		'module.membership.inout.lssnschdtoday.store.LssnSchdToday'
	],
	views:
	[
		'module.membership.inout.lssnschdtoday.view.LssnSchdTodayLayout',
		'module.membership.inout.lssnschdtoday.view.LssnSchdTodaySearch',
		'module.membership.inout.lssnschdtoday.view.LssnSchdTodayLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-lssnschdtoday-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-lssnschdtoday-lister button[action=exportAction]' : { click : me.exportAction }	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-lssnschdtoday-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-lssnschdtoday-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-lssnschdtoday-lister')[0] },
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
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
