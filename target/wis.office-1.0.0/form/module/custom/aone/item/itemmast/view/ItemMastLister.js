Ext.define('module.custom.aone.item.itemmast.view.ItemMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-lister'			,
	store		: 'module.custom.aone.item.itemmast.store.ItemMast'	,
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width: 50,  align : 'center'	, text: Language.get( 'line_stat'		, '상태'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'line_stat' ),
					},{	dataIndex:	'acct_bacd_name'	, width: 90,  align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'	)
					},{	dataIndex:	'item_code'			, width: 150, align : 'center'	, text: Language.get( 'item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 250, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 250, align : 'left'	, text: Language.get( 'item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'			, width: 80,  align : 'center'	, text: Language.get( 'unit_name'		, '단위'		)
					},{	dataIndex:	'lcls_name'			, width: 100, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'			, width: 100, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'			, width: 150, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'		)
					},{	dataIndex:	'safe_stok'			, width:  65, align : 'right'	, text: Language.get( 'safe_stok'		, '안전재고'	) , xtype: 'numericcolumn'
					},{	dataIndex:	'stok_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'	) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'zone_name'			, width: 150, align : 'left'	, text: Language.get( 'zone_name'		, '보관위치'		)
					},{	dataIndex:	'cstm_name'			, minWidth : 120 , flex : 1  , align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'		)
					}
				]
			}
		;
		return item;
	}
});
