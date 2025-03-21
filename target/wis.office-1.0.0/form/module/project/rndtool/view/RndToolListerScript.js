Ext.define('module.project.rndtool.view.RndToolListerScript', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-rndtool-lister-script',
	store		: 'module.project.rndtool.store.RndToolScript',
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel'   ,  mode : 'MULTI' },
	features    : [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },


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
		var me = this,
			item = {
			xtype : 'grid-paging',
			items: [
			 	'->', '-' ,
   	 	 		{text : Const.EXPORT.text , iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
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
					{	dataIndex: 'view_text'   , flex: 1, text: 'Java Script Lines', align: 'left'
					}
	         	]
			}
		;
		return item;
	}
});





