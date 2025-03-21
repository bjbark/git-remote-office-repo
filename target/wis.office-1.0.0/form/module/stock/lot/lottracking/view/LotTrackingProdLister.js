Ext.define('module.stock.lot.lottracking.view.LotTrackingProdLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-prod-lister',
	store		: 'module.stock.lot.lottracking.store.LotTrackingProd'	,
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
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'지시번호'		)	, width : 90, align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'			,'공정명'		)	, width : 110
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'			,'품목코드'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'			,'제품명'		)	, width : 90  , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'			,'제품LOT'	)	, width : 120 , align : 'center'
					},{ dataIndex: 'ivst_qntt'		, text : Language.get('ivst_qntt'			,'투입수량'		)	, width :  80 , xtype : 'numericcolumn'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'		,'시작시간'		)	, width : 120  , align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'		,'종료시간'		)	, width : 120  , align : 'center'
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'		,'상태'		)	, width : 80  ,xtype : 'lookupcolumn', lookupValue:resource.lookup('prog_stat_dvcd')
					}
				]
			}
		;
		return item;
	}
});
