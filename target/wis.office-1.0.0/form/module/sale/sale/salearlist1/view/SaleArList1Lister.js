Ext.define('module.sale.sale.salearlist1.view.SaleArList1Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salearlist1-lister',
	store		: 'module.sale.sale.salearlist1.store.SaleArList1',
	selModel	: { selType: 'checkboxmodel', mode : 'multi' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
			me.paging  = me.pagingItem();
			me.columns = me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{   dataIndex: 'invc_date'	, text : Language.get('invc_date'	,'일자'	)	, width :  80 , align : 'center',
					},{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드')	, width :  75 , align : 'center',
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'	)	, width : 160 , align : 'left',
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	)	, width : 100 , align : 'center',
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'	)	, width : 250 , align : 'left',
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'	)	, width : 200 , align : 'left',
					},{ dataIndex: 'sale_qntt'	, text : Language.get('sale_qntt'	,'출고수량'	)	, width :  70 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'sale_pric'	, text : Language.get('sale_pric'	,'단가'	)	, width : 100 , xtype :'numericcolumn', align : 'right',
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sply_amnt'	,'공급가'	)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'	)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'iomy_date'	, text : Language.get(''	,'수금일자'	)	, width : 100 , align : 'center',
					},{ dataIndex: 'colt_amnt'	, text : Language.get(''	,'수금액'	)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					},{ dataIndex: 'baln'		, text : Language.get(''			,'미수잔액'	)	, width : 100 , xtype :'numericcolumn', summaryType: 'sum', align : 'right',
					}
				]
			}
		;
		return item;
	}
});