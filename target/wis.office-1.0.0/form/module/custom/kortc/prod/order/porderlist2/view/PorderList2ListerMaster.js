Ext.define('module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerMaster', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-kortc-porderlist2-lister-master',

	store: 'module.custom.kortc.prod.order.porderlist2.store.PorderList2Master',

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
		var me = this
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
//					{	text : '<span class="write-button">오더 마감</span>', action : 'shipAction'	, cls: 'button1-style'	} , '-',
//					{	text : '<span class="write-button">Amend</span>', action : 'amendAction'	, cls: 'button1-style'	} , '-',
//					{	text : '<span class="write-button">오더 복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
//					{	text : '<span class="write-button">오더 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
//					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
//					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
//					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
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
					{	dataIndex: 'line_clos'		, width:  90, align : 'center'	, text: Language.get('line_clos'		, '생산일자'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width:  80, align : 'center'	, text: Language.get('acpt_numb'		, '지시번호'		)
					},{	dataIndex: 'cstm_name'		, width: 140, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'		)
					},{	dataIndex: 'invc_numb'		, width:  90, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'		)
					},{	dataIndex:	'item_name'		, width: 120, align : 'left'	, text: Language.get('item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'		, width: 100, align : 'left'	, text: Language.get('item_spec'		, '규격'			)
					},{	dataIndex:	''				, width: 100, align : 'left'	, text: Language.get(''					, '차종'			)
					},{	dataIndex: 'wrhs_name'		, width: 100, align : 'left'	, text: Language.get('wrhs_name'		, '모델명'			)
					},{	dataIndex: 'wrhs_name'		, width: 100, align : 'left'	, text: Language.get('wrhs_name'		, '공정'			)
					},{	dataIndex: 'wrhs_name'		, width: 100, align : 'left'	, text: Language.get('wrhs_name'		, '설비'			)
					},{	dataIndex: 'wrhs_name'		, width: 100, align : 'left'	, text: Language.get('wrhs_name'		, '작업자'			)
					},{	dataIndex: 'invc_date'		, width:  90, align : 'center'	, text: Language.get('acpt_date'		, '시작일시'		)
					},{	dataIndex: 'invc_date'		, width:  90, align : 'center'	, text: Language.get('acpt_date'		, '종료일시'		)
					},{	dataIndex: 'wrhs_code'		, width:  90, align : 'center'	, text: Language.get('wrhs_code'		, '소요시간'		)
					},{	dataIndex: ''				, width:  90, align : 'right'	, text: Language.get(''					, '지시수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: ''				, width:  90, align : 'right'	, text: Language.get(''					, '생산수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: ''				, width:  90, align : 'right'	, text: Language.get(''					, '양품수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
//					},{	dataIndex: 'max_deli'		, width:  80, align : 'center'	, text: Language.get('max_deli'			, '생산일정'		)
//					},{	dataIndex: 'pcod_numb'		, width: 120, align : 'center'	, text: Language.get('pcod_nmbr'		, '고객주문번호'	) , hidden : true
//					},{	dataIndex: ''				, width: 110, align : 'left'	, text: Language.get(''					, '생산라인'		)
//					},{	dataIndex: 'user_memo'		, flex : 100, align : 'left'	, text: Language.get('user_memo'		, '비고'			)
					}
				]
			};
		return item;
	}
});
