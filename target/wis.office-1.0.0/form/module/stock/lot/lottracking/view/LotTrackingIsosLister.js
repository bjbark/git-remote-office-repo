Ext.define('module.stock.lot.lottracking.view.LotTrackingIsosLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-isos-lister'			,
	store		: 'module.stock.lot.lottracking.store.LotTrackingIsos'	,
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
					{	dataIndex: 'isos_dvcd'		, text : Language.get('isos_dvcd'			,'수불구분')	, width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('isos_dvcd'), align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'			,'일자'  )	, width : 80  , align : 'center'
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'			,'창고명' )	, width : 80
					},{ dataIndex: 'qntt'			, text : Language.get('qntt'				,'수량'  )	, width : 80, xtype : 'numericcolumn', format	: '#,##0.###',
					}
				]
			}
		;
		return item;
	}
});
