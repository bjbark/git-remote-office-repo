Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMtrl', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist1-lister-mtrl',
	store		: 'module.custom.aone.sale.order.sorderlist1.store.SorderList1Mtrl',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],	columnLines : true,
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype: 'rownumberer'    , text : '항번', width : 40       , align : 'center', hidden : false,
					},{	dataIndex:	'item_code' , width	: 100, align	: 'left'  , text: Language.get('item_code'	, '품목코드'	),
					},{	dataIndex:	'item_name' , width	: 150, align	: 'left'  , text: Language.get(''	, '부품명'	),
					},{	dataIndex:	'item_spec' , width	: 120, align	: 'left'  , text: Language.get('item_spec'	, '규격'),
					},{	dataIndex:	'stok_qntt' , width : 50 , align	: 'right' , text: Language.get( 'stok_qntt', '재고'), name : 'stok_qntt'
					},{	dataIndex:	'qntt'      , width : 100, align	: 'right' , text: Language.get( 'qntt'	, '투입량'	),  xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
					},{	dataIndex:	'pric'      , width : 80 , align	: 'right' , text: Language.get('pric'	, '단가'),
					},{	dataIndex:	'amnt'      , width:  100, align	: 'right' , text: Language.get('amnt'	, '금액'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
					},
				]
			}
		;
		return item;
	}
});