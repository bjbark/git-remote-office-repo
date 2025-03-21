Ext.define('module.project.domainmanager.view.DomainManagerListerRelation', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-domainmanager-lister-relation',
	store: 'module.project.domainmanager.store.Relation',
	columnLines: true ,
//	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
			 	{	text : "관계도 추가" , iconCls: Const.MODIFY.icon, action : 'relationAdd', cls: 'button-style' } ,
				{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
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
					{	dataIndex: 'relt_name'      , width: 100, text: 'Relation name'
					},{	dataIndex: 'dtil_tabl'    , width: 120, text: 'Table ID', align: 'left'
					},{	dataIndex: 'dtl_tabl_nm' , width: 110, text: 'Table Name', align: 'left'
					},{	dataIndex: 'desct'       , width: 200, text: 'Descript'  , align: 'left'
					}
	         	]
			}
		;
		return item;
	}

});





