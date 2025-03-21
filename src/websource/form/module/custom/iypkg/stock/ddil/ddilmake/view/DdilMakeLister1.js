Ext.define('module.custom.iypkg.stock.ddil.ddilmake.view.DdilMakeLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iypkg-ddilmake-lister1',
	store		: 'module.custom.iypkg.stock.ddil.ddilmake.store.DdilMake1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
//	border		: 0,
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">실사대장 작성</span>', action : 'writeAction', cls: 'button1-style'	},
					'->','->','->','->','->',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'acct_bacd'		, text : Language.get('acct_bacd'		,'계정구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acct_dvcd')
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 250 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 150 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width :  60 , align : 'center'
					},{ dataIndex: 'base_qntt'		, text : Language.get('base_qntt'		,'이월'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'출고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'재고'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});