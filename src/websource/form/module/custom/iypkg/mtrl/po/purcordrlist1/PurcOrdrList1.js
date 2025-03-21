Ext.define('module.custom.iypkg.mtrl.po.purcordrlist1.PurcOrdrList1', {  extend   : 'Axt.app.Controller',

	models	: [
		'module.custom.iypkg.mtrl.po.purcordrlist1.model.PurcOrdrList1',
	],
	stores	: [
		'module.custom.iypkg.mtrl.po.purcordrlist1.store.PurcOrdrList1',
	],
	views	: [
		'module.custom.iypkg.mtrl.po.purcordrlist1.view.PurcOrdrList1Layout',
		'module.custom.iypkg.mtrl.po.purcordrlist1.view.PurcOrdrList1Lister',
		'module.custom.iypkg.mtrl.po.purcordrlist1.view.PurcOrdrList1Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordrlist1-layout button[action=selectAction]' : { click : me.selectAction },

			'module-purcordrlist1-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-purcordrlist1-lister button[action=insertAction]' : { click : me.insertAction },
			'module-purcordrlist1-lister button[action=exportAction]' : { click : me.exportAction },
			'module-purcordrlist1-lister button[action=deleteAction]' : { click : me.deleteAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-purcordrlist1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-purcordrlist1-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-purcordrlist1-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-purcordrlist1-lister')[0] },
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
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	exportAction : function(button){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

