Ext.define('module.stock.lot.lottracking.view.LotTrackingProrLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-lottracking-pror-lister',
	store		: 'module.stock.lot.lottracking.store.LotTrackingPror'	,
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
					{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'			,'지시번호')	, width : 100
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'			,'순번'	)	, width : 50  , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'			,'공정명'	)	, flex: 1, minWidth : 100
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'			,'설비명'	)	, width : 80
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'		,'시작시간')	, width : 120, align : 'center'
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'		,'종료시간')	, width : 120, align : 'center'
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'		,'상태'	)	, width : 80  ,xtype : 'lookupcolumn', lookupValue:resource.lookup('prog_stat_dvcd')
					}
				]
			}
		;
		return item;
	}
});
