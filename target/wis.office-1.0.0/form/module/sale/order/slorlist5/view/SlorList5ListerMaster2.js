Ext.define('module.sale.order.slorlist5.view.SlorList5ListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist5-lister-master2',
	store		: 'module.sale.order.slorlist5.store.SlorList5Master2'	,

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
					{	dataIndex: 'item_code'	, text : Language.get('item_code' ,'품목코드'	) , width : 120 , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name' ,'품명'		) , width : 360 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec' ,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'modl_name'	, text : Language.get('modl_name' ,'모델명'		) , width : 130 , align : 'left'
					},{ dataIndex: 'acpt_cont'	, text : Language.get('month_qntt','주문건수'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_amnt'	, text : Language.get('month_amnt','주문금액'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'deli_ok'	, text : Language.get('month_amnt','납기준수건수'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'deli_not'	, text : Language.get('month_amnt','납기미준수건수'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'deli_rate'	, text : Language.get('month_amnt','납기준수율'	) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'remk_text'	, text : Language.get('user_memo' ,'비고'		) , flex  : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});