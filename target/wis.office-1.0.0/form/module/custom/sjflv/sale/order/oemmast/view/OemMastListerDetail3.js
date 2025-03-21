Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastListerDetail3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-oemmast-lister-detail3',
	store		: 'module.custom.sjflv.sale.order.oemmast.store.OemMastDetail3'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : 'deleteAction' ,cls: 'button-style' }, '-' ,
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
							{	xtype: 'rownumberer'	, text : Language.get(''	,'순번'	) , width : 50  , align : 'center'
							},{ dataIndex: 'item_gubun'	, text : Language.get(''	,'구분'	) , width : 100 , align : 'center'
							},{ dataIndex: 'item_code'	, text : Language.get(''	,'품목코드'	) , width : 130 , align : 'center'
							},{ dataIndex: 'item_name'	, text : Language.get(''	,'품목명'	) , width : 250 , align : 'left'
							},{ dataIndex: 'item_spec'	, text : Language.get(''	,'규격'	) , width : 180 , align : 'left'
							},{ dataIndex: 'mixx_rate'	, text : Language.get(''	,'배합비'	) , width : 80  , align : 'right', xtype: 'numericcolumn', format: '#,####0'
							},{ dataIndex: 'istt_qntt'	, text : Language.get(''	,'사용량'	) , width : 80  , align : 'right', xtype: 'numericcolumn', format: '#,####0'
							},{ dataIndex: 'istt_pric'	, text : Language.get(''	,'단가'	) , width : 80  , align : 'right', xtype: 'numericcolumn', format: '#,####0',
							},{ dataIndex: 'istt_amnt'	, text : Language.get(''	,'금액'	) , width : 80  , align : 'right', xtype: 'numericcolumn', format: '#,####0', summaryType: 'sum'
							}
						]
			}
		;
		return item;
	}
});