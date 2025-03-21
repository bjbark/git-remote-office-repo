Ext.define('module.custom.iypkg.prod.worklist2.WorkList2', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.iypkg.prod.worklist2.model.WorkList2',
	],
	stores	: [
		'module.custom.iypkg.prod.worklist2.store.WorkList2',
	],
	views	: [
		'module.custom.iypkg.prod.worklist2.view.WorkList2Layout',
		'module.custom.iypkg.prod.worklist2.view.WorkList2Lister',
		'module.custom.iypkg.prod.worklist2.view.WorkList2Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-worklist2-layout button[action=selectAction]' : { click : me.selectAction },
			'module-worklist2-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-worklist2-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-worklist2-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-worklist2-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
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
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

