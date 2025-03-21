Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart5', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part5',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListPart5',

	border		: 0 ,
	columnLines	: true ,

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
		item =
			{	xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : '청구서', iconCls : Const.REPORT.icon , action  : 'invGroupPrintAction' },
					'-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'part5' ,cls: 'button-style'} , '-'
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item =
				{ 	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'cstm_name'		, text: Language.get('cstm'			, '거래처명')	, width: 150, summaryType : 'count'
						},{	dataIndex: 'inv_amt'		, text: Language.get('inv_amt'				, '출고수량')	, width: 100, align:'right' , xtype : 'numericcolumn' ,  summaryType : 'sum'
						},{	dataIndex: 'sale_amnt'		, text: Language.get(''				, '공급가')	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'red'	, summaryType : 'sum'
						},{	dataIndex: 'vatx_amnt'		, text: Language.get(''				, '부가세'	)	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'green'	, summaryType : 'sum'
						},{	dataIndex: 'ttsm_amnt'		, text: Language.get('ttsm_amnt'				, '합계금액')	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'blue'	, summaryType : 'sum'
						}
					]
				};
		return item;
	}
});






