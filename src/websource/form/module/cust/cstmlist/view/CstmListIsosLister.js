Ext.define('module.cust.cstmlist.view.CstmListIsosLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-isos',
	store		: 'module.cust.cstmlist.store.CstmListIsos',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	), hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{	dataIndex : 'item_code'	, text : Language.get('item_code'	,'품목코드'	), width : 100 , align : 'center'
					},{	dataIndex : 'item_name'	, text : Language.get('item_name'	,'품명'		), flex  : 70  , align : 'left'
					},{	dataIndex : 'item_spec'	, text : Language.get('item_spec'	,'규격'		), width : 100 , align : 'center'
					},{	dataIndex : 'remk_text'	, text : Language.get('remk_text'	,'수불구분'	), width : 80  , align : 'center'
					},{	dataIndex : 'istt_qntt'	, text : Language.get('istt_qntt'	,'입고수량'	), width : 70  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'출고수량'	), width : 70  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});