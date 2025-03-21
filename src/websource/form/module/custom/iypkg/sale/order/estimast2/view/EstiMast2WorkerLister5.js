Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister5', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast2-worker-lister5',
	store : 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2WorkerLister5',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },


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
//				items : [
//					'->', '-',
//					]
				pagingButton : false
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
					{	dataIndex:	'assi_seqn'	, width: 50 , align : 'center'	, text: Language.get('line_seqn', '항번'	)
					},{	dataIndex:	'devl_ctnt'	, width: 250, align : 'left'	, text: Language.get('devl_ctnt', '개발내역')
					},{	dataIndex:	'amnt'		, width: 120, align : 'right'	, text: Language.get('amnt'		, '금액'	),  xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'remk_text'	,  flex:   1, align : 'left'	, text: Language.get('remk_text', '비고'	),
					}
				]
			}
		;
		return item;
	},

});
