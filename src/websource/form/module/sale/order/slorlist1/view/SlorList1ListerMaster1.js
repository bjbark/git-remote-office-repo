Ext.define('module.sale.order.slorlist1.view.SlorList1ListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist1-lister-master1',
	store		: 'module.sale.order.slorlist1.store.SlorList1Master1'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					{	dataIndex: 'invc_date'	, text : Language.get('acpt_date' ,'주문일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'week'		, text : Language.get('week'	  ,'요일'			) , width : 60  , align : 'center'
					},{ dataIndex: 'day_qntt'	, text : Language.get('day_qntt'  ,'주문수량'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
					},{ dataIndex: 'day_amnt'	, text : Language.get('day_amnt'  ,'주문금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_qntt'	, text : Language.get('month_qntt','누적주문수량'	) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_amnt'	, text : Language.get('month_amnt','누적주문금액'	) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo' ,'비고'			) , flex  :100  , align : 'center'
					}
				]
			}
		;
		return item;
	}
});