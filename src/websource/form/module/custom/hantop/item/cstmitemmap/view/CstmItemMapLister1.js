Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cstmitemmap-lister1',
	store		: 'module.custom.hantop.item.cstmitemmap.store.CstmItemMap',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	columnLines : true,
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'자재코드'		) , width : 150 ,
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'자재명'		) , width : 250 , align : 'left'
					},{ dataIndex: ''			, text : Language.get(''	,'약어명'	) , width : 150 , align : 'left'
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width :  60 , align : 'center'
					},{ dataIndex: 'hanseem'	, text : Language.get(''	,'한샘'		) , flex  : 100 , align : 'left'
					},{ dataIndex: 'kcc'		, text : Language.get(''	,'KCC'		) , flex  : 100 , align : 'left'
					},{ dataIndex: 'winche'		, text : Language.get(''	,'윈체'		) , flex  : 100 , align : 'left'
					},{ dataIndex: 'changho'	, text : Language.get(''	,'국민창호(구.다솔)'	) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});