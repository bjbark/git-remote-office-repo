Ext.define('module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermast-lister-master',
	store		: 'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	rowspan		: true,
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
					{	text : '<span class="write-button">Invoice 등록</span>'	, action : 'invoiceAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">B/L 등록</span>'		, action : 'blpopupAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">수입신고필증 등록</span>'	, action : 'reportpopupAction'	, cls: 'button-style', width: 100	} ,
					{	text : '<span class="write-button">서류첨부</span>'	, action : ''	, cls: 'button-style', width: 100	} ,
					'-', '->', '-',
					{	text : '<span class="write-button">부대비용 등록</span>'	, action : 'costAction'		, cls: 'button-style' ,width:  90,	} , '-',
					{	text : '<span class="write-button">Amend</span>'	, action : 'amendAction'	, cls: 'button-style'	} , '-',
					'->',
//					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'line_stat'		, width:  40 , align : 'center' , text: Language.get('line_stat'		, '상태'		)	 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'bzpl_name'		, width:  80, align : 'center'	, text: Language.get('bzpl_name'		, '사업장'		), rowRoot:true
					},{	dataIndex: 'ordr_numb'		, width: 140, align : 'center'	, text: Language.get('ordr_numb'		, 'Order No'), rowRoot:true
					},{	dataIndex: 'amnd_degr'		, width: 50, align : 'center'	, text: Language.get('amnd_degr'		, 'AMD'		), rowRoot:true
					},{	dataIndex: 'incm_dvcd'		, width:  80, align : 'center'	, text: Language.get('incm_dvcd'		, '수입구분'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('incm_dvcd'), rowRoot:true
					},{	dataIndex: 'mngt_numb'		, width:  110, align : 'center'	, text: Language.get('mngt_numb'		, '관리번호'	)
					},{	dataIndex: ''				, width:  80, align : 'left'	, text: Language.get(''					, 'PO Date'	)
					},{	dataIndex: 'ship_viaa_dvcd'	, width:  80, align : 'center'	, text: Language.get('ship_viaa_dvcd'	, 'Ship Via'), xtype : 'lookupcolumn' , lookupValue : resource.lookup('ship_viaa_dvcd')
					},{	dataIndex: ''				, width: 120, align : 'center'	, text: Language.get(''					, 'Vender'	)
					},{	dataIndex: 'mdtn_prsn'		, width: 100, align : 'left'	, text: Language.get('mdtn_prsn'		, '중개인'		)
					},{	dataIndex: 'drtr_name'		, width: 90, align : 'left'		, text: Language.get('drtr_name'		, '담당자'		)
					},{	dataIndex: 'pric_cond_dvcd'	, width: 110, align : 'left'	, text: Language.get('pric_cond_dvcd'	, '가격조건'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: ''				, width: 120, align : 'left'	, text: Language.get(''					, '결제방법'	)
					},{	dataIndex: 'stot_time_dvcd'	, width: 110, align : 'center'	, text: Language.get('stot_time_dvcd'	, '결제시기'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_time_dvcd')
					},{	dataIndex: 'stot_ddln'		, width: 110, align : 'right'	, text: Language.get('stot_ddln'		, '결제기한'	)
					},{	dataIndex: 'mdtn_prsn'		, width: 80, align : 'right'	, text: Language.get('mdtn_prsn'		, '통화'		)
					},{	dataIndex: 'exrt'			, width: 110, align : 'right'	, text: Language.get('exrt'				, '적용환율'	)
					}
				]
			};
		return item;
	}
});
