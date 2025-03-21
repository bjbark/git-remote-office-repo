Ext.define('module.prod.order.lotchange.view.LotChangeListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-lotchange-lister-master',

	store		: 'module.prod.order.lotchange.store.LotChangeMaster',

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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'	, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd', '진행상태'	) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'	, '수주번호'	)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'	, '주문일자'	)
					},{	dataIndex: 'pcod_numb'		, width: 120, align : 'center'	, text: Language.get('pcod_numb'	, '고객주문번호'	)
					},{	dataIndex: 'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex: 'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex: 'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex: 'item_spec'		, width: 100, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex: 'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex: 'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('invc_qntt'	, '주문수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'stok_asgn_qntt'	, width:  80, align : 'right'	, text: Language.get('stok_asgn_qntt', '재고할당'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'offr_asgn_qntt'	, width:  80, align : 'right'	, text: Language.get('offr_asgn_qntt', '재공할당'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'not_asgn_qntt'	, width:  80, align : 'right'	, text: Language.get('not_asgn_qntt', '미할당량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	)
					},{	dataIndex: 'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
