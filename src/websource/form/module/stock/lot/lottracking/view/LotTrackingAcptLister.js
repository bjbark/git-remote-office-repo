Ext.define('module.stock.lot.lottracking.view.LotTrackingAcptLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-acpt-lister',
	store		: 'module.stock.lot.lottracking.store.LotTrackingAcpt',
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
		var me = this
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'수주번호'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'			,'수주일자'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'			,'거래처명'		)	, minWidth : 150 , flex : 1,
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'			,'납기일자'		)	, width : 110
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'			,'단위'		)	, width : 60
					},{ dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'			,'수주량'		)	, width : 80, xtype :'numericcolumn'
					},{ dataIndex: 'cstm_lott_numb'	, text : Language.get('cstm_lott_numb'		,'고객LOT'	)	, width : 110
					}
				]
			}
		;
		return item;
	}
});
