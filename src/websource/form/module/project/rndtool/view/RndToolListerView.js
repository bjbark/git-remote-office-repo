Ext.define('module.project.rndtool.view.RndToolListerView', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rndtool-lister-view',
	store: 'module.project.rndtool.store.RndToolView',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

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
			xtype	: 'grid-paging',
			items	: [
			 	'->', '-' ,
			 	{text : 'Make', iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
			 	{text : 'Script',  iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
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
				items :
				[
					{	dataIndex: 'id'          , width:  40, text: 'ID'
					},{	dataIndex: 'view_id'     , width: 200, text: 'Grid ID', align: 'left'
					},{	dataIndex: 'view_nm'     , flex :   1, text: 'Grid 명' , align: 'left'
					}
	         	]
			}
		;
		return item;
	}
});





