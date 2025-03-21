Ext.define('module.sale.sale.newitemsale.view.NewItemSaleLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-newitemsale-lister',
	store		: 'module.sale.sale.newitemsale.store.NewItemSale',
	selModel	: { selType: 'checkboxmodel', mode : 'multi' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'} ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
//	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{	dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'매출일자'	)	, width :  90 , align : 'center',
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	)	, width : 160 , align : 'left',
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	)	, width :  80 , align : 'center',
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	)	, width : 250 , align : 'left',
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'	)	, width : 210 , align : 'left',
					},{ dataIndex: 'sale_qntt'		, text : Language.get('sale_qntt'		,'수량'	)	, width :  80 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'	)	, width : 100 , xtype :'numericcolumn'
					},{ dataIndex: 'sale_amnt'		, text : Language.get('sale_amnt'		,'공급가'	)	, width : 110 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'	)	, width : 110 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	)	, width : 120 , xtype :'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});