Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.view.MtrlStockList2Lister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlstocklist2-lister2',
	store		: 'module.custom.iypkg.stock.close.mtrlstocklist2.store.MtrlStockList22',

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

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}
		}
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

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_date'		, width: 130, align : 'center'	, text: Language.get(''	, '일자'		)
					},{	dataIndex:	'item_name'		, width: 180, align : 'left'	, text: Language.get(''	, '부자재명'	)
					},{	dataIndex:	'asmt_spec'		, width: 180, align : 'left'	, text: Language.get(''	, '규격'		)
					},{	dataIndex:	'asmt_dvcd'		, width: 100, align : 'center'	, text: Language.get(''	, '구분'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{	dataIndex:	'istt_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '입고량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'ostt_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '생산투입'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '재고'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden : true
					},{	dataIndex:	''		, width: 100, align : 'right'	, text: Language.get(''	, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden : true
					},{	dataIndex:	''		, width: 180, align : 'right'	, text: Language.get(''	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden : true
					},{	dataIndex:	''		, flex :   1, align : 'left'	, text: Language.get(''	, '비고'		)
					}
				]
			}
		;
		return item;
	}

 });