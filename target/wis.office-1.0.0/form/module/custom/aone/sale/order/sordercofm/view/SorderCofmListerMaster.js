Ext.define('module.custom.aone.sale.order.sordercofm.view.SorderCofmListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sordercofm-lister-master',
	store		: 'module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster',

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
					},{	dataIndex: 'cofm_yorn'		, width:  60, align : 'center'	, text: Language.get('acpt_cofm_yorn'	, '주문확정'	) , xtype : 'lookupcolumn' , lookupValue : [["0","미확정"],["1","확정"]]
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('esti_numb'		, '주문번호'	)
					},{	dataIndex: 'acpt_case_name'	, width: 140, align : 'left'	, text: Language.get('cstm_name'		, '주문명'		)
					},{	dataIndex: 'cstm_name'		, width: 180, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'invc_date'		, width:  90, align : 'center'	, text: Language.get('esti_date'		, '견적일자'	)
					},{	dataIndex: 'item_cnt'		, width:  80, align : 'right'	, text: Language.get(''					, '품목수'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'sum_ttsm_amnt'	, width : 140, align : 'right'	, text: Language.get(''					, '주문금액'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
