Ext.define('module.stock.lot.lottracking.view.LotTrackingOrdrLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-ordr-lister'			,
	store		: 'module.stock.lot.lottracking.store.LotTrackingOrdr'	,
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
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'발주번호'		)	, width : 100
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'			,'순번'		)	, width : 40  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'			,'발주일자'		)	, width : 90 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'			,'발주거래처'	)	, flex  : 1 , minWidth : 120
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'			,'납기일자'		)	, width : 90, align : 'center'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'			,'단위'		)	, width : 40, align : 'center'
					},{ dataIndex: 'offr_qntt'		, text : Language.get('offr_qntt'			,'발주수량'		)	, width : 80, xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});
