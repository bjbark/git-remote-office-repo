Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estimast2-lister-detail',

	store: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Detail',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					},{	dataIndex:	'item_name'		, width: 180, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'mtrl_name'		, width: 150, align : 'left'	, text: Language.get('mtrl_name'	, '원단'		)
					},{	dataIndex:	'item_line'		, width:  80, align : 'center'	, text: Language.get('item_line'	, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'bxty_name'		, width: 150, align : 'left'	, text: Language.get('bxty_name'	, '상자형식'	)
					},{	dataIndex:	'item_leng'		, width:  50, align : 'right'	, text: Language.get('item_leng'	, '장'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  50, align : 'right'	, text: Language.get('item_widh'	, '폭'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  50, align : 'right'	, text: Language.get('item_hght'	, '고'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'esti_qntt'		, width:  85, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'mxm2_qntt'		, width: 100, align : 'right'	, text: Language.get('mxm2_qntt'	, 'm2/개'	), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'mxm2_pric'		, width: 100, align : 'right'	, text: Language.get('mxm2_pric'	, '단가/m2'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'pqty_pric'		, width: 100, align : 'right'	, text: Language.get('pqty_pric'	, '단가/개'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '공급가액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'vatx_amnt'		, width: 100, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'item_leng2'	, width:  60, align : 'right'	, text: Language.get('item_leng2'	, '원단장'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_widh2'	, width:  60, align : 'right'	, text: Language.get('item_widh2'	, '원단폭'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_fxqt'		, width:  60, align : 'right'	, text: Language.get('item_fxqt'	, '절수'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'fabc_stnd_pric', width: 100, align : 'right'	, text: Language.get('fabc_stnd_pric', '원단표준단가'), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex : 1  , align : 'left'	, text: Language.get('user_memo'	, '비고'		), minWidth : 200
					},{	dataIndex:	'ordr_cstm_name', width: 100, align : 'right'	, text: Language.get('ordr_cstm_name', '매입처명'	)
					},{	dataIndex:	'ordr_mxm2_pric', width: 100, align : 'right'	, text: Language.get('ordr_mxm2_pric', '매입단가/m2'	), xtype: 'numericcolumn', format: '#,##0'
					}
				]
			};
		return item;
	}
});
