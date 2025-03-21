Ext.define('module.custom.kortc.item.itemlist.ItemListRettLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-rett',
	store		: 'module.custom.kortc.item.itemlist.store.ItemListRett',

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
					{	dataIndex : 'invc_date'		, text : Language.get('rett_date'		,'상태'	), width :  80 , align : 'center'
					},{	dataIndex : 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품일자'	), width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'rett_resn_dvcd', text : Language.get('rett_resn_dvcd'	,'반품수량'	), width : 200 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_resn_dvcd'), align : 'center'
					},{	dataIndex : 'rett_memo'		, text : Language.get('rett_memo'		,'거래처'	), width :  150 , align : 'left'
					},{	dataIndex : 'rett_proc_dvcd', text : Language.get('rett_proc_dvcd'	,'반품사유'	), width :  200 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_proc_dvcd'), align : 'center'
					},{	dataIndex : 'rett_proc_dvcd', text : Language.get('rett_proc_dvcd'	,'반품메모'	), flex  :  1  , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_proc_dvcd'), align : 'center'
					},{	dataIndex : 'rett_proc_dvcd', text : Language.get('rett_proc_dvcd'	,'처리현황'	), width :  150 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_proc_dvcd'), align : 'center'
						}
				]
			}
		;
		return item;
	}
});