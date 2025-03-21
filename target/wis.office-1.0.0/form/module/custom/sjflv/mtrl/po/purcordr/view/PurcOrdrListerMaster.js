Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-lister-master',
	store		: 'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
						hidden	:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false:true,
						menu   : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					{	text	: '승인/취소',
						hidden	:_global.options.mes_system_type.toUpperCase() == 'SJFLV' ? false:true,
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">납기일자 변경</span>', action : 'deliAction',cls: 'button1-style', width: 90, hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? false:true },
					{	text : '<span class="write-button">발주서 발행</span>' , action : 'writeAction'  , cls: 'button1-style'
					},{	text : '<span class="write-button">수입 대금 등록</span>', action : 'paymentAction'  , cls: 'button1-style',width : 100,hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false
					},{	text : '<span class="write-button">수입 Order 등록</span>', action : 'imptAction'  , cls: 'button1-style',width : 100,hidden:_global.options.mes_system_type.toUpperCase() == 'SJFLV' && _global.hq_id.toUpperCase()=='N1000SJFLV' ? false:true
					} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style',} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style',} ,
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
					{	dataIndex: 'line_clos'	, width:  40, align : 'center'	, text: Language.get( 'line_clos'	, '마감'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'apvl_yorn'	, width:  60, align : 'center'	, text: Language.get( 'apvl_yorn'	, '승인여부'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),hidden : (_global.options.mes_system_type.toUpperCase() == 'SJFLV'?false:true)
					},{	dataIndex: 'invc_numb'	, width: 110, align : 'center'	, text: Language.get( 'offr_numb'	, '발주번호'	)
					},{	dataIndex: 'cstm_code'	, width:  70, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	)
					},{	dataIndex: 'cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'	)
					},{	dataIndex: 'invc_date'	, width:  80, align : 'center'	, text: Language.get( 'offr_date'	, '발주일자'	)
					},{	dataIndex: 'deli_date'	, width:  80, align : 'center'	, text: Language.get( 'deli_date'	, '납기일자'	)
					},{	dataIndex: 'user_name'	, width:  80, align : 'left'	, text: Language.get( 'puch_drtr'	, '구매담당'	)
					},{	dataIndex: 'supl_dvcd'	, width:  70, align : 'center'	, text: Language.get( 'supl_dvcd'	, '조달구분'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('supl_dvcd'), hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
					},{	dataIndex: 'stot_dvcd'	, width:  70, align : 'center'	, text: Language.get( 'stot_dvcd'	, '결제구분'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd')
					},{	dataIndex: 'crny_dvcd'	, width:  80, align : 'center'	, text: Language.get( 'crny_dvcd'	, '화폐단위'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('crny_dvcd'), hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
					},{	dataIndex: 'paym_yorn'	, width:  60, align : 'center'	, text: Language.get( 'paym_yorn'	, '지급여부'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'paym_send_ddln'	, width:  80, align : 'center'	, text: Language.get( 'paym_send_ddln'	, '송금기한'	),hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
					},{	dataIndex: 'offr_qntt'	, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '합계수량'	), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9'
					},{	dataIndex: 'offr_amnt'	, width:  80, align : 'right'	, text: Language.get( 'offr_amnt'	, '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###'
					},{	dataIndex: 'offr_vatx'	, width:  80, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###'
					},{	dataIndex: 'ttsm_amnt'	, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###'
					},{	dataIndex: 'won_pric'	, width:  80, align : 'right'	, text: Language.get( 'won_pric'	, '원화단가'	), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###'
					},{	dataIndex: 'won_ttsm_amnt'	, width:  90, align : 'right'	, text: Language.get( 'won_ttsm_amnt'	, '원화합계금액'), xtype: 'numericcolumn' , summaryType: 'sum' , format	: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{	dataIndex: 'user_memo'	, flex :  90, align : 'left'	, text: Language.get( 'user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
