Ext.define('module.custom.dhtec.prod.bomwork.view.BomWorkLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bomwork-lister1',
	store		: 'module.custom.dhtec.prod.bomwork.store.BomWorkStore1',
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
					{	dataIndex: 'acct_name'		, text : Language.get(''	, '계정구분')	, width : 70	, align: 'center'
					},{ dataIndex: 'item_code'		, text : Language.get(''	, '품목코드')	, width : 90
					},{ dataIndex: 'item_name'		, text : Language.get(''	, '품명'	)	, width : 180
					},{ dataIndex: 'item_spec'		, text : Language.get(''	, '규격'	)	, width : 90
					}
				]
			}
		;
		return item;
	}
});
