Ext.define('module.prod.cvic.cvicmast.view.CvicMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cvicmast-lister',
	store		: 'module.prod.cvic.cvicmast.store.CvicMast',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
	columnLines : true,
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
			cvic = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->','->','->', '-',
					{	text : '<span class="write-button">일상점검표</span>',    action : 'amendAction', cls: 'button1-style'	},
					'-',
					{	text : '<span class="write-button">연간점검표</span>', action : 'copyAction' , cls: 'button1-style'	},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return cvic ;
	},

	columnItem : function () {
		var me = this,
			cvic = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'		) , width :  80 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 190
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'		) , width : 200
					},{ dataIndex: 'clss_desc'		, text : Language.get(''				,'분류명'		) , width : 180
					},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격'		) , width : 80
					},{ dataIndex: 'cvic_stnm'		, text : Language.get('cvic_stnm'		,'설비약칭'		) , width : 120
					},{ dataIndex: 'cvic_kind_dvcd'	, text : Language.get('cvic_kind_dvcd'	,'설비종류'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_kind_dvcd'), align : 'center'
					},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태'		) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'prod_abty'		, text : Language.get('prod_abty'		,'생산능력'		) , width : 70  , align : 'right'
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자'		) , width : 80
					},{ dataIndex: 'used_year'		, text : Language.get('used_year'		,'사용년한'		) , width : 80
					},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명'		) , width : 150
					},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'	) , width : 100 , align : 'center'
					},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호'	) , width : 100 , align : 'center'
					},{ dataIndex: 'mchn_numb'		, text : Language.get('mchn_numb'		,'관리번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조사명'		) , width : 80
					},{ dataIndex: 'dept_name'		, text : Language.get('mngt_dept'		,'관리부서'		) , width : 100
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'		) , flex  : 100 , minWidth : 100, maxWidth : 250
					}
				]
			}
		;
		return cvic;
	}
});
