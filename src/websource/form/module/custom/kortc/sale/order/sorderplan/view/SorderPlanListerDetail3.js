Ext.define('module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail3', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sorderplan-lister-detail3',
	store: 'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail3',
	split		: true,
	selModel 	: { selType: 'cellmodel' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get('item_code'		, '품목코드'		),
					},{	dataIndex:	'item_name'		, width: 300, align : 'left'	, text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'		, width: 250, align : 'left'	, text: Language.get( 'item_spec'		, '규격'			)
					},{	dataIndex:	'unit_name'		, width:  90, align : 'left'	, text: Language.get( 'unit_name'		, '단위'			)
					},{	dataIndex:	'prnt_qntt'		, width: 100, align : 'right'	, text: Language.get('prnt_qntt'		, '소요량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'stok_qntt'		, width: 100, align : 'right'	, text: Language.get('stok_qntt'		, '현재고'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'puch_qntt'		, width: 100, align : 'right'	, text: Language.get('puch_qntt'		, '발주잔량'		), xtype: 'numericcolumn', summaryType: 'sum', align : 'right'
					},{	dataIndex:	'lack_qntt'		, width: 100, align : 'right'	, text: Language.get(''					, '과부족 수량'	), xtype: 'numericcolumn', summaryType: 'sum', align : 'right'
					},{	dataIndex:	'invc_numb'		, width:  80, align : 'center'	, text: Language.get(''					, '발주번호'		), align : 'center',
					},{	dataIndex:	'purc_yorn'		, width:  80, align : 'center'	, text: Language.get('purc_yorn'		, '발주여부'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('offr_date'		, '발주일자'		),
					},{	dataIndex:	'deli_date'		, width: 100, align : 'center'	, text: Language.get('deli_date2'		, '납기일자'		),
					}
				]
			};
		return item;
	},

});
