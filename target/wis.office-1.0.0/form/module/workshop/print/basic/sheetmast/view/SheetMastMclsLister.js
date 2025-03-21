Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastMclsLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sheetmast-mclslister'			,
	store		: 'module.workshop.print.basic.sheetmast.store.SheetMastMcls'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{ dataIndex: 'clss_name'		, text : Language.get('mcls_name'		,'중분류')	, width : 120 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
