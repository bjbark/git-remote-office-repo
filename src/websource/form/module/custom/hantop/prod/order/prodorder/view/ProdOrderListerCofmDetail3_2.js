Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail3_2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder-lister-cofmdetail3_2',
	store: 'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_2',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
				],
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'item_idcd'				, text: Language.get('item_idcd'			, '자재'					) , width :  120, align : 'left'
					},{	dataIndex:	'bfsf_dvcd'				, text: Language.get('bfsf_dvcd'			, '자재구분'				) , width :  100, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('bfsf_dvcd'),
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'				) , width :  70,xtype:'numericcolumn'
					}
				]
			};
		return item;
	},
});
