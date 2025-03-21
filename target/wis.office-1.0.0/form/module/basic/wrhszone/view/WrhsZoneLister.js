Ext.define('module.basic.wrhszone.view.WrhsZoneLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wrhszone-lister'			,
	store		: 'module.basic.wrhszone.store.WrhsZone'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'사용'		)	, width :  50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'zone_name'	, text : Language.get('zone_name'	,'구역명'	)	, width : 150	, align : 'left'
					},{ dataIndex: 'zone_rack'	, text : Language.get('zone_rack'	,'랙'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'zone_flor'	, text : Language.get('zone_flor'	,'층'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'zone_colm'	, text : Language.get('zone_colm'	,'칸'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'user_memo'	, text : Language.get(''			,'비고'		)	, flex  : 100	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});