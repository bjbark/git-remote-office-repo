Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-fabcmast-master2',
	store		: 'module.custom.iypkg.item.fabcmast.store.FabcMast2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-'
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_code'	, text : Language.get(''	,'매입처코드'	) , width : 140 , align : 'left'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'매입처명'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});