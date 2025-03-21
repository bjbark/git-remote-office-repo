Ext.define('module.custom.hantop.item.itemgroup.view.ItemGroupLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemgroup-lister',
	store		: 'module.custom.hantop.item.itemgroup.store.ItemGroup',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
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
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50 , align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('line_stat'),
					},{ dataIndex: 'wdgr_code'		, text : Language.get('wdgr_code'		,'코드')			, width : 80 , align : 'center'
					},{ dataIndex: 'wdgr_name'		, text : Language.get('wdgr_name'		,'그룹명')		, width : 160, align : 'left'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')			, flex  : 100, align : 'left'
					}
				]
			}
		;
		return item;
	}
});