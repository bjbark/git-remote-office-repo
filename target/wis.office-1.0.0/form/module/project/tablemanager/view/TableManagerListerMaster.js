Ext.define('module.project.tablemanager.view.TableManagerListerMaster', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-tablemanager-lister-master',
	store: 'module.project.tablemanager.store.TableManagerMaster',
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
		var me		= this,
			item	= {
				xtype	: 'grid-paging',
				items	: [
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
					{	dataIndex: 'id'			, width:  40, text: 'ID', hidden : true
					},{	dataIndex: 'tabl_idcd'	, width: 120, text: 'Table ID'	, align: 'left'
					},{	dataIndex: 'oldd_idcd'	, width: 120, text: '참조ID'		, align: 'left',hidden : true
					},{	dataIndex: 'tabl_name'	, flex : 110, text: '테이블명'	, align: 'left'
					},{	dataIndex: 'prjt_dvsn'	, width:  50, text: 'DB '		, align: 'left'
					}
				]
			}
		;
		return item;
	}
});





