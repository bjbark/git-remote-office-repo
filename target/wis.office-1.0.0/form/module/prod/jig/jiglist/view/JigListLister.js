Ext.define('module.prod.jig.jiglist.view.JigListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-jiglist-lister',
	store		: 'module.prod.jig.jiglist.store.JigList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
			jig = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return jig ;
	},


	columnItem : function () {
		var me = this,
			jig = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'jigg_code'		, text : Language.get('jigg_code'		,'지그코드')		, width : 150 , align : 'center'
					},{ dataIndex: 'jigg_name'		, text : Language.get('jigg_name'		,'지그명')		, flex  : 100
					},{ dataIndex: 'jigg_spec'		, text : Language.get('jigg_spec'		,'지그규격')		, width : 120
					},{ dataIndex: 'jigg_stat_dvcd'	, text : Language.get('jigg_stat_dvcd'	,'지그상태')		, width : 80 , xtype : 'lookupcolumn', lookupValue : resource.lookup('jigg_stat_dvcd'), align : 'center'
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자')		, width : 80
					},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명')		, width : 150
					},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'), width : 120 , align : 'center'
					},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호')	, width : 120 , align : 'center'
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'관리부서')		, width : 140
					}
				]
			}
		;
		return jig;
	}
});
