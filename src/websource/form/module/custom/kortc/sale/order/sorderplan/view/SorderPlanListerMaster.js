Ext.define('module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sorderplan-lister-master',
	store		: 'module.custom.kortc.sale.order.sorderplan.store.SorderPlanMaster',

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
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">소요량계산</span>'	, action : 'bomworkAction'		, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">진행계획 등록</span>', action : 'prodAction'	, cls: 'button1-style'	} , '-',
//					{	text : '<span class="write-button">주문서 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
//					{	text : '<span class="write-button">출하지시</span>', action : 'shipAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				],
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'	, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width:  80, align : 'center'	, text: Language.get('esti_numb'	, '주문번호'	)
					},{	dataIndex: 'acpt_case_name'	, width: 140, align : 'left'	, text: Language.get('acpt_case_name', '주문명'	)
					},{	dataIndex: 'amnd_degr'		, width:  40, align : 'center'	, text: Language.get('amnd_degr'	, '차수'		)
					},{	dataIndex: 'cstm_name'		, width: 180, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex: 'invc_date'		, width:  90, align : 'center'	, text: Language.get('esti_date'	, '등록일자'	)
					},{	dataIndex: 'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex: 'item_code'		, width:  80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex: 'item_name'		, width: 250, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex: 'item_spec'		, width: 190, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex: 'invc_qntt'		, width:  65, align : 'right'	, text: Language.get('invc_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'invc_pric'		, width:  90, align : 'right'	, text: Language.get('invc_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
					},{	dataIndex: 'invc_amnt'		, width: 130, align : 'right'	, text: Language.get('invc_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'vatx_amnt'		, width:  90, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'deli_date'		, width: 100, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	),
					},{	dataIndex: 'need_yorn'		, width:  87, align : 'center'	, text: Language.get(''				, '소요량계산여부'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					}
				]
			};
		return item;
	}
});
