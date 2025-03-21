Ext.define('module.custom.hantop.item.bommast.view.BomMastMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bommast-master',
	store		: 'module.custom.hantop.item.bommast.store.BomMast',
	region		: 'center',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ftype :'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'brnd_name'		, flex : 1, align : 'left'	, text: Language.get('brnd_name'	, '브랜드'	), summaryType: 'count'
					}
				]
			}
		;
		return item;
	}

});
