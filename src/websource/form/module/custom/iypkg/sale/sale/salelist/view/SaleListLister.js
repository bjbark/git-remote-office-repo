Ext.define('module.custom.iypkg.sale.sale.salelist.view.SaleListLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-salelist-worker-lister',
	store	: 'module.custom.iypkg.sale.sale.salelist.store.SaleListLister',

	region : 'center',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  }, { ptype:'filterbar'}  ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '3' || record.get('rnum') == '4'){
				return 'text-warn';
			}else if(record.get('rnum') == '2'){
				return 'text-blue';
			}
		}
	},

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-salelist-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : true,
				items : [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-','->','->','->','->','-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				],
			}
		;
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
					{	dataIndex:	'invc_date'		, width:  80, align : 'center'	, text: Language.get(''	, '출고일자'	)
					},{	dataIndex:	'rqod_date'		, width:  80, align : 'center'	, text: Language.get(''	, '청구일자'	), hidden : true
					},{	dataIndex:	'sale_date'		, width:  80, align : 'center'	, text: Language.get(''	, '판매일자'	), hidden : true
					},{	dataIndex:	'cstm_name'		, width: 193, align : 'left'	, text: Language.get(''	, '매출처명'	)
					},{	dataIndex:	'acpt_date'		, width:  80, align : 'left'	, text: Language.get(''	, '수주일자'	),align : 'center'
					},{	dataIndex:	'prod_name'		, width: 250, align : 'center'	, text: Language.get(''	, '품명'		),align : 'left'
					},{	dataIndex:	'prod_spec'		, width: 150, align : 'left'	, text: Language.get(''	, '상자규격'	)
					},{	dataIndex:	'ostt_qntt'		, width:  80, align : 'right'	, text: Language.get(''	, '출고량'	), xtype : 'numericcolumn'
					},{	dataIndex:	'rqod_qntt'		, width:  80, align : 'right'	, text: Language.get(''	, '청구수량'	), xtype : 'numericcolumn' , hidden : true
					},{	dataIndex:	'sale_qntt'		, width:  80, align : 'right'	, text: Language.get(''	, '판매수량'	), xtype : 'numericcolumn' , hidden : true
					},{	dataIndex:	'sale_pric'		, width:  90, align : 'right'	, text: Language.get(''	, '단가'		), xtype : 'numericcolumn'
					},{	dataIndex:	'sale_amnt'		, width: 120, align : 'right'	, text: Language.get(''	, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'pcod_numb'		, width: 180, align : 'left'	, text: Language.get(''	, 'P/O No'	)
					},{	dataIndex:	'acpt_numb'		, width: 124, align : 'center'	, text: Language.get(''	, '수주번호'	)
					},{	dataIndex:	'user_memo'		, flex:    1, align : 'left'	, text: Language.get(''	, '비고'		)
					}
				]
			}
		;
		return item;
	}

});
