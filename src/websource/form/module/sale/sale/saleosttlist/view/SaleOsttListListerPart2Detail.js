Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart2Detail', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part2-detail',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListPart2Detail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],


	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = { xtype : 'grid-paging' };
		return item ;
	},


	columnItem : function () {
		var me = this,
			item =
				{ 	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'seq_dsp'	, text: Language.get('seq'		, '항번'		) , width:  30,
						},{	dataIndex: 'item_code'	, text: Language.get('itm_code'	, '품목코드'	), width: 110,
						},{	dataIndex: 'item_name'	, text: Language.get('item_name', '품명'		) , width: 200, summaryType : 'count'
						},{	dataIndex: 'item_spec'	, text: Language.get('itm_spec'	, '규격'		) , width: 150,
						},{	dataIndex: 'unit_name'	, text: Language.get('itm_unit'	, '단위'		) , width:  50,
						},{	dataIndex: 'qty'		, text: Language.get('quantity'	, '수량'		) , width:  60, align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
						},{	dataIndex: 'pri'		, text: Language.get('pri'		, '단가'		) , width:  80, align:'right' , xtype : 'numericcolumn'
						},{	dataIndex: 'taxtn_amt'	, text: Language.get('taxtn_amt', '공급가'	) , width:  70, align:'right' , xtype : 'numericcolumn' , font_color : 'red'	, summaryType : 'sum'
						},{	dataIndex: 'tax_amt'	, text: Language.get('tax_amt'	, '부가세'	) , width:  70, align:'right' , xtype : 'numericcolumn' , font_color : 'green'	, summaryType : 'sum'
						},{	dataIndex: 'inv_amt'	, text: Language.get('total'	, '합계'		) , width:  70, align:'right' , xtype : 'numericcolumn' , font_color : 'blue'	, summaryType : 'sum'
						},{	dataIndex: 'memo'		, text: Language.get('memo'		, '메모'		) , flex:    1,
						}
					]
				};
		return item;
	}
 });






