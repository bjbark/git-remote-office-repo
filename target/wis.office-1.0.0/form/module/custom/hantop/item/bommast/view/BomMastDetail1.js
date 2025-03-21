Ext.define('module.custom.hantop.item.bommast.view.BomMastDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bommast-detail1',
	store		: 'module.custom.hantop.item.bommast.store.BomMastDetail1',
	region		: 'center',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
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
				items : [
						'->', '-',
//						{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wdgr_code'	, width :  50 , align : 'center'	, text : Language.get('wdgr_code'		,'코드'		)
					},{ dataIndex: 'wdgr_name'	, flex  :   1 , align : 'left'		, text : Language.get('wdgr_name'		,'창호그룹'	), summaryType: 'count'
					}
				]
			}
		;
		return item;
	}
});