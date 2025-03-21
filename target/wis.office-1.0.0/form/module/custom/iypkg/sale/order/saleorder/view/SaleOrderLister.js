Ext.define('module.custom.iypkg.sale.order.saleorder.view.SaleOrderLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-lister',
	store		: 'module.custom.iypkg.sale.order.saleorder.store.SaleOrder',

	border		: 0,
	columnLines	: true,
	width		: 515,
	minWidth	: 200,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],


	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},


	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text	: '승인/취소',hidden:true,
						menu	: [
							{	text : '승인', action : 'okAction'	},
							{	text : '취소', action : 'okCancelAction'	}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">출하계획</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">주문복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style', hidden : _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style', hidden : _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style', hidden : _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister', cls: 'button-style' , hidden : _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false }
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
					{	xtype: 'rownumberer'		, width:35 , hidden : false, align: 'center'
					},{	dataIndex: 'line_clos'		, text: Language.get('line_clos'		, '마감'			), width:  40, align: 'center'  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'apvl_yorn'		, text: Language.get('apvl_yorn'		, '승인여부'		), width:  55, align: 'center' , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),hidden:true
					},{	dataIndex: 'invc_numb'		, text: Language.get('acpt_numb'		, '수주번호'		), width: 90, align: 'center'
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, '수주일자'		), width:  80, align: 'center'
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '거래처명'		), width: 150, align: 'left'
					},{	dataIndex: 'prod_name'		, text: Language.get('prod_name'		, '품목명'		), width: 170, align: 'left'
					},{	dataIndex: 'prod_code'		, text: Language.get('prod_code'		, '품목코드'		), width: 170, align: 'left' , hidden : true
					},{	dataIndex: 'item_leng'		, text: Language.get('item_leng'		, '장'			), width:  60, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'item_widh'		, text: Language.get('item_widh'		, '폭'			), width:  60, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'item_hght'		, text: Language.get('item_hght'		, '고'			), width:  60, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'acpt_qntt'		, text: Language.get('acpt_qntt'		, '수주수량'		), width:  80, xtype : 'numericcolumn', hidden : false
					},{	dataIndex: 'prod_qntt'		, text: Language.get('prod_qntt'		, '추가생산'		), width:  80, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'pqty_pric'		, text: Language.get('pqty_pric'		, '단가/개'		), width:  80, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'mxm2_qntt'		, text: Language.get('mxm2_qntt'		, '수주 m2'		), width:  80, xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'pqty_mxm2'		, text: Language.get('pqty_mxm2'		, '개/m2'		), width:  60, xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{	dataIndex: 'sply_amnt'		, text: Language.get('sply_amnt'		, '공급가액'		), width:  80, xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{	dataIndex: 'vatx_amnt'		, text: Language.get('vatx_amnt'		, '부가세액'		), width:  80, xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{	dataIndex: 'ttsm_amnt'		, text: Language.get('ttsm_amnt'		, '합계금액'		), width:  80, xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{	dataIndex: 'assi_cstm_name'	, text: Language.get('assi_cstm_name'	, '납품처명'		), width: 150, align: 'left', hidden : true
					},{	dataIndex: 'pcod_numb'		, text: Language.get('pcod_numb'		, '고객발주번호'	), width: 120, hidden : true
					},{	dataIndex: 'base_qntt'		, text: Language.get('base_qntt'		, '발주수량'		), width:  80, align: 'right'
					},{	dataIndex: 'drtr_name'		, text: Language.get('sale_drtr_name'	, '영업담당'		), width:  80, align: 'left', hidden : true
					},{	dataIndex: 'bxty_name'		, text: Language.get('bxty_name'		, '상자형식'		), width: 100, align: 'left', hidden : true
					},{	dataIndex: 'item_code'		, text: Language.get('prod_code'		, '품목코드'		), width: 120, align: 'center',hidden : true
					},{	dataIndex: ''				, text: Language.get(''					, '조/Set'		), width: 100, align: 'left', hidden : true
					},{	dataIndex: 'deli_date'		, text: Language.get('deli_date'		, '납기일자'		), width:  80, align: 'center', hidden : false
					},{	dataIndex: 'stok_qntt'		, text: Language.get('stok_qntt'		, '재고수량'		), width:  80, xtype : 'numericcolumn'
					},{	dataIndex: 'mxm2_pric'		, text: Language.get('mxm2_pric'		, '단가/m2'		), width:  80, xtype : 'numericcolumn', hidden : true
					},{	dataIndex: 'crny_dvcd'		, text: Language.get('crny_dvcd'		, '통화'			), width:  80, align: 'center' , xtype : 'lookupcolumn', lookupValue : resource.lookup('crny_dvcd'), hidden : true
					},{	dataIndex: 'vatx_dvcd'		, text: Language.get(''					, '자료구분'		), width: 100, align: 'center' , xtype : 'lookupcolumn', lookupValue : resource.lookup('vatx_dvcd'), hidden : true
					}
				]
			};
		return item;
	}
});
