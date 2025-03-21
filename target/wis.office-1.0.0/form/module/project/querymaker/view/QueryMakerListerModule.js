Ext.define('module.project.querymaker.view.QueryMakerListerModule', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-querymaker-lister-module',
	store		: 'module.project.querymaker.store.QueryMakerModule',
	columnLines	: true ,
	selModel	: {	selType: 'checkboxmodel', mode : 'SINGLE'},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this, item =
		{
			xtype : 'grid-paging',
			items:
			[
			 	'->', '-' ,
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center', align: 'center'},
				items : [
					{	dataIndex:	'path'	, width:  80, align: 'left'   , text: Language.get( 'path'	, '경로'		)
					},{	dataIndex:	'srvc'	, width:  80, align: 'left'   , text: Language.get( 'srvc'	, '서비스'	)
					},{	dataIndex:	'modl'	, width:  80, align: 'left'   , text: Language.get( 'modl'	, '모쥴'		)
					}
				]
			}
		;
		return item;
	}
});





