Ext.define('module.prod.order.prodrealtime.view.ProdRealTimeLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodrealtime-lister2'			,
	store		: 'module.prod.order.prodrealtime.store.ProdRealTime3'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	border		: 0,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'lcls_idcd'	, text : Language.get('lcls_idcd'	,'대분류'		) , width : 80  , align : 'left'
					},{ dataIndex: 'mcls_idcd'	, text : Language.get('mcls_idcd'	,'중분류'		) , width : 80  , align : 'left'
					},{ dataIndex: 'scls_idcd'	, text : Language.get('scls_idcd'	,'소분류'		) , width : 80  , align : 'left'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 300 , align : 'left'
					},{ dataIndex: 'indn_qntt'	, text : Language.get('indn_qntt'	,'지시수량'		) , width : 90  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'day_qntt'	, text : Language.get('day_qntt'	,'금일생산수량'	) , width : 90  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'day_per'	, text : Language.get('day_per'		,'금일%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'week_qntt'	, text : Language.get('week_qntt'	,'금주생산수량'	) , width : 90  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'week_per'	, text : Language.get('week_per'	,'금주%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'month_qntt'	, text : Language.get('month_qntt'	,'당월생산수량'	) , width : 90  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_per'	, text : Language.get('month_per'	,'당월%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});