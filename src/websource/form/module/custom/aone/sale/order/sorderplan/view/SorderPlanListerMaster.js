Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-aone-sorderplan-lister-master',
	store		: 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					'-', '->', '-',
					{	text : '<span class="write-button">일괄지시</span>'		, action : 'repairAllAction', cls: 'button1-style'	} ,
					'-', '->',
					{	text : '<span class="write-button">수리지시</span>'		, action : 'repairAction'	, cls: 'button1-style'	} ,
					{	text : '<span class="write-button">반려</span>'		, action : 'returnAction'	, cls: 'button1-style'	} ,
					'-', '->', '-',
					{	text : '<span class="write-button">견적비산출</span>'	, action : 'estimateAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">견적서발행</span>'	, action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
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
					{	dataIndex:	'acpt_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '진행상태'		),xtype: 'lookupcolumn', lookupValue: resource.lookup('acpt_stat_dvcd')
					},{	dataIndex:	'repa_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '수리상태'		),xtype: 'lookupcolumn', lookupValue: resource.lookup('repa_stat_dvcd')
					},{	dataIndex:	'invc_numb'			, width: 100  , align : 'center'	, text: Language.get(''	, 'AoneCode'	)
					},{	dataIndex:	'acpt_dvcd'			, width: 60  , align : 'center'	, text: Language.get(''	, '입고유형'		),xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_dvcd')
					},{	dataIndex:	'invc_date'			, width: 90  , align : 'center'	, text: Language.get(''	, '입고일'			)
					},{	dataIndex:	'cstm_name'			, width: 140 , align : 'left'	, text: Language.get(''	, '거래처명'		)
					},{	dataIndex:	'item_name'			, width: 180 , align : 'left'	, text: Language.get(''	, '품명'			),
					},{	dataIndex:	'item_spec'			, width: 140 , align : 'left'	, text: Language.get(''	, '규격'			)
					},{	dataIndex:	'sral_numb'			, width: 100 , align : 'left'	, text: Language.get(''	, 'Serial No.'	)
					},{	dataIndex:	'invc_qntt'			, width: 50  , align : 'right'	, text: Language.get(''	, '수량'			),xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'remk_text'			, width: 200 , align : 'left'	, text: Language.get(''	, '고장증상'		)
					},{	dataIndex:	'deli_date2'		, width: 90  , align : 'center'	, text: Language.get(''	, '출고예정일'		)
					},{	dataIndex:	'make_cost'			, width: 90  , align : 'right'	, text: Language.get(''	, '견적금액'		),xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'prod_drtr_name'	, width: 70  , align : 'left'	, text: Language.get(''	, '엔지니어'		)
					},{	dataIndex:	'pdod_date'			, width: 90  , align : 'center'	, text: Language.get(''	, '수리지시일'		)
					},{	dataIndex:	'plan_date'			, width: 150 , align : 'center'	, text: Language.get(''	, '작업계획일'		)
					},{	dataIndex:	''					, width: 90  , align : 'center'	, text: Language.get(''	, '반입 /반출'		)
					},{	dataIndex:	'memo'				, width: 90  , align : 'left'	, text: Language.get(''	, '지시사항'		)
					},{	dataIndex:	'plan_strt_date'	, width: 200 , align : 'center' , text: Language.get('' , '작업계획'		),hidden : true,
					},{	dataIndex:	'plan_endd_date'	, width: 200 , align : 'center' , text: Language.get('' , '작업계획'		),hidden : true,
					},{	dataIndex:	'prod_drtr_idcd'	, width: 80  , align : 'left'   , text: Language.get('' , '엔지니어'		),hidden : true,
					},{	dataIndex:	'amnd_degr'			, width: 50  , align : 'center'	, text: Language.get(''	, '차수'			),hidden : true,
					},{	dataIndex:	'line_seqn'			, width: 50  , align : 'center'	, text: Language.get(''	, '순번'			),hidden : true,
					},{	dataIndex:	'cstm_idcd'			, width: 140 , align : 'left'	, text: Language.get(''	, '거래처ID'		),hidden : true,
					},{	dataIndex:	'item_idcd'			, width: 100 , align : 'left'	, text: Language.get(''	, '품목ID'		),hidden : true,
//					},{	dataIndex:	'work_time'			, width: 100 , align : 'right'	, text: Language.get(''	, '견적작업시간'		),hidden : false,
//					},{	dataIndex:	'work_time2'		, width: 100 , align : 'right'	, text: Language.get(''	, '견적작업시간단가'	),hidden : false,
//					},{	dataIndex:	'work_time3'		, width: 100 , align : 'right'	, text: Language.get(''	, '견적인건비'		),hidden : false,
//					},{	dataIndex:	'comp_prft'			, width: 100 , align : 'right'	, text: Language.get(''	, '견적기업마진%'		),hidden : false,
//					},{	dataIndex:	'comp_prft2'		, width: 100 , align : 'right'	, text: Language.get(''	, '견적기업마진'		),hidden : false,
					}
				]
			};
		return item;
	}
});
