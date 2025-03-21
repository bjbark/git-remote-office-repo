Ext.define('module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prjtpurcorder-lister-master',

	store		: 'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderMaster',

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
					{	text	: '마감/해지',
						hidden	: !_global.auth.auth_mtrl_1001,
						menu	: [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-', '->', '-',
					{	text : '<span class="write-button">입고접수</span>'	, action : 'isttAction'		, cls: 'button1-style'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
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
					},{	dataIndex: 'invc_numb'	, width: 100, align : 'center'	, text: Language.get( 'offr_numb'	, '발주번호'	)
					},{	dataIndex: 'cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'	)
					},{	dataIndex: 'cstm_code'	, width:  65, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	)
					},{	dataIndex: 'invc_date'	, width:  80, align : 'center'	, text: Language.get( 'offr_date'	, '발주일자'	)
					},{	dataIndex: 'max_deli'	, width:  80, align : 'center'	, text: Language.get( 'deli_date'	, '납기일자'	)
					},{	dataIndex: 'user_name'	, width: 100, align : 'left'	, text: Language.get( 'user_name'	, '구매담당'	)
					},{	dataIndex: 'stot_dvcd'	, width: 100, align : 'left'	, text: Language.get( 'stot_dvcd'	, '결제구분'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd')
					},{	dataIndex: 'offr_qntt'	, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '합계수량'	), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex: 'offr_amnt'	, width:  80, align : 'right'	, text: Language.get( 'offr_amnt'	, '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'offr_vatx'	, width:  80, align : 'right'	, text: Language.get( 'vatx_totl'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'ttsm_amnt'	, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'user_memo'	, flex : 100, align : 'left'	, text: Language.get( 'user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
