Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-export-ordermast2-lister-master',
	store		: 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	rowspan		: true, //TODO
	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">일정 등록</span>'			, action : 'skedAction'		, cls: 'button-style', width: 80	} ,
					{	text : '<span class="write-button">Packing List등록</span>'	, action : 'packingAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">NEGO 등록</span>'			, action : 'negopopupAction', cls: 'button-style', width: 80	} ,
					'-', '->', '->','->',
					{	text : '<span class="write-button">Packing List 출력</span>'	, action : 'packingPrint'	, itemId : 'packing'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">invoice 출력</span>'		, action : 'invoicePrint'	, itemId : 'invoice'	, cls: 'button-style'	} , '-',
					{	text : '<span class="write-button">주문 Order 등록</span>'	, action : 'orderAction', cls: 'button-style', width: 100	} , '-','->',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }, '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } ,
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
					{	dataIndex: 'line_clos'			, width:  50, align : 'center'	, text: Language.get('line_clos'		, '상태'					) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'), rowspan:true
					},{	dataIndex: 'bzpl_name'			, width: 100, align : 'left'	, text: Language.get('bzpl_name'		, '사업장'					) , rowspan:true
					},{	dataIndex: 'ordr_date'			, width: 100, align : 'center'	, text: Language.get('ordr_date'		, 'Order 일자'				) , rowspan:true
					},{	dataIndex: 'ordr_numb'			, width: 100, align : 'center'	, text: Language.get('ordr_numb'		, 'Order 번호'				) , rowRoot:true
					},{	dataIndex: 'expt_lcal_name'		, width: 100, align : 'left'	, text: Language.get('expt_lcal_name'	, 'Area'					) , rowspan:true
					},{	dataIndex: 'cstm_name'			, width: 160, align : 'left'	, text: Language.get('cstm_name'		, 'Customer'				) , rowspan:true
					},{	dataIndex: 'item_name'			, width: 210, align : 'left'	, text: Language.get('item_name'		, '품목'					) , rowspan:true
					},{	dataIndex: 'hala_yorn'			, width:  60, align : 'center'	, text: Language.get('hala_yorn'		, '할랄'					) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), rowspan:true
					},{	dataIndex: 'trde_trnt_dvcd'		, width: 100, align : 'center'	, text: Language.get('trde_trnt_dvcd'	, '운송방법'				) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('trde_trnt_dvcd'), rowspan:true
					},{	dataIndex: 'pric_cond_dvcd'		, width: 100, align : 'center'	, text: Language.get('pric_cond_dvcd'	, '가격조건'				) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd'), rowspan:true
					},{	dataIndex: 'ostt_schd_date'		, width: 100, align : 'center'	, text: Language.get('ostt_schd_date'	, '공장픽업일'				) , rowspan:true
					},{	dataIndex: 'etdd'				, width: 100, align : 'center'	, text: Language.get('etdd'				, '출발일'					) , rowspan:true
					},{	dataIndex: 'etaa'				, width: 100, align : 'center'	, text: Language.get('etaa'				, '도착일'					) , rowspan:true
					},{	dataIndex: 'qntt'				, width:  80, align : 'right'	, text: Language.get('qntt'				, '물량'					) , xtype: 'numericcolumn', summaryType:'sum', rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'exch_pric'			, width:  80, align : 'right'	, text: Language.get('exch_pric'		, 'KG당 가격'				) , xtype: 'numericcolumn', rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'exch_amnt'			, width:  80, align : 'right'	, text: Language.get('exch_amnt'		, '금액'					) , xtype: 'numericcolumn', summaryType:'sum', rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'payment'			, width: 140, align : 'left'	, text: Language.get(''					, 'Payment Date'			) , xtype: 'lookupcolumn' , lookupValue : resource.lookup('offr_dvcd'), rowspan:true
					},{	dataIndex: ''					, width:  80, align : 'right'	, text: Language.get(''					, 'Offer Price'				) , xtype: 'numericcolumn'
					},{	dataIndex: 'paym_cstm_name'		, width: 100, align : 'left'	, text: Language.get(''					, '운송업체'				) , rowspan:true
					},{	dataIndex: 'exps_krwn_ttsm'		, width:  80, align : 'right'	, text: Language.get('exps_krwn_ttsm'	, '운송금액'				) , xtype: 'numericcolumn' , rowspan:true
					},{	dataIndex: 'cmis_pric'			, width:  80, align : 'right'	, text: Language.get('cmis_pric'		, '업체커미션</br>kg당 가격') , xtype: 'numericcolumn' , rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'cmis_amnt'			, width:  80, align : 'right'	, text: Language.get('cmis_amnt'		, '업체커미션</br>금액'		) , xtype: 'numericcolumn' , rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'pfit_pric'			, width:  80, align : 'right'	, text: Language.get('pfit_pric'		, 'Net가</br>kg당 가격'		) , xtype: 'numericcolumn' , rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'pfit_amnt'			, width:  80, align : 'right'	, text: Language.get('pfit_amnt'		, 'Net가</br>마진'			) , xtype: 'numericcolumn' , rowspan:true, format : '#,##0.#0',
					},{	dataIndex: 'remk_text'			, width:  60, align : 'left'	, text: Language.get('remk_text'		, '비고'					)
					}
				]
			};
		return item;
	}
});
