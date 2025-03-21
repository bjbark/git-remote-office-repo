Ext.define('module.stock.close.stockclose.view.StockCloseLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-stockclose-lister',
	store		: 'module.stock.close.stockclose.store.StockClose',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
//	border		: 0,
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar', dock : 'bottom',
				items	: [
					{	text : '<span class="write-button">수불마감</span>', action : 'closeAction', cls: 'button1-style'		},
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wrhs_name'  	, text : Language.get('wrhs_name'	,'창고명'			) , width : 130 , align : 'left'
					},{	dataIndex: 'zone_name'  	, text : Language.get('zone_name'	,'구역명'			) , width : 130 , align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'	,'품목코드'			) , width : 150 , align : 'center'
					},{ dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'	,'계정구분'			) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acct_dvcd')
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'			) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'	,'규격'			) , width : 120 , align : 'left'
					},{	dataIndex: 'base_qntt'		, text : Language.get('base_qntt'	,'이월'			) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'	,'입고'			) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'	,'출고'			) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'	,'재고'			) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'비고'			) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});