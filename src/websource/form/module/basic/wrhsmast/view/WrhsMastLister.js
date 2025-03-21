Ext.define('module.basic.wrhsmast.view.WrhsMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wrhsmast-lister'			,
	store		: 'module.basic.wrhsmast.store.WrhsMast'	,
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
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'			,'사용')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'wrhs_code'		, text : Language.get('wrhs_code'			,'창고코드')	, width : 90  , align : 'center'
					},{ dataIndex: 'bzpl_name'		, text : Language.get('bzpl_name'			,'관리사업장')	, width : 90  , align : 'center'
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'			,'창고명')	, width : 150
					},{ dataIndex: 'mngt_wrhs_dvcd'	, text : Language.get('mngt_wrhs_dvcd'		,'창고기능구분'), width : 110 , xtype : 'lookupcolumn', lookupValue : resource.lookup('mngt_wrhs_dvcd'), align : 'center'
					},{ dataIndex: 'mngt_wrhs_name'	, text : Language.get('mngt_wrhs_name'		,'창고기능명'), width : 110
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'			,'관리부서')	, width : 110
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'			,'관리자명')	, width : 110
					},{ dataIndex: 'prod_bzpl_idcd'	, text : Language.get('prod_bzpl_idcd'		,'생산사업장'), width : 110 , align : 'center', hidden : true
					},{ dataIndex: 'nega_stok_yorn'	, text : Language.get('nega_stok_mngt_yorn'	,'음수재고')	, width : 100  , align : 'center' , xtype :'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'trut_cstm_idcd'	, text : Language.get('trut_cstm_idcd'		,'위탁거래처'), width : 110 , align : 'center', hidden : true
					},{ dataIndex: 'lcal_dvcd'		, text : Language.get('lcal_dvcd'			,'지역구분')	, width : 110  , align : 'center' , xtype :'lookupcolumn', lookupValue : resource.lookup('lcal_dvcd')
					},{ dataIndex: 'dstr_dvcd'		, text : Language.get('dstr_dvcd'			,'권역구분')	, width : 110  , align : 'center' , xtype :'lookupcolumn', lookupValue : resource.lookup('dstr_dvcd'), hidden : true
					},{ dataIndex: 'full_addr'		, text : Language.get('full_addr'			,'주소')		, flex  : 50
					}
				]
			}
		;
		return item;
	}
});
