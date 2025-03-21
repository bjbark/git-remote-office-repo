Ext.define('module.project.domainmanager.view.DomainManagerListerTM', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-domainmanager-lister-tm',
	store: 'module.project.domainmanager.store.TableMaster',
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
					{	dataIndex: 'id'          , width:  40, text: 'ID', hidden : true
					},{	dataIndex: 'tabl_idcd'      , width: 120, text: 'Table ID', align: 'left'
					},{	dataIndex: 'tabl_name'      , width: 110, text: 'Table Name', align: 'left'
					},{	dataIndex: 'old_id'      , width: 120, text: '참조ID' , align: 'left', font_color : Const.COLOR.FONT.tax_amt, hidden: true
					},{	dataIndex: 'prjt_dvsn'      , width: 110, text: 'System', align: 'left'
					}
	         	]
			}
		;
		return item;
	}

});





