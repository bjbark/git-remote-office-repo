Ext.define('module.cust.oembmast.view.OembMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-oembmast-lister'			,
	store		: 'module.cust.oembmast.store.OembMast'	,
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
				],
				pagingButton : false
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults : {style: 'text-align: center'},
				items : [
							{ 	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'상태'	) , width:50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
							},{	dataIndex: 'oemb_idcd'	, text : Language.get(''	,'코드'	) , width:80 , align : 'center'
							},{ dataIndex: 'oemb_name'	, text : Language.get('oemb_name'	,'OEM명'	) , flex:1,
								renderer: function(value, metaData, record, rowIndex, colIndex, view) {
									metaData.style = "white-space: normal;text-overflow: ellipsis;";
									return value;
								}
							},{ dataIndex: 'drtr_name'	, text : Language.get('drtr_name'	,'담당자'	) , width:120
							}
						]
			}
		;
		return item;
	}
});