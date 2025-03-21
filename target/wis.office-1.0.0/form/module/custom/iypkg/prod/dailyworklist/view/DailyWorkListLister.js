Ext.define('module.custom.iypkg.prod.dailyworklist.view.DailyWorkListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailyworklist-lister'			,
	store		: 'module.custom.iypkg.prod.dailyworklist.store.DailyWorkList'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get(''	,'생산일자'	)	, width :  90
					},{ dataIndex: 'cstm_name'		, text : Language.get(''	,'수주처명 '	)	, width : 160
					},{ dataIndex: 'prod_name'		, text : Language.get(''	,'품명'		)	, width : 320
					},{ dataIndex: 'prod_spec'		, text : Language.get(''	,'제품규격'	)	, width : 160
					},{ dataIndex: 'wkct_name'		, text : Language.get(''	,'공정명'	)	, width : 80
//					},{ dataIndex: ''				, text : Language.get(''	,'보조명'	)	, width :  90
//					},{ dataIndex: 'work_unit'		, text : Language.get(''	,'작업단위'	)	, width :  70
					},{ dataIndex: 'prod_qntt'		, text : Language.get(''	,'생산량'	)	, width : 90,xtype:'numericcolumn'
					},{ dataIndex: 'shot'			, text : Language.get(''	,'Shot'		)	, width : 90,xtype:'numericcolumn'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get(''	,'시작일시'	)	, width : 130,
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get(''	,'종료일시'	)	, width : 130
//					},{ dataIndex: ''				, text : Language.get(''	,'감량'		)	, width :  50,xtype:'numericcolumn'
//					},{ dataIndex: 'qntt_unit'		, text : Language.get(''	,'수량단위'	)	, width :  70
//					},{ dataIndex: 'invc_pric'		, text : Language.get(''	,'단가'		)	, width : 120,xtype:'numericcolumn'
//					},{ dataIndex: 'sply_amnt'		, text : Language.get(''	,'공급가액'	)	, width : 180,xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});