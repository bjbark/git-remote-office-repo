Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListListerPart4', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister-part4',
	store		: 'module.sale.sale.saleosttlist.store.SaleOsttListPart4',

	border		: 0 ,
	columnLines	: true ,

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
		item =
			{	xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'part4' ,cls: 'button-style'} , '-'
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'item_code'		, text: Language.get('itm_code'		,'품목코드'	)	, width: 110
						},{	dataIndex: 'item_name'		, text: Language.get('item_name'	,'품명'		)	, width: 200, summaryType : 'count'
						},{	dataIndex: 'item_spec'		, text: Language.get('itm_spec'		,'규격'		)	, width: 150
						},{	dataIndex: 'unit_name'		, text: Language.get('itm_unit'		,'단위'		)	, width:  40
						},{	dataIndex: 'qty'			, text: Language.get('quantity'		,'수량'		)	, width:  70, align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
						},{	dataIndex: 'sale_pric'		, text: Language.get('invc_pric'	,'단가'		)	, width:  80  , align:'right' , xtype : 'numericcolumn'
						},{	dataIndex: 'sale_amnt'		, text: Language.get(''				, '공급가'		)	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'red'	, summaryType : 'sum'
						},{	dataIndex: 'vatx_amnt'		, text: Language.get(''				, '부가세'		)	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'green', summaryType : 'sum'
						},{	dataIndex: 'ttsm_amnt'		, text: Language.get(''				, '합계금액'	)	, width: 100, align:'right' , xtype : 'numericcolumn' , font_color : 'blue'	, summaryType : 'sum'
						}
					]
				};
		return item;
	}
});






