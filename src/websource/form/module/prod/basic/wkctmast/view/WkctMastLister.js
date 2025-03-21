Ext.define('module.prod.basic.wkctmast.view.WkctMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctmast-lister',
	store		: 'module.prod.basic.wkctmast.store.WkctMast',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true }],
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
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'		, '상태'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	dataIndex: 'wkct_code'	, text : Language.get('wkct_code'		, '공정코드'	) , width : 110 , align : 'center'
					},{	dataIndex: 'wkct_name'	, text : Language.get('wkct_name'		, '공정명'		) , width : 170
					},{	dataIndex: 'wkct_stnm'	, text : Language.get('wkct_stnm'		, '공정약칭'	) , width : 150
					},{	dataIndex: 'wkct_dvcd'	, text : Language.get('wkct_dvcd'		, '공정구분'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('wkct_dvcd'), hidden : (_global.options.mes_system_type !='Frame')
					},{	dataIndex: 'dept_name'	, text : Language.get('dept_name'		, '부서명'		) , width : 150
					},{	dataIndex: 'otod_yorn'	, text : Language.get('otod_yorn'		, '외주'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'rslt_rept_yorn'	, text : Language.get('rslt_rept_yorn', '실적보고'	) , width :  60 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	dataIndex: 'cstm_idcd'	, text : Language.get('cstm_idcd'		, '외주업체'	) , width : 150 , hidden : true
					},{	dataIndex: 'cstm_name'	, text : Language.get('otod_cstm_name'	, '외주업체'	) , width : 150
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'		, '비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});