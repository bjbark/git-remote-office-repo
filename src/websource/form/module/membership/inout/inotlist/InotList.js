Ext.define('module.membership.inout.inotlist.InotList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
		'module.membership.inout.inotlist.model.InotList',
	],
	stores:
	[
		'module.membership.inout.inotlist.store.InotList',
	],
	views:
	[
		'module.membership.inout.inotlist.view.InotListLayout',
		'module.membership.inout.inotlist.view.InotListSearch',
		'module.membership.inout.inotlist.view.InotListLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inotlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-inotlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inotlist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inotlist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-inotlist-lister')[0] },
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
