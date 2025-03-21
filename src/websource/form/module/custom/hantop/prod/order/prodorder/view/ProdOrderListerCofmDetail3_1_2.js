Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail3_1_2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder-lister-cofmdetail3_1_2',
	store: 'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_1_2',
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
					{	xtype: 'rownumberer' , dataIndex:	'line_seqn'				, text: Language.get('line_seqn'			, '순서'		) , width :  40, align : 'center'
					},{	dataIndex:	'item_idcd'				, text: Language.get('item_idcd'			, '자재'					) , width :  120, align : 'left'
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'				) , width :  70,xtype:'numericcolumn', summaryType: 'sum'
					}
				]
			};
		return item;
	},
});
