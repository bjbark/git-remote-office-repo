Ext.define('module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-goodsstocklist-lister',
	store		: 'module.custom.iypkg.stock.close.goodsstocklist.store.GoodsStockList',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'cstm_name'		, width: 150, align : 'left' 	, text: Language.get(''		, '거래처명'	),
					},{	dataIndex:	'prod_name'		, width: 300, align : 'left'	, text: Language.get(''		, '제품명'		)
					},{	dataIndex:	'prod_spec'		, width: 150, align : 'left'	, text: Language.get( ''	, '규격'		)
//					},{	dataIndex:	''				, width: 120, align : 'right'	, text: Language.get( ''	, '전월재고'	),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'prod_istt_qntt', width: 100, align : 'right'	, text: Language.get( ''	, '생산'		),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'base_qntt'		, width: 100, align : 'right'	, text: Language.get( ''	, '출고'		),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'stok_qntt'		, width: 100, align : 'right'	, text: Language.get( 'stok_qntt'	, '현재고'		),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	''				, width: 100, align : 'right'	, text: Language.get( ''	, '적정재고'	),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'pqty_pric'		, width: 120, align : 'right'	, text: Language.get( ''	, '단가'		),xtype:'numericcolumn'
					},{	dataIndex:	'amnt'			, width: 180, align : 'right'	, text: Language.get( ''	, '금액'		),xtype:'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'drtr_name'		, width:  80, align : 'left'	, text: Language.get( ''	, '담당자'		)
					}
				]
			};
		return item;
	}
 });