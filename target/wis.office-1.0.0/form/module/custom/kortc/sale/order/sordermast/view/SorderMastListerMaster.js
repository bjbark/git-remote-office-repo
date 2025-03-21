Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastListerMaster', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sordermast-lister-master',
	store		: 'module.custom.kortc.sale.order.sordermast.store.SorderMastMaster',

	width		: 515,
	minWidth	: 200,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					{	dataIndex: 'line_clos'		, width:  50, align : 'center'	, text: Language.get('line_clos'	, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 130, align : 'center'	, text: Language.get('invc_numb'	, '주문번호'	)
					},{	dataIndex: 'amnd_degr'		, width: 40, align : 'center'	, text: Language.get('amnd_degr'	, '차수'		)
					},{	dataIndex: 'acpt_case_name'	, width: 140, align : 'left'	, text: Language.get('acpt_case_name', '주문명'	)
					},{	dataIndex: 'cstm_name'		, width: 120, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex: 'invc_date'		, width: 100, align : 'center'	, text: Language.get('esti_date'	, '수주일자'	)
					},{	dataIndex: 'item_cnt'		, width : 90, align : 'right'	, text: Language.get('item_cnt'		, '품목수'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'sum_ttsm_amnt'	, flex :   1, align : 'right'	, text: Language.get('sum_ttsm_amnt', '주문금액'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
