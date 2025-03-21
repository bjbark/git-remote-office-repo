Ext.define('module.custom.aone.item.itemlist.view.ItemListRettLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-rett',
	store		: 'module.custom.aone.item.itemlist.store.ItemListRett',

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
					},{	dataIndex : 'invc_date'		, text : Language.get('rett_date'		,'반품일자'	), width : 170 , align : 'center'
					},{	dataIndex : 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품수량'	), width : 230 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'cstm_name'		, text : Language.get(''				,'거래처'	), width : 210
					},{	dataIndex : 'rett_resn_dvcd', text : Language.get('rett_resn_dvcd'	,'반품사유'	), width : 260 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_resn_dvcd'), align : 'center'
					},{	dataIndex : 'rett_memo'		, text : Language.get('rett_memo'		,'반품메모'	), flex  :   1 , align : 'left'
					},{	dataIndex : 'rett_proc_dvcd', text : Language.get('rett_proc_dvcd'	,'처리현황'	), width : 180 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_proc_dvcd'), align : 'center'
					}
				]
			}
		;
		return item;
	}
});