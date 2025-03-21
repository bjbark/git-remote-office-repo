Ext.define('module.sale.order.saleorder2.view.SaleOrder2ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-saleorder2-lister-detail',

	store: 'module.sale.order.saleorder2.store.SaleOrder2Detail',

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
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, flex :  80, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 100, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'mold_idcd'		, width: 100, align : 'center'	, text: Language.get('acpt_numb'	, '금형코드'	)
					},{	dataIndex:	'cstm_lott_numb', width: 100, align : 'center'	, text: Language.get('cstm_lott_numb', 'LOT번호'	)
					},{	dataIndex:	'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('invc_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'	, '단가'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'invc_amnt'		, width:  80, align : 'right'	, text: Language.get('invc_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	)
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
