Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-estimast-lister-master',
	store		: 'module.custom.aone.sale.esti.estimast.store.EstiMastMaster',

	minWidth	: 350,
	split		: true,
	selModel	: { selType : 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

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
					'-', '->', '-',
					{	text : '<span class="write-button">견적서 복사</span>'	, action : 'copyAction'		, cls: 'button1-style', itemId: 'btnCopy', hidden : true	} , '-',
					{	text : '<span class="write-button">Amend</span>'	, action : 'amendAction'	, cls: 'button1-style', itemId: 'btnAmend', hidden : true	} , '-',
					{	text : '<span class="write-button">수리접수등록</span>'	, action : 'orderAction'	, cls: 'button1-style', itemId: 'btnOrder', hidden : true	} , '-',
					{	text : '<span class="write-button">견적서 발행</span>'	, action : 'printAction'	, cls: 'button1-style', itemId: 'btnPrint', hidden : true	} , '-',
					{	text : '<span class="write-button">가공비 산출</span>'	, action : 'calcAction'		, cls: 'button1-style', itemId: 'btnCalc', hidden : true	} , '-',
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_cofm_yorn'	, width:  60, align : 'center'	, text: Language.get('acpt_cofm_yorn'	, '수주확정'	), xtype : 'lookupcolumn', lookupValue : [["0","미확정"],["1","수주확정"]]
					},{	dataIndex: 'invc_numb'		, width:  80, align : 'center'	, text: Language.get('esti_numb'		, '견적번호'	)
					},{	dataIndex: 'amnd_degr'		, width:  40, align : 'center'	, text: Language.get('amnd_degr'		, '차수'		)
					},{	dataIndex: 'esti_case_name'	, width: 120, align : 'left'	, text: Language.get('esti_case_name'	, '견적명'		)
					},{	dataIndex: 'esti_dvcd'		, width:  80, align : 'center'	, text: Language.get('esti_dvcd'		, '견적구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('esti_dvcd')
					},{	dataIndex: 'cstm_name'		, width: 150, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'invc_date'		, width:  90, align : 'center'	, text: Language.get('invc_date'		, '견적일자'	)
					},{	dataIndex: 'deli_date'		, width:  70, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	), hidden : true,
					},{	dataIndex: 'item_cnt'		, width:  60, align : 'right'	, text: Language.get('item_cnt'			, '품목수'		), xtype : 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'esti_amnt'		, width: 100, align : 'right'	, text: Language.get('esti_amnt'		, '견적금액'	), xtype : 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'sum_ttsm_amnt'	, width: 100, align : 'right'	, text: Language.get('sum_ttsm_amnt'	, '견적합계금액'	), xtype : 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
