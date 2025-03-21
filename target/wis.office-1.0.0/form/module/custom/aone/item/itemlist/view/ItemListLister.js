Ext.define('module.custom.aone.item.itemlist.view.ItemListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-lister'			,
	store		: 'module.custom.aone.item.itemlist.store.ItemList'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: { ptype:'cellediting-directinput'},
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get('line_stat'		, '상태'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'line_stat' ),
					},{	dataIndex:	'item_code'			, width: 150, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 250, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 250, align : 'left'	, text: Language.get( 'item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'			, width: 80, align : 'center'	, text: Language.get( 'unit_name'		, '단위'		)
					},{	dataIndex:	'acct_bacd_name'	, width: 90, align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'	)
					},{	dataIndex:	'lcls_name'			, width: 150, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'			, width: 150, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'			, width: 150, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'		)
					},{	dataIndex:	'stok_mngt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'	) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'cstm_name'			, flex : 1  , align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'		)
					}
				]
			}
		;
		return item;
	}
});
