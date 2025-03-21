Ext.define('module.project.rndtool.view.RndToolListerModule', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rndtool-lister-module',
	store: 'module.project.rndtool.store.RndToolModule',
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
					{	dataIndex: 'id'          , width:  40, text: 'ID'
					},{	dataIndex: 'modl_id'     , width: 200, text: 'Module ID', align: 'left'
					},{	dataIndex: 'modl_nm'     , flex :   1, text: 'Module 명' , align: 'left'
					}
	         	]
			}
		;
		return item;
	}
});





