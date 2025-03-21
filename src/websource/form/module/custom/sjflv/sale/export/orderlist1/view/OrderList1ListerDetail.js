Ext.define('module.custom.sjflv.sale.export.orderlist1.view.OrderList1ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sjflv-orderlist1-lister-detail',

	store: 'module.custom.sjflv.sale.export.orderlist1.store.OrderList1Detail',
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
					},{	dataIndex: 'item_code'			, width:  75, align : 'center'	, text: Language.get(''			, '진행단계'	)
					},{	dataIndex: 'item_name'			, flex :   1, minWidth: 160, align : 'left'	, text: Language.get(''			, '관리번호'	)
					},{	dataIndex: 'item_spec'			, flex :   1, minWidth: 160, align : 'left'	, text: Language.get(''			, 'No.'		)
					},{	dataIndex: 'unit_name'			, width: 100, align : 'center'	, text: Language.get(''			, '일자'		)
					},{	dataIndex: 'qntt'				, width: 100, align : 'right'	, text: Language.get(''			, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'exch_pric'			, width: 120, align : 'right'	, text: Language.get(''			, '금액'	), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	}
});
