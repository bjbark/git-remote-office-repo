Ext.define('module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-kortc-porderlist2-lister-detail2',

	store: 'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail2',

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
						},{	dataIndex: 'item_code'	, width: 160, align : 'center'	, text: Language.get('item_code', '불량구분'	)
						},{	dataIndex: 'item_code'	, width: 160, align : 'center'	, text: Language.get('item_code', '담당자'		)
						},{	dataIndex: ''			, width:  90, align : 'right'	, text: Language.get(''			, '불량수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
						},{	dataIndex: 'user_memo'	, width :450, align : 'left'	, text: Language.get('user_memo', '비고'		)
						}
				]
			};
		return item;
	}
});
