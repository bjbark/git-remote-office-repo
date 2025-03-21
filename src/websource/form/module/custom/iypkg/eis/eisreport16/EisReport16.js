Ext.define('module.custom.iypkg.eis.eisreport16.EisReport16', { extend:'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.eis.eisreport16.model.EisReport16',
		'module.custom.iypkg.eis.eisreport16.model.EisReport16Chart'
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport16.store.EisReport16Lister1',
		'module.custom.iypkg.eis.eisreport16.store.EisReport16Detail',
		'module.custom.iypkg.eis.eisreport16.store.EisReport16',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Layout',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Lister1',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Detail1',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Detail2',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Search',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16Chart',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16WorkerSearch',
		'module.custom.iypkg.eis.eisreport16.view.EisReport16WorkerSearch2',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
//			'module-eisreport16-layout #mainpanel'                   : { tabchange : me.selectAction },	// 조회
//			'module-eisreport16-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
//			// lister1 event
//			'module-eisreport16-lister1 button[action=exportAction]' : { click : me.exportAction1 },	// 엑셀
//			// lister2 event
//			'module-eisreport16-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport16-layout') [0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport16-search') [0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-eisreport16-lister1')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-eisreport16-lister2')[0] },
		chart1	: function () { return Ext.ComponentQuery.query('module-eisreport16-chart1') [0] },
		chart2	: function () { return Ext.ComponentQuery.query('module-eisreport16-chart2') [0] },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister1.select({
			callback:function(records, operation, success) {
				if (success) {
					lister1.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		lister2.select({
			callback:function(records, operation, success) {
				if (success) {
					lister2.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});