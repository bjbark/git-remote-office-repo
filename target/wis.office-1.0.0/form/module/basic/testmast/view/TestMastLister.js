Ext.define('module.basic.testmast.view.TestMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-testmast-lister'			,
	store		: 'module.basic.testmast.store.TestMast'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'사용')			, width :  50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'dept_code'		, text : Language.get('dept_code'		,'코드')			, width :  90	, align : 'center'
					},{ dataIndex: 'dept_name'		, text : Language.get('dept_name'		,'부서명')		, width : 150
					},{ dataIndex: 'prnt_dept_code'	, text : Language.get('prnt_dept_code'	,'상위부서코드')	, width :  90	, align : 'center'
					},{ dataIndex: 'prnt_dept_name'	, text : Language.get('prnt_dept_name'	,'상위부서명')	, width : 150
					},{ dataIndex: 'strt_date'		, text : Language.get('strt_date'		,'등록일자')		, width : 100	, align : 'center'
					},{ dataIndex: 'user_memo'		, text : Language.get(''				,'비고')			, flex  : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});