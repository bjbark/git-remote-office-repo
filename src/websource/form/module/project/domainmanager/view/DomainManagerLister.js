Ext.define('module.project.domainmanager.view.DomainManagerLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-domainmanager-lister',
	store: 'module.project.domainmanager.store.Domain',
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
		var me = this,
			item = {
			xtype : 'grid-paging',
			items: [
			 	'->', '-' ,
			 	{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
			 	{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
   	 		 	{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
					{	dataIndex: 'field_id'       , width: 100, text: 'id', align: 'left'
					},{	dataIndex: 'fied_name'       , width: 120, text: 'Name', align: 'left'
					},{	dataIndex: 'field_nm_englh' , width: 120, text: 'English', align: 'left'
					},{	dataIndex: 'field_nm_chi'	, width: 120, text: 'Chinese', align: 'left'
					},{	dataIndex: 'field_nm_jpns'  , width: 120, text: 'Japanese', align: 'left'
					},{	dataIndex: 'field_nm_etc'   , width: 100, text: 'Etc Name', align: 'left'
					},{	dataIndex: 'data_type'      , width:  80, text: 'Type'
					},{	dataIndex: 'data_len'       , width:  60, text: 'Length'
					},{	dataIndex: 'dscrt'          , width: 100, text: '설명', align: 'left'
					},{	dataIndex: 'ref_table'      , width: 180, text: '참조 Table', align: 'left'
					},{	dataIndex: 'prnt_gbcd'      , width:  90, text: '코드구분값', align: 'left'
					},{	dataIndex: 'inter_val'      , width: 180, text: '내부코드값', align: 'left'
					},{	dataIndex: 'w_nm_1'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_1'         , width: 100, text: '단어id', align: 'left'
					},{	dataIndex: 'w_nm_2'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_2'         , width: 100, text: '단어ID', align: 'left'
					},{	dataIndex: 'w_nm_3'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_3'         , width: 100, text: '단어ID', align: 'left'
					},{	dataIndex: 'w_nm_4'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_4'         , width: 100, text: '단어ID', align: 'left'
					},{	dataIndex: 'w_nm_5'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_5'         , width: 100, text: '단어ID', align: 'left'
					},{	dataIndex: 'w_nm_6'         , width: 100, text: '단어명', align: 'left'
					},{	dataIndex: 'w_id_6'         , width: 100, text: '단어ID', align: 'left'
					},{	dataIndex: 'old_id'         , width: 100, text: 'Old ID', align: 'left'
					}
	         	]
			}
		;
		return item;
	}
});





