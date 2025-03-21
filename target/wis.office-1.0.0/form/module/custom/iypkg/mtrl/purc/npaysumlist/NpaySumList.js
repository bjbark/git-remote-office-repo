Ext.define('module.custom.iypkg.mtrl.purc.npaysumlist.NpaySumList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.custom.iypkg.mtrl.purc.npaysumlist.model.NpaySumList',
	],
	stores	: [
		'module.custom.iypkg.mtrl.purc.npaysumlist.store.NpaySumList',
	],
	views	: [
		'module.custom.iypkg.mtrl.purc.npaysumlist.view.NpaySumListLayout',
		'module.custom.iypkg.mtrl.purc.npaysumlist.view.NpaySumListLister',
		'module.custom.iypkg.mtrl.purc.npaysumlist.view.NpaySumListSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-npaysumlist-layout button[action=selectAction]' : { click : me.selectAction },

			'module-npaysumlist-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-npaysumlist-lister button[action=insertAction]' : { click : me.insertAction },
			'module-npaysumlist-lister button[action=exportAction]' : { click : me.exportAction },
			'module-npaysumlist-lister button[action=deleteAction]' : { click : me.deleteAction },

			'module-npaysumlist-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-npaysumlist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-npaysumlist-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-npaysumlist-lister')[0] },
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
//				lister.getSelectionModel().select(0);
			} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

