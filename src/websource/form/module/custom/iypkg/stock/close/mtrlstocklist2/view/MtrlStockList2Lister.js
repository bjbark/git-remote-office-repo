Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.view.MtrlStockList2Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist2-lister',
	store		: 'module.custom.iypkg.stock.close.mtrlstocklist2.store.MtrlStockList2',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],

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
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
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
					{	dataIndex:	'asmt_name'		, width: 200, align : 'left'	, text: Language.get('asmt_name'	, '부자재명'	)
					},{	dataIndex:	'asmt_spec'		, width: 180, align : 'left'	, text: Language.get('asmt_spec'	, '규격'		)
					},{	dataIndex:	'asmt_dvcd'		, width: 150, align : 'center'	, text: Language.get('asmt_dvcd'	, '구분'		), xtype: 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{	dataIndex:	'base_qntt'		, width: 100, align : 'right'	, text: Language.get('base_qntt'	, '기초재고'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''				, width: 100, align : 'right'	, text: Language.get(''				, '전월재고'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden : true
					},{	dataIndex:	'istt_qntt'		, width: 100, align : 'right'	, text: Language.get('istt_qntt'	, '입고량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'prod_qntt'		, width: 100, align : 'right'	, text: Language.get('prod_qntt'	, '생산투입'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'stok_qntt'		, width: 100, align : 'right'	, text: Language.get('stok_qntt'	, '재고'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'istt_qric'		, width: 100, align : 'right'	, text: Language.get('istt_qric'	, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'amnt'			, width: 180, align : 'right'	, text: Language.get('amnt'			, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, flex :   1, align : 'left'	, text: Language.get(''	, '비고'		),hidden : true
					}
				]
			}
		;
		return item;
	}

 });