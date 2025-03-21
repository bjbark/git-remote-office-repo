Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-osttwaitlist-lister2',
	store	: 'module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister2',

	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],

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
					{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'acpt_numb'		, width: 150, align : 'center'	, text: Language.get('invc_numb'	, '수주번호'	)
					},{	dataIndex:	'deli_date'		, width: 110, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	)
					},{	dataIndex:	'prod_name'		, width: 220, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'prod_leng'		, width:  60, align : 'right'	, text: Language.get('item_leng'	, '장'		)
					},{	dataIndex:	'prod_widh'		, width:  60, align : 'right'	, text: Language.get('item_widh'	, '폭'		)
					},{	dataIndex:	'prod_hght'		, width:  60, align : 'right'	, text: Language.get('item_hght'	, '고'		)
					},{	dataIndex:	'acpt_qntt'		, width:  70, align : 'right'	, text: Language.get('invc_qntt'	, '수주수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'trst_qntt'		, width:  70, align : 'right'	, text: Language.get('trst_qntt'	, '계획수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ostt_qntt'		, width:  70, align : 'right'	, text: Language.get('ostt_qntt'	, '출고수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'unostt'		, width:  75, align : 'right'	, text: Language.get('unostt'		, '미출고잔량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'pqty_pric'		, width:  70, align : 'right'	, text: Language.get('invc_pric'	, '단가/개'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '공급가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'		, width:  90, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'offr_qntt'		, width:  70, align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'istt_qntt'		, width:  70, align : 'right'	, text: Language.get('istt_qntt'	, '입고수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'prod_qntt'		, width:  70, align : 'right'	, text: Language.get('prod_qntt'	, '생산수량'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					}
				]
			}
		;
		return item;
	}

});
