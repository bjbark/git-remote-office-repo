Ext.define('module.custom.inkopack.sale.dlvylist.DlvyList', { extend : 'Axt.app.Controller',

	models:[
		'module.custom.inkopack.sale.dlvylist.model.DlvyListMaster'
	],

	stores:[
		'module.custom.inkopack.sale.dlvylist.store.DlvyListMaster'
	],

	views : [
		'module.custom.inkopack.sale.dlvylist.view.DlvyListLayout',
		'module.custom.inkopack.sale.dlvylist.view.DlvyListSearch',
		'module.custom.inkopack.sale.dlvylist.view.DlvyListMaster',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-inkopack-dlvylist-layout button[action=selectAction]'					: { click : me.selectAction      }, /* 조회 */
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inkopack-dlvylist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inkopack-dlvylist-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-inkopack-dlvylist-master')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		console.log(master.getStore());
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
			if (success) {
				master.getSelectionModel().select(0);
			} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

});
