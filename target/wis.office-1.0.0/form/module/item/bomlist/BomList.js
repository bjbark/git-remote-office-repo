Ext.define( 'module.item.bomlist.BomList', { extend:'Axt.app.Controller',

	models:[
		'module.item.bomlist.model.BomListMaster',
		'module.item.bomlist.model.BomList'
	],
	stores: [
		'module.item.bomlist.store.BomListMaster',
		'module.item.bomlist.store.BomList'
	],
	views : [
		'module.item.bomlist.view.BomListLayout',
		'module.item.bomlist.view.BomListListerMaster',
		'module.item.bomlist.view.BomListLister',
		'module.item.bomlist.view.BomListSearch'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-bomlist-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			'module-bomlist-master'								: { itemdblclick    : me.selectDetail,
																	selectionchange : me.selectRecord }
		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-bomlist-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-bomlist-search')[0] } ,
		lister  : function () { return Ext.ComponentQuery.query('module-bomlist-lister')[0] },
		master  : function () { return Ext.ComponentQuery.query('module-bomlist-master')[0] }
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
			lister = me.pocket.lister()
		;
		lister.getStore().clearData();
		lister.getRootNode().removeAll();
	}
});