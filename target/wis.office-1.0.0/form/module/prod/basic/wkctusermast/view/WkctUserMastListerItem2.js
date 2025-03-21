Ext.define('module.prod.basic.wkctusermast.view.WkctUserMastListerItem2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctusermast-lister-item2',
	store		: 'module.prod.basic.wkctusermast.store.WkctUserMastItem2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					{	xtype: 'rownumberer'  , width:50
					},{ dataIndex: 'user_code'	, text : Language.get('wker_code'	,'작업자코드'	) , width :90  , align : 'center'
					},{ dataIndex: 'user_name'	, text : Language.get('wker_name'	,'작업자명'	) , flex  :1,
						renderer: function(value, metaData, record, rowIndex, colIndex, view) {
							metaData.style = "white-space: normal;text-overflow: ellipsis;";
							return value;
						}
					},{ dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'소속부서'	) , width :90
					},{ dataIndex: 'wkkn_dvcd'	, text : Language.get('wkkn_dvcd'	,'직급'		) , width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('wkkn_dvcd'), align : 'center'
					}
				]
			}
		;
		return item;
	}
});