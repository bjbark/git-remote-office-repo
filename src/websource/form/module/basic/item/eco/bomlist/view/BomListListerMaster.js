Ext.define('module.basic.item.eco.bomlist.view.BomListListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bomlist-master'			,
	store		: 'module.basic.item.eco.bomlist.store.BomListMaster'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging'
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'prnt_item_idcd'	, width: 110, align : 'center'	, text: Language.get('prnt_item_idcd'	,'품목ID'		), hidden : false
					},{	dataIndex:	'item_code'			, width: 110, align : 'center'	, text: Language.get('item_code'		,'품목코드'		)
					},{	dataIndex:	'item_name'			, width: 250, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, flex : 100, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					}
				]
			}
		;
		return item;
	}
});
