Ext.define('module.custom.kortc.prod.order.prodrealtime.view.ProdRealTimeLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodrealtime-lister',

	store		: 'module.custom.kortc.prod.order.prodrealtime.store.ProdRealTime',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
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
					{	dataIndex:	''				, width:  80, align : 'center'	, text: Language.get(''				, '공정'	)
					},{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get('item_code'	, '설비'	)
					},{	dataIndex:	'item_name'		, width:  80, align : 'left'	, text: Language.get('item_name'	, '지시번호'	)
					},{	dataIndex:	'item_spec'		, width: 180, align : 'left'	, text: Language.get('item_spec'	, '거래처명'	)
					},{	dataIndex:	'item_spec'		, width: 100, align : 'left'	, text: Language.get('item_spec'	, '수주번호'	)
					},{	dataIndex:	''				, width:  90, align : 'right'	, text: Language.get(''				, '품명'		)
					},{	dataIndex:	''				, width:  80, align : 'center'	, text: Language.get(''				, '규격'		)
					},{	dataIndex:	''				, width:  80, align : 'left'	, text: Language.get(''				, '차종'		)
					},{	dataIndex:	''				, width: 180, align : 'left'	, text: Language.get(''				, '모델명'		)
					},{	dataIndex:	'esti_pric'		, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '작업자'		)
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '시작일시'	)
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '지시수량'	), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '생산수량'	), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'deli_date2'	, width:  80, align : 'center'	, text: Language.get('deli_date2'	, '양품수량'), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##',
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					}
				]
			};
		return item;
	}
});
