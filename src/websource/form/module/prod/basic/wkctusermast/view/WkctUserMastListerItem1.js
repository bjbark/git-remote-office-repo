Ext.define('module.prod.basic.wkctusermast.view.WkctUserMastListerItem1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wkctusermast-lister-item1'			,
	store		: 'module.prod.basic.wkctusermast.store.WkctUserMastItem1'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
				defaults : {style: 'text-align: center'},
				items : [
					{	xtype: 'rownumberer'  , width:50
					},{ dataIndex: 'user_code'	, text : Language.get('wker_code'	,'작업자코드'	) , width:90 , align : 'center'
					},{ dataIndex: 'empy_name'	, text : Language.get('wker_namme'	,'작업자명'	) , flex:1,
						renderer: function(value, metaData, record, rowIndex, colIndex, view) {
							metaData.style = "white-space: normal;text-overflow: ellipsis;";
							return value;
						}
					},{ dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'소속부서'	) , width:90
					},{ dataIndex: 'wkrn_name'	, text : Language.get('wkrn_name'	,'직급'		) , width : 120 ,align : 'center'
					}
				]
			}
		;
		return item;
	}
});