Ext.define('module.custom.iypkg.eis.eisreport18.EisReport18', {  extend   : 'Axt.app.Controller',
	models	: [
		'module.custom.iypkg.eis.eisreport18.model.EisReport18',
	],
	stores	: [
		'module.custom.iypkg.eis.eisreport18.store.EisReport18',
	],
	views	: [
		'module.custom.iypkg.eis.eisreport18.view.EisReport18Lister',
		'module.custom.iypkg.eis.eisreport18.view.EisReport18Layout',
		'module.custom.iypkg.eis.eisreport18.view.EisReport18Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-eisreport18-layout button[action=selectAction]' : { click : me.selectAction },
			'module-eisreport18-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-eisreport18-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-eisreport18-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-eisreport18-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
			} else {}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

