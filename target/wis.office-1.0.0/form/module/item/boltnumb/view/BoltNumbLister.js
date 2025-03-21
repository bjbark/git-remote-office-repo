Ext.define('module.item.boltnumb.view.BoltNumbLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-boltnumb-lister',
	store		: 'module.item.boltnumb.store.BoltNumb',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent : function () {
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
					{	dataIndex: 'btno_code'		, text : Language.get('btno_code'	,'나사호칭코드'), width : 90	, align : 'center'
					},{	dataIndex: 'btno_name'		, text : Language.get('btno_name'	,'나사호칭명'	), width : 80	, align : 'right'
					},{	dataIndex: 'otsd_dimt'		, text : Language.get('otsd_dimt'	,'외경'		), width : 80	, align : 'right', xtype: 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});