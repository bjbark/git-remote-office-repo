Ext.define('module.prod.order.otodwork.view.OtodWorkDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-otodwork-lister-detail',

	store: 'module.prod.order.otodwork.store.OtodWorkDetail',

	border		: 0 ,
	columnLines	: true ,
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
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					'-',
					{	text : '<span class="write-button">부분입고</span>'	, action : 'isttPartAction'		, cls: 'button1-style'	} , '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, width : 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'dlvy_cstm_name', width : 120, align : 'left'	, text: Language.get('dlvy_cstm_name', '수주처'		), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'orig_item_name', width : 200, align : 'left'	, text: Language.get('orig_item_name', '모델명'		), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex:	'item_name'		, width : 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width : 120, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'wkct_name'		, width :  90, align : 'left'	, text: Language.get('wkct_name'	, '공정명'	), hidden : _global.options.mes_system_type =='Frame'? false :  true
					},{	dataIndex: 'mtrl_istt_date'	, width :  85, align : 'center'	, text: Language.get( 'mtrl_istt_date'	, '자재입고일자'	)
					},{	dataIndex:	'istt_qntt'		, width :  80, align : 'right'	, text: Language.get('istt_qntt'	, '입고수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'unit_name'		, width :  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		), hidden : _global.options.mes_system_type =='Frame'? true  :  false
					},{	dataIndex:	'offr_qntt'		, width :  80, align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_pric'		, width :  80, align : 'right'	, text: Language.get('offr_pric'	, '단가'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_amnt'		, width :  80, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'offr_vatx'		, width :  80, align : 'right'	, text: Language.get('offr_vatx'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm_amnt'		, width :  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'		, width :  80, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	),
						renderer:function(val){
							a =Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'user_memo'		, flex :  30, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
