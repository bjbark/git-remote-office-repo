Ext.define('module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail4', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sorderplan-lister-detail4',
	store: 'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail4',
	height	: 170,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					{	dataIndex:	'lott_numb'		, width: 100, align : 'center'	, text: Language.get(''		, 'Lot No'	),
					},{	dataIndex:	'invc_numb'		, width: 80, align : 'center'	, text: Language.get( ''	, 'Order No')
					},{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get( 'invc_date'	, '재고일자'	)
					},{	dataIndex:	'stok_qntt'		, width: 90, align : 'right'	, text: Language.get( 'stok_qntt'	, '현재고'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'need_qntt'		, width: 93, align : 'right'	, text: Language.get( 'need_qntt'	, '할당수량'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
									}
								}
							}
						}
					}
				]
			};
		return item;
	},

});
