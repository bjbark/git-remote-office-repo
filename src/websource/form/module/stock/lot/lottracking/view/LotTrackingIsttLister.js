Ext.define('module.stock.lot.lottracking.view.LotTrackingIsttLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-istt-lister'			,
	store		: 'module.stock.lot.lottracking.store.LotTrackingIstt'	,
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
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'입고번호')	, width : 100
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'			,'순번'	)	, width : 50  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'			,'입고일자'	)	, width : 90
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'			,'입고수량'	)	, width : 80 ,xtype : 'numericcolumn',format	: '#,##0.###',
					}
				]
			}
		;
		return item;
	}
});
