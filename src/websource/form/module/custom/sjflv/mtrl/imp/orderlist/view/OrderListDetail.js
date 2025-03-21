Ext.define('module.custom.sjflv.mtrl.imp.orderlist.view.OrderListDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-orderlist-detail',
	store		: 'module.custom.sjflv.mtrl.imp.orderlist.store.OrderListDetail',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 50  , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 120 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 120 , align : 'left'
					},{	dataIndex: 'item_hscd'	, text : Language.get('item_hscd'	,'HS Code'	) , width : 100 , align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width : 50
					},{	dataIndex: 'qntt'		, text : Language.get('qntt'		,'수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'exch_pric'	, text : Language.get('exch_pric'	,'단가'		) , width : 90  , xtype : 'numericcolumn'
					},{	dataIndex: 'exch_amnt'	, text : Language.get('exch_amnt'	,'금액'		) , width : 110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'krwn_pric'	, text : Language.get('krwn_pric'	,'원화단가'		) , width : 90  , xtype : 'numericcolumn'
					},{	dataIndex: 'krwn_amnt'	, text : Language.get('krwn_amnt'	,'원화금액'		) , width : 110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'mker_name'	, text : Language.get('mker_name'	,'Maker'	) , width : 100 , align : 'center'
					},{	dataIndex: 'ship_schd_date'	, text : Language.get(''		,'선적예정일'	) , width : 100 , align : 'center', xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, flex :  20, align : 'left'		, text: Language.get('user_memo'			, '비고'		), minWidth : 200
					}
				]
			}
		;
		return item;
	}
});