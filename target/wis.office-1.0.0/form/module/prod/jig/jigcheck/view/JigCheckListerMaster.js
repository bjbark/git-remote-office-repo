Ext.define('module.prod.jig.jigcheck.view.JigCheckListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-jigcheck-lister-master',
	store		: 'module.prod.jig.jigcheck.store.JigCheckMaster',
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')		, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'jigg_code'		, text : Language.get('jigg_code'		,'지그코드')	, width : 120 , align : 'center'
					},{ dataIndex: 'jigg_name'		, text : Language.get('jigg_name'		,'지그명')		, width : 240
					},{ dataIndex: 'jigg_spec'		, text : Language.get('jigg_spec'		,'지그규격')	, width : 160 , align : 'center'
					},{ dataIndex: 'jigg_qntt'		, text : Language.get('jigg_qntt'		,'수량')		, width : 60 , align : 'right'
					},{ dataIndex: 'jigg_stat_dvcd'	, text : Language.get('jigg_stat_dvcd'	,'지그상태')	, width : 80 , xtype : 'lookupcolumn', lookupValue : resource.lookup('jigg_stat_dvcd'), align : 'center'
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자')	, width : 120,align : 'center'
					},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명')	, width : 120
					},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'), width : 160 , align : 'center'
					},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호')	, width : 120 , align : 'center'
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'관리부서')	, flex : 1 , minWidth : 120
					},{ dataIndex: 'mngt_dept_idcd'	, text : Language.get('mngt_dept_idcd'	,'관리부서')	, hidden:true
					}
				]
			}
		;
		return item;
	}
});
