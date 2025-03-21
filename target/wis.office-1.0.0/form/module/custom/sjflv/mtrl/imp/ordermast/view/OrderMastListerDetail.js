Ext.define('module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-ordermast-lister-detail',

	store: 'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastDetail',
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
		me.paging  = me.pagingItem();
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
					{	dataIndex: 'line_seqn'			, width: 50 , align : 'center'	, text: Language.get('line_seqn'			, '항번'		)
					},{	dataIndex: 'item_code'			, width: 75, align : 'center'	, text: Language.get('item_code'			, '품목코드'	)
					},{	dataIndex: 'item_name'			, width: 250, align : 'left'	, text: Language.get('item_name'			, '품명'		)
					},{	dataIndex: 'item_spec'			, width: 100, align : 'left'	, text: Language.get('item_spec'			, '규격'		)
					},{	dataIndex: 'item_hscd'			, width: 100, align : 'left'	, text: Language.get('item_hscd'			, 'HS Code'	)
					},{	dataIndex: 'unit_name'			, width:  60, align : 'center'	, text: Language.get('unit_name'			, '단위'		)
					},{	dataIndex: 'qntt'				, width:  80, align : 'right'	, text: Language.get('qntt'			, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'exch_pric'			, width:  90, align : 'right'	, text: Language.get('exch_pric'			, '단가'		), xtype: 'numericcolumn'
					},{	dataIndex: 'exch_amnt'			, width:  100, align : 'right'	, text: Language.get('exch_amnt'			, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'krwn_pric'			, width:  90, align : 'right'	, text: Language.get('krwn_pric'			, '원화단가'	), xtype: 'numericcolumn'
					},{	dataIndex: 'krwn_amnt'			, width:  100, align : 'right'	, text: Language.get('krwn_amnt'			, '원화금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''					, width:  100, align : 'left'	, text: Language.get(''						, 'Maker'	)
					},{	dataIndex: 'ship_schd_date'		, width:  100, align : 'center'	, text: Language.get('ship_schd_date'		, '선적예정일'	)
					},{	dataIndex: 'user_memo'			, flex :  20, align : 'left'	, text: Language.get('user_memo'			, '비고'		), minWidth : 200
					}
				]
			};
		return item;
	}
});
