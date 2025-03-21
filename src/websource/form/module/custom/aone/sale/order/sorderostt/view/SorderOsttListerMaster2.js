Ext.define('module.custom.aone.sale.order.sorderostt.view.SorderOsttListerMaster2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sorderostt-lister-master2',
	store		: 'module.custom.aone.sale.order.sorderostt.store.SorderOsttMaster2',
	split		: true,
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item =
				{	xtype : 'grid-paging',
					items :[
						'-','->', '-' ,
						{text : '<span class="write-button">수리비 산출</span>'   , action : 'calcAction'		, cls: 'button1-style'							} ,
						{text : '<span class="write-button">출고 등록</span>'	  , action : Const.UPDATE.action , cls: 'button-style' 							},
						{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'  , button : 'part1master' } , '-',
					]
				};
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
					{	dataIndex:	'acpt_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '진행상태'		), xtype: 'lookupcolumn', lookupValue: resource.lookup('acpt_stat_dvcd')
					},{	dataIndex:	'repa_stat_dvcd'	, width: 60  , align : 'center'	, text: Language.get(''	, '수리상태'		), xtype: 'lookupcolumn', lookupValue: resource.lookup('repa_stat_dvcd')
					},{	dataIndex:	'invc_numb'			, width: 100 , align : 'center', text: Language.get(''	, 'AoneCode'	)
					},{	dataIndex:	'acpt_dvcd'			, width: 60  , align : 'center'	, text: Language.get(''	, '입고유형'		),xtype : 'lookupcolumn', lookupValue: resource.lookup('acpt_dvcd')
					},{	dataIndex:	'invc_date'			, width: 90  , align : 'center'	, text: Language.get(''	, '입고일'			)
					},{	dataIndex:	'cstm_name'			, width: 140 , align : 'left'	, text: Language.get(''	, '거래처명'		)
					},{	dataIndex:	'item_name'			, width: 200 , align : 'left'	, text: Language.get(''	, '수리품목'		)
					},{	dataIndex:	'item_spec'			, width: 160 , align : 'left'	, text: Language.get(''	, '규격'			)
					},{	dataIndex:	'sral_numb'			, width: 100 , align : 'left'	, text: Language.get(''	, 'Serial No.'	)
					},{	dataIndex:	'prod_drtr_name'	, width: 100 , align : 'left'	, text: Language.get(''	, '엔지니어'		)
					},{	dataIndex:	'invc_qntt'			, width: 50  , align : 'right'	, text: Language.get(''	, '수량'			),xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'remk_text'			, minWidth: 200 , flex : 1 , align : 'left'	, text: Language.get(''	, '고장증상'		)
					},{	dataIndex:	'invc_amnt'			, width: 90  , align : 'right'	, text: Language.get(''	, '수리금액'		),xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'zone_idcd'			, width: 90  , align : 'center'	, text: Language.get(''	, '구역ID'		), hidden : true,
					},{	dataIndex:	'wrhs_idcd'			, width: 90  , align : 'center'	, text: Language.get(''	, '창고ID'		), hidden : true,
					}
				]
			};
		return item;
	}
});
