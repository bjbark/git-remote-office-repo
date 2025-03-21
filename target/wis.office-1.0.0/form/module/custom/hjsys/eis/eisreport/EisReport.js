Ext.define('module.custom.hjsys.eis.eisreport.EisReport', { extend:'Axt.app.Controller',
	requires : [

	],
	models:[
		'module.custom.hjsys.eis.eisreport.model.EisReportMaster',
		'module.custom.hjsys.eis.eisreport.model.EisReportDetail1',
	],
	stores:[
		'module.custom.hjsys.eis.eisreport.store.EisReportMaster',
		'module.custom.hjsys.eis.eisreport.store.EisReportDetail1',
	],
	views: [
		'module.custom.hjsys.eis.eisreport.view.EisReportLayout',
		'module.custom.hjsys.eis.eisreport.view.EisReportEditor',
		'module.custom.hjsys.eis.eisreport.view.EisReportMaster',
		'module.custom.hjsys.eis.eisreport.view.EisReportDetail1',
	],
	initPermission: function(workspace, permission) {
		window.pagePoint = 0;
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout 		  : function () { return Ext.ComponentQuery.query('module-hjsys-eisreport-layout')[0] },
		editor 		  : function () { return Ext.ComponentQuery.query('module-hjsys-eisreport-editor')[0] },
		listermaster  : function () { return Ext.ComponentQuery.query('module-hjsys-eisreport-lister-master')[0] },
		listerdetail : function () { return Ext.ComponentQuery.query('module-hjsys-eisreport-lister-detail1')[0] },
	},
});
