Ext.define('module.cust.cstmlist.view.CstmListRettLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmlist-rett',
	store		: 'module.cust.cstmlist.store.CstmListRett',

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
					},{	dataIndex : 'item_code'		, text : Language.get('item_code'		,'품목코드'	), width : 150 , align : 'center'
					},{	dataIndex : 'item_name'		, text : Language.get('item_name'		,'품명'		), flex  :  40 , align : 'left'
					},{	dataIndex : 'rett_qntt'		, text : Language.get('rett_qntt'		,'반품수량'	), width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'invc_date'		, text : Language.get('rett_date'		,'반품일자'	), width :  80 , align : 'center'
					},{	dataIndex : 'rett_resn_dvcd', text : Language.get('rett_resn_dvcd'	,'반품사유'	), width :  80 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_resn_dvcd'), align : 'center'
					},{	dataIndex : 'rett_memo'		, text : Language.get('rett_memo'		,'반품메모'	), flex  :  60 , align : 'left'
					},{	dataIndex : 'rett_proc_dvcd', text : Language.get('rett_proc_dvcd'	,'반품처리'	), width :  80 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('rett_proc_dvcd'), align : 'center'
					}
				]
			}
		;
		return item;
	}
});