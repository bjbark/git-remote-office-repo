Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastSclsLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sheetmast-sclslister'			,
	store		: 'module.workshop.print.basic.sheetmast.store.SheetMastScls'	,
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
					{ dataIndex: 'clss_name'		, text : Language.get('Scls_name'		,'소분류')	, width : 120 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
