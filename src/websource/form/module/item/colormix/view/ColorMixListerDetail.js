Ext.define('module.item.colormix.view.ColorMixListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-colormix-lister-detail',
	store		: 'module.item.colormix.store.ColorMixDetail',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'				, text : Language.get('line_seqn'				,'배합순서'		) , width : 70  , align : 'center'
					},{ dataIndex: 'detail_item_name'		, text : Language.get('detail_item_name'		,'안료 및 첨가제'	) , width : 180 , align : 'left'
					},{ dataIndex: 'detail_unit_perc_wigt'	, text : Language.get('detail_unit_perc_wigt'	,'단위당 중량'	) , width : 100 , align : 'right'
					},{ dataIndex: 'detail_wigt_unit'		, text : Language.get('detail_wigt_unit'		,'단위'			) , width : 70
					}
				]
			}
		;
		return item;
	}
});