Ext.define('module.eis.report.eisreport14.EisReport14', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [
		'module.eis.report.eisreport14.model.EisReport14'
	],
	stores : [
		'module.eis.report.eisreport14.store.EisReport14'
	],
	views: [
		'module.eis.report.eisreport14.view.EisReport14Layout',
		'module.eis.report.eisreport14.view.EisReport14Search',
		'module.eis.report.eisreport14.view.EisReport14Lister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport14-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-eisreport14-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-eisreport14-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-eisreport14-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-eisreport14-lister')[0] },
	},


	//조회
	selectAction:function() {
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
