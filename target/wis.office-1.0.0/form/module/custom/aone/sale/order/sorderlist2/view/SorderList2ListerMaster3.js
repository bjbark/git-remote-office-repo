Ext.define('module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerMaster3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist2-lister-master3',
	store		: 'module.custom.aone.sale.order.sorderlist2.store.SorderList2Master3'	,

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
					{	dataIndex: 'item_code'	, text : Language.get('item_code' ,'품목코드'	) , width : 120  , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name' ,'품명'	) , width : 360  , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec' ,'규격'		) , width : 150  , align : 'left'
					},{	dataIndex: 'modl_name'	, text : Language.get('modl_name' ,'모델명'	) , width : 130  , align : 'left'
					},{ dataIndex: 'invc_qntt'	, text : Language.get('invc_qntt' ,'주문수량'	) , width : 100  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'	, text : Language.get('invc_amnt' ,'주문금액'	) , width : 100  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_qntt'	, text : Language.get('month_qntt','당월주문수량') , width : 100  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_amnt'	, text : Language.get('month_amnt','당월주문금액') , width : 100  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo' ,'비고'		) , flex  : 100  , align : 'center'
					}
				]
			}
		;
		return item;
	}
});