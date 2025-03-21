Ext.define('module.custom.sjflv.sale.export.ordermast.view.OrderMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sjflv-ordermast-lister-detail',

	store: 'module.custom.sjflv.sale.export.ordermast.store.OrderMastDetail',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
				],
				pagingButton : false
			}
		;
		return item;
	},


	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_seqn'			, width:  50, align : 'center'	, text: Language.get('line_seqn'			, '항번'		)
					},{	dataIndex: 'item_code'			, width:  75, align : 'center'	, text: Language.get('item_code'			, '품목코드'	)
					},{	dataIndex: 'item_name'			, width: 250, align : 'left'	, text: Language.get('item_name'			, '품명'		)
					},{	dataIndex: 'item_spec'			, width: 100, align : 'left'	, text: Language.get('item_spec'			, '규격'		)
					},{	dataIndex: 'unit_name'			, width:  60, align : 'center'	, text: Language.get('unit_name'			, '단위'		)
					},{	dataIndex: 'qntt'				, width:  80, align : 'right'	, text: Language.get('qntt'					, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'exch_pric'			, width:  80, align : 'right'	, text: Language.get('exch_pric'			, '판매단가'	), xtype: 'numericcolumn'
					},{	dataIndex: 'exch_amnt'			, width:  80, align : 'right'	, text: Language.get('exch_amnt'			, '판매금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'krwn_pric'			, width:  80, align : 'right'	, text: Language.get('krwn_pric'			, '원화단가'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'krwn_amnt'			, width:  80, align : 'right'	, text: Language.get('krwn_amnt'			, '원화금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'deli_date'			, width:  80, align : 'center'	, text: Language.get('deli_date'			, '납기일자'	),
					},{	dataIndex: 'user_memo'			, width:  80, align : 'center'	, text: Language.get('user_memo'			, '비고'		),
					}
				]
			};
		return item;
	}
});
