Ext.define('module.custom.iypkg.eis.eisreport.EisReport', { extend:'Axt.app.Controller',

	requires : [

	],

	models : [
		'module.custom.iypkg.eis.eisreport.model.EisReportPoorLister',
		'module.custom.iypkg.eis.eisreport.model.EisReportPopup',
		'module.custom.iypkg.eis.eisreport.model.EisReportPopup2',
	],
	stores : [
		'module.custom.iypkg.eis.eisreport.store.EisReportPoorLister',
		'module.custom.iypkg.eis.eisreport.store.EisReportPopup',
		'module.custom.iypkg.eis.eisreport.store.EisReportPopup2',
	],
	views : [
		'module.custom.iypkg.eis.eisreport.view.EisReportLayout',
		'module.custom.iypkg.eis.eisreport.view.EisReportSearch',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor2',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor3',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor4',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor5',
		'module.custom.iypkg.eis.eisreport.view.EisReportEditor6',

		'module.custom.iypkg.eis.eisreport.view.EisReportPoorLister',
		'module.custom.iypkg.eis.eisreport.view.EisReportPoorPopup',
		'module.custom.iypkg.eis.eisreport.view.EisReportPopup',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-eisreport-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-eisreport-search')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-eisreport-editor')[0] },
	},

});
