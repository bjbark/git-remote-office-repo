Ext.define('module.custom.sjflv.oms.omsmast.view.OmsMastSmplLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-sjflv-omsmast-smpl'			,
	store		: 'module.custom.sjflv.oms.omsmast.store.OmsMastSmpl'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
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
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get(''	,'품목코드'	)	, width : 120	, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get(''	,'품명'	)	, width : 250	, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get(''	,'규격'	)	, width : 200	, align : 'left'
					},{	dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가'	)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가X3'	)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가X5'	)	, width : 80	, align : 'right' , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'item_memo'		, text : Language.get(''	,'품목메모'	)	, width : 300	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});
