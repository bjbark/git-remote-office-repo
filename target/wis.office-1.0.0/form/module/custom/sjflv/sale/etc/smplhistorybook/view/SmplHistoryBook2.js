Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook2', { extend: 'Axt.grid.Panel',

	plugins		: [{ ptype:'gridcolumnconfig'  } ],
	alias		: 'widget.module-sjflv-sale-etc-smplhistorybook-lister2',
	store		: 'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook2',

	border		: 0  ,
	title		: Language.get('','리비전'),
	//selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items  : [
					{	text : Language.get('ostt_date'			, '배송일자'	) , dataIndex: 'ostt_date'		, width : 100, align : 'center'
					},{	text : Language.get('ostt_drtr_name'	, '배송자'		) , dataIndex: 'ostt_drtr_name'	, width : 150, align : 'center'
					},{	text : Language.get('ostt_qntt'			, '샘플배송양'	) , dataIndex: 'ostt_qntt'		, width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
					},{	text : Language.get(''			, '총중량'		) , dataIndex: ''		, width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
					}
				]
			};
		return item;
	}

});





