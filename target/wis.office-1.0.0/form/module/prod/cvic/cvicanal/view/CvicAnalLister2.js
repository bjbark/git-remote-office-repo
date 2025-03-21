Ext.define('module.prod.cvic.cvicanal.view.CvicAnalLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cvicanal-lister2'			,
	store		: 'module.prod.cvic.cvicanal.store.CvicAnal2'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'clss_name'	, text : Language.get('clss_name'	,'분류명'		) , width : 150  , align : 'left'
					}
				]
			}
		;
		return item;
	}
});