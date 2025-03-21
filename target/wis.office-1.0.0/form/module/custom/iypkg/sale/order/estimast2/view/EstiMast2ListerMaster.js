Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-estimast2-lister-master',

	store		: 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Master',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	text : '마감/해지',
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">견적서 발행</span>'	, action : 'printAction'	, cls: 'button1-style'} , '-',
					{	text : '<span class="write-button">주문등록</span>'		, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction', hidden : true	} , '-',
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
					},{	dataIndex: 'acpt_cofm_yorn'	, width:  55, align : 'center'	, text: Language.get('acpt_cofm_yorn'	, '수주확정'	) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, width: 150, align : 'center'	, text: Language.get('invc_numb'		, '관리번호'	)
					},{	dataIndex: 'amnd_degr'		, width:  80, align : 'center'	, text: Language.get('amnd_degr'		, 'AMD'		), hidden : true
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width: 100, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('invc_date'		, '견적일자'	)
					},{	dataIndex: 'esti_case_name'	, width: 150, align : 'left'	, text: Language.get('esti_case_name'	, '건명'		)
					},{	dataIndex: 'boss_name'		, width: 100, align : 'left'	, text: Language.get('boss_name'		, '대표자명'	)
					},{	dataIndex: 'tele_numb'		, width: 150, align : 'left'	, text: Language.get('tele_numb'		, '전화번호'	)
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get('drtr_name'		, '영업담당'	)
					},{	dataIndex: 'rcvr_name'		, width: 110, align : 'left'	, text: Language.get('rcvr_name'		, '수신자'		), hidden : true
					},{	dataIndex: 'supl_dvcd'		, width: 110, align : 'left'	, text: Language.get('supl_dvcd'		, '조달구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'supl_dvcd' ) , hidden : true
					},{	dataIndex: 'gnrl_mngt_cost_rate', width: 110, align : 'left', text: Language.get('gnrl_mngt_cost_rate'	, '일반관리'	), hidden : true
					},{	dataIndex: 'pfit_rate'		, width: 110, align : 'left'	, text: Language.get('pfit_rate'		, '이익'		), hidden : true
					},{	dataIndex: 'memo'			, flex : 100, align : 'left'	, text: Language.get('memo'				, '메모'		)
					}
				]
			};
		return item;
	}
});
