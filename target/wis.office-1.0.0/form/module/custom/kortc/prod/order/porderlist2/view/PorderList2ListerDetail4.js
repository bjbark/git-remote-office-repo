Ext.define('module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail4', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-kortc-porderlist2-lister-detail4',

	store: 'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail4',

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
					'->', '-',
					{	text : '<span class="write-button">생산지시</span>'	, action : 'prorAction'	, cls: 'button1-style',
						hidden	: !(_global.options.prod_order_type=='수주로 생산지시'),
					} , '-',
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
					{	dataIndex: 'item_code'	, width:  80, align : 'center'	, text: Language.get('item_code', '순번'		)
					},{	dataIndex: 'item_code'	, width: 160, align : 'center'	, text: Language.get('item_code', '품목코드'	)
					},{	dataIndex: 'item_code'	, width: 160, align : 'center'	, text: Language.get('item_code', '품명'		)
					},{	dataIndex: 'item_code'	, width: 90, align : 'center'	, text: Language.get('item_code', '규격'		)
					},{	dataIndex: 'unit_name'	, width: 100, align : 'center'	, text: Language.get('unit_name', '단위'		)
					},{	dataIndex: ''			, width:  90, align : 'right'	, text: Language.get(''			, '소요수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: ''			, width:  90, align : 'right'	, text: Language.get(''			, '투입수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: ''			, width:  90, align : 'right'	, text: Language.get(''			, 'LOT번호'	)
					},{	dataIndex: 'user_memo'	, width: 450, align : 'left'	, text: Language.get('user_memo', '비고'		)
					}
				]
			};
		return item;
	}
});
