Ext.define( 'module.basic.item.eco.bomlist.BomList', { extend:'Axt.app.Controller',

	models:[
		'module.basic.item.eco.bomlist.model.BomListMaster',
		'module.basic.item.eco.bomlist.model.BomList'
	],
	stores: [
		'module.basic.item.eco.bomlist.store.BomListMaster',
		'module.basic.item.eco.bomlist.store.BomList'
	],
	views : [
		'module.basic.item.eco.bomlist.view.BomListLayout',
		'module.basic.item.eco.bomlist.view.BomListListerMaster',
		'module.basic.item.eco.bomlist.view.BomListLister',
		'module.basic.item.eco.bomlist.view.BomListSearch',
		'module.basic.item.eco.bomlist.view.BomListImg',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-bomlist-layout button[action=selectAction]'	: { click : me.selectAction }, // 조회
			'module-bomlist-master'								: { itemdblclick    : me.selectDetail,
																		selectionchange : me.selectRecord },
			'module-bomlist-lister'								: { selectionchange : me.selectImge }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-bomlist-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-bomlist-search')[0] } ,
		lister  : function () { return Ext.ComponentQuery.query('module-bomlist-lister')[0] },
		master  : function () { return Ext.ComponentQuery.query('module-bomlist-master')[0] },
		img     : function () { return Ext.ComponentQuery.query('module-bomlist-img')[0] }
	},

	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectDetail : function(grid, record) {
		var me = this,
			master = me.pocket.master(),
			lister = me.pocket.lister(),
			select = me.pocket.master().getSelectionModel().getSelection()[0]
		;
		if (select) {
			lister.getStore().load({
				params:{
					param : JSON.stringify({
						prnt_item_idcd : select.get('prnt_item_idcd')
					})
				}
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						lister.getRootNode().expand();
						lister.getSelectionModel().select(0);
					} else {
					}
				}
			});
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			lister = me.pocket.lister(),
			img    = me.pocket.img()
		;
		lister.getStore().clearData();
		lister.getRootNode().removeAll();

		img.down('[name=item_imge]').setValue('');
		img.down('[name=item_imge2]').setValue('');
	},

	selectImge:function( grid, records ){
		var me = this,
			lister = me.pocket.lister(),
			img    = me.pocket.img(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if(select){
			img.down('[name=item_imge]').setValue(select.get('item_imge'));
			img.down('[name=item_imge2]').setValue(select.get('item_imge2'));
		}
	}
});