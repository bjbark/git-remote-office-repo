Ext.define('module.sale.sale.salelist3.SaleList3', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.sale.sale.salelist3.model.SaleList3',
	],
	stores	: [
		'module.sale.sale.salelist3.store.SaleList3',
	],
	views	: [
		'module.sale.sale.salelist3.view.SaleList3Layout',
		'module.sale.sale.salelist3.view.SaleList3Lister',
		'module.sale.sale.salelist3.view.SaleList3Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-salelist3-layout button[action=selectAction]' : { click : me.selectAction },
			'module-salelist3-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-salelist3-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-salelist3-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-salelist3-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-salelist3-lister')[0] },
	},

	//조회
	selectAction:function() {
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

