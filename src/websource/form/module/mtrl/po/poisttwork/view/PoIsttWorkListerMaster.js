Ext.define('module.mtrl.po.poisttwork.view.PoIsttWorkListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-poisttwork-lister-master',

	store		: 'module.mtrl.po.poisttwork.store.PoIsttWorkMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		markDirty: false, loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
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
							{ text : '마감', action : 'closeAction'       },
							{ text : '해지', action : 'closeCancelAction' }
						]
					},
					'-', '->', '-',
					{text : '명세서'			 , iconCls: Const.REPORT.icon, action : 'etcPrintAction' 	} , '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'}
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
					{	dataIndex: 'line_clos'		, width:  40	, align : 'center'	, text: '마감'        , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 120	, align : 'center'	, text: Language.get( 'istt_numb'		, '전표번호'	)
					},{	dataIndex: 'invc_date'		, width:  90	, align : 'center'	, text: Language.get( 'istt_date'		, '입고일자'	)
					},{	dataIndex: 'istt_wrhs_name'	, width: 150	, align : 'left'	, text: Language.get( 'istt_wrhs_name'	, '입고창고'	)
					},{	dataIndex: 'cstm_name'		, width: 180	, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex: 'dept_name'		, width: 120	, align : 'left'	, text: Language.get( 'dept_name'		, '처리부서'	)
					},{	dataIndex: 'drtr_name'		, width: 100	, align : 'left'	, text: Language.get( 'drtr_name'		, '처리담당'	)
					},{	dataIndex: 'istt_qntt'		, width:  80	, align : 'right'	, text: Language.get( 'istt_qntt'		, '합계수량'	), xtype: 'numericcolumn' , summaryType: 'sum'
					},{	dataIndex: 'istt_amnt'		, width:  80	, align : 'right'	, text: Language.get( 'istt_amnt'		, '입고금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'istt_vatx'		, width:  80	, align : 'right'	, text: Language.get( 'istt_vatx'		, '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex: 'ttsm_amnt'		, width:  80	, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'remk_text'		, flex:    1	, align : 'left'	, text: Language.get( 'remk_text'		, '비고'		)
					}
				]
			};
		return item;
	}
 });
