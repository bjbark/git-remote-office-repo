Ext.define('module.custom.komec.sale.spts.sptsmast.view.SptsMastListerDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-komec-sptsmast-lister-detail2',

	store: 'module.custom.komec.sale.spts.sptsmast.store.SptsMastDetail2',

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
					{	dataIndex:	'line_seqn'	, width:  40, align : 'center'	, text: Language.get('line_seqn', '항번'		)
					},{	dataIndex:	'acpt_numb'	, width: 110, align : 'center'	, text: Language.get('acpt_numb', '수주번호'	)
					},{	dataIndex:	'acpt_date'	, width: 110, align : 'center'	, text: Language.get('acpt_date', '수주일자'	)
					},{	dataIndex:	'item_code'	, width: 120, align : 'center'	, text: Language.get('item_code', '품목코드'	)
					},{	dataIndex:	'item_name'	, flex :  60, align : 'left'	, text: Language.get('item_name', '품명'		)
					},{	dataIndex:	'item_spec'	, width: 100, align : 'left'	, text: Language.get('item_spec', '규격'		)
					},{	dataIndex:	'sale_unit'	, width:  60, align : 'center'	, text: Language.get('sale_unit', '단위'		)
					},{	dataIndex:	'trst_qntt'	, width:  80, align : 'right'	, text: Language.get('trst_qntt', '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sale_pric'	, width:  80, align : 'right'	, text: Language.get('sale_pric', '단가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'sale_amnt'	, width:  80, align : 'right'	, text: Language.get('sale_amnt', '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'	, width:  80, align : 'right'	, text: Language.get('vatx_amnt', '부가세'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'	, width:  80, align : 'right'	, text: Language.get('ttsm_amnt', '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'	, width:  80, align : 'center'	, text: Language.get('deli_date', '납기일자'	)
					},{	dataIndex:	'user_memo'	, flex :  20, align : 'left'	, text: Language.get('user_memo', '비고'		)
					}
				]
			};
		return item;
	}
});
