Ext.define('module.custom.kortc.mtrl.po.purcordr2.view.PurcOrdr2ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr2-lister-master',

	store		: 'module.custom.kortc.mtrl.po.purcordr2.store.PurcOrdr2Master',

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

					'-', '->', '-',
					{	text : '<span class="write-button">발주서 발행</span>', action : 'writeAction'  , cls: 'button1-style',
					},{	text : '<span class="write-button">입고접수</span>'	, action : 'isttAction' , cls: 'button1-style',hidden : _global.hq_id.toUpperCase()=='N1000KITEC' || _global.hq_id.toUpperCase()=='N1000KORTC' ||  _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? true:false
					},{	text : '<span class="write-button">입고접수</span>'	, action : 'isttAction2' , cls: 'button1-style',hidden : _global.hq_id.toUpperCase()!='N1000HNTOP'? true : false
					} , '-',
//					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', } , '-' ,
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
					},{	dataIndex: 'invc_numb'	, width:  80, align : 'center'	, text: Language.get( 'offr_numb'	, '발주번호'	)
					},{	dataIndex: 'amnd_degr'	, width:  50, align : 'center'	, text: Language.get( ''			, '차수'	)
					},{	dataIndex: 'cstm_name'	, width: 150, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'	)
					},{	dataIndex: 'cstm_code'	, width:  80, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드')
					},{	dataIndex: 'invc_date'	, width:  80, align : 'center'	, text: Language.get( 'offr_date'	, '발주일자'	)
					},{	dataIndex: 'deli_date'	, width:  80, align : 'center'	, text: Language.get( 'deli_date'	, '납기일자'	)
					},{	dataIndex: 'user_name'	, width: 100, align : 'left'	, text: Language.get( 'puch_drtr'	, '구매담당'	)
					},{	dataIndex: 'supl_dvcd'	, width:  80, align : 'center'	, text: Language.get( 'supl_dvcd'	, '조달구분'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('supl_dvcd'), hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
					},{	dataIndex: 'stot_dvcd'	, width:  80, align : 'left'	, text: Language.get( 'stot_dvcd'	, '결제구분'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('stot_dvcd')
					},{	dataIndex: 'crny_dvcd'	, width:  80, align : 'center'	, text: Language.get( 'crny_dvcd'	, '화폐단위'	), xtype: 'lookupcolumn' , lookupValue : resource.lookup('crny_dvcd'), hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
					},{	dataIndex: 'offr_qntt'	, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '합계수량'	), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex: 'offr_amnt'	, width:  80, align : 'right'	, text: Language.get( 'offr_amnt'	, '발주금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'offr_vatx'	, width:  80, align : 'right'	, text: Language.get( 'vatx_amnt'	, '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'ttsm_amnt'	, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'user_memo'	, flex : 100, align : 'left'	, text: Language.get( 'user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
