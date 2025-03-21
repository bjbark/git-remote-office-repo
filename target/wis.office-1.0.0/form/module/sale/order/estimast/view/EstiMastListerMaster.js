Ext.define('module.sale.order.estimast.view.EstiMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-estimast-lister-master',
	store		: 'module.sale.order.estimast.store.EstiMastMaster',

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
					{	text : '<span class="write-button">견적복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">수주등록</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">견적서 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text : '명세서'			, iconCls: Const.REPORT.icon, action : 'etcPrintAction', hidden : true	} , '-',
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_cofm_yorn'	, width:  60, align : 'center'	, text: Language.get('acpt_cofm_yorn'	, '수주확정'	) , xtype : 'lookupcolumn' , lookupValue : [["0","미확정"],["1","수주확정"]]
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('esti_numb'		, '견적번호'	)
					},{	dataIndex: 'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'cstm_code'		, width:  80, align : 'center'	, text: Language.get('cstm_code'		, '거래처코드'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('esti_date'		, '견적일자'	)
					},{	dataIndex: 'boss_name'		, width:  80, align : 'left'	, text: Language.get('boss_name'		, '대표자명'	)
					},{	dataIndex: 'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					},{	dataIndex: 'drtr_name'		, width: 110, align : 'left'	, text: Language.get('sale_drtr'		, '영업담당'	)
					},{	dataIndex: 'memo'			, flex : 100, align : 'left'	, text: Language.get('memo'				, '비고'		)
					}
				]
			};
		return item;
	}
});
