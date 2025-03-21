Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-osttwaitlist-lister',
	store	: 'module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister',

	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary', remote : false }],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '매출일자'	)
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'acpt_numb'		, width: 150, align : 'center'	, text: Language.get('acpt_numb'	, '수주번호'	)
					},{	dataIndex:	'prod_name'		, width: 220, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_leng'		, width:  60, align : 'right'	, text: Language.get('item_leng'	, '장'		)
					},{	dataIndex:	'item_widh'		, width:  60, align : 'right'	, text: Language.get('item_widh'	, '폭'		)
					},{	dataIndex:	'item_hght'		, width:  60, align : 'right'	, text: Language.get('item_hght'	, '고'		)
					},{	dataIndex:	'acpt_qntt'		, width:  70, align : 'right'	, text: Language.get('invc_qntt'	, '수주수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ostt_qntt'		, width:  70, align : 'right'	, text: Language.get('ostt_qntt'	, '출고수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'pqty_pric'		, width:  70, align : 'right'	, text: Language.get('invc_pric'	, '단가/개'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'sale_amnt'		, width: 100, align : 'right'	, text: Language.get('sale_amnt'	, '공급가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'pcod_numb'		, width: 150, align : 'left'	, text: Language.get('pcod_numb'	, 'P/O No'	)
					},{	dataIndex:	'user_memo'		, flex :   1, align : 'left'	, text: Language.get('remk_text'	, '비고'		)
					}
				]
			}
		;
		return item;
	}

});
