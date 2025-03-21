Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-sale-etc-smplhistorybook-lister1',
	store		: 'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook1',
	border		: 0,
	title		: Language.get('item','제품'),
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
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
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
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
					{	text : Language.get('item_code',	'품목코드'		) , dataIndex: 'item_code'	, width : 100, align : 'center'
					},{	text : Language.get('item_name',	'품명'		) , dataIndex: 'item_name'	, width : 160, align : 'left'
					},{	text : Language.get('item_name',	'규격'		) , dataIndex: 'item_spec'	, width : 100, align : 'left'
					},{	text : Language.get('reqt_qntt',	'샘플양'		) , dataIndex: 'reqt_qntt'	, width : 80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
					},
				]
			};
		return item;
	}

});

