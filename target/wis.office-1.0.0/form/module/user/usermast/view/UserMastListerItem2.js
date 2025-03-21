Ext.define('module.user.usermast.view.UserMastListerItem2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-usermast-lister-item2',
	store		: 'module.user.usermast.store.UserMastItem2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'base_code'	, text : Language.get('base_code'	,'권한코드'	) , width : 150	, align : 'center'
					},{ dataIndex: 'base_name'	, text : Language.get('base_name'	,'권한명'	) , flex  : 100	, minWidth	: 90
					}
				]
			}
		;
		return item;
	}
});