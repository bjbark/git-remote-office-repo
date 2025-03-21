Ext.define('module.prod.cvic.cviccheck.view.CvicCheckListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cviccheck-lister-master',
	store		: 'module.prod.cvic.cviccheck.store.CvicCheckMaster',
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
					'-', '->', '-',
					{	text : '<span class="write-button">설비이력카드</span>', action : 'printAction',cls: 'button1-style', width: 80	}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 150
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'		) , width : 100
					},{ dataIndex: 'clss_name'		, text : Language.get(''				,'설비분류기준'	) , width : 80
					},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격'		) , width : 80
					},{ dataIndex: 'cvic_kind_dvcd'	, text : Language.get('cvic_kind_dvcd'	,'설비종류'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_kind_dvcd'), align : 'center'
					},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자'		) , width : 80
					},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명'		) , width : 150
					},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'	) , width : 110 , align : 'center'
					},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호'	) , width : 110 , align : 'center'
					},{ dataIndex: 'mchn_numb'		, text : Language.get('mchn_numb'		,'관리번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조사명'		) , width : 80
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'관리부서'		) , width : 100
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});
