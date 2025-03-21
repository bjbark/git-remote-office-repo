Ext.define('module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-lister-master',

	store		: 'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
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
					{	text   : '마감/해지',
						hidden : !_global.auth.auth_mtrl_1001,
						menu   : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">발주서 발행</span>', action : 'writeAction'  , cls: 'button1-style'
//					},{	text : '<span class="write-button">입고접수</span>'	, action : 'isttHjAction' , cls: 'button1-style',
//						hidden : _global.hq_id.toUpperCase()=='N1000HJSYS'? false : true
					},{	text : '<span class="write-button">입고접수</span>'	, action : 'isttAction' , cls: 'button1-style',
						hidden : _global.hq_id.toUpperCase()=='N1000KITEC'? true : _global.hq_id.toUpperCase()=='N1000HJSYS'? true : false
					} , '-',
//					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style', hidden : _global.options.mes_system_type =='Frame'? true : false} ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : 'HjInsertAction'    ,cls: 'button-style', hidden : _global.options.mes_system_type =='Frame'? false : true} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style', hidden : _global.options.mes_system_type =='Frame'? true : false} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : 'modifyAction2'     ,cls: 'button-style', hidden : _global.options.mes_system_type =='Frame'? false : true} ,
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
					{	xtype: 'rownumberer'		, width:  40, text: 'NO', align : 'center'
					},{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get( 'line_clos'	, '마감'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
//					},{	dataIndex: 'amnd_degr'		, width: 100, align : 'center'	, text: Language.get( 'amnd_degr'	, 'amend'	),
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get( 'offr_numb'	, '발주번호'	)
					},{	dataIndex: 'prnt_idcd'		, width: 100, align : 'center'	, text: Language.get( 'acpt_numb'	, '수주번호'	)
					},{	dataIndex: 'acpt_cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처'	)
					},{	dataIndex: 'item_name'		, width: 100, align : 'center'	, text: Language.get( 'modl_name'	, '모델명'	)
					},{	dataIndex: 'cstm_name'		, width: 150, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드')
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get( 'offr_date'	, '발주일자'	)
					},{	dataIndex: 'user_name'		, width: 100, align : 'left'	, text: Language.get( 'puch_drtr'	, '구매담당'	)
					},{	dataIndex: 'stot_dvcd'		, width: 100, align : 'left'	, text: Language.get( 'stot_dvcd'	, '결제구분'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd')
					},{	dataIndex: 'offr_qntt'		, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '합계수량'	), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex: 'offr_amnt'		, width:  80, align : 'right'	, text: Language.get( 'offr_amnt'	, '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'offr_vatx'		, width:  80, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'user_memo'		, flex : 100, align : 'left'	, text: Language.get( 'user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
