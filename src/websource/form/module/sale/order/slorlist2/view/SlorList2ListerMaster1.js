Ext.define('module.sale.order.slorlist2.view.SlorList2ListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist2-lister-master1',
	store		: 'module.sale.order.slorlist2.store.SlorList2Master1'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],	columnLines : true,

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
					{	dataIndex: 'invc_date'	, text : Language.get('acpt_date'	,'주문일자'		) , width : 100 , align : 'center', hidden : _global.hqof_idcd.toUpperCase()== 'N1000SJUNG',
					},{ dataIndex: 'week'		, text : Language.get('week'		,'요일'		) , width : 60  , align : 'center', hidden : _global.hqof_idcd.toUpperCase()== 'N1000SJUNG',
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'		) , width : 100 , align : 'center', hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					},{ dataIndex: 'deli_week'	, text : Language.get('deli_week'	,'요일'		) , width : 60  , align : 'center', hidden : _global.hqof_idcd.toUpperCase()!= 'N1000SJUNG',
					},{ dataIndex: 'day_qntt'	, text : Language.get('day_qntt'	,'주문수량'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'day_amnt'	, text : Language.get('day_amnt'	,'거래금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_qntt'	, text : Language.get('month_qntt'	,'당월주문수량'	) , width : 120 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'month_amnt'	, text : Language.get('month_amnt'	,'당월주문금액'	) , width : 120 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});