Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastLclsLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sheetmast-lclslister'			,
	store		: 'module.workshop.print.basic.sheetmast.store.SheetMastLcls'	,
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
					{ dataIndex: 'clss_name'		, text : Language.get('lcls_name'		,'대분류')	, width : 120 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
