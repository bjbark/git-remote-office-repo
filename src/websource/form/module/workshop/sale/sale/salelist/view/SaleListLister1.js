Ext.define('module.workshop.sale.sale.salelist.view.SaleListLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-salelist-lister1',
	store		: 'module.workshop.sale.sale.salelist.store.SaleListLister1',
	width		: 450,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'}],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : Const.EXPORT.text	, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	, cls: 'button-style' }
				],
				pagingButton: true
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'invc_date'	, text : Language.get(''	,'출고일자'					) , width : 90 , align : 'center'
						},{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'		) , width : 70 , align : 'center'
						},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		) , width : 200 , align : 'left'
						},{ dataIndex: 'ttle'		, text : Language.get('ttle'		,'제목'			) , width : 260
						},{ dataIndex: 'clss_name'	, text : Language.get('clss_name'	,'품목종류'		) , width : 150
						},{	dataIndex: 'sale_qntt'	, text : Language.get('sale_qntt'	,'수량'			) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum', align : 'right'
						},{	dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'			) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum', align : 'right'
						},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'			) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum', align : 'right'
						},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'		) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum', align : 'right'
						}
					]
				};
		return item;
	}
});