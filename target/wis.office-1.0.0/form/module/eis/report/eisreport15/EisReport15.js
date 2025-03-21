Ext.define('module.eis.report.eisreport15.EisReport15', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [
		'module.eis.report.eisreport15.model.EisReport15'
	],
	stores : [
		'module.eis.report.eisreport15.store.EisReport15'
	],
	views: [
		'module.eis.report.eisreport15.view.EisReport15Layout',
		'module.eis.report.eisreport15.view.EisReport15Lister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-eisreport15-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-eisreport15-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-eisreport15-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-eisreport15-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-eisreport15-lister')[0] },
	},


});
