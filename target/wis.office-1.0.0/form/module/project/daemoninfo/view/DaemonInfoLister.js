Ext.define('module.project.daemoninfo.view.DaemonInfoLister', { extend: 'Axt.grid.Panel',


	alias: 'widget.module-daemoninfo-lister',
	store: 'module.project.daemoninfo.store.DaemonInfo',

	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
    plugins: [{ptype :'cellediting' , clicksToEdit: 1 }],

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
			 	{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'} ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'} ,
			 	{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'} , '-' ,
		    ]
		};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var item =
		{
			defaults: {style: 'text-align:center'},
	        items :
	        [
	         	{ text : 'NETWORK'   , dataIndex: 'host_cd'  , width : 120 , align : 'center' },
	         	{ text : '프로세스명' , dataIndex: 'daemon_nm' , width : 200 },
	         	{ text: '메모사항'    , dataIndex: 'user_memo' , flex : 1 },
	         	{ text : '숨김'  		, dataIndex: 'row_state'  , width   : 50 , xtype: 'lookupcolumn' , lookupValue : resource.getList('row_state'), align : 'center' }
	        ]
		};
		return item;
	}

});





