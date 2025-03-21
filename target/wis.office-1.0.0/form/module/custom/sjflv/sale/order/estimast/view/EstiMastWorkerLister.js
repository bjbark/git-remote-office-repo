Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-sjflv-estimast-worker-lister',
	store : 'module.custom.sjflv.sale.order.estimast.store.EstiMastWorkerLister',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

//	viewConfig: {
//		markDirty: false,
//		loadMask : false
//	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'assi_seqn'		, width: 50 , align : 'center'	, text: Language.get('assi_seqn'	, '항번'					)
					},{	dataIndex:	'item_name'		, width :  140, align : 'left'	, text: Language.get('item_name'	, '원재료명'				)
					},{	dataIndex:	'pric'			, width:  70, align : 'right'	, text: Language.get('pric'			, 'price<br>(원/Kg)'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0.##'
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

										grid.plugins[0].startEdit(row+1, grid.columns[2]);
									}
								}
							}
						}
					},{	dataIndex:	'mixx_rate'		, width:  70, align : 'right'	, text: Language.get('mixx_rate'	, '배합비'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'amnt'			, width:  70, align : 'right'	, text: Language.get('amnt'			, '제조원가<br>(원)'), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'invc_numb' 	, width:  80, align : 'right'	, text: Language.get(''				, 'invc_numb'	),hidden : true
					},{	dataIndex:	'line_seqn' 	, width:  80, align : 'right'	, text: Language.get(''				, 'line_seqn'	),hidden : true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this,
			grid = this,
			pos = this.view.getSelectionModel().getCurrentPosition().row,
			editor = Ext.ComponentQuery.query('module-sjflv-estimast-worker-editor')[0],
			models = grid.getStore().getRange()
		;
		models[pos].set('amnt',models[pos].get('mixx_rate') * context.value);
	},

	listeners: {
		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
	}
});
