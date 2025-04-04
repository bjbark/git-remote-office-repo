Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salecolt-lister-detail1',
	store		: 'module.custom.sjflv.sale.sale.salecolt.store.SaleColtDetail1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId : 'detail1'}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get(''	,'항번'	) , width : 50  , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get(''	,'품목코드'	) , width : 120 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get(''	,'품명'	) , width : 260
					},{ dataIndex: 'item_spec'	, text : Language.get(''	,'규격'	) , width : 160
					},{ dataIndex: 'sale_unit'	, text : Language.get(''	,'단위'	) , width : 60 , align : 'center'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get(''	,'판매금액'	) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'iomy_amnt'	, text : Language.get(''	,'수금금액'	) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'memo'		, text : Language.get(''	,'비고'	) , minWidth : 100,flex  : 1
					}
				]
			}
		;
		return item;
	}
});