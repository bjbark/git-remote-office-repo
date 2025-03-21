Ext.define('module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail3', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-kortc-porderlist2-lister-detail3',

	store: 'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail3',

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
					},{	dataIndex: 'item_code'	, width: 130, align : 'center'	, text: Language.get('item_code', '유실사유'	)
					},{	dataIndex: 'item_code'	, width: 130, align : 'center'	, text: Language.get('item_code', '시작시간'	)
					},{	dataIndex: 'item_code'	, width: 130, align : 'center'	, text: Language.get('item_code', '종료시간'	)
					},{	dataIndex: 'unit_name'	, width: 130, align : 'center'	, text: Language.get('unit_name', '유실시간'	)
					},{	dataIndex: ''			, width: 130, align : 'right'	, text: Language.get(''			, '유실인원'	)
					},{	dataIndex: ''			, width: 130, align : 'right'	, text: Language.get(''			, '유실공수'	)
					},{	dataIndex: ''			, width: 130, align : 'right'	, text: Language.get(''			, '가동중단'	)
					},{	dataIndex: 'user_memo'	, width: 450, align : 'left'	, text: Language.get('user_memo', '비고'		)
					}
				]
			};
		return item;
	}
});
