Ext.define('module.stock.lot.lottracking.view.LotTrackingWorkMtrlLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-workmtrl-lister'			,
	store		: 'module.stock.lot.lottracking.store.LotTrackingWorkMtrl'	,
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
		var me = this;

		var gridItem = ""
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'지시번호')	, width : 110, align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'			,'공정명'	)	, width : 120
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'			,'자재코드')	, width : 90  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'			,'자재명')	    , flex:1, minWidth : 120
					},{ dataIndex: 'mtrl_lott_numb'	, text : Language.get('mtrl_lott_numb'		,'자재LOT')   , width : 110,align : 'center'
					},{ dataIndex: 'ivst_qntt'		, text : Language.get('ivst_qntt'			,'투입수량')    , width:80 , xtype : 'numericcolumn', format	: '#,##0.###',
					}
				]
			}
		;
		return item;
	}
});
