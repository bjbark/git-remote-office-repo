Ext.define('module.item.itemmast3.view.ItemMast3Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast3-lister'			,
	store		: 'module.item.itemmast3.store.ItemMast3'	,
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
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-',
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
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get('line_stat'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'acct_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'	)
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 280, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'unit_name'			, width:  70, align : 'left'	, text: Language.get( ''				, '수불단위'	)
					},{	dataIndex:	'lcls_name'			, width: 120, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'			, width: 120, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'			, width: 120, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'		)
					},{	dataIndex:	'puch_pric'			, width: 150, align : 'right'	, text: Language.get( 'puch_pric'		, '구매단가'	) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'puch_pric'			, width: 150, align : 'right'	, text: Language.get( ''		, '견적단가'	) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'puch_pric'			, width: 150, align : 'right'	, text: Language.get( ''		, '판매단가'	) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					}
				]
			}
		;
		return item;
	}
});
