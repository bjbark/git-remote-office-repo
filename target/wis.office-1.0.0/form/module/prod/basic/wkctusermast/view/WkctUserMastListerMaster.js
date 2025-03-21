Ext.define('module.prod.basic.wkctusermast.view.WkctUserMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctusermast-lister-master',
	store		: 'module.prod.basic.wkctusermast.store.WkctUserMast',
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
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'상태')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'wkct_code'	, text : Language.get('wkct_code'	,'공정코드')	, width : 110 , align : 'center'
					},{ dataIndex: 'wkct_name'	, text : Language.get('wkct_name'	,'공정명')	, width : 170
					},{ dataIndex: 'wkct_stnm'	, text : Language.get('wkct_stnm'	,'공정약칭')	, width : 150
					},{ dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'부서명')	, width : 150
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고')		, flex  : 100
					}
				]
			}
		;
		return item;
	}
});
