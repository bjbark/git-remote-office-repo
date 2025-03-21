Ext.define('module.custom.aone.item.itemlist.view.ItemListIsosLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-isos',
	store		: 'module.custom.aone.item.itemlist.store.ItemListIsos',

	selModel	: { selType: 'cellmodel', mode : 'MULTI' },
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
					{	dataIndex:	'line_stat'			, width:   70, align : 'center'	, text: Language.get('line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex : 'invc_date'	, text : Language.get(''	,'수불일자'	), width : 180 , align : 'center'
					},{	dataIndex : 'invc_numb'	, text : Language.get(''			,'수불근거'	), width : 240
					},{	dataIndex : 'invc_numb'	, text : Language.get(''			,'수불구분'	), width : 200
					},{	dataIndex : 'cstm_name'	, text : Language.get(''			,'거래처'	), width : 270
					},{	dataIndex : 'istt_qntt'	, text : Language.get('istt_qntt'	,'입고수량'	), width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'출고수량'	), width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'cstm_name'	, text : Language.get(''			,'비고'	), flex  :   1
					}
				]
			}
		;
		return item;
	}
});